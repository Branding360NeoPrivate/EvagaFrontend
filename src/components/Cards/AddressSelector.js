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
    <div className="w-full flex justify-between font-['Poppins'] items-center  h-[100px] border border-gray-300 rounded-lg bg-white px-6 py-4 max-sm:w-full">
      <div>
        <h1 className="text-xl font-medium text-primary">{addressData.name}</h1>
        <p className="text-textGray text-sm">{`${addressData.address} ${addressData.addressLine1} ${addressData.addressLine2} ${addressData.state}`}</p>
        <p className="text-textGray text-sm">
          Pin code - {addressData.pincode}
        </p>
      </div>
      <button
        className="px-4 py-2 text-primary border border-primary rounded-md hover:bg-purple-100"
        onClick={() => setIsEditingAddress(true)}
      >
        Change Address
      </button>
    </div>
  );
}

export default AddressSelector;
