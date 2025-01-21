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

const AdminVendorProfileViewer = ({ vendorId }) => {
  const [currentVendorId, setCurrentVendorId] = useState(null);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.vendor);
  const { categories, subCategories, status, error } = useSelector(
    (state) => state.category
  );

  const imagesBaseUrl = process.env.REACT_APP_API_Image_BASE_URL;

  const [vendorDetails, setVendorDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

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
    dispatch(fetchVendorProfile(vendorId)); // Fetch updated vendor details
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

  if (!profile)
    return <ErrorView status="loading" error={"Profile Details Not Found!"} />;

  return (
    <div className="min-h-screen bg-backgroundOffWhite pt-10 text-primary">
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
                </div>
                <ProfileFormGenerator
                  fields={
                    formfields.vendorProfileDetails.businessDetails.fields
                  }
                  defaultValues={businessDefaultValues}
                  editable={false}
                />
                <div>
                  {vendorDetails?.businessDetails?.categoriesOfServices &&
                    vendorDetails?.businessDetails?.categoriesOfServices
                      .length > 1 && (
                      <div className="mt-4">
                        <h3 className="font-bold text-lg">Categories</h3>
                        {vendorDetails?.businessDetails?.categoriesOfServices &&
                          vendorDetails?.businessDetails?.categoriesOfServices
                            .slice(1)
                            .map((category) => {
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
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <AdminVendorDocumentsVerification
            documents={vendorDetails.documents}
            onDocumentVerified={handleDocumentVerified}
          />

          {/* Modal for Viewing Section */}
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
                    View: {activeSection.name}
                  </h2>
                  <ProfileFormGenerator
                    fields={activeSection.fields}
                    defaultValues={generateDefaultValues(
                      getDefaultValuesForSection(activeSection),
                      activeSection.fields
                    )}
                    editable={false}
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
