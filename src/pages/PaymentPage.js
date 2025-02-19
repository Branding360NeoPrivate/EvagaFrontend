import React, { useEffect, useState } from "react";
import CheckoutSummary from "../components/Cards/CheckoutSummary";
import { internalRoutes } from "../utils/internalRoutes";
import { fetchUserCart } from "../context/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useServices from "../hooks/useServices";
import orderApis from "../services/orderApis";
import userApi from "../services/userApi";

function PaymentPage() {
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const userId = Cookies.get("userId");
  const [userData, setUserData] = useState();
  const history = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    if (userId && (!cart || cart.length === 0)) {
      dispatch(fetchUserCart({ userId })).then((response) => {
        if (!response || response.length === 0) {
          console.log("Server response is empty. No cart items fetched.");
        }
      });
    }
  }, [userId, cart, dispatch]);
  const createOrderApi = useServices(orderApis.createUserOrder);
  const validateOrderApi = useServices(orderApis.valiDateUserOrder);
  const getUserProfileApi = useServices(userApi.getUserProfile);
  const paymentMethod = ["Cards", "Upi", "Netbanking", "Wallet", "Emi"];
  //cashfree payment initilization
  //   const createOrderHandle = async () => {
  //     try {
  //         // Step 1: Call API to create an order
  //         const response = await createOrderApi.callApi(userId);
  //         console.log("Order Creation Response:", response);

  //         // Step 2: Extract orderId & paymentSessionId from response
  //         const { order_id, payment_session_id } = response;

  //         if (!order_id || !payment_session_id) {
  //             console.error("Missing order_id or payment_session_id");
  //             return;
  //         }

  //         // Step 3: Load Cashfree SDK
  //         const cashfree = await load({ mode: "sandbox" }); // Use "production" for live mode

  //         // Step 4: Open Cashfree Payment Modal
  //         await cashfree.checkout({
  //             paymentSessionId: payment_session_id
  //         });

  //         console.log("Payment Modal Opened Successfully");

  //     } catch (error) {
  //         console.error("Error in Order Creation or Payment:", error);
  //     }
  // };
  const getUserdetailhandle = async () => {
    const response = await getUserProfileApi.callApi(userId);
    setUserData(response);
    console.log(response, "response");
  };
  useEffect(() => {
    if (userId) {
      getUserdetailhandle();
    }
  }, [userId]);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createOrderHandle = async () => {
    try {
      let storedOrderId = localStorage.getItem("razorpay_order_id");

      if (!storedOrderId) {
        // Step 1: Create order on backend only if there's no stored order
        const response = await createOrderApi.callApi(userId);
        console.log("Order Creation Response:", response);

        if (!response || !response.order_id) {
          console.error("Missing order_id or amount");
          return;
        }

        storedOrderId = response.order_id;
        localStorage.setItem("razorpay_order_id", storedOrderId);
      }

      const response = await createOrderApi.callApi(userId);

      const { order_id, amount, currency } = response;

      if (!order_id || !amount) {
        console.error("Missing order_id or amount");
        return;
      }

      const isScriptLoaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!isScriptLoaded) {
        console.error("Failed to load Razorpay script.");
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency || "INR",
        name: "Evaga Entertainment ",
        description: "Order Payment",
        order_id: order_id,
        method: "wallet",
        handler: async (response) => {
          const formdata = new FormData();
          formdata.append("orderId", response.razorpay_order_id);
          formdata.append("paymentId", response.razorpay_payment_id);
          formdata.append("razorpaySignature", response.razorpay_signature);
          await validateOrderApi.callApi(formdata);

          window.location.href = `${internalRoutes.orderStatus}?order_id=${response.razorpay_order_id}`;
        },
        prefill: {
          name: userData?.name,
          email: userData?.email,
          contact: userData?.phoneNumber,
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error in Order Creation or Payment:", error);
    }
  };

  if (!auth?.isAuthenticated || auth?.role !== "user") {
    return (
      <motion.div
        className="flex items-center justify-center flex-col gap-3 w-full h-[50vh]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          opacity: { duration: 0.8, ease: "easeInOut" },
          scale: { duration: 0.5, ease: "easeOut" },
        }}
      >
        <p className="text-primary text-xl text-textGray">
          Please Login To See Your Cart!
        </p>
        <button
          className="btn-primary w-fit px-4"
          onClick={() => history(internalRoutes.userLogin)}
        >
          Login
        </button>
      </motion.div>
    );
  }
  return (
    <div className="w-full px-[2.5%] py-[2%] flex flex-col md:flex-row gap-4 justify-between">
      <div className="flex-1 md:flex-[0.72] flex flex-col gap-4 w-full">
        <h2 className="text-2xl text-primary font-medium">
          Select a Payment Method
        </h2>
        <div className="w-[90%] selectAddress rounded-md border-2 border-textLightGray h-[20rem] p-4 flex items-start justify-start flex-col gap-1">
          {paymentMethod?.map((item, index) => (
            <label
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
              className="text-primary font-medium"
            >
              <input
                type="radio"
                name="payment"
                value={item}
                style={{ marginRight: "8px" }}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="flex-1 md:flex-[0.23] w-full">
        <CheckoutSummary
          totalOfcart={cart?.totalOfCart}
          platformFee={cart?.platformFee}
          totalWithFee={cart?.totalAfterDiscount}
          totalGst={cart?.totalGst}
          //   setModalType={setModalType}
          //   openModal={handleOpen}
          discount={cart?.discount}
          onPlaceOrder={createOrderHandle}
        />
      </div>
    </div>
  );
}

export default PaymentPage;
