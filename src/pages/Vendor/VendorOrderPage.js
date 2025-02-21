import React, { useState } from "react";
import OrderVenderCard from "../../components/Cards/OrderVenderCard";

export default function VendorOrderPage() {
  const [activeState, setActivestate] = useState("New Order");
  return (
    <div className="flex items-center justify-center flex-col w-full gap-2">
      <div className="w-11/12 flex items-center justify-center flex-col gap-4 mt-4">
        <span className="w-full border-b-2 border-[#75757566] flex items-center justify-start gap-2 pb-1">
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
          <div className="w-full h-[50vh] flex items-center justfiy-center flex-col gap-4">
            <OrderVenderCard
              buttons={[
                <button
                  key="cancel"
                  className="btn-transparent-border"
                  onClick={() => console.log("Cancel Booking")}
                >
                  Cancel Order
                </button>,

                <button
                  key="accept"
                  className="btn-primary px-2"
                  onClick={() => console.log("Accept Order")}
                >
                  Accept Order
                </button>,
              ]}
            />
          </div>
        )}{" "}
        {activeState === "Confirmed Order" && (
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
}
