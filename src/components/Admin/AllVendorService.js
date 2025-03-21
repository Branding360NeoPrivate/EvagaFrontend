import React, { useEffect, useState } from "react";
import TableComponet from "../../utils/TableComponet";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import useServices from "../../hooks/useServices";
import adminApi from "../../services/adminApi";
import useDebounce from "../../utils/useDebounce";
import adminActionsApi from "../../services/adminActionsApi";
import ReusableModal from "../Modal/Modal";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import apiClient from "../../services/apiClient";
import vendorApi from "../../services/vendorApi";
import { toast } from "react-toastify";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { formatDate } from "../../utils/formatDate";
import EditVendorService from "./EditVendorService";
import DateRangePicker from "../../utils/DateRangePicker";
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
function AllVendorService({ term }) {
  const [page, setPage] = useState(1);
  const [allService, setAllService] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [serviceAndPackageId, setServiceAndPackageId] = useState({
    serviceId: "",
    packageId: "",
  });
  const debounce = useDebounce(term);
  const GetAllVendorsPackageApi = useServices(
    adminActionsApi.GetAllVendorsPackage
  );
  const ArchiveVendorServiceApi = useServices(
    adminActionsApi.ArchiveVendorService
  );
  const DeleteVendorServiceApi = useServices(
    adminActionsApi.DeleteVendorService
  );
  const getOneServiceByid = useServices(vendorApi.getOnevendorService);
  const acceptOrRejectpackage = useServices(
    vendorApi.vendorAcceptOrRejectpackage
  );
  const [modalType, setModalType] = useState("delete");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const [packageCredentials, setpackageCredentials] = useState({
    serviceId: "",
    packageId: "",
    status: false,
    packageStatus: "",
    remarks: "",
  });
  const [sortvalue, setSortValue] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceValue, setServiceValue] = useState();
  const downloadVendorListing = useServices(
    adminActionsApi.downloadVendorListing
  );
  const downloadVendorListinghandle = async (fromDate, toDate) => {
    const queryParams = {
      fromDate: fromDate || "",
      toDate: toDate || "",
    };
    try {
      const response = await downloadVendorListing.callApi(queryParams); 
      if (response && response) {
        const blob = new Blob([response], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "vendors.csv"; // File name
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("No data received for CSV download");
      }
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const GetAllVendorsPackageApiHandle = async () => {
    const queryParams = {
      search: debounce || "",
      page: page || 1,
      sortOrder: sortvalue || "asc",
    };
    const response = await GetAllVendorsPackageApi.callApi(queryParams);

    setAllService(response ? response?.data : []);
    setTotalPages(response ? response?.totalPages : null);
  };
  const ArchiveVendorServiceApiHandle = async (serviceId, PackageId) => {
    const response = await ArchiveVendorServiceApi.callApi(
      serviceId,
      PackageId
    );

    GetAllVendorsPackageApiHandle();
    handleClose();
  };
  const DeleteVendorServiceApiHandle = async (serviceId, PackageId) => {
    const response = await DeleteVendorServiceApi.callApi(serviceId, PackageId);
    handleClose();
    GetAllVendorsPackageApiHandle();
  };
  useEffect(() => {
    GetAllVendorsPackageApiHandle();
  }, [page, debounce]);
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
    formData.append("status", status);
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
          <ul className="list-disc pl-6 flex items-center justify-center gap-8">
            {value.map((item, index) => (
              <li key={index}>
                {imageKeys?.includes(key) && typeof item === "string" ? (
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
                ) : videoKeys?.includes(key) && typeof item === "string" ? (
                  <video
                    controls
                    src={process.env.REACT_APP_API_Aws_Image_BASE_URL + item}
                    alt={`${key} ${index + 1}`}
                    style={{ width: "15rem", margin: "10px 0" }}
                    loading="lazy"
                  />
                ) : typeof item === "object" && item !== null ? (
                  Object?.entries(item)?.map(([subKey, subValue]) =>
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

    if (typeof value === "object" && value !== null) {
      console.log("Processing object:", key, value);
      return (
        <div key={key} className="text-primary">
          <Typography variant="h6" component="div">
            <strong>{key}:</strong>
          </Typography>
          <div className="pl-4">
            {Object.entries(value).map(([subKey, subValue]) => (
              <div
                key={subKey}
                style={{ marginBottom: "10px" }}
                className="text-primary"
              >
                {typeof subValue === "object" && subValue !== null ? (
                  renderValue(subKey, subValue)
                ) : (
                  <Typography
                    variant="body2"
                    component="div"
                    className="text-textGray"
                  >
                    <strong className="text-primary">{subKey}:</strong>{" "}
                    {subValue}
                  </Typography>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return imageKeys?.includes(key) ? (
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
  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Vendor UserName",
      key: "userName",
      render: (row) => row?.vendorName,
    },
    {
      label: "Name of Service",
      key: "Title",
      render: (row) =>
        row?.services?.values?.Title ||
        row?.services?.values?.FoodTruckName ||
        row?.services?.values?.VenueName,
    },
    {
      label: "Category",
      key: "categoryName",
      render: (row) => row?.categoryName,
    },
    { label: "Sku Code", key: "forType", render: (row) => row?.services.sku },

    {
      label: "Status",
      key: "packageStatus",
      render: (row) => row?.services.packageStatus,
    },
    {
      label: "Action",
      key: "interests",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => [handleOpen2(), handleGetOneServiceWithId(row._id)]}
          >
            View
          </button>
          <CiEdit
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpen(),
              setModalType("editService"),
              setpackageCredentials({
                ...packageCredentials,
                serviceId: row?._id,
              }),
            ]}
          />
          <MdOutlineDelete
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpen3(),
              setModalType("delete"),
              setServiceAndPackageId({
                ...serviceAndPackageId,
                serviceId: row?._id,
                packageId: row?.services?._id,
              }),
            ]}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      {" "}
      <div className="flex gap-4 items-center justify-end">
        <button
          onClick={() => [handleOpen3(), setModalType("download")]}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-highlightYellowPrimary hover:text-primary"
        >
          Download
        </button>
      </div>
      <TableComponetWithApi
        columns={columns}
        data={allService}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open2}>
          <Box sx={style} className="w-[90%] sm:w-[80%]">
            <div className="flex items-center justify-center flex-col w-full p-4 gap-2">
              <span
                className="w-full flex items-center justify-end text-textGray text-2xl cursor-pointer"
                onClick={() => [handleClose2()]}
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
        open={open}
        onClose={handleClose}
        title={modalType === "delete" ? "Delete Service" : ""}
      >
        {modalType === "editService" && (
          <EditVendorService serviceId={packageCredentials?.serviceId} />
        )}
      </ReusableModal>{" "}
      <ReusableModal
        open={open3}
        onClose={handleClose3}
        title={modalType === "delete" ? "Delete Service" : "Download Report"}
        width={"50%"}
      >
        {modalType === "delete" && (
          <div className="flex items-center justify-center gap-3">
            <button
              className="btn-primary w-fit px-2"
              onClick={() =>
                ArchiveVendorServiceApiHandle(
                  serviceAndPackageId?.serviceId,
                  serviceAndPackageId?.packageId
                )
              }
            >
              Archive
            </button>
            <button
              className="btn-primary w-fit px-2"
              onClick={() =>
                DeleteVendorServiceApiHandle(
                  serviceAndPackageId?.serviceId,
                  serviceAndPackageId?.packageId
                )
              }
            >
              Permanent Delete
            </button>
          </div>
        )}
        {modalType === "download" && (
          <div className="w-full flex items-center justify-center">
            <DateRangePicker onSearch={downloadVendorListinghandle} />
          </div>
        )}
      </ReusableModal>
    </div>
  );
}

export default AllVendorService;
