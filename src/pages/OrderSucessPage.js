import React, { useEffect } from "react";
import successImage from "../assets/Temporary Images/badge-check 1.png";
import { useSearchParams } from "react-router-dom";
import useServices from "../hooks/useServices";
import orderApis from "../services/orderApis";
function OrderSucessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const getPaymentDetailsByOrderIdApi = useServices(
    orderApis.getPaymentDetailsByOrderId
  );
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        if (orderId) {
          const response = await getPaymentDetailsByOrderIdApi.callApi(orderId);
          console.log("Payment Details:", response);
        }
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [orderId]); 

  return (
    <div className="w-full min-h-[50vh] flex items-center justify-center flex-col gap-2">
      <img
        src={successImage}
        alt="success"
        className="object-contain h-[3rem]"
      />
      <h2 className="text-2xl font-medium text-primary">
        {" "}
        Your Order has been Placed
      </h2>
    </div>
  );
}

export default OrderSucessPage;
