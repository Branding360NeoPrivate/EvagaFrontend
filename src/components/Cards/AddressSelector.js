import React, { useState } from "react";

function AddressSelector({ setIsEditingAddress, userAddress }) {
  return (
    <div className="w-full flex justify-center font-['Poppins'] items-center  h-[100px] border border-gray-300 rounded-lg bg-white px-6 py-4 max-sm:w-full">
      {userAddress ? (
     <div className="w-full flex justify-between font-['Poppins'] items-center  py-4 max-sm:w-full">
     <div>
       <h1 className="text-xl font-medium text-primary">
         {userAddress?.Name}
       </h1>
       <p className="text-textGray text-sm">{`${userAddress?.address} ${userAddress?.addressLine1} ${userAddress?.addressLine2} ${userAddress?.state}`}</p>
       <p className="text-textGray text-sm">
         Pin code - {userAddress?.pinCode}
       </p>
     </div>
     <button
       className="px-4 py-2 text-primary border border-primary rounded-md hover:bg-purple-100"
       onClick={() => setIsEditingAddress(true)}
     >
       Change Address
     </button>
   </div>
      ) : (
        <button
          className="px-4 py-2 text-primary border border-primary rounded-md hover:bg-purple-100"
          onClick={() => setIsEditingAddress(true)}
        >
          Select Address
        </button>
      )}
    </div>
  );
}

export default AddressSelector;
