import React from "react";
import CrossButton from "../../assets/Temporary Images/Cross.png";
import Event from "../../assets/Temporary Images/image (4).png";
import formatCurrency from "../../utils/formatCurrency";
function CheckOutCard({
  price,
  image,
  title,
  category,
  vendorUserName,
  packageId,removeFromcart
}) {
  const removefromcartHandle = async() => {
    removeFromcart(packageId)
  };

  return (
    <div
      className="w-full flex items-center bg-white border border-gray-300 rounded-lg p-4  max-sm:w-full relative "
      style={{ height: "199px", borderRadius: "10px" }}
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={() => removefromcartHandle()}
      >
        <img src={CrossButton} alt="Close" className="w-6 h-6" />
      </button>
      <img
        src={image}
        alt={title}
        className="object-cover rounded-lg"
        style={{
          width: "12rem",
          height: "10rem",
          borderRadius: "4.22px",
          objectFit: "contain",
        }}
      />
      <div className="flex-1 flex flex-col ml-8">
        <h2 className="text-xl  font-semibold text-primary">{title}</h2>
        <p className="text-normal  font-normal text-textGray">{category}</p>
        <p className="text-normal font-normal text-primary">{vendorUserName}</p>
      </div>
      <div className="text-xl font-semibold text-primary mr-8">
        {formatCurrency(price)}
      </div>
    </div>
  );
}

export default CheckOutCard;
