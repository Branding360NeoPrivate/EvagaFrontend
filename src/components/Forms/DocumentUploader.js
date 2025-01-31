import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import useServices from "../../hooks/useServices";
import vendorApi from "../../services/vendorApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorProfile } from "../../context/redux/slices/vendorSlice";

const DocumentUploader = ({ formfields, vendorDetails, onUpload,vendorId }) => {
  const [uploadProgress, setUploadProgress] = useState({});
  const dispatch = useDispatch();
  const [documentsState, setDocumentsState] = useState(null);

  const documentUploadService = useServices(vendorApi.uploadDocuments);

  const documentsBaseUrl = process.env.REACT_APP_IMAGES_BASE_URL;

  // Function to map through formfields and vendorDetails to merge documents
  const mergedDocuments = formfields.map((field) => {
    const vendorDocument = vendorDetails.find(
      (doc) => doc.documentName === field.name
    );
    return {
      ...field,
      status: vendorDocument?.status || "Not Found",
      documentUrl: vendorDocument?.documentUrl || null,
      documentId: vendorDocument?._id || null,
    };
  });

  useEffect(() => {
    if (mergedDocuments.length > 0) {
      setDocumentsState(mergedDocuments);
    }
  }, [vendorDetails]);

  console.log("merged documents in Documents Uploader:", mergedDocuments);

  const handleFileChange = async (event, doc) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const userId = vendorId || Cookies.get("userId");
    console.log("doc in handleFileChange:", doc);
  
    const formData = new FormData();
    formData.append("document", file);
    formData.append("documentName", doc.name);
    formData.append("documentType", file.type);
    formData.append("documentId", doc?.documentId || "");
  
    if (vendorId) {
      formData.append("adminId", Cookies.get("userId"));
    }
  
    try {
      setUploadProgress((prev) => ({ ...prev, [doc.name]: 0 }));
  
      // Simulate progress upload for 1 second
      for (let i = 0; i < 10; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setUploadProgress((prev) => ({ ...prev, [doc.name]: i * 10 }));
      }
  
      const response = await documentUploadService.callApi(userId, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress((prev) => ({
            ...prev,
            [doc.name]: percentCompleted,
          }));
        },
      });
  
      if (response.document) {
        toast.success(
          `${doc.name
            .split(/(?=[A-Z])/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")} uploaded successfully!`
        );
        dispatch(fetchVendorProfile(userId));
      }
    } catch (error) {
      console.error(error);
      toast.error(
        `Error uploading ${doc.name}: ${
          error ? error.message || error.data : "Unexpected Error"
        }`
      );
    } finally {
      setTimeout(
        () => setUploadProgress((prev) => ({ ...prev, [doc.name]: 0 })),
        500
      );
    }
  };
  
  

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm border">
      <h3 className="font-bold text-lg mb-4">Upload Documents</h3>
      <div className="space-y-4">
        {mergedDocuments.map((doc) => (
          <div
            key={doc._id || doc.name}
            className="grid grid-cols-4 border-b pb-3 pt-5 mb-2"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-gray-700">
                {doc.name
                  .split(/(?=[A-Z])/)
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center space-x-2">
              <input
                type="file"
                id={`file-${doc.name}`}
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.webp,.msword"
                onChange={(e) => handleFileChange(e, doc)}
              />
              <label
                htmlFor={`file-${doc.name}`}
                className=" text-purpleSecondary px-3 py-1 rounded cursor-pointer hover:bg-purpleSecondary hover:text-white transition"
              >
                <IoCloudUploadOutline className=" text-2xl font-bold" />
              </label>
              {uploadProgress[doc.name] > 0 && (
                <div className=" bg-gray-200 w-full rounded-full h-[10px] dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-[10px] rounded-full"
                    style={{ width: `${uploadProgress[doc.name]}%` }}
                  >
                    {" "}
                  </div>
                  <span className="text-xs text-gray-500">
                    {uploadProgress[doc.name]}%
                  </span>
                </div>
              )}
            </div>
            {doc.documentUrl && (
              <div className=" overflow-hiddens w-fit relative group">
                <a
                  // href={`${documentsBaseUrl}${doc.documentUrl}`}
                  className=" text-sm mb-2 "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {doc.name}
                  {`.${doc.documentUrl.split(".").pop()}`}
                </a>
                {/* <div className="absolute w-[100px] -top-[40px] bg-white p-2 border rounded shadow-lg hidden group-hover:block transition-opacity">
                  <span className="text-xs text-gray-700">
                    {doc.documentUrl.split("/").pop()}
                  </span>
                  <br />
                  <span className="text-xs text-blue-500">Click To View</span>
                </div> */}
              </div>
            )}
            <span
              className={`text-sm text-center font-medium px-2 py-1 rounded ${
                doc.status === "verified"
                  ? "bg-green-100 text-green-600"
                  : doc.status === "pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {doc.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentUploader;
