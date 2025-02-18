import React, { memo, useEffect, useState } from "react";
import TableComponet from "../../utils/TableComponet";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import ReusableModal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupons } from "../../context/redux/slices/couponsSlice";
import AddCouponForm from "./AddCouponForm";
import adminActionsApi from "../../services/adminActionsApi";
import useServices from "../../hooks/useServices";
import EditCouponForm from "./EditCouponForm;";
import { formatDate } from "../../utils/formatDate";
import DeleteForm from "./DeleteForm";
import { fetchCategories } from "../../context/redux/slices/categorySlice";
import useDebounce from "../../utils/useDebounce";

const CouponsTable = memo(() => {
  const [page, setPage] = useState(1);
  const [oneCouponData, setOneCouponData] = useState();
  const [vendorsList, setVendorsList] = useState(null);
  const [couponId, setCouponId] = useState(null);
  const { coupons } = useSelector((state) => state.coupon);
  const addCoupons = useServices(adminActionsApi.addCoupons);
  const getOneCoupons = useServices(adminActionsApi.getOneCoupons);
  const editOneCoupons = useServices(adminActionsApi.editOneCoupons);
  const deleteOneCoupons = useServices(adminActionsApi.deleteOneCoupons);
  const getVendorByName = useServices(
    adminActionsApi.getVendorByNameOrUserName
  );
  const dispatch = useDispatch();
  const [isFetched, setIsFetched] = useState(false);
  const { categories } = useSelector((state) => state.category);
  const allCategoriesOption = { _id: "all", name: "All" };
  const [isCategoriesFetched, setIsCategoriesFetched] = useState(false);

  useEffect(() => {
    if (!isCategoriesFetched && (!categories || categories.length === 0)) {
      dispatch(fetchCategories()).then((response) => {
        if (response.payload.length === 0) {
          setIsCategoriesFetched(true);
        }
      });
    }
  }, [categories, isCategoriesFetched, dispatch]);

  const addCouponHandle = async ({
    code,
    startDate,
    endDate,
    usageLimit,
    discountAmount,
    discountPercentage,
    cap,
    selectedCategory,
    vendor,
    applyAutoCoupon,
  }) => {
    const formData = new FormData();
    formData.append("code", code);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("usageLimit", usageLimit);
    formData.append("discountAmount", discountAmount);
    formData.append("discountPercentage", discountPercentage);
    formData.append("cap", cap);
    formData.append("vendorId", vendor);
    formData.append("categoryId", selectedCategory);
    formData.append("applyAutoCoupon", applyAutoCoupon);
    const response = await addCoupons.callApi(formData);
    handleClose();
    dispatch(fetchCoupons());
  };
  const getOneCouponsHandle = async (couponId) => {
    const response = await getOneCoupons.callApi(couponId);
    setOneCouponData(response);
  };
  const editOneCouponhandle = async ({
    code,
    startDate,
    endDate,
    usageLimit,
    discountAmount,
    discountPercentage,
    cap,
    couponId,
    selectedCategory,
    vendor,
    applyAutoCoupon,
  }) => {
    const formData = new FormData();
    formData.append("code", code);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("usageLimit", usageLimit);
    formData.append("discountAmount", discountAmount);
    formData.append("discountPercentage", discountPercentage);
    formData.append("cap", cap);
    formData.append("vendorId", vendor);
    formData.append("categoryId", selectedCategory);
    formData.append("applyAutoCoupon", applyAutoCoupon);
    const response = await editOneCoupons.callApi(couponId, formData);
    handleClose();
    dispatch(fetchCoupons());
  };
  const deleteOneCouponHandle = async () => {
    const response = await deleteOneCoupons.callApi(couponId);
    handleClose();
    dispatch(fetchCoupons());
  };
  const getVendorByNameOrUserNamehandle = async (searchTerm) => {
    const formData = new FormData();
    formData.append("searchTerm", searchTerm);
    const response = await getVendorByName.callApi(formData);
    setVendorsList(response?.vendors ? response?.vendors : null);
  };

  useEffect(() => {
    if (
      !isFetched &&
      (!coupons || (Array.isArray(coupons) && coupons.length === 0))
    ) {
      dispatch(fetchCoupons()).then((action) => {
        if (action.payload?.length === 0) {
          setIsFetched(true);
        }
      });
    }
  }, [dispatch, coupons, isFetched]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("addCoupon");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Coupon Code",
      key: "code",
    },
    {
      label: "Start Date",
      key: "startDate",
      render: (row) => formatDate(row?.startDate),
    },

    {
      label: "End Date",
      key: "endDate",
      render: (row) => formatDate(row?.endDate),
    },
    {
      label: "Discount Amount",
      key: "discountAmount",
      //   render: () => (true ? "Active" : "Deactive"),
    },
    {
      label: "Discount Percentage",
      key: "discountPercentage",
      //   render: () => (true ? "Active" : "Deactive"),
    },
    {
      label: "Cap",
      key: "cap",
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
              setModalType("editCoupon"),
              getOneCouponsHandle(row?._id),
            ]}
          />
          <MdOutlineDelete
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpen(),
              setModalType("deleteCoupon"),
              setCouponId(row?._id),
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <button
        onClick={() => [handleOpen(), setModalType("addCoupon")]}
        className="float-right btn-primary w-fit px-2 mb-2"
      >
        Add Coupon
      </button>
      <TableComponet
        columns={columns}
        data={coupons}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
      <ReusableModal
        open={open}
        onClose={handleClose}
        title={
          modalType === "addCoupon"
            ? "Add Coupon"
            : modalType === "editCoupon"
            ? "Edit Coupon"
            : modalType === "deleteCoupon"
            ? "Delete Coupon"
            : "Default Title"
        }
      >
        {modalType === "addCoupon" && (
          <AddCouponForm
            onSubmit={addCouponHandle}
            categories={categories}
            getVendors={getVendorByNameOrUserNamehandle}
            vendorsList={vendorsList}
          />
        )}
        {modalType === "editCoupon" && (
          <EditCouponForm
            existingCoupon={oneCouponData}
            onUpdate={editOneCouponhandle}
            categories={categories}
            getVendors={getVendorByNameOrUserNamehandle}
            vendorsList={vendorsList}
          />
        )}
        {modalType === "deleteCoupon" && (
          <DeleteForm onDelete={deleteOneCouponHandle} deleteText="Coupon" />
        )}
      </ReusableModal>
    </div>
  );
});

export default CouponsTable;
