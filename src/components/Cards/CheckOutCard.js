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
     className="w-full flex flex-col md:flex-row items-center gap-5 h-auto md:h-[200px] bg-white border 
     border-gray-300 rounded-lg p-4  max-sm:w-full relative "
     // style={{ height: "199px", borderRadius: "10px" }}
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
       className="object-cover rounded-lg  w-full h-[10rem] md:w-[12rem] md:h-[10rem]"
       // style={{
       //   width: "12rem",
       //   height: "10rem",
       //   borderRadius: "4.22px",
       //   objectFit: "contain",
       // }}
     />
     <div className=" w-full md:w-auto flex-1 flex flex-col md:-8">
       <h2 className="text-xl font-semibold text-primary">{title}</h2>
       <p className="text-normal font-normal text-textGray">{category}</p>
       <p className="text-normal font-normal text-primary">{vendorUserName}</p>
     </div>
     <div className=" w-full md:w-auto text-xl font-semibold text-primary md:mr-8">
       {formatCurrency(price)}
     </div>
   </div>
  );
}

export default CheckOutCard;
