import React from "react";
import { Card } from "@mui/material";

export const SelectAddressCard = ({
  address,
  selected,
  onSelect,
  onEdit,
  setModalType,
  onDelete,
  onEditFunction,
  setSelectedAddressId,
  selectAddress,
}) => {
  return (
    <Card className="w-full flex items-start justify-between flex-row gap-5 flex-wrap p-4 border rounded-2xl shadow-md ">
      <div className="selectAddress w-full flex items-start gap-2">
        <input
          type="radio"
          id="selectaddress"
          checked={selected===true}
          onClick={() => [selectAddress(address?._id)]}
        />
        <span className="flex items-start justify-start flex-col gap-1">
          <h3 className="text-lg font-semibold text-primary">
            {address?.Name}
          </h3>
          <p className="text-normal text-textGray">
            {address?.address} {address?.addressLine1} {address?.addressLine2}
          </p>
          <p className="text-normal text-textGray">
            Pin Code: {address?.pinCode}
          </p>
          <p className="text-normal text-textGray">State: {address?.state}</p>
          <p className="text-normal text-textGray">Phone: {address?.Phone}</p>
          <p className="text-normal text-textGray">Alternate Phone: {address?.alternatePhone}</p>
        </span>
      </div>
      <span className="flex items-center justify-center gap-2 ">
        <button
          className="btn-secondary "
          onClick={() => [
            onEdit(true),
            setModalType("editAddress"),
            onEditFunction(address?._id),
          ]}
        >
          Edit
        </button>
        <button
          className="btn-secondary"
          onClick={() => [
            onEdit(true),
            setModalType("deleteAddress"),
            setSelectedAddressId(address?._id),
          ]}
        >
          Delete
        </button>
      </span>
    </Card>
  );
};
