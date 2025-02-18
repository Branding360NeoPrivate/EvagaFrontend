import React, { useEffect } from "react";
import CheckoutSummary from "../components/Cards/CheckoutSummary";
import { internalRoutes } from "../utils/internalRoutes";
import { fetchUserCart } from "../context/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import useServices from "../hooks/useServices";
import orderApis from "../services/orderApis";
import { load } from "@cashfreepayments/cashfree-js";
function PaymentPage() {
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const userId = Cookies.get("userId");
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

  const createOrderHandle = async () => {
    try {
        // Step 1: Call API to create an order
        const response = await createOrderApi.callApi(userId);
        console.log("Order Creation Response:", response);

        // Step 2: Extract orderId & paymentSessionId from response
        const { order_id, payment_session_id } = response;

        if (!order_id || !payment_session_id) {
            console.error("Missing order_id or payment_session_id");
            return;
        }

        // Step 3: Load Cashfree SDK
        const cashfree = await load({ mode: "sandbox" }); // Use "production" for live mode

        // Step 4: Open Cashfree Payment Modal
        await cashfree.checkout({
            paymentSessionId: payment_session_id
        });

        console.log("Payment Modal Opened Successfully");

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
        <div className="w-[90%] rounded-md border-2 border-textLightGray h-[20rem] p-4 flex items-start justify-start flex-col gap-1">
          <h3 className="text-primary text-xl font-medium">
            Debit & Credit Card
          </h3>
          <hr className="border-textLightGray w-full" />
          <h3 className="text-primary text-xl font-medium">
            Another Payment Method
          </h3>
          <hr className="border-textLightGray w-full" />

          <button className="btn-secondary w-fit p-1 px-2">Add Card</button>
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
