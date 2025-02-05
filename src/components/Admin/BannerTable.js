import React, { useEffect, useState } from "react";
import TableComponet from "../../utils/TableComponet";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import ReusableModal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "../../context/redux/slices/bannerSlice";
import AddBannerForm from "./AddBannerForm";
import useServices from "../../hooks/useServices";
import adminActionsApi from "../../services/adminActionsApi";

function BannerTable() {
  const [page, setPage] = useState(1);
  const { banner } = useSelector((state) => state.banner);
  const addBanner = useServices(adminActionsApi.addBanner);

  const dispatch = useDispatch();

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("addBanner");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addBannerhandle = async({image, altText, forType, category, status}) => {
    const formData=new FormData()
    formData.append("bannerImage",image)
    formData.append("altText",altText)
    formData.append("categoryId",category)
    formData.append("forType",forType)
    formData.append("status",status)
    const response=await addBanner.callApi(formData)
    handleClose()
    dispatch(fetchBanner())
    
  };

  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Banner",
      key: "BannerUrl",
      render: (row) => (
        <img
          src={process.env.REACT_APP_API_Image_BASE_URL + row.BannerUrl}
          alt="Banner"
          className="h-[5rem] object-cover rounded"
        />
      ),
    },
    { label: "Banner For", key: "forType" },

    {
      label: "Status",
      key: "status",
      render: () => (true ? "Active" : "Deactive"),
    },
    {
      label: "Action",
      key: "interests",
      render: () => (
        <div className="flex items-center justify-center gap-2">
          <CiEdit
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [handleOpen(), setModalType("editBanner")]}
          />
          <MdOutlineDelete
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [handleOpen(), setModalType("deleteBanner")]}
          />
        </div>
      ),
    },
  ];
  useEffect(() => {
    if (!banner || (Array.isArray(banner) && banner.length === 0)) {
      dispatch(fetchBanner());
    }
  }, [banner, dispatch]);
  return (
    <div>
      <button
        onClick={() => [handleOpen(), setModalType("addBanner")]}
        className="float-right btn-primary w-fit px-2 mb-2"
      >
        Add Banner
      </button>
      <TableComponet
        columns={columns}
        data={banner}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
      <ReusableModal
        open={open}
        onClose={handleClose}
        title={
          modalType === "addBanner"
            ? "Add Banner"
            : modalType === "editBanner"
            ? "Edit Banner"
            : modalType === "deleteBanner"
            ? "Delete Banner"
            : "Default Title"
        }
      >
        {modalType === "addBanner" && <AddBannerForm onSubmit={addBannerhandle}/>}
      </ReusableModal>
    </div>
  );
}

export default BannerTable;
