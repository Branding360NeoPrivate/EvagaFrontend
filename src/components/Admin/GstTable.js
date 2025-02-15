import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../context/redux/slices/categorySlice";
import TableComponet from "../../utils/TableComponet";
import { formatDate } from "../../utils/formatDate";
import { CiEdit, CiViewBoard } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import adminActionsApi from "../../services/adminActionsApi";
import useServices from "../../hooks/useServices";
import ReusableModal from "../Modal/Modal";
import AddGstPercentageForm from "./AddGstPercentageForm";

function GstTable() {
  const { categories } = useSelector((state) => state.category);
  const [isCategoriesFetched, setIsCategoriesFetched] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isCategoriesFetched && (!categories || categories.length === 0)) {
      dispatch(fetchCategories()).then((response) => {
        if (response.payload.length === 0) {
          setIsCategoriesFetched(true);
        }
      });
    }
  }, [categories, isCategoriesFetched, dispatch]);
  const getAllCategoryGstFees = useServices(
    adminActionsApi.getAllCategoryGstFees
  );
  const addCategoryGstFeesApi = useServices(adminActionsApi.addCategoryGstFees);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [allGst, setAllGst] = useState([]);
  const [modalType, setModalType] = useState("addGst");
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getAllCategoryGstFeesHandle = async () => {
    try {
      const response = await getAllCategoryGstFees.callApi();
      setAllGst(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error fetching GST fees:", error);
      setAllGst([]); 
    }
  };

  const addCategoryGstFeesApihandle = async ({
    categoryId,
    categoryName,
    gstPercentage,
  }) => {
    try {
      const formData = new FormData();
      formData.append("categoryId", categoryId);
      formData.append("categoryName", categoryName);
      formData.append("gstPercentage", Number(gstPercentage));

      const response = await addCategoryGstFeesApi.callApi(formData);

      if (response) {
        handleClose();
        getAllCategoryGstFeesHandle();
      } else {
        console.error(
          "Failed to add GST fees:",
          response?.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("An error occurred while adding GST fees:", error);
    }
  };

  useEffect(() => {
    getAllCategoryGstFeesHandle();
  }, []);
  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Category Name",
      key: "categoryName",
    },
    {
      label: "Gst Percenatge",
      key: "gstPercentage",
    },
    {
      label: "Effective Date",
      key: "startDate",
      render: (row) => formatDate(row?.effectiveDate),
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
              setModalType("viewGst"),
              //   getOneCouponsHandle(row?._id),
            ]}
          />
          <CiEdit
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpen(),
              setModalType("editGst"),
              //   getOneCouponsHandle(row?._id),
            ]}
          />
          <MdOutlineDelete
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpen(),
              setModalType("deleteGst"),
              //   setCouponId(row?._id),
            ]}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      {" "}
      <button
        onClick={() => [handleOpen(), setModalType("addGst")]}
        className="float-right btn-primary w-fit px-2 mb-2"
      >
        Add Gst Percenatge
      </button>
      <TableComponet
        columns={columns}
        data={allGst}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
      <ReusableModal
        open={open}
        onClose={handleClose}
        title={
          modalType === "addGst"
            ? "Add Gst"
            : modalType === "editGst"
            ? "Edit Gst"
            : modalType === "deleteGst"
            ? "Delete Gst"
            : modalType === "viewGst"
            ? "View Gst"
            : "Default Title"
        }
      >
        {modalType === "addGst" && (
          <AddGstPercentageForm
            categories={categories}
            onSubmit={addCategoryGstFeesApihandle}
          />
        )}
      </ReusableModal>
    </div>
  );
}

export default GstTable;
