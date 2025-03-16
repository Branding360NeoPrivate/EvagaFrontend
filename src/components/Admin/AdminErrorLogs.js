import React, { useEffect, useState } from "react";
import useServices from "../../hooks/useServices";
import adminActionsApi from "../../services/adminActionsApi";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import { CiEdit, CiViewBoard } from "react-icons/ci";
import ReusableModal from "../Modal/Modal";
function AdminErrorLogs() {
  const [page, setPage] = useState(1);
  const [errorLogs, setErrorLogs] = useState(null);
  const [allErrorLogs, setAllErrorLogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [modalType, setModalType] = useState("add");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const getAllErrorLogsApi = useServices(adminActionsApi.getAllErrorLogs);
  const getOneErrorApi = useServices(adminActionsApi.getOneError);
  const getAllErrorLogsApiHandle = async () => {
    const queryParams = {
      // search: debounce || "",
      page: page || 1,
      // sortOrder: sortvalue || "asc",
    };
    const response = await getAllErrorLogsApi.callApi(queryParams);
    setAllErrorLogs(response ? response?.logs : []);
    setTotalPages(response ? response?.totalPages : 1);
    console.log(response);
  };
  const getOneErrorApiHandle = async (id) => {
    const response = await getOneErrorApi.callApi(id);
    setErrorLogs(response ? response : null);
  };
  useEffect(() => {
    getAllErrorLogsApiHandle();
  }, [page]);
  const renderTimestamp = (row) => {
    // Check if the timestamp exists
    if (!row?.timestamp) return "N/A"; // Fallback if timestamp is missing
  
    // Convert the timestamp to a human-readable format
    const date = new Date(row.timestamp);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };
  
    return date.toLocaleString('en-US', options);
  };
  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Error Type",
      key: "type",
    },
    {
      label: "Message",
      key: "message",
    },
    {
      label: "Date & Time",
      key: "timestamp",
      render:(row)=> renderTimestamp(row),
    },

    {
      label: "Action",
      key: "interests",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <CiViewBoard
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpen(),
              setModalType("view"),
              getOneErrorApiHandle(row?._id),
            ]}
          />
          {/* <MdOutlineDelete
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpen(),
              setModalType("delete"),
              setNewsletterId(row?._id),
            ]}
          /> */}
        </div>
      ),
    },
  ];
  return (
    <div>
      {" "}
      <TableComponetWithApi
        columns={columns}
        data={allErrorLogs}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
      <ReusableModal
        open={open}
        onClose={handleClose}
        title={modalType === "view" ? "View Error" : ""}
        width={"50%"}
      >
        {modalType === "view" && (
          <div className="p-4 bg-gray-100 ">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Error Logs
            </h1>
            <div className="space-y-4">
              <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700">
                  {errorLogs?.type || "Unknown Error Type"}
                </h2>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Message:</span>{" "}
                  {errorLogs?.message || "N/A"}
                </p>
                {errorLogs?.source && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Source:</span>{" "}
                    {errorLogs.source}
                  </p>
                )}
                {(errorLogs?.lineno || errorLogs?.colno) && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Line/Column:</span>{" "}
                    {errorLogs?.lineno || "N/A"} / {errorLogs?.colno || "N/A"}
                  </p>
                )}
                {errorLogs?.error && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Error Details:</span>{" "}
                    {errorLogs.error}
                  </p>
                )}
                {errorLogs?.url && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">URL:</span> {errorLogs.url}
                  </p>
                )}
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Timestamp:</span>{" "}
                  {new Date(errorLogs?.timestamp).toLocaleString() || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </ReusableModal>
    </div>
  );
}

export default AdminErrorLogs;
