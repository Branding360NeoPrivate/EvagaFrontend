import React, { useEffect, useState } from "react";
import TableComponet from "../../utils/TableComponet";
import { useDispatch } from "react-redux";
import useServices from "../../hooks/useServices";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit, CiViewBoard } from "react-icons/ci";
import adminActionsApi from "../../services/adminActionsApi";
import { formatDate } from "../../utils/formatDate";
import commonApis from "../../services/commonApis";
import ReusableModal from "../Modal/Modal";
function VendorQueryTable() {
  const [page, setPage] = useState(1);
  const GetallqueryApi = useServices(commonApis.Getallquery);
  const GetOneQueriesApi = useServices(commonApis.GetOneQueries);
  const [allQuery, setAllQuery] = useState([]);
  const [oneQuery, setOneQuery] = useState(null);
  const [modalType, setModalType] = useState("view");
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const getAllQueryHandle = async () => {
    const response = await GetallqueryApi.callApi("Venders");
    setAllQuery(response ? response?.queries : []);
  };
  const GetOneQueriesApihandle = async (queryId) => {
    const response = await GetOneQueriesApi.callApi(queryId);
    // setAllQuery(response ? response?.queries : []);
    setOneQuery(response ? response : null);
  };
  useEffect(() => {
    getAllQueryHandle();
  }, []);
  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Query",
      key: "query",
    },
    {
      label: "Subject",
      key: "subject",
    },

    {
      label: "Action",
      key: "interests",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <CiViewBoard
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpenModal(),
              GetOneQueriesApihandle(row?._id),
            ]}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <TableComponet
        columns={columns}
        data={allQuery}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
      <ReusableModal
        open={open}
        onClose={handleClose}
        title={modalType === "view" ? "View Query" : ""}
        width={"50%"}
      >
        <section className="p-4 text-textGray mx-auto">
          <header className="mb-4">
            <h1 className="text-xl font-bold text-primary">Query Details</h1>
          </header>
          <article>
            <p className="mb-2">
              <strong className="text-primary">Name:</strong> {oneQuery?.userName}
            </p>
            <p className="mb-2">
              <strong className="text-primary">Email:</strong> {oneQuery?.Email}
            </p>
            <p className="mb-2">
              <strong className="text-primary">Phone:</strong> {oneQuery?.Phone}
            </p>
            <p className="mb-2">
              <strong className="text-primary">Role:</strong>{" "}
              {oneQuery?.query.role === "Venders"
                ? "Vendor"
                : oneQuery?.query.role}
            </p>
            <p className="mb-2">
              <strong className="text-primary">Subject:</strong> {oneQuery?.query.subject}
            </p>
            <p>
              <strong className="text-primary">Query:</strong> {oneQuery?.query.query}
            </p>
          </article>
        </section>
      </ReusableModal>
    </div>
  );
}

export default VendorQueryTable;
