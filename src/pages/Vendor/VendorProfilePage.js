import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorProfile } from "../../context/redux/slices/vendorSlice";
import Cookies from "js-cookie";
import ErrorView from "../../components/Errors/ErrorView";
import ProfileFormGenerator from "../../components/Forms/ProfileFormGenerator";
import generateDefaultValues from "../../utils/generateDefaultvalues";
import { Modal, Box, Button, IconButton } from "@mui/material";
import formfields from "../../utils/formFields";
import DocumentUploader from "../../components/Forms/DocumentUploader";
import { FaRegEdit } from "react-icons/fa";
import useServices from "../../hooks/useServices";
import vendorApi from "../../services/vendorApi";
import { toast } from "react-toastify";
import { fetchCategories } from "../../context/redux/slices/categorySlice";
import SearchableCategoryAndSubcategoryDropdown from "../../components/Inputs/SearchableCategoryAndSubcategoryDropdown";
import { showLoader } from "../../context/redux/slices/loaderSlice";
import TermsModal from "../../components/Modal/TermsModal ";
import { IoIosCloseCircleOutline } from "react-icons/io";

const VendorProfile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.vendor);
  const { categories, subCategories, status, error } = useSelector(
    (state) => state.category
  );
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const imagesBaseUrl = process.env.REACT_APP_API_Image_BASE_URL;

  const [vendorDetails, setVendorDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  // console.log("profile in vendor profile:", profile);
  // console.log("categories in vendor profile:", categories);

  // Initialize API services
  const updateProfileService = useServices(vendorApi.updateProfile);
  const updateBankDetailsService = useServices(vendorApi.updateBankDetails);
  const updateBusinessService = useServices(vendorApi.updateBusiness);
  const updateBioService = useServices(vendorApi.updateBio);
  const updateProfilePictureService = useServices(
    vendorApi.updateProfilePicture
  );

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

  // console.log("vendorDetails in vendor profile:", vendorDetails);
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
                <h1 className="text-xl font-bold">{vendorDetails?.name}</h1>
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
                              Add Categories +
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
                                      className="flex items-center gap-2 mb-14 w-[300px] md:w-auto"
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
          <DocumentUploader
            formfields={formfields.vendorProfileDetails.documents.fields}
            vendorDetails={vendorDetails.documents}
          />

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
                minWidth: "80%",
                maxHeight: "80vh",
                minHeight: "20vh",
                overflowY: "auto",
              }}
            >
              <div className=" relative">
                <div
                  className=" w-fit h-fit absolute top-[-30px] right-[-30px] cursor-pointer"
                  onClick={handleCloseModal}
                >
                  {/* Close button on top right corner */}
                  <IconButton>
                    <IoIosCloseCircleOutline></IoIosCloseCircleOutline>{" "}
                  </IconButton>
                </div>

                {activeSection && (
                  <div>
                    <h2 className="font-bold text-lg mb-4 text-primary">
                      Edit {activeSection.name}
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
              </div>
            </Box>
          </Modal>
        </div>
      )}
      <TermsModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default React.memo(VendorProfile);
