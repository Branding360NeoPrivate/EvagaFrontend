import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import { useForm } from "react-hook-form";
import ReusableModal from "../Modal/Modal";
import useServices from "../../hooks/useServices";
import adminActionsApi from "../../services/adminActionsApi";
import DeleteForm from "./DeleteForm";

function AdminNewsLetter() {
  const [page, setPage] = useState(1);
  const [allNewLetter, setAllNewLetter] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    setValue,
    formState: { errors: editError },
  } = useForm();

  const [modalType, setModalType] = useState("add");
  const [newsletterId, setNewsletterId] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const createOneNewsLetterApi = useServices(
    adminActionsApi.createOneNewsLetter
  );
  const getAllNewsLetterApi = useServices(adminActionsApi.getAllNewsLetter);
  const getOneNewsLetterApi = useServices(adminActionsApi.getOneNewsLetter);
  const updateOneNewsLetterApi = useServices(
    adminActionsApi.updateOneNewsLetter
  );
  const deleteOneNewsLetterApi = useServices(
    adminActionsApi.deleteOneNewsLetter
  );
  const getAllNewsLetterApiHandle = async () => {
    const response = await getAllNewsLetterApi.callApi();
    setAllNewLetter(response ? response : []);
  };
  const createOneNewsLetterApiHandle = async (data) => {
    const formdata = new FormData();
    formdata.append("title", data?.title);
    formdata.append("url", data?.url);
    formdata.append("status", data?.status);
    const response = await createOneNewsLetterApi.callApi(formdata);
    if (response) {
      handleClose();
      getAllNewsLetterApiHandle();
    }
  };
  const getOneNewsLetterApiHandle = async (id) => {
    const response = await getOneNewsLetterApi.callApi(id);
    console.log(response);
    setValue("url", response?.url);
    setValue("status", response?.status);
  };
  const updateOneNewsLetterApiHandle = async (data) => {
    const formdata = new FormData();
    formdata.append("title", data?.title);
    formdata.append("url", data?.url);
    formdata.append("status", data?.status);
    const response = await updateOneNewsLetterApi.callApi(
      newsletterId,
      formdata
    );
    if (response) {
      handleClose();
      getAllNewsLetterApiHandle();
    }
  };
  const deleteOneNewsLetterApiHandle = async () => {
    const response = await deleteOneNewsLetterApi.callApi(newsletterId);
    if (response) {
      handleClose();
      getAllNewsLetterApiHandle();
    }
  };
  useEffect(() => {
    getAllNewsLetterApiHandle();
  }, []);
  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Title",
      key: "title",
    },
    {
      label: "Status",
      key: "status",
    },

    {
      label: "Action",
      key: "interests",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <CiEdit
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpen(),
              setModalType("edit"),
              getOneNewsLetterApiHandle(row?._id),
              setNewsletterId(row?._id),
            ]}
          />
          <MdOutlineDelete
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpen(),
              setModalType("delete"),
              setNewsletterId(row?._id),
            ]}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <button
        onClick={() => [handleOpen(), setModalType("add")]}
        className="float-right btn-primary w-fit px-2 mb-2"
      >
        Add News Letter
      </button>
      <TableComponetWithApi
        columns={columns}
        data={allNewLetter}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
      <ReusableModal
        open={open}
        onClose={handleClose}
        title={
          modalType === "add"
            ? "Add News Letter"
            : "edit"
            ? "Edit News Letter"
            : "delete"
            ? "Delete News Letter"
            : ""
        }
        width={"50%"}
      >
        {modalType === "add" && (
          <div className="flex items-center justify-center ">
            <form
              onSubmit={handleSubmit(createOneNewsLetterApiHandle)}
              className="bg-white p-6 rounded-2xl  w-full max-w-xl"
            >
              <div className="mb-4">
                <label
                  htmlFor="url"
                  className="block text-normal font-medium text-gray-700 mb-1"
                >
                  Enter Title
                </label>
                <input
                  id="url"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  {...register("title", { required: "title is required" })}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>{" "}
              <div className="mb-4">
                <label
                  htmlFor="url"
                  className="block text-normal font-medium text-gray-700 mb-1"
                >
                  Enter your URL
                </label>
                <input
                  id="url"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  {...register("url", { required: "URL is required" })}
                />
                {errors.url && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.url.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-normal font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <select
                  id="status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  {...register("status", { required: "Status is required" })}
                >
                  <option value="">Select Status</option>
                  <option value="publish">Publish</option>
                  <option value="unpublish">Unpublish</option>
                </select>
                {errors.status && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          </div>
        )}
        {modalType === "edit" && (
          <div className="flex items-center justify-center ">
            <form
              onSubmit={handleEditSubmit(updateOneNewsLetterApiHandle)}
              className="bg-white p-6 rounded-2xl  w-full "
            >
              <div className="mb-4">
                <label
                  htmlFor="url"
                  className="block text-normal font-medium text-gray-700 mb-1"
                >
                  Enter Title
                </label>
                <input
                  id="url"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  {...registerEdit("title", { required: "title is required" })}
                />
                {editError.title && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.editError.message}
                  </p>
                )}
              </div>{" "}
              <div className="mb-4">
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Edit your URL
                </label>
                <input
                  id="url"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  {...registerEdit("url", { required: "URL is required" })}
                />
                {editError.url && (
                  <p className="text-sm text-red-500 mt-1">
                    {editError.url.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <select
                  id="status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  {...registerEdit("status", {
                    required: "Status is required",
                  })}
                >
                  <option value="">Select Status</option>
                  <option value="publish">Publish</option>
                  <option value="unpublish">Unpublish</option>
                </select>
                {editError.status && (
                  <p className="text-sm text-red-500 mt-1">
                    {editError.status.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update
              </button>
            </form>
          </div>
        )}
        {modalType === "delete" && (
          <DeleteForm
            onDelete={deleteOneNewsLetterApiHandle}
            deleteText={"News Letter"}
          />
        )}
      </ReusableModal>
    </div>
  );
}

export default AdminNewsLetter;
