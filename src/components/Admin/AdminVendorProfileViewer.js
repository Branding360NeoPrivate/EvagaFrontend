import React, { useEffect, useMemo, useState } from "react";
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
import AdminVendorDocumentsVerification from "../../components/Admin/AdminVendorDocumentsVerification";
import adminActionsApi from "../../services/adminActionsApi";
import DocumentUploader from "../Forms/DocumentUploader";
import { IoMdArrowRoundBack } from "react-icons/io";

const AdminVendorProfileViewer = ({ vendorId, onMenuSelect }) => {
  const [currentVendorId, setCurrentVendorId] = useState(null);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.vendor);
  const { categories, subCategories, status, error } = useSelector(
    (state) => state.category
  );

  const imagesBaseUrl = process.env.REACT_APP_API_Aws_Image_BASE_URL;

  const [vendorDetails, setVendorDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const updateProfileService = useServices(
    adminActionsApi.updateVendorProfileUpdateByAdmin
  );
  const updateBankDetailsService = useServices(
    adminActionsApi.updateVendorBankDetailsByAdmin
  );
  const updateBusinessService = useServices(
    adminActionsApi.updateVendorBusinessDetailsByAdmin
  );
  const updateBioService = useServices(
    adminActionsApi.updateVendorBioUpdateByAdmin
  );
  const updateProfilePictureService = useServices(
    adminActionsApi.updateVendorProfilePicUpdateByAdmin
  );
  const verifyVendorprofileByAdminApi = useServices(
    adminActionsApi.verifyVendorprofileByAdmin
  );

  useEffect(() => {
    if (vendorId !== currentVendorId) {
      setCurrentVendorId(vendorId);
      dispatch(fetchVendorProfile(vendorId));
      dispatch(fetchCategories());
    }
  }, [vendorId, profile, dispatch]);

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

  const handleDocumentVerified = () => {
    dispatch(fetchVendorProfile(vendorId));
  };

  const handleUpdateProfile = async (data) => {
    try {
      const response = await updateProfileService.callApi(vendorId, data);
      toast.success("Profile updated successfully!");
      dispatch(fetchVendorProfile(vendorId));
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleUpdateBankDetails = async (data) => {
    try {
      const userId = Cookies.get("userId");
      const response = await updateBankDetailsService.callApi(vendorId, data);
      toast.success("Bank details updated successfully!");
      dispatch(fetchVendorProfile(vendorId));
    } catch (error) {
      toast.error("Failed to update bank details. Please try again.");
    }
  };

  const handleUpdateBusiness = async (data) => {
    try {
      console.log(data);

      await updateBusinessService.callApi(vendorId, data);
      toast.success("Business details updated successfully!");
      dispatch(fetchVendorProfile(vendorId)); // Refresh profile data
    } catch (error) {
      toast.error("Failed to update business details. Please try again.");
    }
  };

  const handleAddNewCategoryAndSubCategory = async (data) => {
    try {
      const businessId = vendorDetails?.businessDetails?._id;
      await vendorApi.addNewCategoryBusiness(businessId, data);
      toast.success("New category and subcategory added successfully!");
      dispatch(fetchVendorProfile(vendorId)); // Refresh profile data
    } catch (error) {
      toast.error(
        "Failed to add new category and subcategory. Please try again."
      );
    }
  };

  const handleUpdateBio = async (bio) => {
    try {
      const userId = Cookies.get("userId");
      await updateBioService.callApi(vendorId, bio);
      toast.success("Bio updated successfully!");
      dispatch(fetchVendorProfile(vendorId)); // Refresh profile data
    } catch (error) {
      toast.error("Failed to update bio. Please try again.");
    }
  };
  const handleUpdateName = async (name) => {
    try {
      const userId = Cookies.get("userId");
      await updateProfileService.callApi(vendorId, name);
      toast.success("Bio updated successfully!");
      dispatch(fetchVendorProfile(vendorId));
    } catch (error) {
      toast.error("Failed to update bio. Please try again.");
    }
  };
  const handleUpdateProfilePicture = async (data) => {
    try {
      console.log(data);

      const profilePic = data.profilePicture[0];
      console.log("imageFile:", profilePic);
      const formData = new FormData();
      formData.append("profilePic", profilePic);
      await updateProfilePictureService.callApi(vendorId, formData);
      toast.success("Profile picture updated successfully!");
      dispatch(fetchVendorProfile(vendorId));
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
  const handleverifyVendorprofileByAdmin = async () => {
    const response = await verifyVendorprofileByAdminApi.callApi(vendorId);
    dispatch(fetchVendorProfile(vendorId));
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

  if (!profile)
    return <ErrorView status="loading" error={"Profile Details Not Found!"} />;

  return (
    <div className="min-h-screen bg-backgroundOffWhite pt-10 text-primary">
      <button
        onClick={() => onMenuSelect("Vendor")}
        className="flex items-center justfiy-center gap-1 text-textGray font-medium p-1 text-base"
      >
        <IoMdArrowRoundBack /> back
      </button>
      {vendorDetails && (
        <div className="container mx-auto w-full rounded-lg space-y-6">
          {/* Header Section */}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-5 flex-wrap 
          border-borderPrimary border-[2px] p-4 rounded-md"
          >
            <div className="flex flex-1 items-center space-x-4">
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

          {/* Main Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 lg:w-full">
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
            <div className="lg:col-span-2">
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
                  getVerifyDetails={vendorDetails?.businessDetails}
                />
                {businessDefaultValues?.categoriesOfServices && (
                  <>
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
                <div className="w-full">
                  {vendorDetails?.businessDetails?.categoriesOfServices &&
                    vendorDetails?.businessDetails?.categoriesOfServices
                      .length > 1 && (
                      <div className="mt-4 w-full">
                        <h3 className="font-bold text-lg">Categories</h3>
                        {vendorDetails?.businessDetails?.categoriesOfServices &&
                          vendorDetails?.businessDetails?.categoriesOfServices
                            .slice(1)
                            .map((category) => {
                              const categoryArray = [{ ...category }];
                              return (
                                <div
                                  key={category._id}
                                  className="flex items-center gap-2 w-full"
                                >
                                  <SearchableCategoryAndSubcategoryDropdown
                                    defaultValues={categoryArray}
                                    width={"full"}
                                  />
                                </div>
                              );
                            })}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 px-4">
            <span className="flex items-center justify-center gap-2">
              <h3 className="text-normal font-medium">
                Terms And Condition Status
              </h3>
              <p className="text-textGray">
                {vendorDetails?.termsAccepted ? "Accepted" : "Not Accepted"}
              </p>
            </span>
            <span className="flex items-center justify-center gap-2">
              <h3 className="text-normal font-medium">
                Terms And Condition Accepted Time
              </h3>
              <p className="text-textGray">
                {vendorDetails?.termsAcceptedAt
                  ? new Date(vendorDetails.termsAcceptedAt).toLocaleString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      }
                    )
                  : "N/A"}
              </p>
            </span>
          </div>

          {/* <DocumentUploader
            formfields={formfields.vendorProfileDetails.documents.fields}
            vendorDetails={vendorDetails.documents}
            vendorId={vendorId}
          /> */}
          {/* Documents Section */}
          <AdminVendorDocumentsVerification
            documents={vendorDetails.documents}
            onDocumentVerified={handleDocumentVerified}
          />

          <div className="w-full flex items-center justify-center px-2 py-2">
            {!profile?.vendor?.verificationStatus ? (
              <button
                className="btn-primary w-fit px-2"
                onClick={handleverifyVendorprofileByAdmin}
              >
                Verify Vendor
              </button>
            ) : (
              <p>Vendor is Verified</p>
            )}
          </div>
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
    </div>
  );
};

export default React.memo(AdminVendorProfileViewer);
