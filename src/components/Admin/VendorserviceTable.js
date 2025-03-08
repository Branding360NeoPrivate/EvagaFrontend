import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaFilter, FaSort } from "react-icons/fa";
import vendorApi from "../../services/vendorApi";
import useServices from "../../hooks/useServices";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import apiClient from "../../services/apiClient";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import ReusableModal from "../Modal/Modal";
import EditVendorService from "./EditVendorService";
import { IoMdArrowRoundBack, IoMdCloseCircleOutline } from "react-icons/io";
import { formatDate } from "../../utils/formatDate";
function VendorserviceTable({
  onMenuSelect,
  selectedVendor,
  setSelectedVendor,
  vendorId,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid transparent",
    boxShadow: 24,
    p: 4,
    outline: "none",
    height: "90%",
    borderRadius: "5px",
    overflowY: "scroll",
  };
  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid transparent",
    boxShadow: 24,
    p: 4,
    outline: "none",
    borderRadius: "5px",
  };
  const dispatch = useDispatch();
  const [packageCredentials, setpackageCredentials] = useState({
    serviceId: "",
    packageId: "",
    status: false,
    packageStatus: "Pending",
    remarks: "",
  });
  const [vendorAllService, setVendorAllService] = useState();
  const { vendors, totalNumberOfVendors, status, error } = useSelector(
    (state) => state.adminActions
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getAllVendorService = useServices(vendorApi.getvendorAllService);
  const getAllVendorServiceHandle = async (userId) => {
    const response = await getAllVendorService.callApi(userId);
    setVendorAllService(response?.services);
  };
  const getOneServiceByid = useServices(vendorApi.getOnevendorService);
  const acceptOrRejectpackage = useServices(
    vendorApi.vendorAcceptOrRejectpackage
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [openResuableModal, setOpenResuableModal] = useState(false);
  const handleOpenResuableModal = () => {
    setOpenResuableModal(true);
  };
  const handleCloseResuableModal = () => {
    setOpenResuableModal(false);
  };
  const [serviceValue, setServiceValue] = useState();
  const handleGetOneServiceWithId = async (serviceId) => {
    const response = await getOneServiceByid.callApi(serviceId);
    setServiceValue(response && response);
    setpackageCredentials({
      ...packageCredentials,
      serviceId: response?._id,
    });
    console.log(response, "response");
  };
  const handleAccpetorRejectpackage = async (status, packageStatus) => {
    const formData = new FormData();
    formData.append("status", Boolean(status));
    formData.append("packageStatus", packageStatus);
    formData.append("remarks", packageCredentials.remarks);
    try {
      const response = await apiClient.post(
        `/vender/createService/verify-one-service/${packageCredentials.serviceId}/${packageCredentials.packageId}`,
        formData
      );
      handleClose1();
      toast.success("Package Status updated successfully");
      handleGetOneServiceWithId(packageCredentials?.serviceId);
    } catch (error) {
      console.error("Error in API Call:", error);
      toast.warning("Package Verification Failure");
    }
  };

  useEffect(() => {
    if (vendorId) {
      getAllVendorServiceHandle(vendorId);
    }
  }, [vendorId]);

  // Open modal with vendor details
  const handleViewDetails = (vendor) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVendor(null);
  };
  const renderValue = (key, value) => {
    const imageKeys = [
      "CoverImage",
      "RecceReport",
      "FloorPlan",
      "ProductImage",
      "Certifications",
      "photos",
    ];
    const videoKeys = ["3DTour", "videos"];

    if (key === "Portfolio" && typeof value === "object" && value !== null) {
      return (
        <div key={key}>
          <Typography
            variant="h6"
            component="div"
            style={{ marginTop: "20px" }}
          >
            <strong className="text-primary text-xl">{key}:</strong>
          </Typography>
          <div className="pl-4">
            {value.photos && (
              <div>
                <Typography variant="subtitle1" component="div">
                  <strong className="text-primary">Photos:</strong>
                </Typography>
                <div className="flex flex-wrap gap-4">
                  {value.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={process.env.REACT_APP_API_Aws_Image_BASE_URL + photo}
                      alt={`Portfolio Photo ${index + 1}`}
                      style={{
                        height: "15rem",
                        margin: "10px 0",
                        objectFit: "contain",
                      }}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            )}
            {value.videos && (
              <div>
                <Typography variant="subtitle1" component="div">
                  <strong className="text-primary">Videos:</strong>
                </Typography>
                <div className="flex flex-wrap gap-4">
                  {value.videos.map((video, index) => (
                    <video
                      key={index}
                      controls
                      src={process.env.REACT_APP_API_Aws_Image_BASE_URL + video}
                      style={{ width: "15rem", margin: "10px 0" }}
                      loading="lazy"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Handle arrays
    if (Array.isArray(value)) {
      return (
        <div key={key}>
          {key && (
            <Typography
              variant="h6"
              component="div"
              style={{ marginTop: "20px" }}
            >
              <strong className="text-primary text-xl">{key}:</strong>
            </Typography>
          )}
          <ul className="list-disc pl-6 flex items-center justify-center  gap-8">
            {value.map((item, index) => (
              <li key={index}>
                {imageKeys.includes(key) && typeof item === "string" ? (
                  <img
                    src={process.env.REACT_APP_API_Aws_Image_BASE_URL + item}
                    alt={`${key} ${index + 1}`}
                    style={{
                      height: "15rem",
                      margin: "10px 0",
                      objectFit: "contain",
                    }}
                    loading="lazy"
                  />
                ) : videoKeys.includes(key) && typeof item === "string" ? (
                  <video
                    controls
                    src={process.env.REACT_APP_API_Aws_Image_BASE_URL + item}
                    alt={`${key} ${index + 1}`}
                    style={{ width: "15rem", margin: "10px 0" }}
                    loading="lazy"
                  />
                ) : typeof item === "object" && item !== null ? (
                  Object.entries(item).map(([subKey, subValue]) =>
                    renderValue(subKey, subValue)
                  )
                ) : (
                  <Typography variant="body2" component="div">
                    {item}
                  </Typography>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    // Handle objects
    if (typeof value === "object" && value !== null) {
      return (
        <div key={key}>
          <Typography variant="h6" component="div">
            <strong>{key}:</strong>
          </Typography>
          <div className="pl-4">
            {Object.entries(value).map(([subKey, subValue]) => (
              <div key={subKey} style={{ marginBottom: "10px" }}>
                <Typography variant="body2" component="div">
                  <strong>{subKey}:</strong> {subValue}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Handle single values
    return imageKeys.includes(key) ? (
      <img
        src={process.env.REACT_APP_API_Aws_Image_BASE_URL + value}
        alt={key}
        style={{ height: "15rem", margin: "10px 0", objectFit: "contain" }}
        loading="lazy"
      />
    ) : videoKeys.includes(key) ? (
      <video
        controls
        src={process.env.REACT_APP_API_Aws_Image_BASE_URL + value}
        alt={key}
        style={{ width: "15rem", margin: "10px 0" }}
      />
    ) : value ? (
      <Typography
        variant="body2"
        component="div"
        key={key}
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          gap: "0.5em",
        }}
      >
        <strong className="text-primary text-xl">{key}:</strong>{" "}
        <p className="text-textGray text-base font-semibold">{value}</p>
      </Typography>
    ) : null;
  };

  if (status === "loading") {
    return <div className="text-center py-10">Loading vendor data...</div>;
  }

  if (status === "failed") {
    return <div className="text-center py-10">Error: {error}</div>;
  }

  return (
    <div className="w-full px-6 py-4 bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <button
        onClick={() => onMenuSelect("Vendor")}
        className="flex items-center justfiy-center gap-1 text-textGray font-medium"
      >
        <IoMdArrowRoundBack /> back
      </button>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Vendor Services</h2>
        <div className="flex gap-4 items-center">
          <button
            className="flex items-center gap-2 bg-primary
         text-white px-4 py-2 rounded-lg hover:bg-highlightYellowPrimary hover:text-primary"
          >
            <FaFilter />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-highlightYellowPrimary hover:text-primary">
            <FaSort />
            Sort By
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full ">
          <thead className="  ">
            <tr className="bg-primary text-white">
              <th className=" font-normal  px-4 py-2 rounded-s-md">No</th>
              <th className="font-normal px-4 py-2">Name of Service</th>
              <th className="font-normal px-4 py-2">Category</th>
              <th className="font-normal px-4 py-2">Sub Category</th>
              <th className="font-normal px-4 py-2">No. of Packages</th>
              <th className="font-normal px-4 py-2">Years Of Experince</th>
              <th className="font-normal px-4 py-2 rounded-e-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendorAllService?.map((vendor, index) => (
              <tr key={index} className="text-center">
                <td className="  px-4 py-2">{index + 1}</td>
                <td className="  px-4 py-2">
                  {vendor.services?.[0]?.values?.Title ||
                    vendor.services?.[0]?.values?.FoodTruckName ||
                    vendor.services?.[0]?.values?.VenueName}
                </td>
                <td className="  px-4 py-2">{vendor?.Category?.name}</td>
                <td
                  className={`  px-4 py-2 font-medium ${
                    vendor.profileCompletion === 100
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {vendor?.SubCategory?.name}
                </td>
                <td className="  px-4 py-2">{vendor.services?.length}</td>
                <td className="  px-4 py-2">{vendor.YearofExperience}</td>
                <td className=" flex items-center justfiy-center gap-2 px-4 py-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => [
                      handleOpen(),
                      handleGetOneServiceWithId(vendor._id),
                    ]}
                  >
                    View
                  </button>
                  <CiEdit
                    className="text-xl font-medium cursor-pointer"
                    onClick={() => [
                      handleOpenResuableModal(),
                      setpackageCredentials({
                        ...packageCredentials,
                        serviceId: vendor?._id,
                      }),
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="w-[90%] sm:w-[80%]">
            <div className="flex items-center justify-center flex-col w-full p-4 gap-2">
              <span
                className="w-full flex items-center justify-end text-textGray text-2xl cursor-pointer"
                onClick={handleClose}
              >
                <IoMdCloseCircleOutline className="float-right" />
              </span>
              <div className="flex items-center justify-center  gap-4 w-full">
                <span
                  className="flex items-center justify-start gap-2 w-full"
                  style={{ flex: "0.5" }}
                >
                  <h3 className="text-primary font-bold text-xl">Category :</h3>
                  <p className="text-textGray">
                    {serviceValue?.Category?.name}
                  </p>
                </span>
                <span
                  className="flex items-center justify-start gap-2 w-full"
                  style={{ flex: "0.5" }}
                >
                  <h3 className="text-primary font-bold text-xl">
                    Sub Category :
                  </h3>
                  <p className="text-textGray">
                    {serviceValue?.SubCategory?.name}
                  </p>
                </span>
              </div>{" "}
              <div className="flex items-center justify-center  gap-4 w-full">
                <span
                  className="flex items-center justify-start gap-2 w-full"
                  style={{ flex: "0.5" }}
                >
                  <h3 className="text-primary font-bold text-xl">
                    About The Service :
                  </h3>
                  <p className="text-textGray">
                    {serviceValue?.AbouttheService}
                  </p>
                </span>
                <span
                  className="flex items-center justify-start gap-2 w-full"
                  style={{ flex: "0.5" }}
                >
                  <h3 className="text-primary font-bold text-xl">
                    Years Of Experince :
                  </h3>
                  <p className="text-textGray">
                    {serviceValue?.YearofExperience}
                  </p>
                </span>
              </div>
              <div className="flex items-center justify-start  gap-4 w-full">
                <span
                  className="flex items-center justify-start gap-2 w-full"
                  style={{ flex: "0.5" }}
                >
                  <h3 className="text-primary font-bold text-xl">
                    Created At :
                  </h3>
                  <p className="text-textGray">
                    {formatDate(serviceValue?.createdAt)}
                  </p>
                </span>
                <span
                  className="flex items-center justify-start gap-2 w-full"
                  style={{ flex: "0.5" }}
                >
                  <h3 className="text-primary font-bold text-xl">
                    No Of Package :
                  </h3>
                  <p className="text-textGray">
                    {serviceValue?.services?.length}
                  </p>
                </span>
              </div>
              {serviceValue?.services?.map((service, index) => (
                <div className="w-full flex items-center justify-start flex-col gap-1">
                  <h3 className="text-primary font-bold text-xl w-full flex items-center gap-1">
                    Package No:
                    <p className="text-textGray font-semibold">{index + 1}</p>
                  </h3>{" "}
                  <h3 className="text-primary font-bold text-xl w-full flex items-center gap-1">
                    SKU CODE:
                    <p className="text-textGray font-semibold">
                      {service?.sku}
                    </p>
                  </h3>
                  <div className="w-full flex items-start justify-start flex-col">
                    {/* {service?.values?.map((item)=>({item}))} */}

                    {Object.entries(service?.values).map(([key, value]) =>
                      renderValue(key, value)
                    )}
                  </div>
                  {service?.status === false ? (
                    <div className="flex items-center justify-center w-full gap-2">
                      <button
                        className="btn-primary w-fit px-2"
                        onClick={() => [
                          handleOpen1(),
                          setpackageCredentials({
                            ...packageCredentials,
                            packageId: service?._id,
                          }),
                        ]}
                      >
                        Approve/Reject The Service{" "}
                      </button>
                    </div>
                  ) : (
                    <p className="text-primary text-xl font-semibold">
                      Service Is Already verified
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open1}>
          <Box sx={style1} className="w-[80%] sm:w-[30%]">
            <Typography id="spring-modal-title" variant="h6" component="h2">
              Approve/Reject The Service
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              <form className="w-full flex items-center justify-start flex-col gap-2">
                <textarea
                  rows={2}
                  placeholder="Remark Or Reason (optional)"
                  className="w-full border-text-textGray border-2 pl-2 pt-1 outline-none rounded-md"
                  onChange={(e) =>
                    setpackageCredentials({
                      ...packageCredentials,
                      remarks: e.target.value,
                    })
                  }
                />
                <div className="w-full flex items-center justify-center gap-2">
                  <button
                    className="btn-primary w-fit px-2 py-1"
                    onClick={(e) => [
                      e.preventDefault(),
                      setpackageCredentials({
                        ...packageCredentials,
                        status: true,
                      }),
                      handleAccpetorRejectpackage(true, "Verified"),
                    ]}
                  >
                    Accept
                  </button>
                  <button
                    className="px-2 py-1 bg-[#B71C1C] text-white rounded-md hover:bg-[#C62828] font-bold w-fit"
                    onClick={(e) => [
                      e.preventDefault(),
                      setpackageCredentials({
                        ...packageCredentials,
                        status: false,
                      }),
                      handleAccpetorRejectpackage(false, "Rejected"),
                    ]}
                  >
                    Reject
                  </button>
                </div>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <ReusableModal
        open={openResuableModal}
        onClose={handleCloseResuableModal}
        width={"90%"}
        title={"Edit Service"}
      >
        <EditVendorService serviceId={packageCredentials?.serviceId} />
      </ReusableModal>
    </div>
  );
}

export default VendorserviceTable;
