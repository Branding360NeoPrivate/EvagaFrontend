import React from "react";
import CrossButton from "../../assets/Temporary Images/Cross.png";
function CheckOutCard() {
    const data = [
        {
          id: 1,
          title: "Technical Staff",
          category: "Event Management and Staffing",
          company: "Geeta Pvt Ltd",
          price: "₹1,10,000.00",
          image: Event
        }
      ];
  return (
    <div
      className="w-full flex items-center bg-white border border-gray-300 rounded-lg p-4 w-[867px] max-sm:w-full"
      style={{ height: "199px", borderRadius: "10px" }}
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={() => console.log("Close button clicked")}
      >
        <img src={CrossButton} alt="Close" className="w-4 h-4" />
      </button>
      <img
        src={data.image}
        alt={data.title}
        className="object-cover rounded-lg"
        style={{ width: "172px", height: "131px", borderRadius: "4.22px" }}
      />
      <div className="flex-1 ml-8">
        <h2 className="text-xl font-['Poppins'] font-semibold text-primary">
          {data.title}
        </h2>
        <p className="text-base font-['Poppins'] font-medium text-textGray">
          {data.category}
        </p>
        <p className="text-base font-['Poppins'] text-primary">
          {data.company}
        </p>
      </div>
      <div className="text-xl font-['Poppins']-semibold text-primary mr-8">
        {data.price}
      </div>
    </div>
  );
}

export default CheckOutCard;
