import React, { useEffect, useState } from "react";
import OrderVenderCard from "../components/Cards/OrderVenderCard";
import orderApis from "../services/orderApis";
import useServices from "../hooks/useServices";
import Cookies from "js-cookie";
import { internalRoutes } from "../utils/internalRoutes";
export const OrderPage = (props) => {
  const [activeState, setActivestate] = useState("New Orders");
  const [allOrder, setAllOrder] = useState([]);
  const getOrderByUserIdApi = useServices(orderApis.getOrderByUserId);
  const userId = Cookies.get("userId");
  const getOrderByUserIdApiHandle = async () => {
    const response = await getOrderByUserIdApi.callApi(userId);
    setAllOrder(response ? response?.orders : []);
    console.log(response);
  };
  useEffect(() => {
    if (userId) {
      getOrderByUserIdApiHandle();
    }
  }, [userId]);
  return (
    <div className="flex items-center justify-center flex-col w-full gap-2">
      <div className="w-11/12 flex items-center justify-center flex-col gap-4 mt-4">
        <span className="w-full border-b-2 border-[#75757566] flex items-center justify-start gap-2 pb-1">
          <h6
            className={
              activeState == "New Orders"
                ? "text-primary cursor-pointer font-semibold"
                : "text-textSecondary cursor-pointer font-medium"
            }
            onClick={() => setActivestate("New Orders")}
          >
            New Orders
          </h6>{" "}
          <h6
            className={
              activeState == "Confirmed Orders"
                ? "text-primary cursor-pointer font-semibold"
                : "text-textSecondary cursor-pointer font-medium"
            }
            onClick={() => setActivestate("Confirmed Orders")}
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
        {activeState === "New Orders" && (
          <div className="w-full min-h-[50vh] flex items-center justfiy-center flex-col gap-4">
            {allOrder?.map((item) => {
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
                  redirectUrl={internalRoutes?.orderDetail+`/${item?.orderId}`+`/${item?._id}`}
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
        )}{" "}
        {activeState === "Confirmed Orders" && (
          <div className="w-full h-[50vh] flex items-center justfiy-center flex-col gap-4">
            {/* <OrderVenderCard /> */}
          </div>
        )}{" "}
        {activeState === "Ongoing Order" && (
          <div className="w-full h-[50vh] flex items-center justfiy-center flex-col gap-4">
            {/* <OrderVenderCard /> */}
          </div>
        )}
        {activeState === "Completed order" && (
          <div className="w-full h-[50vh] flex items-center justfiy-center flex-col gap-4">
            {/* <OrderVenderCard /> */}
          </div>
        )}{" "}
        {activeState === "Cancelled order" && (
          <div className="w-full h-[50vh] flex items-center justfiy-center flex-col gap-4">
            {/* <OrderVenderCard /> */}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default OrderPage;
