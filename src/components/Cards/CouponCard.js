import React from 'react'
import Tag from "../../assets/Temporary Images/tags1.png";
import CommentInfo from "../../assets/Temporary Images/comment-info1.png";
import Add from "../../assets/Temporary Images/AddButton.png";
function CouponCard() {
  return (
    <div className="w-full max-sm:w-full h-[560px] mx-auto border rounded-[10px] border-gray-300 shadow-md p-6 bg-white font-['Poppins']"> 
    <h2 className="text-xl font-semibold text-primary mb-4">Coupons</h2>
    <div className="flex items-center mb-6">
      <img
        src={Tag}
        alt="tag1"
      />
      <input
        type="text"
        placeholder="Enter Coupon code"
        className="w-[217px] h-[40px] ml-2 px-4 py-2 border rounded-lg focus:outline-none"
      />
      <button className="w-[123px] h-[40px]" 
        style = {{marginLeft: "4rem",}}
      >
        <img
          src={Add}
          alt="Add"
        />
      </button>
    </div>
    <h3 className="text-xl font-semibold mb-2 text-primary">Bill Details</h3>
    <div className="border-b border-gray-300 pt-4 text-textGray text-[18px]">
      <div className="flex justify-between mb-2">
        <span className="text-normal font-medium">Item Total</span>
        <span className="font-semibold">₹1,10,000.00</span>
      </div>
      <div className="text-normal flex justify-between mb-2">
        <span className="font-medium">Delivery Partner fee</span>
        <span>-0.00</span>
      </div>
      <div className="text-normal flex justify-between mb-2">
        <span className="font-medium">Discount on MRP</span>
        <span>-0.00</span>
      </div>
      <div className="text-normal flex justify-between mb-2">
        <span className="font-medium">
          Coupon Discount 
        </span>
        <span><a href="#" className="text-primary">Apply Coupon</a></span>
      </div>
      <div className="text-normal flex justify-between mb-2">
        <span className="font-medium">Platform Fee</span>
        <span>₹2000.00</span>
      </div>
      <div className="text-normal flex justify-between mb-2">
        <span className="flex text-normal"><span className="font-medium">GST & other Charges</span><img src={CommentInfo} className="h-4 mt-1 ml-1"/></span>
        <span>₹2,358.00</span>
      </div>
    </div>
      <div className="text-normal flex justify-between font-semibold mb-6 mt-6">
        <span className="text-primary text-xl">To Pay</span>
        <span className="text-textGray text-[22px]">₹1,14,358.00</span>
      </div>
      
    <div className="flex justify-center items-center">
      <button className="w-[257px] px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-purple-800">
        Place Order
      </button>
    </div>
  </div>
);
};
  


export default CouponCard