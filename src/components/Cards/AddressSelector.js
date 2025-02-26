import React, { useState } from "react";
const addressData = {
  name: "Shobhit Agarwal",
  address: "is simply dummy text",
  addressLine1: "of the printing and typesetting industry.",
  addressLine2: "",
  state: "LA",
  pincode: "456456",
};
function AddressSelector({ setIsEditingAddress }) {
  return (
    <div className="w-full h-auto xl:h-[100px] flex flex-col xl:flex-row gap-5 justify-start items-start xl:justify-between xl:items-center font-['Poppins'] border border-gray-300 rounded-lg bg-white px-6 py-4 max-sm:w-full">
      <div>
        <h1 className="text-xl font-medium text-primary">{addressData.name}</h1>
        <p className="text-textGray text-sm">{`${addressData.address} ${addressData.addressLine1} ${addressData.addressLine2} ${addressData.state}`}</p>
        <p className="text-textGray text-sm">
          Pin code - {addressData.pincode}
        </p>
      </div>
      <button
        className="px-4 py-2 text-nowrap text-primary border border-primary rounded-md hover:bg-purple-100"
        onClick={() => setIsEditingAddress(true)}
      >
        Change Address
      </button>
    </div>
  );
}

export default AddressSelector;
