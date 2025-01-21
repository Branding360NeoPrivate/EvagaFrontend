import React, { useState } from "react";
import OrderVenderCard from "../../components/Cards/OrderVenderCard";

export default function VendorOrderPage() {
  const [activeState, setActivestate] = useState("Ongoing Order");
  return (
    <div className="flex items-center justify-center flex-col w-full gap-2">
      <div className="w-11/12 flex items-center justify-center flex-col gap-4 mt-4">
        <span className="w-full border-b-2 border-[#75757566] flex items-center justify-start gap-2 pb-1">
          <h6
            className={
              activeState == "Ongoing Order"
                ? "text-primary cursor-pointer font-semibold"
                : "text-textSecondary cursor-pointer font-medium"
            }
            onClick={() => setActivestate("Ongoing Order")}
          >
            Ongoing Order
          </h6>
          <h6
            className={
              activeState == "Completed order"
                ? "text-primary cursor-pointer font-semibold"
                : "text-textSecondary cursor-pointer font-medium"
            }
            onClick={() => setActivestate("Completed order")}
          >
            Completed order
          </h6>{" "}
          <h6
            className={
              activeState == "Cancelled order"
                ? "text-primary cursor-pointer font-semibold"
                : "text-textSecondary cursor-pointer font-medium"
            }
            onClick={() => setActivestate("Cancelled order")}
          >
            Cancelled order
          </h6>
        </span>
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
