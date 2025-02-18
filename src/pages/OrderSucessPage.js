import React from "react";
import successImage from "../assets/Temporary Images/badge-check 1.png";
import { useSearchParams } from "react-router-dom";
function OrderSucessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  console.log(orderId);

  return (
    <div className="w-full min-h-[50vh] flex items-center justify-center flex-col gap-2">
        <img src={successImage} alt="success" className="object-contain h-[3rem]"/>
      <h2 className="text-2xl font-medium text-primary">
        {" "}
        Your Order has been Placed
      </h2>
    </div>
  );
}

export default OrderSucessPage;
