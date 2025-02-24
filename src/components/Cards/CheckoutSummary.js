import React, { useEffect, useMemo, useState } from "react";
import Tag from "../../assets/Temporary Images/tags1.png";
import CommentInfo from "../../assets/Temporary Images/comment-info1.png";
import Add from "../../assets/Temporary Images/AddButton.png";
import formatCurrency from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PaymentOptions from "../../utils/PaymentOptions";
function CheckoutSummary({
  totalOfcart,
  totalWithFee,
  platformFee,
  totalGst,
  openModal,
  setModalType,
  discount,
  paymentPageUrl,
  onPlaceOrder,
  selectedAddress,
  coupondiscount,
  cart,
}) {
  const navigate = useNavigate();

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = async () => {
    if (isPlacingOrder) return; // Prevent multiple invocations

    setIsPlacingOrder(true); // Set the state to prevent further clicks

    if (!selectedAddress) {
      toast.error("Please select an address before placing the order!");
      setIsPlacingOrder(false);
      return;
    }
    if (paymentPageUrl) {
      navigate(paymentPageUrl);
    } else if (onPlaceOrder) {
      try {
        await onPlaceOrder(partialPaymentPart);
        console.log("Order placed successfully");
      } catch (error) {
        console.error("Error while placing order:", error);
      }
    } else {
      console.error("No action defined for placing the order.");
    }

    setIsPlacingOrder(false); // Re-enable the button after the process completes
  };
  const [partialPaymentPart, setPartialPaymentPart] = useState(1);
  const [partialAmount, setPartialAmount] = useState(null);
  // Function to calculate partial payment amounts
  const calculatePartialPayments = (total, parts) => {
    if (parts === 1) {
      return [total];
    } else if (parts === 2) {
      return [total * 0.8, total * 0.2]; // 80%, 20%
    } else if (parts === 3) {
      return [total * 0.5, total * 0.3, total * 0.2]; // 50%, 30%, 20%
    }
    return [];
  };

  const paymentDetails = useMemo(() => {
    if (partialPaymentPart > 1) {
      // Only calculate for partial payments
      return calculatePartialPayments(totalWithFee, partialPaymentPart);
    }
    return [];
  }, [totalWithFee, partialPaymentPart]);
  useEffect(() => {
    if (partialPaymentPart > 1) {
      // Store only partial payments in state
      setPartialAmount(paymentDetails);
    } else {
      setPartialAmount(null); // Clear the state for full payment
    }
  }, [partialPaymentPart, paymentDetails]);

  return (
    <div className="w-full max-sm:w-full min-h-[560px] mx-auto border rounded-[10px] border-gray-300  p-6 bg-white font-['Poppins']">
      <PaymentOptions cart={cart} setNumberOfPart={setPartialPaymentPart} />
      <h2 className="text-xl font-semibold text-primary mb-4">Coupons</h2>
      <div className="flex items-center mb-6">
        <img src={Tag} alt="tag1" />
        <input
          type="text"
          placeholder="Enter Coupon code"
          className="w-[217px] h-[40px] ml-2 px-4 py-2 border rounded-lg focus:outline-none"
        />
        <button className="w-[123px] h-[40px]" style={{ marginLeft: "4rem" }}>
          <img src={Add} alt="Add" />
        </button>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-primary">Bill Details</h3>
      <div className="border-b border-gray-300 pt-4 text-textGray text-[18px]">
        <div className="flex justify-between mb-2">
          <span className="text-normal font-medium">Item Total</span>
          <span className="font-semibold">{formatCurrency(totalOfcart)}</span>
        </div>
        <div className="text-normal flex justify-between mb-2">
          <span className="font-medium">Delivery Partner fee</span>
          <span>-0.00</span>
        </div>
        <div className="text-normal flex justify-between mb-2">
          <span className="font-medium">Discount on MRP</span>
          <span>{formatCurrency(0)}</span>
        </div>
        <div className="text-normal flex justify-between mb-2">
          <span className="font-medium">Coupon Discount</span>
          <span>
            {coupondiscount ? (
              <span className=" font-semibold">
                {coupondiscount} - {formatCurrency(coupondiscount)}
                <button
                  className="ml-2 text-red-500 text-sm"
                  // onClick={() => removeAppliedCoupon()}
                >
                  Remove
                </button>
              </span>
            ) : (
              <a
                href="#"
                className="text-primary"
                onClick={() => [setModalType("applyCoupon"), openModal()]}
              >
                Apply Coupon
              </a>
            )}
          </span>
        </div>

        <div className="text-normal flex justify-between mb-2">
          <span className="font-medium">Platform Fee</span>
          <span>{formatCurrency(platformFee)}</span>
        </div>
        <div className="text-normal flex justify-between mb-2">
          <span className="flex text-normal">
            <span className="font-medium">GST & other Charges</span>
            <img src={CommentInfo} className="h-4 mt-1 ml-1" />
          </span>
          <span>{formatCurrency(totalGst)}</span>
        </div>
      </div>
      <div className="text-normal flex justify-between font-semibold mb-6 mt-6">
        <span className="text-primary text-xl">To Pay</span>
        <span className="text-textGray text-[22px]">
          {formatCurrency(totalWithFee)}
        </span>
      </div>

      <div className="flex justify-center items-center">
        <button
          className="w-[257px] px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-purple-800"
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder} // Disable the button during the process
        >
          {isPlacingOrder ? "Processing..." : "Place Order"}
        </button>
      </div>
      {partialPaymentPart > 1 && partialAmount && (
        <div className="partial-payments bg-[#CACACA] p-2 px-3 mt-2 rounded-md text-textGray">
          <h3 className="flex">
            Partial Payment Breakdown: <p>Total Parts: {partialPaymentPart}</p>
          </h3>

          <ul>
            {partialAmount.map((amount, index) => {
              const percentage =
                partialPaymentPart === 2
                  ? index === 0
                    ? 80
                    : 20
                  : index === 0
                  ? 50
                  : index === 1
                  ? 30
                  : 20;

              return (
                <li key={index}>
                  {percentage}%: {formatCurrency(amount)}
                </li>
              );
            })}
          </ul>
          {partialPaymentPart === 3 && (
            <p>
              The second payment will be paid in 30 days, and the third payment
              must be paid before 14 days.
            </p>
          )}
          {partialPaymentPart === 2 && (
            <p>The second payment must be paid before 14 days.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CheckoutSummary;
