import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { internalRoutes } from "../utils/internalRoutes";
import CheckoutSummary from "../components/Cards/CheckoutSummary";
import AddressSelector from "../components/Cards/AddressSelector";
import CheckOutCard from "../components/Cards/CheckOutCard";
import { SelectAddressCard } from "../components/Cards/SelectAddressCard";
import ReusableModal from "../components/Modal/Modal";
import { useForm } from "react-hook-form";
import useServices from "../hooks/useServices";
import userApi from "../services/userApi";
import { toast } from "react-toastify";
import { fetchUserProfile } from "../context/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import DeleteForm from "../components/Admin/DeleteForm";
import CouponsCard from "../components/Cards/CouponsCard";
import Cancel from "../assets/Temporary Images/CancelButton.png";
import Add from "../assets/Temporary Images/AddButton2.png";
import Tag from "../assets/Temporary Images/tags1.png";
import { fetchUserCart } from "../context/redux/slices/cartSlice";
function CheckOut() {
  const { auth } = useAuth();
  const history = useNavigate();
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const addUserAddress = useServices(userApi.addUserAdress);
  const updateOneAddress = useServices(userApi.updateOneAddress);
  const getOneUserAddress = useServices(userApi.getOneAddress);
  const getUserAllAddress = useServices(userApi.getUserAllAddress);
  const deleteOneAddress = useServices(userApi.deleteOneAddress);
  const selectOneUserAddress = useServices(userApi.selectOneUserAddress);
  const [userAllAddress, setUserAllAddress] = useState(null);
  const [open, setOpen] = useState();
  const [modalType, setModalType] = useState("addAddress");
  const dispatch = useDispatch();
  const userId = Cookies.get("userId");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    register: registerAddAddress,
    handleSubmit: handleAddSubmit,
    setValue: setValueAddAddress,
    formState: { errors: errorsAddAddress },
    reset: resetAddAddress,
  } = useForm({});

  const {
    register: registerEditAddress,
    handleSubmit: handleEditSubmit,
    setValue: setValueEditAddress,
    formState: { errors: errorsEditAddress },
    reset: resetEditAddress,
  } = useForm({});
  const handleAddUserAddress = async (data) => {
    try {
      const formData = new FormData();
      formData.append("Name", data?.addressName);
      formData.append("address", data?.Address);
      formData.append("addressLine1", data?.AddressLine1);
      formData.append("addressLine2", data?.AddressLine2);
      formData.append("state", data?.State);
      formData.append("pinCode", data?.Pincode);

      const response = await addUserAddress.callApi(userId, formData);

      handleClose();
      toast.success(response?.message || "Address added successfully!");
      handleGetAllUserAddress();
      resetAddAddress({
        addressName: "",
        Address: "",
        AddressLine1: "",
        AddressLine2: "",
        State: "",
        Pincode: "",
      });
    } catch (error) {
      console.error("Error adding user address:", error);
      toast.error(error.message || "Failed to add address. Please try again.");
    }
  };
  const handleEditUserAddress = async (data) => {
    try {
      const formData = new FormData();
      formData.append("Name", data?.addressName);
      formData.append("address", data?.Address);
      formData.append("addressLine1", data?.AddressLine1);
      formData.append("addressLine2", data?.AddressLine2);
      formData.append("state", data?.State);
      formData.append("pinCode", data?.Pincode);

      const response = await updateOneAddress.callApi(
        selectedAddressId,
        formData
      );

      if (response) {
        dispatch(fetchUserProfile(userId));
        toast.success(response?.message || "Address updated successfully!");
        handleClose();
        handleGetAllUserAddress();
      } else {
        toast.error("Failed to update the address. Please try again.");
      }
    } catch (error) {
      console.error("Error updating the address:", error);
      toast.error("An error occurred while updating the address.");
    }
  };
  const handleGetOneAddress = async (addressId) => {
    const response = await getOneUserAddress.callApi(addressId);
    setSelectedAddressId(response?.addresses?._id);
    setValueEditAddress("addressName", response?.addresses.Name || "");
    setValueEditAddress("Address", response?.addresses.address || "");
    setValueEditAddress("AddressLine1", response?.addresses.addressLine1 || "");
    setValueEditAddress("AddressLine2", response?.addresses.addressLine2 || "");
    setValueEditAddress("State", response?.addresses.state || "");
    setValueEditAddress("Pincode", response?.addresses.pinCode || "");
  };
  const handleDeleteOneUserAddress = async () => {
    const response = await deleteOneAddress.callApi(selectedAddressId);
    console.log(response);
    handleClose();
    handleGetAllUserAddress();
  };
  const handleSelectOneAddressWithUserId = async (addressId) => {
    const response = await selectOneUserAddress.callApi(userId, addressId);
    console.log(response);
  };
  const handleGetAllUserAddress = useCallback(async () => {
    try {
      const response = await getUserAllAddress.callApi(userId);
      setUserAllAddress(response?.addresses);
    } catch (error) {
      console.error("Error fetching user addresses:", error);
    }
  }, [isEditingAddress]);

  useEffect(() => {
    if (isEditingAddress) {
      handleGetAllUserAddress();
    }
  }, [isEditingAddress, handleGetAllUserAddress]);
  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    if (userId && (!cart || cart.length === 0)) {
      dispatch(fetchUserCart(userId)).then((response) => {
        if (!response || response.length === 0) {
          console.log("Server response is empty. No cart items fetched.");
        }
      });
    }
  }, [userId, cart, dispatch]);
  if (!auth?.isAuthenticated || auth?.role !== "user") {
    return (
      <motion.div
        className="flex items-center justify-center flex-col gap-3 w-full h-[50vh]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          opacity: { duration: 0.8, ease: "easeInOut" },
          scale: { duration: 0.5, ease: "easeOut" },
        }}
      >
        <p className="text-primary text-xl text-textGray">
          Please Login To See Your Cart!
        </p>
        <button
          className="btn-primary w-fit px-4"
          onClick={() => history(internalRoutes.userLogin)}
        >
          Login
        </button>
      </motion.div>
    );
  }
  return (
    <>
      <div className="w-full px-[2.5%] py-[2%] flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex-1 md:flex-[0.72] flex flex-col gap-4 w-full">
          {isEditingAddress ? (
            <div className="flex flex-col gap-4">
              <span className="flex items-center justify-between w-full">
                <h2 className="text-xl font-medium text-primary">
                  Select a Delivery Address
                </h2>
                <button
                  className="btn-primary w-fit px-2"
                  onClick={() => [handleOpen(), setModalType("addAddress")]}
                >
                  Add Address
                </button>
              </span>
              <div className="w-full">
                {userAllAddress?.map((item) => (
                  <SelectAddressCard
                    address={item}
                    onEdit={setOpen}
                    onDelete={setOpen}
                    setModalType={setModalType}
                    onEditFunction={handleGetOneAddress}
                    setSelectedAddressId={setSelectedAddressId}
                    selectAddress={handleSelectOneAddressWithUserId}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <AddressSelector setIsEditingAddress={setIsEditingAddress} />
              <div className="flex flex-col gap-2">
                {cart?.items?.map((item) => (
                  <CheckOutCard price={item?.totalPrice} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 md:flex-[0.23] w-full">
          <CheckoutSummary setModalType={setModalType} openModal={handleOpen} />
        </div>
      </div>
      <ReusableModal
        open={open}
        onClose={handleClose}
        title={
          modalType === "addAddress"
            ? "Add Address"
            : modalType === "editAddress"
            ? "Edit Address"
            : modalType === "deleteAddress"
            ? "Delete Address"
            : modalType === "applyCoupon"
            ? "Add Coupon"
            : "Unknown"
        }
      >
        {modalType === "addAddress" && (
          <form onSubmit={handleAddSubmit(handleAddUserAddress)}>
            <div className="my-8 space-y-4">
              <div className="flex justify-between sm:flex-col lg:flex-row">
                <label className="text-textGray text-xl">Name</label>
                <span className="flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerAddAddress("addressName", {
                      required: { value: true, message: "Name is required" },
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Name must be at most 20 characters",
                      },
                    })}
                  />
                  {errorsAddAddress.addressName && (
                    <p role="alert" className="text-red-500 text-base">
                      {errorsAddAddress.addressName.message}
                    </p>
                  )}
                </span>
              </div>{" "}
              <div className="flex justify-between">
                <label className="text-textGray text-xl">Address</label>
                <span className="flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerAddAddress("Address", {
                      required: { value: true, message: "Address is required" },
                      minLength: {
                        value: 5,
                        message: "Address must be at least 5 characters",
                      },
                      maxLength: {
                        value: 200,
                        message: "Address must be at most 20 characters",
                      },
                    })}
                  />
                  {errorsAddAddress.Address && (
                    <p role="alert" className="text-red-500 text-base">
                      {errorsAddAddress.Address.message}
                    </p>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <label className="text-textGray text-xl">Address line 1</label>
                <span className="flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerAddAddress("AddressLine1", {
                      required: {
                        value: true,
                        message: "AddressLine1 is required",
                      },
                      minLength: {
                        value: 5,
                        message: "AddressLine1 must be at least 5 characters",
                      },
                      maxLength: {
                        value: 200,
                        message: "AddressLine1 must be at most 20 characters",
                      },
                    })}
                  />
                  {errorsAddAddress.AddressLine1 && (
                    <p role="alert" className="text-red-500 text-base">
                      {errorsAddAddress.AddressLine1.message}
                    </p>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <label className="text-textGray text-xl">Address line 2</label>
                <span className="flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerAddAddress("AddressLine2", {
                      required: {
                        value: true,
                        message: "AddressLine2 is required",
                      },
                      minLength: {
                        value: 5,
                        message: "AddressLine2 must be at least 5 characters",
                      },
                      maxLength: {
                        value: 200,
                        message: "AddressLine2 must be at most 20 characters",
                      },
                    })}
                  />
                  {errorsAddAddress.AddressLine2 && (
                    <p role="alert" className="text-red-500 text-base">
                      {errorsAddAddress.AddressLine2.message}
                    </p>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <label className="text-textGray text-xl">State</label>
                <span className="flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerAddAddress("State", {
                      required: { value: true, message: "State is required" },
                      minLength: {
                        value: 2,
                        message: "State must be at least 2 characters",
                      },
                      maxLength: {
                        value: 200,
                        message: "State must be at most 20 characters",
                      },
                    })}
                  />
                  {errorsAddAddress.State && (
                    <p role="alert" className="text-red-500 text-base">
                      {errorsAddAddress.State.message}
                    </p>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <label className="text-textGray text-xl">Pincode</label>
                <span className="flex items-start justify-start flex-col gap1">
                  <input
                    type="number"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none "
                    {...registerAddAddress("Pincode", {
                      required: { value: true, message: "Pincode is required" },
                      minLength: {
                        value: 6,
                        message: "Pincode must be at least 6 characters",
                      },
                      maxLength: {
                        value: 8,
                        message: "Pincode must be at most 8 characters",
                      },
                    })}
                  />
                  {errorsAddAddress.Pincode && (
                    <p role="alert" className="text-red-500 text-base">
                      {errorsAddAddress.Pincode.message}
                    </p>
                  )}
                </span>
              </div>
            </div>

            <button className="btn-primary w-fit px-2 mt-2" type="submit">
              Add Address
            </button>
          </form>
        )}
        {modalType === "editAddress" && (
          <form onSubmit={handleEditSubmit(handleEditUserAddress)}>
            <div className="my-8 space-y-4">
              <div className="flex justify-between sm:flex-col lg:flex-row">
                <label className="text-textGray text-xl">Name</label>
                <span className="flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerEditAddress("addressName", {
                      required: { value: true, message: "Name is required" },
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Name must be at most 20 characters",
                      },
                    })}
                  />
                  {errorsEditAddress.addressName && (
                    <p role="alert" className="text-red-500 text-base">
                      {errorsEditAddress.addressName.message}
                    </p>
                  )}
                </span>
              </div>{" "}
              <div className="flex justify-between">
                <label className="text-textGray text-xl">Address</label>
                <span className="flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerEditAddress("Address", {
                      required: { value: true, message: "Address is required" },
                      minLength: {
                        value: 5,
                        message: "Address must be at least 5 characters",
                      },
                      maxLength: {
                        value: 200,
                        message: "Address must be at most 20 characters",
                      },
                    })}
                  />
                  {errorsEditAddress.Address && (
                    <p role="alert" className="text-red-500 text-base">
                      {errorsEditAddress.Address.message}
                    </p>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <label className="text-textGray text-xl">Address line 1</label>
                <span className="flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerEditAddress("AddressLine1", {
                      required: {
                        value: true,
                        message: "AddressLine1 is required",
                      },
                      minLength: {
                        value: 5,
                        message: "AddressLine1 must be at least 5 characters",
                      },
                      maxLength: {
                        value: 200,
                        message: "AddressLine1 must be at most 20 characters",
                      },
                    })}
                  />
                  {errorsEditAddress.AddressLine1 && (
                    <p role="alert" className="text-red-500 text-base">
                      {errorsEditAddress.AddressLine1.message}
                    </p>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <label className="text-textGray text-xl">Address line 2</label>
                <span className="flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerEditAddress("AddressLine2", {
                      required: {
                        value: true,
                        message: "AddressLine2 is required",
                      },
                      minLength: {
                        value: 5,
                        message: "AddressLine2 must be at least 5 characters",
                      },
                      maxLength: {
                        value: 200,
                        message: "AddressLine2 must be at most 20 characters",
                      },
                    })}
                  />
                  {errorsEditAddress.AddressLine2 && (
                    <p role="alert" className="text-red-500 text-base">
                      {errorsEditAddress.AddressLine2.message}
                    </p>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <label className="text-textGray text-xl">State</label>
                <span className="flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerEditAddress("State", {
                      required: { value: true, message: "State is required" },
                      minLength: {
                        value: 2,
                        message: "State must be at least 2 characters",
                      },
                      maxLength: {
                        value: 200,
                        message: "State must be at most 20 characters",
                      },
                    })}
                  />
                  {errorsEditAddress.State && (
                    <p role="alert" className="text-red-500 text-base">
                      {errorsEditAddress.State.message}
                    </p>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <label className="text-textGray text-xl">Pincode</label>
                <span className="flex items-start justify-start flex-col gap1">
                  <input
                    type="number"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none "
                    {...registerEditAddress("Pincode", {
                      required: { value: true, message: "Pincode is required" },
                      minLength: {
                        value: 6,
                        message: "Pincode must be at least 6 characters",
                      },
                      maxLength: {
                        value: 8,
                        message: "Pincode must be at most 8 characters",
                      },
                    })}
                  />
                  {errorsEditAddress.Pincode && (
                    <p role="alert" className="text-red-500 text-base">
                      {errorsEditAddress.Pincode.message}
                    </p>
                  )}
                </span>
              </div>
            </div>

            <button className="btn-primary w-fit px-2 mt-2" type="submit">
              Edit Address
            </button>
          </form>
        )}
        {modalType === "deleteAddress" && (
          <DeleteForm
            deleteText="Address"
            onDelete={handleDeleteOneUserAddress}
          />
        )}
        {modalType === "applyCoupon" && (
          <div>
            <div className="flex items-center justify-start gap-4 mb-6">
              <img src={Tag} alt="tag1" />
              <input
                type="text"
                placeholder="Enter Coupon code"
                // value={updatedCode}
                // onChange={handleChange}
                className="w-full h-[40px] px-4 py-2 border rounded-lg focus:outline-none text-textGray"
              />
            </div>
            <p className="text-primary text-normal font-medium text-xl mb-2">
              Available Offers
            </p>
            <CouponsCard />
            <div className="flex justify-end mt-4">
              <button
                className="w-[67px] h-[30px] mr-12 mt-3"
                onClick={handleClose}
              >
                <img src={Cancel} alt="cancel" />
              </button>
              <button className="w-[90px] object-contain" onClick={handleClose}>
                <img src={Add} alt="add" />
              </button>
            </div>
          </div>
        )}
      </ReusableModal>
    </>
  );
}

export default CheckOut;
