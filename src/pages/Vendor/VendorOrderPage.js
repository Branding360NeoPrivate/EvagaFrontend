import React, { useCallback, useEffect, useState } from "react";
import OrderVenderCard from "../../components/Cards/OrderVenderCard";
import useServices from "../../hooks/useServices";
import orderApis from "../../services/orderApis";
import Cookies from "js-cookie";
import ReusableModal from "../../components/Modal/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import "./VerifyOtpModal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { internalRoutes } from "../../utils/internalRoutes";
import BackButton from "../../utils/globalBackButton";
export default function VendorOrderPage() {
  const userId = Cookies.get("userId");
  const [allOrders, setAllOrders] = useState([]);
  const [activeState, setActivestate] = useState("New Order");
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("cancelOrder");
  const navigate = useNavigate();
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const [orderIdAndItemId, setOrderIdAndItemId] = useState({
    orderId: "",
    id: "",
    cancelReason: "",
  });
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [enteredOtp, setEnteredOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Allow only digits
    const updatedOtp = [...enteredOtp];
    updatedOtp[index] = value;
    setEnteredOtp(updatedOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !enteredOtp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const getNewOrderByVendorIdApi = useServices(orderApis.getNewOrderByVendorId);
  const getConfirmedOrderByVendorIdApi = useServices(
    orderApis.getConfirmedOrderByVendorId
  );
  const getAllCompletedOrdersApi = useServices(orderApis.getAllCompletedOrders);
  const getAllCancelledOrdersApi = useServices(orderApis.getAllCancelledOrders);
  const AcceptUserOrderbyorderIdApi = useServices(
    orderApis.AcceptUserOrderbyorderId
  );
  const StartUserOrderbyorderIdApi = useServices(
    orderApis.StartUserOrderbyorderId
  );
  const EndUserorderbyorderIdApi = useServices(orderApis.EndUserorderbyorderId);
  const VerifyStartServicebyorderIdApi = useServices(
    orderApis.VerifyStartServicebyorderId
  );
  const getvendoractiveordersApi = useServices(orderApis.getvendoractiveorders);
  const verifyEndServiceOrderIdApi = useServices(
    orderApis.verifyEndServiceOrderId
  );
  const CancelOrderApi = useServices(orderApis.CancelOrder);
  const getNewOrderByVendorIdApiHandle = useCallback(async () => {
    try {
      const response = await getNewOrderByVendorIdApi.callApi(userId);
      setAllOrders(response ? response.orders : []);
    } catch (error) {
      console.error("Error fetching new orders:", error);
      setAllOrders([]);
    }
  }, [userId]);
  const getConfirmedOrderByVendorIdApiHandle = useCallback(async () => {
    try {
      const response = await getConfirmedOrderByVendorIdApi.callApi(userId);
      setAllOrders(response ? response.orders : []);
    } catch (error) {
      console.error("Error fetching new orders:", error);
      setAllOrders([]);
    }
  }, [userId]);
  const getvendoractiveordersApiHandle = useCallback(async () => {
    try {
      const response = await getvendoractiveordersApi.callApi(userId);
      setAllOrders(response ? response.orders : []);
    } catch (error) {
      console.error("Error fetching new orders:", error);
      setAllOrders([]);
    }
  }, [userId]);
  const getAllCompletedOrdersApiHandle = useCallback(async () => {
    try {
      const response = await getAllCompletedOrdersApi.callApi(userId);
      setAllOrders(response ? response.orders : []);
    } catch (error) {
      console.error("Error fetching new orders:", error);
      setAllOrders([]);
    }
  }, [userId]);
  const getAllCancelledOrdersApihandle = useCallback(async () => {
    try {
      const response = await getAllCancelledOrdersApi.callApi(userId);
      setAllOrders(response ? response.orders : []);
    } catch (error) {
      console.error("Error fetching new orders:", error);
      setAllOrders([]);
    }
  }, [userId]);
  const AcceptUserOrderbyorderIdApihandle = async (orderId, id) => {
    const response = await AcceptUserOrderbyorderIdApi.callApi(orderId, id);
    getNewOrderByVendorIdApiHandle();
    toast.success(response?.message || "Order Acceped");
  };
  const CancelOrderApiHandle = async (orderId, id, cancelReason) => {
    const formdata = new FormData();
    formdata.append("orderId", orderId);
    formdata.append("itemId", id);
    formdata.append("cancelReason", cancelReason);
    const response = await CancelOrderApi.callApi(formdata);
    getNewOrderByVendorIdApiHandle();
    toast.success(response?.message || "Order Acceped");
    handleCloseModal();
  };
  const StartUserOrderbyorderIdApiHandle = async (orderId, id) => {
    const response = await StartUserOrderbyorderIdApi.callApi(orderId, id);
    toast.success(response?.message);
    getConfirmedOrderByVendorIdApiHandle();
  };
  const EndUserorderbyorderIdApiHandle = async (orderId, id) => {
    const response = await EndUserorderbyorderIdApi.callApi(orderId, id);
    toast.success(response?.message);
    getvendoractiveordersApiHandle();
  };
  const verifyEndServiceOrderIdApiHandle = async (orderId, id) => {
    const combinedOtp = enteredOtp.join("");

    // Validate if all 6 boxes are filled
    if (combinedOtp.length !== 6) {
      setError("Please fill in all 6 digits of the OTP.");
      return;
    }

    setError(""); // Clear error message if validation passes

    // Create FormData and append the OTP
    const formData = new FormData();
    formData.append("otp", combinedOtp);

    try {
      // Make the API request
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}vendorOrder/verifyEndService/${orderId}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Check if the response indicates success
      if (response.data.success) {
        toast.success("OTP verified successfully!");
        handleCloseModal();
        getvendoractiveordersApiHandle();
      } else {
        setError(response.data.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleVerify = async (orderId, id) => {
    const combinedOtp = enteredOtp.join("");

    if (combinedOtp.length !== 6) {
      setError("Please fill in all 6 digits of the OTP.");
      return;
    }
    setError("");
    const formData = new FormData();
    formData.append("otp", combinedOtp);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}vendorOrder/verifyStartService/${orderId}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("OTP verified successfully!");
        handleCloseModal();
        getConfirmedOrderByVendorIdApiHandle();
      } else {
        setError(response.data.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (activeState === "New Order") {
      getNewOrderByVendorIdApiHandle();
    }
    if (activeState === "Confirmed Order") {
      getConfirmedOrderByVendorIdApiHandle();
    }
    if (activeState === "Ongoing Order") {
      getvendoractiveordersApiHandle();
    }
    if (activeState === "Completed order") {
      getAllCompletedOrdersApiHandle();
    }
    if (activeState === "Cancelled order") {
      getAllCancelledOrdersApihandle();
    }
  }, [activeState, getNewOrderByVendorIdApiHandle]);

  return (
    <div className="flex items-center justify-center flex-col w-full gap-2">

      <div className="w-11/12 flex items-center justify-center flex-col gap-4 mt-4">
      <span className="flex items-start justify-start w-full ">
        <BackButton />
      </span>
        <span className="w-full border-b-2 border-[#75757566] flex items-center justify-start gap-6 pb-1">
          <h6
            className={
              activeState == "New Order"
                ? "text-primary cursor-pointer font-semibold"
                : "text-textSecondary cursor-pointer font-medium"
            }
            onClick={() => setActivestate("New Order")}
          >
            New Orders
          </h6>{" "}
          <h6
            className={
              activeState == "Confirmed Order"
                ? "text-primary cursor-pointer font-semibold"
                : "text-textSecondary cursor-pointer font-medium"
            }
            onClick={() => setActivestate("Confirmed Order")}
          >
            Confirmed Orders
          </h6>{" "}
          <h6
            className={
              activeState == "Ongoing Order"
                ? "text-primary cursor-pointer font-semibold"
                : "text-textSecondary cursor-pointer font-medium"
            }
            onClick={() => setActivestate("Ongoing Order")}
          >
            Ongoing Orders
          </h6>
          <h6
            className={
              activeState == "Completed order"
                ? "text-primary cursor-pointer font-semibold"
                : "text-textSecondary cursor-pointer font-medium"
            }
            onClick={() => setActivestate("Completed order")}
          >
            Completed Orders
          </h6>{" "}
          <h6
            className={
              activeState == "Cancelled order"
                ? "text-primary cursor-pointer font-semibold"
                : "text-textSecondary cursor-pointer font-medium"
            }
            onClick={() => setActivestate("Cancelled order")}
          >
            Cancelled Orders
          </h6>
        </span>
        {activeState === "New Order" && (
          <div className="w-full min-h-[50vh] flex items-center justfiy-center flex-col gap-4">
            {allOrders?.map((item) => {
              const imageUrl =
                (Array.isArray(item.packageDetails?.CoverImage)
                  ? item.packageDetails?.CoverImage[0]
                  : item.packageDetails?.CoverImage) ||
                (Array.isArray(item.packageDetails?.ProductImage)
                  ? item.packageDetails?.ProductImage[0]
                  : item.packageDetails?.ProductImage);

              const popularimage = imageUrl?.startsWith("service/")
                ? process.env.REACT_APP_API_Aws_Image_BASE_URL + imageUrl
                : imageUrl;

              return (
                <OrderVenderCard
                  title={item?.packageDetails?.Title}
                  orderId={item?.orderId}
                  image={popularimage}
                  time={item?.time}
                  date={item?.date}
                  userName={item?.userProfile?.name}
                  phone={item?.userProfile?.phoneNumber}
                  email={item?.userProfile?.email}
                  buttons={[
                    <button
                      key="cancel"
                      className="btn-transparent-border px-2"
                      onClick={() => [
                        handleOpenModal(),
                        setOrderIdAndItemId({
                          ...orderIdAndItemId,
                          orderId: item?.orderId,
                          id: item?._id,
                        }),
                      ]}
                    >
                      Cancel Order
                    </button>,

                    <button
                      key="accept"
                      className="btn-primary px-2"
                      onClick={() =>
                        AcceptUserOrderbyorderIdApihandle(
                          item?.orderId,
                          item?._id
                        )
                      }
                    >
                      Accept Order
                    </button>,
                    <button
                      key="view"
                      className="btn-primary px-2"
                      onClick={() =>
                        navigate(
                          internalRoutes?.vendorOrderDeatil +
                            `/${item?.orderId}` +
                            `/${item?._id}`
                        )
                      }
                    >
                      View Order Summary
                    </button>,
                  ]}
                />
              );
            })}
          </div>
        )}{" "}
        {activeState === "Confirmed Order" && (
          <div className="w-full min-h-[50vh] flex items-center justfiy-center flex-col gap-4">
            {allOrders?.map((item) => {
              const imageUrl =
                (Array.isArray(item.packageDetails?.CoverImage)
                  ? item.packageDetails?.CoverImage[0]
                  : item.packageDetails?.CoverImage) ||
                (Array.isArray(item.packageDetails?.ProductImage)
                  ? item.packageDetails?.ProductImage[0]
                  : item.packageDetails?.ProductImage);

              const popularimage = imageUrl?.startsWith("service/")
                ? process.env.REACT_APP_API_Aws_Image_BASE_URL + imageUrl
                : imageUrl;

              return (
                <OrderVenderCard
                  title={item?.packageDetails?.Title}
                  orderId={item?.orderId}
                  image={popularimage}
                  time={item?.time}
                  date={item?.date}
                  userName={item?.userProfile?.name}
                  phone={item?.userProfile?.phoneNumber}
                  email={item?.userProfile?.email}
                  buttons={[
                    <button
                      key="cancel"
                      className="btn-transparent-border px-2"
                      onClick={() => handleOpenModal()}
                    >
                      Cancel Order
                    </button>,

                    item?.otp && new Date(item?.otpExpiry) > new Date() ? (
                      <button
                        key="verify"
                        className="btn-primary px-2"
                        onClick={() => [
                          handleOpenModal(item?.otp),
                          setModalType("verifyorder"),
                          setOrderIdAndItemId({
                            ...orderIdAndItemId,
                            orderId: item?.orderId,
                            id: item?._id,
                          }),
                        ]}
                      >
                        Verify OTP
                      </button>
                    ) : (
                      <button
                        key="start"
                        className="btn-primary px-2"
                        onClick={() =>
                          StartUserOrderbyorderIdApiHandle(
                            item?.orderId,
                            item?._id
                          )
                        }
                      >
                        Start Order
                      </button>
                    ),
                    <button
                      key="view"
                      className="btn-primary px-2"
                      onClick={() =>
                        navigate(
                          internalRoutes?.vendorOrderDeatil +
                            `/${item?.orderId}` +
                            `/${item?._id}`
                        )
                      }
                    >
                      View Order Summary
                    </button>,
                  ]}
                />
              );
            })}
          </div>
        )}{" "}
        {activeState === "Ongoing Order" && (
          <div className="w-full min-h-[50vh] flex items-center justfiy-center flex-col gap-4">
            {allOrders?.map((item) => {
              const imageUrl =
                (Array.isArray(item.packageDetails?.CoverImage)
                  ? item.packageDetails?.CoverImage[0]
                  : item.packageDetails?.CoverImage) ||
                (Array.isArray(item.packageDetails?.ProductImage)
                  ? item.packageDetails?.ProductImage[0]
                  : item.packageDetails?.ProductImage);

              const popularimage = imageUrl?.startsWith("service/")
                ? process.env.REACT_APP_API_Aws_Image_BASE_URL + imageUrl
                : imageUrl;

              return (
                <OrderVenderCard
                  title={item?.packageDetails?.Title}
                  orderId={item?.orderId}
                  image={popularimage}
                  time={item?.time}
                  date={item?.date}
                  userName={item?.userProfile?.name}
                  phone={item?.userProfile?.phoneNumber}
                  email={item?.userProfile?.email}
                  buttons={[
                    item?.otp && new Date(item?.otpExpiry) > new Date() ? (
                      <button
                        key="verify"
                        className="btn-primary px-2"
                        onClick={() => [
                          handleOpenModal(item?.otp),
                          setModalType("verifyendorder"),
                          setOrderIdAndItemId({
                            ...orderIdAndItemId,
                            orderId: item?.orderId,
                            id: item?._id,
                          }),
                        ]}
                      >
                        Verify OTP
                      </button>
                    ) : (
                      <button
                        key="start"
                        className="btn-primary px-2"
                        onClick={() =>
                          EndUserorderbyorderIdApiHandle(
                            item?.orderId,
                            item?._id
                          )
                        }
                      >
                        End Service
                      </button>
                    ),
                  ]}
                />
              );
            })}
          </div>
        )}
        {activeState === "Completed order" && (
          <div className="w-full min-h-[50vh] flex items-center justfiy-center flex-col gap-4">
            {allOrders?.map((item) => {
              const imageUrl =
                (Array.isArray(item.packageDetails?.CoverImage)
                  ? item.packageDetails?.CoverImage[0]
                  : item.packageDetails?.CoverImage) ||
                (Array.isArray(item.packageDetails?.ProductImage)
                  ? item.packageDetails?.ProductImage[0]
                  : item.packageDetails?.ProductImage);

              const popularimage = imageUrl?.startsWith("service/")
                ? process.env.REACT_APP_API_Aws_Image_BASE_URL + imageUrl
                : imageUrl;

              return (
                <OrderVenderCard
                  title={item?.packageDetails?.Title}
                  orderId={item?.orderId}
                  image={popularimage}
                  time={item?.time}
                  date={item?.date}
                  userName={item?.userProfile?.name}
                  phone={item?.userProfile?.phoneNumber}
                  email={item?.userProfile?.email}
                  // buttons={[
                  //   item?.otp && new Date(item?.otpExpiry) > new Date() ? (
                  //     <button
                  //       key="verify"
                  //       className="btn-primary px-2"
                  //       onClick={() => [
                  //         handleOpenModal(item?.otp),
                  //         setModalType("verifyendorder"),
                  //         setOrderIdAndItemId({
                  //           ...orderIdAndItemId,
                  //           orderId: item?.orderId,
                  //           id: item?._id,
                  //         }),
                  //       ]}
                  //     >
                  //       Verify OTP
                  //     </button>
                  //   ) : (
                  //     <button
                  //       key="start"
                  //       className="btn-primary px-2"
                  //       onClick={() =>
                  //         EndUserorderbyorderIdApiHandle(
                  //           item?.orderId,
                  //           item?._id
                  //         )
                  //       }
                  //     >
                  //       End Service
                  //     </button>
                  //   ),
                  // ]}
                />
              );
            })}
          </div>
        )}
        {activeState === "Cancelled order" && (
          <div className="w-full min-h-[50vh] flex items-center justfiy-center flex-col gap-4">
            {allOrders?.map((item) => {
              const imageUrl =
                (Array.isArray(item.packageDetails?.CoverImage)
                  ? item.packageDetails?.CoverImage[0]
                  : item.packageDetails?.CoverImage) ||
                (Array.isArray(item.packageDetails?.ProductImage)
                  ? item.packageDetails?.ProductImage[0]
                  : item.packageDetails?.ProductImage);

              const popularimage = imageUrl?.startsWith("service/")
                ? process.env.REACT_APP_API_Aws_Image_BASE_URL + imageUrl
                : imageUrl;

              return (
                <OrderVenderCard
                  title={item?.packageDetails?.Title}
                  orderId={item?.orderId}
                  image={popularimage}
                  time={item?.time}
                  date={item?.date}
                  userName={item?.userProfile?.name}
                  phone={item?.userProfile?.phoneNumber}
                  email={item?.userProfile?.email}
                  // buttons={[
                  //   item?.otp && new Date(item?.otpExpiry) > new Date() ? (
                  //     <button
                  //       key="verify"
                  //       className="btn-primary px-2"
                  //       onClick={() => [
                  //         handleOpenModal(item?.otp),
                  //         setModalType("verifyendorder"),
                  //         setOrderIdAndItemId({
                  //           ...orderIdAndItemId,
                  //           orderId: item?.orderId,
                  //           id: item?._id,
                  //         }),
                  //       ]}
                  //     >
                  //       Verify OTP
                  //     </button>
                  //   ) : (
                  //     <button
                  //       key="start"
                  //       className="btn-primary px-2"
                  //       onClick={() =>
                  //         EndUserorderbyorderIdApiHandle(
                  //           item?.orderId,
                  //           item?._id
                  //         )
                  //       }
                  //     >
                  //       End Service
                  //     </button>
                  //   ),
                  // ]}
                />
              );
            })}
          </div>
        )}
      </div>
      <ReusableModal
        open={openModal}
        onClose={handleCloseModal}
        description="This is the description of my modal."
        width={"fit"}
      >
        {modalType === "cancelOrder" && (
          <form
            className="flex flex-col gap-4 p-4"
            onSubmit={(e) => [
              e.preventDefault(),
              CancelOrderApiHandle(
                orderIdAndItemId?.orderId,
                orderIdAndItemId?.id,
                orderIdAndItemId?.cancelReason
              ),
            ]}
          >
            <h6 className="text-primary font-semibold text-lg">
              Please Specify the Reason for Canceling the Booking
            </h6>
            <div className="radio-group flex flex-col gap-3 text-primary">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="reason"
                  value="Service not available"
                  checked={
                    orderIdAndItemId?.cancelReason === "Service not available"
                  }
                  onChange={(e) =>
                    setOrderIdAndItemId({
                      ...orderIdAndItemId,
                      cancelReason: e.target.value,
                    })
                  }
                  required
                />
                <span className="text-sm font-medium">
                  Service not available
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="reason"
                  value="Double booking conflict"
                  checked={
                    orderIdAndItemId?.cancelReason === "Double booking conflict"
                  }
                  onChange={(e) =>
                    setOrderIdAndItemId({
                      ...orderIdAndItemId,
                      cancelReason: e.target.value,
                    })
                  }
                  required
                />
                <span className="text-sm font-medium">
                  Double booking conflict
                </span>
              </label>
            </div>
            <div className="flex justify-end w-full">
              <button
                type="submit"
                className="bg-primary text-white font-medium rounded px-4 py-2 hover:bg-primary-dark transition"
              >
                Submit
              </button>
            </div>
          </form>
        )}
        {modalType === "verifyorder" && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Verify OTP</h2>
              <p>Please enter the 6-digit OTP sent to your email to proceed.</p>
              <div className="otp-inputs">
                {enteredOtp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="otp-box"
                  />
                ))}
              </div>
              {error && <p className="error-text">{error}</p>}
              <div className="modal-actions">
                <button className="btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={() =>
                    handleVerify(
                      orderIdAndItemId?.orderId,
                      orderIdAndItemId?.id
                    )
                  }
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        )}
        {modalType === "verifyendorder" && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Verify OTP</h2>
              <p>Please enter the 6-digit OTP sent to your email to proceed.</p>
              <div className="otp-inputs">
                {enteredOtp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="otp-box"
                  />
                ))}
              </div>
              {error && <p className="error-text">{error}</p>}
              <div className="modal-actions">
                <button className="btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={() =>
                    verifyEndServiceOrderIdApiHandle(
                      orderIdAndItemId?.orderId,
                      orderIdAndItemId?.id
                    )
                  }
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        )}
      </ReusableModal>
    </div>
  );
}
