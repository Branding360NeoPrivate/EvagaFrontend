import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import ReusableModal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import useServices from "../../hooks/useServices";
import adminActionsApi from "../../services/adminActionsApi";
import { toast } from "react-toastify";
import TruncateText from "../../utils/TruncateText";
import parse from "html-react-parser";
import DeleteForm from "./DeleteForm";
function AdminBlog() {
  const [page, setPage] = useState(1);
  const [allBlog, setAllBlog] = useState([]);
  const [oneBlogId, setOneBlogId] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [modalType, setModalType] = useState("addblog");
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const {
    register,
    handleSubmit,
    setValue: setContent,
    formState: { errors },
  } = useForm();
  const {
    register: editRegister,
    handleSubmit: handleEdit,
    setValue,
    reset,
    formState: { errors: editErrors },
  } = useForm();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImage(null);
    setBlogImage(null);
    reset();
  };
  const [blogImage, setBlogImage] = useState(null);
  const [image, setImage] = useState(null);
  const [blogContent, setBlogContent] = useState();
  const getAllBlogApi = useServices(adminActionsApi.getAllBlog);
  const getOneBlogApi = useServices(adminActionsApi.getOneBlog);
  const createOneBlogApi = useServices(adminActionsApi.createOneBlog);
  const updateOneBlogApi = useServices(adminActionsApi.updateOneBlog);
  const deleteOneBlogApi = useServices(adminActionsApi.deleteOneBlog);
  const handleQuillChange = (value) => {
    setContent("content", value, { shouldValidate: true });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  const getAllBlogApiHandle = async () => {
    try {
      const response = await getAllBlogApi.callApi();
      setAllBlog(response ? response?.blogs : []);
      setTotalPages(response ? response?.totalPages : 1);
    } catch (error) {
      toast.error("Failed to fetch blogs. Please try again later.");
      console.error("Error fetching blogs:", error);
    }
  };

  const getOneBloghandle = async (id) => {
    try {
      const response = await getOneBlogApi.callApi(id);
      setValue("title", response.title);
      setValue("authorName", response.authorName);
      setBlogContent(response.content);
      setValue("category", response.category);
      setValue("Status", response.isPublished);
      setBlogImage(response ? response?.coverImage : null);
    } catch (error) {
      toast.error("Failed to fetch blog details. Please try again later.");
      console.error("Error fetching blog details:", error);
    }
  };

  const updateOneBlogHandle = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("authorName", data?.authorName);
      formData.append("content", blogContent);
      formData.append("category", data?.category);
      formData.append("isPublished", data?.Status);
      formData.append("coverImage", image);

      const response = await updateOneBlogApi.callApi(oneBlogId, formData);
      toast.success("Blog updated successfully!");
      handleClose();
      reset();
    } catch (error) {
      toast.error("Failed to update blog. Please try again later.");
      console.error("Error updating blog:", error);
    }
  };

  const deleteOneBlogHandle = async () => {
    try {
      const response = await deleteOneBlogApi.callApi(oneBlogId);
      toast.success("Blog deleted successfully!");
      handleClose();
      getAllBlogApiHandle();
    } catch (error) {
      toast.error("Failed to delete blog. Please try again later.");
      console.error("Error deleting blog:", error);
    }
  };
  useEffect(() => {
    getAllBlogApiHandle();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("authorName", data?.author);
    formData.append("content", data?.content);
    formData.append("category", data?.category);

    if (data.image && data.image.length > 0) {
      const file = data.image[0];
      if (file instanceof File) {
        formData.append("coverImage", file);
      } else {
        console.error("Selected file is not valid.");
        toast.warning("Selected file is not valid.");
        return;
      }
    } else {
      console.error("No image selected or invalid file.");
      toast.warning("Please select a valid image.");
      return;
    }

    try {
      const response = await createOneBlogApi.callApi(formData);
      getAllBlogApiHandle();
      console.log(response);
      toast.success("Blog submitted successfully!");
      handleClose();
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error(
        "An error occurred while submitting the blog. Please try again."
      );
    }
  };

  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Title",
      key: "title",
    },
    {
      label: "Author Name",
      key: "authorName",
    },
    {
      label: "Short Desc",
      key: "content",
      render: (row) => (
        <TruncateText maxLines={2}>{parse(row?.content)}</TruncateText>
      ),
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
              setModalType("editblog"),
              getOneBloghandle(row?._id),
              setOneBlogId(row?._id),
            ]}
          />
          <MdOutlineDelete
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpen(),
              setModalType("deleteblog"),
              setOneBlogId(row?._id),
            ]}
          />
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
      <ReusableModal open={open} onClose={handleClose} width={"70%"}>
        {modalType === "addblog" && (
          <div className=" p-6  rounded-lg ">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Add New Blog
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Blog Title */}
              {/* Upload Image */}
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  {...register("image", {
                    required: "Image is required.",
                  })}
                  className={`mt-1 block w-full p-2 border ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>
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
                  onChange={handleQuillChange}
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
                  className="w-full bg-primary text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Blog
                </button>
              </div>
            </form>
          </div>
        )}
        {modalType === "editblog" && (
          <div className=" p-6  rounded-lg ">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Add New Blog
            </h2>
            <form onSubmit={handleEdit(updateOneBlogHandle)}>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={`mt-1 block w-full p-2 border ${
                    editErrors.image ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              {(image || blogImage) && (
                <img
                  src={
                    image
                      ? URL?.createObjectURL(image)
                      : `${process.env.REACT_APP_API_Aws_Image_BASE_URL}${blogImage}`
                  }
                  alt="Preview"
                  className=" h-[15rem] object-cover mb-4"
                />
              )}
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
                  {...editRegister("title", { required: "Title is required." })}
                  className={`mt-1 block w-full p-2 border ${
                    editErrors.title ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter blog title"
                />
                {editErrors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {editErrors.title.message}
                  </p>
                )}
              </div>
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
                  {...editRegister("authorName", {
                    required: "Author name is required.",
                  })}
                  className={`mt-1 block w-full p-2 border ${
                    editErrors.authorName ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter author name"
                />
                {editErrors.authorName && (
                  <p className="text-red-500 text-sm mt-1">
                    {editErrors.author.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blog Content
                </label>
                <ReactQuill
                  id="content"
                  value={blogContent}
                  onChange={(value) => setBlogContent(value)}
                  className="bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
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
                  {...editRegister("category", {
                    required: "Category is required.",
                  })}
                  className={`mt-1 block w-full p-2 border ${
                    editErrors.category ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter blog category"
                />
                {editErrors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {editErrors.category.message}
                  </p>
                )}
              </div>{" "}
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  {...editRegister("Status", {
                    required: "Status is required.",
                  })}
                  className={`mt-1 block w-full p-2 border ${
                    editErrors.Status ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  <option value={true}>Publish</option>
                  <option value={false}>Unpublish</option>
                </select>
                {editErrors.Status && (
                  <p className="text-red-500 text-sm mt-1">
                    {editErrors.Status.message}
                  </p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Update Blog
                </button>
              </div>
            </form>
          </div>
        )}
        {modalType === "deleteblog" && (
          <DeleteForm onDelete={deleteOneBlogHandle} deleteText={"Blog"} />
        )}
      </ReusableModal>
    </div>
  );
}

export default AdminBlog;
