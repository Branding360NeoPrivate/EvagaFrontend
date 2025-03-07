import React, { useEffect, useState } from "react";
import EditButton from "../../assets/Temporary Images/pen-square 1.png";
import DeleteButton from "../../assets/Temporary Images/rectangle-xmark 1.png";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineCloseSquare } from "react-icons/ai";
import useServices from "../../hooks/useServices";
import userApi from "../../services/userApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../context/redux/slices/userSlice";
import { internalRoutes } from "../../utils/internalRoutes";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReusableModal from "../../components/Modal/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function UserProfile() {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorResponse, setErrorResponse] = useState();
  const [modalType, setModalType] = useState("editProfile");
  const [modalData, setModalData] = useState({});
  const [userOneAddress, setUserOneAddress] = useState();
  const [addressId, setAddressId] = useState();
  const saveUserInterest = useServices(userApi.getUserProfile);
  const updateUserProfile = useServices(userApi.updateProfile);
  const addUserAddress = useServices(userApi.addUserAdress);
  const getOneAddress = useServices(userApi.getOneAddress);
  const updateOneAddress = useServices(userApi.updateOneAddress);
  const deleteOneAddress = useServices(userApi.deleteOneAddress);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const { auth } = useAuth();
  const history = useNavigate();
  const userId = Cookies.get("userId");
  const { profile } = useSelector((state) => state.userProfile);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const dispatch = useDispatch();
  const getUserProfileHandle = async (userId) => {
    dispatch(fetchUserProfile(userId));
  };
  useEffect(() => {
    if (userId) getUserProfileHandle(userId);
  }, [userId]);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleUpdateProfile = () => {
    setProfileData({
      name: profile?.name,
      email: profile?.email,
      phone: profile?.phoneNumber,
    });
  };
  const handleDeleteAddressOpenModal = () => {
    setOpen(true);
  };
  const handleDeleteAddressCloseModal = () => {
    setOpen(false);
  };
  const handleUpdateUserProfile = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data?.Name);
      formData.append("email", data?.Email);
      formData.append("phoneNumber", data?.Phone);

      const response = await updateUserProfile.callApi(userId, formData);

      if (response?.message === "User profile updated successfully") {
        dispatch(fetchUserProfile(userId));
        handleClose();
        toast.success(response?.message || "Profile updated successfully!");
      } else {
        setErrorResponse(
          response?.error || "An error occurred while updating the profile."
        );
        toast.error(
          response?.error || "Failed to update the profile. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error(
        "An error occurred while updating the profile. Please try again."
      );
    }
  };

  const handleAddUserAddress = async (data) => {
    try {
      const formData = new FormData();
      formData.append("Name", data?.addressName);
      formData.append("address", data?.Address);
      formData.append("addressLine1", data?.AddressLine1);
      formData.append("addressLine2", data?.AddressLine2);
      formData.append("state", data?.State);
      formData.append("pinCode", data?.Pincode);
      formData.append("City", data?.City);
      formData.append("Phone", data?.Phone);
      formData.append("alternatePhone", data?.alternatePhone);
      formData.append("AddressType", data?.AddressType);
      const response = await addUserAddress.callApi(userId, formData);

      handleClose();
      toast.success(response?.message || "Address added successfully!");
      dispatch(fetchUserProfile(userId));
      reset({
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
  const handleGetOneAddress = async (addressId) => {
    try {
      const response = await getOneAddress.callApi(addressId);
      if (response?.addresses) {
        setUserOneAddress(response.addresses);
        setAddressId(response.addresses._id);
      } else {
        console.error("Address not found.");
      }
    } catch (error) {
      console.error("Error fetching the address:", error);
    }
  };

  const handleUpdateAddress = async (data) => {
    try {
      const formData = new FormData();
      formData.append("Name", data?.addressName);
      formData.append("address", data?.Address);
      formData.append("addressLine1", data?.AddressLine1);
      formData.append("addressLine2", data?.AddressLine2);
      formData.append("state", data?.State);
      formData.append("pinCode", data?.Pincode);
      formData.append("Phone", data?.Phone);
      formData.append("alternatePhone", data?.alternatePhone);
      formData.append("City", data?.City);
      formData.append("AddressType", data?.AddressType);
      const response = await updateOneAddress.callApi(addressId, formData);

      if (response) {
        dispatch(fetchUserProfile(userId));
        toast.success(response?.message || "Address updated successfully!");
        handleClose();
      } else {
        toast.error("Failed to update the address. Please try again.");
      }
    } catch (error) {
      console.error("Error updating the address:", error);
      toast.error("An error occurred while updating the address.");
    }
  };

  const handleDeleteAddress = async () => {
    try {
      const response = await deleteOneAddress.callApi(addressId);

      if (response) {
        dispatch(fetchUserProfile(userId));
        toast.success("Address deleted successfully!");
      } else {
        toast.error("Failed to delete the address. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("An error occurred while deleting the address.");
    }
  };

  useEffect(() => {
    handleUpdateProfile();
  }, [profile]);
  const {
    register,
    handleSubmit,

    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      Name: profileData?.name || "",
      Phone: profileData?.phone || "",
      Email: profileData?.email || "",
    },
  });
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

  useEffect(() => {
    if (profileData) {
      setValue("Name", profileData.name || "");
      setValue("Email", profileData.email || "");
      setValue("Phone", profileData.phone || "");
    }
    if (userOneAddress) {
      setValueEditAddress("addressName", userOneAddress.Name || "");
      setValueEditAddress("Address", userOneAddress.address || "");
      setValueEditAddress("AddressLine1", userOneAddress.addressLine1 || "");
      setValueEditAddress("AddressLine2", userOneAddress.addressLine2 || "");
      setValueEditAddress("State", userOneAddress.state || "");
      setValueEditAddress("Pincode", userOneAddress.pinCode || "");
      setValueEditAddress("City", userOneAddress.City || "");
      setValueEditAddress(
        "alternatePhone",
        userOneAddress.alternatePhone || ""
      );
      setValueEditAddress("Phone", userOneAddress.Phone || "");
      setValueEditAddress("AddressType", userOneAddress.AddressType || "");
    }
  }, [profileData, setValue, userOneAddress]);

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
          Please Login To See Your Profile!
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
    <div className="flex items-center justify-center flex-col w-full my-10 ">
      <div className=" w-[95%] md:w-[650px]  border border-gray-300 rounded-lg px-2 md:px-16 py-12 bg-white">
        {/* Personal Info */}
        <div className="space-y-6">
          {[
            { label: "Name", value: profile?.name },
            { label: "Email Id", value: profile?.email },
            { label: "Phone Number", value: profile?.phoneNumber },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-start items-start gap-2 md:gap-0 md:flex-row md:justify-between md:h-[50px] border-b border-[#f0f0f0]"
            >
              <label className="text-purple-700 font-semibold mt-[12px]">
                {item.label}
              </label>
              <div className="relative mt-1 w-[350px]">
                <input
                  type="text"
                  value={item.value}
                  readOnly
                  className="w-full px-4 py-2 pr-10 border text-textGray border-gray-300 rounded-lg bg-textGray/10"
                  disabled
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 "
                  onClick={() => [handleOpen(), setModalType("editProfile")]}
                >
                  <img src={EditButton} alt="Edit" className="h-8 w-8" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Addresses */}
        <div className="mt-6">
          <span className="flex items-center justify-between py-1">
            <h3 className="text-purple-700 font-semibold ">Addresses</h3>
            <button
              className="btn-primary w-fit px-2 "
              onClick={() => [handleOpen(), setModalType("addAddress")]}
            >
              Add New Address
            </button>
          </span>
          <div className="space-y-4">
            {profile?.userAddresses?.map((address, index) => (
              <div
                key={address?._id}
                className="flex justify-between items-center border-b border-gray-200 pb-4"
              >
                <div>
                  <h4 className="font-semibold text-purple-700">
                    {address.Name}
                  </h4>
                  <p className="text-gray-600 w-[322px]">
                    {address.address}
                    <br />
                    {address.addressLine1}
                    <br />
                    {address.addressLine2}
                  </p>
                  <p className="text-gray-600 font-semibold">
                    Pin code: {address.pinCode}
                  </p>{" "}
                  <p className="text-gray-600 font-semibold">
                    Phone Number: {address.Phone}
                  </p>{" "}
                  <p className="text-gray-600 font-semibold">
                    Alt Phone Number: {address.alternatePhone}
                  </p>{" "}
                  <p className="text-gray-600 font-semibold">
                    Address Type: {address.AddressType}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <button className="p-1 rounded-lg">
                    <FaRegEdit
                      className="text-2xl aspect-square text-primary"
                      onClick={() => [
                        handleOpen(),
                        setModalType("editAddress"),
                        handleGetOneAddress(address?._id),
                      ]}
                    />
                  </button>
                  <button className="p-1 rounded-lg">
                    <AiOutlineCloseSquare
                      className="text-2xl aspect-square text-primary"
                      onClick={() => [
                        handleDeleteAddressOpenModal(),
                        setAddressId(address?._id),
                      ]}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ReusableModal
        open={modalOpen}
        onClose={handleClose}
        width={"50%"}
        title={
          modalType === "editProfile"
            ? "Edit Profile"
            : modalType === "addAddress"
            ? "Add Address"
            : "Edit Address"
        }
      >
        {modalType === "editProfile" && (
          <form onSubmit={handleSubmit(handleUpdateUserProfile)}>
            <div className="flex flex-col gap-2">
              {/* Name Field */}
              <span className="flex items-start justify-start flex-col gap-2">
                <p>Name</p>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg"
                  placeholder="Name"
                  {...register("Name", {
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
                {errors.Name && (
                  <p role="alert" className="text-red-500 text-base">
                    {errors.Name.message}
                  </p>
                )}
              </span>

              {/* Email Field */}
              <span className="flex items-start justify-start flex-col gap-2">
                <p>Email</p>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg"
                  placeholder="Email"
                  {...register("Email", {
                    required: { value: true, message: "Email is required" },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.Email && (
                  <p role="alert" className="text-red-500 text-base">
                    {errors.Email.message}
                  </p>
                )}
              </span>

              {/* Phone Field */}
              <span className="flex items-start justify-start flex-col gap-2">
                <p>Phone</p>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg"
                  placeholder="Phone"
                  {...register("Phone", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must be 10 digits",
                    },
                    maxLength: {
                      value: 12,
                      message: "Phone number must be 10 digits",
                    },
                  })}
                />
                {errors.Phone && (
                  <p role="alert" className="text-red-500 text-base">
                    {errors.Phone.message}
                  </p>
                )}
              </span>
            </div>

            <button type="submit" className="btn-primary w-fit px-2 mt-2">
              Update Profile
            </button>
          </form>
        )}
        {modalType === "addAddress" && (
          <form onSubmit={handleAddSubmit(handleAddUserAddress)}>
            <div className="my-8 space-y-4">
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">Name*</label>
                <span className="w-[300px] flex items-start justify-start flex-col gap1">
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
                    <p role="alert" className="text-red-500 text-sm">
                      {errorsAddAddress.addressName.message}
                    </p>
                  )}
                </span>
              </div>{" "}
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">Phone*</label>
                <span className="w-[300px] flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerAddAddress("Phone", {
                      required: { value: true, message: "Phone is required" },
                      minLength: {
                        value: 3,
                        message: "Phone must be at least 10 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Phone must be at most 10 characters",
                      },
                    })}
                  />
                  {errorsAddAddress.Phone && (
                    <p role="alert" className="text-red-500 text-sm">
                      {errorsAddAddress.Phone.message}
                    </p>
                  )}
                </span>
              </div>{" "}
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">Alternate Phone</label>
                <span className="w-[300px] flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerAddAddress("alternatePhone", {
                      required: {
                        value: false,
                        message: "Alternate Phone is required",
                      },
                      minLength: {
                        value: 3,
                        message:
                          "Alternate Phone must be at least 10 characters",
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "Alternate Phone must be at most 10 characters",
                      },
                    })}
                  />
                  {errorsAddAddress.alternatePhone && (
                    <p role="alert" className="text-red-500 text-sm">
                      {errorsAddAddress.alternatePhone.message}
                    </p>
                  )}
                </span>
              </div>
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">Address*</label>
                <span className="w-[300px] flex items-start justify-start flex-col gap1">
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
                    <p role="alert" className="text-red-500 text-sm">
                      {errorsAddAddress.Address.message}
                    </p>
                  )}
                </span>
              </div>
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">Address line 1*</label>
                <span className="w-[300px] flex items-start justify-start flex-col gap1">
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
                    <p role="alert" className="text-red-500 text-sm">
                      {errorsAddAddress.AddressLine1.message}
                    </p>
                  )}
                </span>
              </div>
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">Address line 2</label>
                <span className="w-[300px] flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerAddAddress("AddressLine2", {
                      required: {
                        value: false,
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
                    <p role="alert" className="text-red-500 text-sm">
                      {errorsAddAddress.AddressLine2.message}
                    </p>
                  )}
                </span>
              </div>
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">City*</label>
                <span className="w-[300px] flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerAddAddress("City", {
                      required: { value: true, message: "City is required" },
                      minLength: {
                        value: 2,
                        message: "City must be at least 2 characters",
                      },
                      maxLength: {
                        value: 200,
                        message: "City must be at most 20 characters",
                      },
                    })}
                  />
                  {errorsAddAddress.City && (
                    <p role="alert" className="text-red-500 text-sm">
                      {errorsAddAddress.City.message}
                    </p>
                  )}
                </span>
              </div>{" "}
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">State*</label>
                <span className="w-[300px] flex items-start justify-start flex-col gap1">
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
                    <p role="alert" className="text-red-500 text-sm">
                      {errorsAddAddress.State.message}
                    </p>
                  )}
                </span>
              </div>
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">Pincode*</label>
                <span className="w-[300px] flex items-start justify-start flex-col gap1">
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
                    <p role="alert" className="text-red-500 text-sm">
                      {errorsAddAddress.Pincode.message}
                    </p>
                  )}
                </span>
              </div>{" "}
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">Address Type*</label>
                <span className="w-[300px] flex items-start justify-start flex-col gap-1">
                  <div className="flex flex-row flex-wrap text-textGray text-sm gap-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="Home"
                        {...registerAddAddress("AddressType", {
                          required: {
                            value: true,
                            message: "Address Type is required",
                          },
                        })}
                      />
                      Home
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="Office"
                        {...registerAddAddress("AddressType", {
                          required: {
                            value: true,
                            message: "Address Type is required",
                          },
                        })}
                      />
                      Office
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="Event Address"
                        {...registerAddAddress("AddressType", {
                          required: {
                            value: true,
                            message: "Address Type is required",
                          },
                        })}
                      />
                      Event Address
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="Others"
                        {...registerAddAddress("AddressType", {
                          required: {
                            value: true,
                            message: "Address Type is required",
                          },
                        })}
                      />
                      Others
                    </label>
                  </div>
                  {errorsAddAddress.AddressType && (
                    <p role="alert" className="text-red-500 text-sm">
                      {errorsAddAddress.AddressType.message}
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
          <form onSubmit={handleEditSubmit(handleUpdateAddress)}>
            <div className="my-8 space-y-4">
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">Name*</label>
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
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">Phone*</label>
                <span className="flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerEditAddress("Phone", {
                      required: { value: true, message: "Phone is required" },
                      minLength: {
                        value: 3,
                        message: "Phone must be at least 10 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Phone must be at most 10 characters",
                      },
                    })}
                  />
                  {errorsEditAddress.Phone && (
                    <p role="alert" className="text-red-500 text-base">
                      {errorsEditAddress.Phone.message}
                    </p>
                  )}
                </span>
              </div>{" "}
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">Alternate Phone</label>
                <span className="flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerEditAddress("alternatePhone", {
                      required: {
                        value: false,
                        message: "Alternate Phone is required",
                      },
                      minLength: {
                        value: 3,
                        message:
                          "Alternate Phone must be at least 10 characters",
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "Alternate Phone must be at most 10 characters",
                      },
                    })}
                  />
                  {errorsEditAddress.alternatePhone && (
                    <p role="alert" className="text-red-500 text-base">
                      {errorsEditAddress.alternatePhone.message}
                    </p>
                  )}
                </span>
              </div>
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">Address*</label>
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
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">Address line 1*</label>
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
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">Address line 2</label>
                <span className="flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerEditAddress("AddressLine2", {
                      required: {
                        value: false,
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
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">City*</label>
                <span className="w-[300px] flex items-start justify-start flex-col gap1">
                  <input
                    type="text"
                    className="w-[300px] h-[40px] px-4 py-2 border border-[#E0E0E0] rounded-lg outline-none"
                    {...registerEditAddress("City", {
                      required: { value: true, message: "State is required" },
                      minLength: {
                        value: 2,
                        message: "City must be at least 2 characters",
                      },
                      maxLength: {
                        value: 200,
                        message: "City must be at most 20 characters",
                      },
                    })}
                  />
                  {errorsAddAddress.City && (
                    <p role="alert" className="text-red-500 text-base">
                      {errorsAddAddress.City.message}
                    </p>
                  )}
                </span>
              </div>{" "}
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">State*</label>
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
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">Pincode*</label>
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
              <div className=" w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <label className="text-textGray text-xl">Address Type*</label>
                <span className="w-[300px] flex items-start justify-start flex-col gap-1">
                  <div className="flex flex-row flex-wrap text-textGray text-sm gap-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="Home"
                        {...registerEditAddress("AddressType", {
                          required: {
                            value: true,
                            message: "Address Type is required",
                          },
                        })}
                      />
                      Home
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="Office"
                        {...registerEditAddress("AddressType", {
                          required: {
                            value: true,
                            message: "Address Type is required",
                          },
                        })}
                      />
                      Office
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="Event Address"
                        {...registerEditAddress("AddressType", {
                          required: {
                            value: true,
                            message: "Address Type is required",
                          },
                        })}
                      />
                      Event Address
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="Others"
                        {...registerEditAddress("AddressType", {
                          required: {
                            value: true,
                            message: "Address Type is required",
                          },
                        })}
                      />
                      Others
                    </label>
                  </div>
                  {errorsAddAddress.AddressType && (
                    <p role="alert" className="text-red-500 text-sm">
                      {errorsAddAddress.AddressType.message}
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
      </ReusableModal>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteAddressCloseModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ color: "#6A1B9A", fontWeight: "600" }}>
          {"Are you sure want to Delete Address?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This address is crucial for ensuring seamless service delivery for
            your event.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: "#6A1B9A" }}
            onClick={handleDeleteAddressCloseModal}
          >
            Disagree
          </Button>
          <Button
            style={{ color: "#6A1B9A" }}
            onClick={() => [
              handleDeleteAddress(),
              handleDeleteAddressCloseModal(),
            ]}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserProfile;
