import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorProfile } from "../../context/redux/slices/vendorSlice";
import Cookies from "js-cookie";
import ErrorView from "../../components/Errors/ErrorView";
import ProfileFormGenerator from "../../components/Forms/ProfileFormGenerator";
import generateDefaultValues from "../../utils/generateDefaultvalues";
import { Modal, Box, Button } from "@mui/material";
import formfields from "../../utils/formFields";
import { FaRegEdit } from "react-icons/fa";
import useServices from "../../hooks/useServices";
import vendorApi from "../../services/vendorApi";
import { toast } from "react-toastify";
import { fetchCategories } from "../../context/redux/slices/categorySlice";
import SearchableCategoryAndSubcategoryDropdown from "../../components/Inputs/SearchableCategoryAndSubcategoryDropdown";
import TermsModal from "../../components/Modal/TermsModal ";
import ReusableModal from "../../components/Modal/Modal";
import BackButton from "../../utils/globalBackButton";
import { useNavigate } from "react-router-dom";
import { internalRoutes } from "../../utils/internalRoutes";
const VendorProfile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.vendor);
  const { categories, subCategories, status, error } = useSelector(
    (state) => state.category
  );
  const userId = Cookies.get("userId");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openReuseableModal, setOpenReuseableModal] = useState(false);
  const handleOpenReuseableModal = () => {
    setOpenReuseableModal(true);
  };
  const handleCloseReuseableModal = () => {
    setOpenReuseableModal(false);
  };
  const imagesBaseUrl = process.env.REACT_APP_API_Aws_Image_BASE_URL;

  const [vendorDetails, setVendorDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errorOtp, setErrorOtp] = useState("");
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  const startResendTimer = () => {
    setTimer(60); // 60 seconds countdown
    setCanResend(false);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    setErrorOtp(""); // Clear error on input

    // Move to next input field if not the last input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);

      // Move to the previous input field if not the first input
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  const handleOtpSubmit = () => {
    if (otp.includes("")) {
      setErrorOtp("Please fill all the OTP fields.");
    } else {
      setErrorOtp("");
      verifyAadharOptHandle(otp.join(""));
      // alert(`OTP Submitted: ${otp.join("")}`);
    }
  };
  const handleResendOtp = () => {
    verifyVendorDetailsWithCashfree("udyamAadhaar");
    setCanResend(false);
    setTimer(60);
  };
  const navigate=useNavigate()
  const updateProfileService = useServices(vendorApi.updateProfile);
  const updateBankDetailsService = useServices(vendorApi.updateBankDetails);
  const updateBusinessService = useServices(vendorApi.updateBusiness);
  const updateBioService = useServices(vendorApi.updateBio);
  const updateProfilePictureService = useServices(
    vendorApi.updateProfilePicture
  );
  const VerifyVendorDetailsApi = useServices(vendorApi.VerifyVendorDetails);
  const SendaadharotpApi = useServices(vendorApi.Sendaadharotp);
  const VerifyaadharotpApi = useServices(vendorApi.Verifyaadharotp);

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId && !profile) {
      dispatch(fetchVendorProfile(userId));
      dispatch(fetchCategories());
    }
  }, []);

  useEffect(() => {
    if (profile) {
      setVendorDetails(profile.vendor);
    }
  }, [profile]);

  const handleOpenModal = (sectionName, section) => {
    setActiveSection({ name: sectionName, fields: section.fields });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setActiveSection(null);
  };

  const handleUpdateProfile = async (data) => {
    // console.log("data in update profile:", data);

    try {
      const userId = Cookies.get("userId");
      const response = await updateProfileService.callApi(userId, data);
      // console.log("response in update profile:", response);

      toast.success("Profile updated successfully!");
      dispatch(fetchVendorProfile(userId)); // Refresh profile data
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleUpdateBankDetails = async (data) => {
    try {
      const userId = Cookies.get("userId");
      const response = await updateBankDetailsService.callApi(userId, data);
      // console.log("response in update bank details:", response);

      toast.success("Bank details updated successfully!");
      dispatch(fetchVendorProfile(userId)); // Refresh profile data
    } catch (error) {
      toast.error("Failed to update bank details. Please try again.");
    }
  };

  const handleUpdateBusiness = async (data) => {
    // console.log("data in update business:", data);

    try {
      const userId = Cookies.get("userId");
      await updateBusinessService.callApi(userId, data);
      toast.success("Business details updated successfully!");
      dispatch(fetchVendorProfile(userId)); // Refresh profile data
    } catch (error) {
      toast.error("Failed to update business details. Please try again.");
    }
  };

  const handleAddNewCategoryAndSubCategory = async (data) => {
    try {
      const businessId = vendorDetails?.businessDetails?._id;
      await vendorApi.addNewCategoryBusiness(businessId, data);
      toast.success("New category and subcategory added successfully!");
      dispatch(fetchVendorProfile(Cookies.get("userId"))); // Refresh profile data
    } catch (error) {
      toast.error(
        "Failed to add new category and subcategory. Please try again."
      );
    }
  };

  const handleUpdateBio = async (bio) => {
    try {
      const userId = Cookies.get("userId");
      await updateBioService.callApi(userId, bio);
      toast.success("Bio updated successfully!");
      dispatch(fetchVendorProfile(userId)); // Refresh profile data
    } catch (error) {
      toast.error("Failed to update bio. Please try again.");
    }
  };
  const handleUpdateName = async (name) => {
    try {
      const userId = Cookies.get("userId");
      await updateProfileService.callApi(userId, name);
      toast.success("Bio updated successfully!");
      dispatch(fetchVendorProfile(userId)); // Refresh profile data
    } catch (error) {
      toast.error("Failed to update bio. Please try again.");
    }
  };
  const handleUpdateProfilePicture = async (data) => {
    try {
      const userId = Cookies.get("userId");
      // const baseUrl = process.env.REACT_APP_API_BASE_URL;
      const profilePic = data.profilePicture[0];
      console.log("imageFile:", profilePic);
      const formData = new FormData();
      formData.append("profilePic", profilePic);
      await updateProfilePictureService.callApi(userId, formData);
      toast.success("Profile picture updated successfully!");
      dispatch(fetchVendorProfile(userId)); // Refresh profile data
    } catch (error) {
      console.log("errror in update profile picture:", error);

      toast.error("Failed to update profile picture. Please try again.");
    }
  };

  const handleSubmit = (data) => {
    switch (activeSection.name) {
      case "Personal Contact Info":
        handleUpdateProfile(data);
        break;
      case "Bank Details":
        handleUpdateBankDetails(data);
        break;
      case "Business Details":
        handleUpdateBusiness(data);
        break;
      case "Add New Category And Sub-Category":
        handleAddNewCategoryAndSubCategory(data);
        break;
      case "Bio":
        handleUpdateBio(data);
        break;
      case "Profile Picture":
        handleUpdateProfilePicture(data);
        break;
      case "Name":
        handleUpdateName(data);
        break;
      default:
        console.error("Unknown section:", activeSection.name);
    }
    handleCloseModal();
  };

  const getDefaultValuesForSection = (section) => {
    switch (section.name) {
      case "Personal Contact Info":
        return vendorDetails;
      case "Bank Details":
        return vendorDetails?.bankDetails;
      case "Business Details":
        return vendorDetails?.businessDetails;
      case "Bio":
        return vendorDetails;
      case "Name":
        return vendorDetails;
      default:
        console.error("Unknown section:", section.name);
        return {};
    }
  };

  const bioDefaultValues = useMemo(
    () =>
      generateDefaultValues(
        vendorDetails,
        formfields.vendorProfileDetails.bioDetails.fields
      ),
    [vendorDetails]
  );

  const personalDefaultValues = useMemo(
    () =>
      generateDefaultValues(
        vendorDetails,
        formfields.vendorProfileDetails.personalDetails.fields
      ),
    [vendorDetails]
  );

  const bankDefaultValues = useMemo(
    () =>
      generateDefaultValues(
        vendorDetails?.bankDetails,
        formfields.vendorProfileDetails.bankDetails.fields
      ),
    [vendorDetails]
  );

  const businessDefaultValues = useMemo(
    () =>
      generateDefaultValues(
        vendorDetails?.businessDetails,
        formfields.vendorProfileDetails.businessDetails.fields
      ),
    [vendorDetails]
  );

  const verifyVendorDetailsWithCashfree = async (type) => {
    if (type === "panNumber") {
      const formdata = new FormData();
      formdata.append("type", "pan");
      const response = await VerifyVendorDetailsApi.callApi(userId, formdata);
      dispatch(fetchVendorProfile(userId));
    }
    if (type === "gstNumber") {
      const formdata = new FormData();
      formdata.append("type", "gstin");
      const response = await VerifyVendorDetailsApi.callApi(userId, formdata);

      dispatch(fetchVendorProfile(userId));
    }
    if (type === "udyamAadhaar") {
      handleOpenReuseableModal();

      if (canResend) {
        const response = await SendaadharotpApi.callApi(userId);

        if (response) {
          toast.success(response?.result?.message);
          localStorage.setItem("refernceId", response?.result?.ref_id);
          startResendTimer(); // Start the countdown timer
        }
      } else {
        toast.error("Please wait before resending the OTP.");
      }
    }
  };
  const verifyAadharOptHandle = async (otp) => {
    const refId = localStorage.getItem("refernceId");
    const formdata = new FormData();
    formdata.append("Otp", otp);
    formdata.append("RefId", refId);
    const response = await VerifyaadharotpApi.callApi(userId, formdata);
    if (response?.status === "VALID") {
      toast.success(response?.message);
      handleCloseReuseableModal();
      dispatch(fetchVendorProfile(userId));
    }
  };
  useEffect(() => {
    if (profile?.vendor?.termsAccepted === false) {
      handleOpen();
      console.log(
        profile?.vendor?.termsAccepted,
        "profile?.vendor?.termsAccepted"
      );
    }
  }, [profile?.vendor?.termsAccepted]);

  if (!profile)
    return <ErrorView status="loading" error={"Profile Details Not Found!"} />;

  return (
    <div className="min-h-screen bg-backgroundOffWhite pt-10 text-primary">
      {vendorDetails && (
        <div className="container mx-auto w-[95%] md:max-w-[80%] rounded-lg space-y-6">
          <BackButton />
          {/* Header Section */}
          <div
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 flex-wrap 
          border-borderPrimary border-[2px] p-4 rounded-md"
          >
            <div className="flex flex-row md:flex-1 items-center space-x-4">
              <div className="flex flex-col gap-2 justify-center items-center">
                {vendorDetails.profilePicture ? (
                  <img
                    src={`${imagesBaseUrl}${vendorDetails.profilePicture}`}
                    alt="Profile Picture"
                    className="w-20 h-20 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold">
                    {vendorDetails.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <button
                  className="hover:text-primary text-purpleSecondary font-bold"
                  onClick={() =>
                    handleOpenModal(
                      "Profile Picture",
                      formfields.vendorProfileDetails.profilePicture
                    )
                  }
                >
                  Edit Logo
                </button>
              </div>

              <div>
                <span className="flex items-center justify-centers gap-4">
                  <h1 className="text-xl font-bold">{vendorDetails?.name}</h1>
                  <button
                    className="hover:text-primary text-purpleSecondary font-semibold float-end"
                    onClick={() =>
                      handleOpenModal(
                        "Name",
                        formfields.vendorProfileDetails.name
                      )
                    }
                  >
                    <FaRegEdit className="text-xl" />
                  </button>
                </span>
                <p className="text-gray-500">
                  {vendorDetails?.location}, India
                </p>
              </div>
            </div>

            <div className="w-[2px] h-[120px] hidden md:flex bg-borderPrimary" />

            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Seller Bio</h2>
                <Button
                  className="flex justify-center items-center hover:bg-primary hover:text-white"
                  onClick={() =>
                    handleOpenModal(
                      "Bio",
                      formfields.vendorProfileDetails.bioDetails
                    )
                  }
                >
                  <FaRegEdit className="text-xl" />
                </Button>
              </div>
              <p className="text-gray-600">{vendorDetails.bio || "N/A"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 md:gap-6 lg:w-full">
            {/* Left Column */}
            <div className="lg:col-span-1 grid grid-cols-1 gap-6">
              {/* Personal Details */}
              <div className="bg-gray-50 rounded-lg p-4 shadow-sm border space-y-4 ">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">Personal Contact Info</h3>
                  <Button
                    className="flex justify-center items-center hover:bg-primary hover:text-white"
                    onClick={() =>
                      handleOpenModal(
                        "Personal Contact Info",
                        formfields.vendorProfileDetails.personalDetails
                      )
                    }
                  >
                    <FaRegEdit className="text-xl" />
                  </Button>
                </div>
                <ProfileFormGenerator
                  fields={
                    formfields.vendorProfileDetails.personalDetails.fields
                  }
                  defaultValues={personalDefaultValues}
                  editable={false}
                />
              </div>

              {/* Bank Details */}
              <div className="bg-gray-50 rounded-lg p-4 shadow-sm border space-y-4 ">
                <div className="flex justify-between items-center ">
                  <h3 className="font-bold text-lg">Bank Details</h3>
                  <Button
                    className="flex justify-center items-center hover:bg-primary hover:text-white"
                    onClick={() =>
                      handleOpenModal(
                        "Bank Details",
                        formfields.vendorProfileDetails.bankDetails
                      )
                    }
                  >
                    <FaRegEdit className="text-xl" />
                  </Button>
                </div>
                <ProfileFormGenerator
                  fields={formfields.vendorProfileDetails.bankDetails.fields}
                  defaultValues={bankDefaultValues}
                  editable={false}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-2">
              {/* Business Details */}
              <div className="bg-gray-50 rounded-lg p-4 shadow-sm border space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">Business Details</h3>
                  <Button
                    className="flex justify-center items-center hover:bg-primary hover:text-white"
                    onClick={() =>
                      handleOpenModal(
                        "Business Details",
                        formfields.vendorProfileDetails.businessDetails
                      )
                    }
                  >
                    <FaRegEdit className="text-xl" />
                  </Button>
                </div>
                <ProfileFormGenerator
                  fields={
                    formfields.vendorProfileDetails.businessDetails.fields
                  }
                  defaultValues={businessDefaultValues}
                  editable={false}
                  verifyDocs={verifyVendorDetailsWithCashfree}
                  getVerifyDetails={vendorDetails?.businessDetails}
                />
                {businessDefaultValues?.categoriesOfServices && (
                  <>
                    <div>
                      {vendorDetails?.businessDetails?.categoriesOfServices &&
                        //need to map the array expect the first element to be an array:
                        vendorDetails?.businessDetails?.categoriesOfServices
                          .length > 1 && (
                          <div className="mt-4">
                            <h3 className="font-bold text-lg">
                              Add Categories+
                            </h3>
                            {vendorDetails?.businessDetails
                              ?.categoriesOfServices &&
                              // map the array expect the first element to be an array:
                              vendorDetails?.businessDetails?.categoriesOfServices
                                .slice(1)
                                .map((category) => {
                                  // wrap the category into an array:
                                  // this is necessary because the SearchableCategoryAndSubcategoryDropdown expects an array of objects
                                  const categoryArray = [{ ...category }];
                                  return (
                                    <div
                                      key={category._id}
                                      className="flex items-center gap-2"
                                    >
                                      <SearchableCategoryAndSubcategoryDropdown
                                        defaultValues={categoryArray}
                                      />
                                    </div>
                                  );
                                })}
                          </div>
                        )}
                    </div>
                    <div className="flex justify-center">
                      <Button
                        className="hover:bg-primary hover:text-white flex flex-col "
                        onClick={() => {
                          handleOpenModal(
                            "Add New Category And Sub-Category",
                            formfields.vendorProfileDetails
                              .categoryAndSubCategory
                          );
                        }}
                      >
                        <h4 className=" text-4xl font-bold">+</h4>
                        <span>Add Category & Sub Category</span>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Documents Section */}
          {/* <DocumentUploader
            formfields={formfields.vendorProfileDetails.documents.fields}
            vendorDetails={vendorDetails.documents}
          /> */}
          <div className="w-full flex items-center justify-center">
            <button
              className="btn-primary px-2 w-fit"
              onClick={() => navigate(internalRoutes.vendorCreateservice)}
            >
              Add Service
            </button>
          </div>
          {/* Modal for Editing Section */}
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                width: "80%",
                maxHeight: "80vh",
                minHeight: "60vh",
                overflowY: "auto",
              }}
            >
              {activeSection && (
                <div>
                  <h2 className="font-bold text-lg mb-4">
                    Edit: {activeSection.name}
                  </h2>
                  <ProfileFormGenerator
                    fields={activeSection.fields}
                    defaultValues={generateDefaultValues(
                      getDefaultValuesForSection(activeSection),
                      activeSection.fields
                    )}
                    editable={true}
                    onSubmit={(data) => {
                      handleSubmit(data);
                    }}
                  />
                </div>
              )}
            </Box>
          </Modal>
        </div>
      )}
      <ReusableModal
        title={"Verify Aadhar"}
        open={openReuseableModal}
        onClose={handleCloseReuseableModal}
        width={"50%"}
      >
        <div className="flex flex-col h-full items-center justify-center ">
          <h1 className="text-2xl font-semibold mb-4 text-primary">
            Enter OTP
          </h1>
          <div className="flex gap-2 mb-4">
            {otp.map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          {errorOtp && <p className="text-red-500 text-sm mb-4">{errorOtp}</p>}
          <button
            onClick={handleOtpSubmit}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary focus:outline-none mb-4"
          >
            Submit
          </button>
          <button
            onClick={handleResendOtp}
            disabled={!canResend}
            className={`px-6 py-2 rounded-lg focus:outline-none ${
              canResend
                ? "bg-primary text-white hover:bg-primary"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            {canResend ? "Resend OTP" : `Resend in ${timer}s`}
          </button>
        </div>
      </ReusableModal>
      <TermsModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default React.memo(VendorProfile);
