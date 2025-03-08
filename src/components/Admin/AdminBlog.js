import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import ReusableModal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";

function AdminBlog() {
  const [page, setPage] = useState(1);
  const [allBlog, setAllBlog] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [modalType, setModalType] = useState("addblog");
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted", data);
    // Handle form submission logic
  };
  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Title",
      key: "title",
    },
    {
      label: "Short Desc",
      key: "Desc",
    },

    {
      label: "Action",
      key: "interests",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <button className="text-blue-600 hover:underline">View</button>
          <CiEdit
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [handleOpen(), setModalType("addblog")]}
          />
          <MdOutlineDelete className="text-3xl font-semibold cursor-pointer text-textGray" />
        </div>
      ),
    },
  ];
  return (
    <div>
      <button
        onClick={() => [handleOpen(), setModalType("addblog")]}
        className="float-right btn-primary w-fit px-2 mb-2"
      >
        Add Blog
      </button>
      <TableComponetWithApi
        columns={columns}
        data={allBlog}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
      <ReusableModal open={open} onClose={handleClose}>
        {modalType === "addblog" && (
          <div className=" p-6  rounded-lg ">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Add New Blog
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Blog Title */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blog Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title", { required: "Title is required." })}
                  className={`mt-1 block w-full p-2 border ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter blog title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Author Name */}
              <div className="mb-4">
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700"
                >
                  Author Name
                </label>
                <input
                  type="text"
                  id="author"
                  {...register("author", {
                    required: "Author name is required.",
                  })}
                  className={`mt-1 block w-full p-2 border ${
                    errors.author ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter author name"
                />
                {errors.author && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.author.message}
                  </p>
                )}
              </div>

              {/* Blog Content */}
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blog Content
                </label>
                <ReactQuill
                  id="content"
                  onChange={(value) => setValue("content", value)}
                  className="bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.content.message}
                  </p>
                )}
              </div>

              {/* Blog Category */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blog Category
                </label>
                <input
                  type="text"
                  id="category"
                  {...register("category", {
                    required: "Category is required.",
                  })}
                  className={`mt-1 block w-full p-2 border ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter blog category"
                />
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Blog
                </button>
              </div>
            </form>
          </div>
        )}
      </ReusableModal>
    </div>
  );
}

export default AdminBlog;
