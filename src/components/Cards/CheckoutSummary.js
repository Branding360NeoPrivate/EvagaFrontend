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
  RemoveCode,
  selectedCouponCode,
  applyCoupon,editAddress
}) {
  const navigate = useNavigate();

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const handlePlaceOrder = async () => {
    if (isPlacingOrder) return;

    setIsPlacingOrder(true);
    if (!selectedAddress) {
      editAddress(true)
      // toast.error("Please select an address before placing the order!");
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

    setIsPlacingOrder(false);
  };

  const [partialPaymentPart, setPartialPaymentPart] = useState(1);
  const [partialAmount, setPartialAmount] = useState(null);
  const earliestDate = useMemo(() => {
    if (!cart?.items?.length) return null;
    return cart.items.reduce((minDate, item) => {
      const itemDate = new Date(item?.date?.$date);
      return minDate ? (itemDate < minDate ? itemDate : minDate) : itemDate;
    }, null);
  }, [cart]);

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
  const calculateNextPaymentDates = (parts) => {
    if (!earliestDate) return [];

    const nextPaymentDates = [];
    const firstPaymentDate = new Date(earliestDate);

    if (parts === 2) {
      nextPaymentDates.push(
        new Date(firstPaymentDate.setDate(firstPaymentDate.getDate() + 14))
      );
    } else if (parts === 3) {
      nextPaymentDates.push(
        new Date(firstPaymentDate.setDate(firstPaymentDate.getDate() + 30))
      ); 
      nextPaymentDates.push(
        new Date(firstPaymentDate.setDate(firstPaymentDate.getDate() + 14))
      ); 
    }
    return nextPaymentDates;
  };

  const paymentDetails = useMemo(() => {
    if (partialPaymentPart > 1) {
      return calculatePartialPayments(totalWithFee, partialPaymentPart);
    }
    return [];
  }, [totalWithFee, partialPaymentPart]);
  useEffect(() => {
    if (partialPaymentPart > 1) {
      setPartialAmount(paymentDetails);
    } else {
      setPartialAmount(null);
    }
  }, [partialPaymentPart, paymentDetails]);
  useEffect(() => {
    if (selectedCouponCode) {
      setCouponCode(selectedCouponCode);
    }
  }, [selectedCouponCode]);

  return (
    <div className="w-full max-sm:w-full min-h-[560px] mx-auto border rounded-[10px] border-gray-300  p-6 bg-white font-['Poppins']">
      <PaymentOptions cart={cart} setNumberOfPart={setPartialPaymentPart} />
      <h2 className="text-xl font-semibold text-primary mb-4">Coupons</h2>
      <form
        onSubmit={(e) => [e.preventDefault(), applyCoupon(couponCode)]}
        className="flex items-center mb-6"
      >
        <img src={Tag} alt="tag1" />
        <input
          type="text"
          placeholder="Enter Coupon code"
          className="w-[217px] h-[40px] ml-2 px-4 py-2 border rounded-lg focus:outline-none"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {coupondiscount ? (
          <button
            type="button"
            className="w-[123px] h-[40px] text-red-500"
            onClick={RemoveCode}
          >
            Remove
          </button>
        ) : (
          <button type="submit" className="w-[123px] h-[40px] ml-4 border-2 border-primary text-primary rounded-md">
            {/* <img src={Add} alt="Add" /> */}
            ADD
          </button>
        )}
      </form>
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
                - {formatCurrency(coupondiscount)}
                <button
                  className="ml-2 text-red-500 text-sm"
                  onClick={() => RemoveCode()}
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
          disabled={isPlacingOrder}
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
