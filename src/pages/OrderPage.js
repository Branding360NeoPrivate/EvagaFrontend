import React, { useEffect, useState } from "react";
import OrderVenderCard from "../components/Cards/OrderVenderCard";
import orderApis from "../services/orderApis";
import useServices from "../hooks/useServices";
import Cookies from "js-cookie";
export const OrderPage = (props) => {
  const [activeState, setActivestate] = useState("Ongoing Order");
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
            {allOrder?.map((item) => (
              <OrderVenderCard />
            ))}
          </div>
        )}{" "}
        {activeState === "Confirmed Orders" && (
          <div className="w-full h-[50vh] flex items-center justfiy-center flex-col gap-4">
            <OrderVenderCard />
          </div>
        )}{" "}
        {activeState === "Ongoing Order" && (
          <div className="w-full h-[50vh] flex items-center justfiy-center flex-col gap-4">
            <OrderVenderCard />
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
