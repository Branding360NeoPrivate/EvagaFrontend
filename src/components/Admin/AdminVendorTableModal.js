// src/components/CustomModal/CustomModal.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";

const AdminVendorTableModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[50vw] relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal Content */}
        <div>{children}</div>

        {/* Close Button */}
        {/* <button
          className="mt-4 w-full bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800"
          onClick={onClose}
        >
          Close
        </button> */}
      </div>
    </div>
  );
};

export default AdminVendorTableModal;
