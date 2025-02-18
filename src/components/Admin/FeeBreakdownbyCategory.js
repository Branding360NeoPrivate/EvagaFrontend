import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import adminActionsApi from "../../services/adminActionsApi";
import useServices from "../../hooks/useServices";
import { formatDate } from "../../utils/formatDate";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import TableComponet from "../../utils/TableComponet";
import DeleteForm from "./DeleteForm";
import EditCouponForm from "./EditCouponForm;";
import AddCouponForm from "./AddCouponForm";
import ReusableModal from "../Modal/Modal";
import { fetchCategoryFess } from "../../context/redux/slices/categoryFeesSlice";
import { render } from "@testing-library/react";
import AddFeesCatehoryForm from "./AddFeesCatehoryForm";
import EditFeesCatehoryForm from "./EditFeesCatehoryForm.js";

const FeeBreakdownbyCategory = memo(() => {
  const [page, setPage] = useState(1);
  const [oneFeesData, setOneFeesData] = useState();
  const [feeId, setFeeId] = useState(null);
  const { categoryFees } = useSelector((state) => state.categoryFees);
  const addFees = useServices(adminActionsApi.addCategoryFees);
  const getOneFees = useServices(adminActionsApi.getOneFees);
  const editOneFees = useServices(adminActionsApi.editOneFees);
  const deleteOneFees = useServices(adminActionsApi.deleteOneFees);
  const dispatch = useDispatch();
  const [isFetched, setIsFetched] = useState(false);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("addFees");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addFeesHandle = async ({ category, percentage, status }) => {
    const formData = new FormData();
    formData.append("categoryId", category);
    formData.append("feesPercentage", percentage);
    formData.append("status", status);
    const response = await addFees.callApi(formData);
    handleClose();
    dispatch(fetchCategoryFess());
  };
  const getOneFeesHandle = async (feeId) => {
    const response = await getOneFees.callApi(feeId);
    setOneFeesData(response);
  };
  const editOneFeesHandle = async ({ category, percentage, status, feeId }) => {
    const formData = new FormData();
    formData.append("categoryId", category);
    formData.append("feesPercentage", percentage);
    formData.append("status", status);
    const response = await editOneFees.callApi(feeId, formData);
    console.log(response);

    handleClose();
    dispatch(fetchCategoryFess());
  };
  const deleteOneFeesHandle = async () => {
    const respons = await deleteOneFees.callApi(feeId);
    handleClose();
    dispatch(fetchCategoryFess());
  };
  useEffect(() => {
    if (
      !isFetched &&
      (!categoryFees ||
        (Array.isArray(categoryFees) && categoryFees.length === 0))
    ) {
      dispatch(fetchCategoryFess()).then((action) => {
        if (action.payload?.length === 0) {
          setIsFetched(true);
        }
      });
    }
  }, [dispatch, categoryFees, isFetched]);

  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Category Name",
      key: "categoryId",
      render: (row) => row?.categoryId?.name,
    },
    {
      label: "Fees Percentage",
      key: "feesPercentage",
    },

    {
      label: "Status",
      key: "status",
      render: (row) => (row?.status === true ? "Active" : "Deactive"),
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
              setModalType("editFees"),
              getOneFeesHandle(row?._id),
            ]}
          />
          <MdOutlineDelete
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpen(),
              setModalType("deleteFees"),
              setFeeId(row?._id),
            ]}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <button
        onClick={() => [handleOpen(), setModalType("addFees")]}
        className="float-right btn-primary w-fit px-2 mb-2"
      >
        Add Fee
      </button>
      <TableComponet
        columns={columns}
        data={categoryFees}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
      <ReusableModal
        open={open}
        onClose={handleClose}
        title={
          modalType === "addFees"
            ? "Add Fees"
            : modalType === "editFees"
            ? "Edit Fees"
            : modalType === "deleteFees"
            ? "Delete Fees"
            : "Default Title"
        }
      >
        {modalType === "addFees" && (
          <AddFeesCatehoryForm onSubmit={addFeesHandle} />
        )}
        {modalType === "editFees" && (
          <EditFeesCatehoryForm
            existingFee={oneFeesData}
            onUpdate={editOneFeesHandle}
          />
        )}
        {modalType === "deleteFees" && (
          <DeleteForm deleteText="Fees" onDelete={deleteOneFeesHandle} />
        )}
      </ReusableModal>
    </div>
  );
});

export default FeeBreakdownbyCategory;
