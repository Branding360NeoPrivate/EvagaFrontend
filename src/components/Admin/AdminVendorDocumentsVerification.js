import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { verifyVendorDocument } from "../../context/redux/slices/adminActionsSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";

import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "80vh",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

function AdminVendorDocumentsVerification({ documents, onDocumentVerified }) {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();

  console.log("selecetedDocument:", selectedDocument);

  const imagesBaseUrl = process.env.REACT_APP_API_Image_BASE_URL;

  const openModal = (doc) => {
    setSelectedDocument(doc);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedDocument(null);
    setModalIsOpen(false);
  };

  const handleVerify = async (documentId) => {
    try {
      await dispatch(verifyVendorDocument(documentId)).unwrap();
      toast.success("Document verified successfully!");
      onDocumentVerified(); // Notify parent component to fetch updated details
      closeModal();
    } catch (error) {
      toast.error("Failed to verify document.");
    }
  };
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  console.log(`${imagesBaseUrl}/${selectedDocument?.documentUrl}`);

  if (!documents || documents.length === 0) {
    return <p>No documents found.</p>;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm border">
      <h3 className="font-bold text-lg mb-4">Vendor Documents</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-4 border-b pb-3 pt-5 mb-2">
          <span className="flex justify-between items-center mb-2">
            Document Name
          </span>
          <span className="flex flex-col justify-center items-center space-x-2">
            View And Verify
          </span>
          <span className="flex flex-col justify-center items-center space-x-2">
            Status
          </span>
        </div>
        {documents?.map((doc) => (
          <div
            key={doc?._id || doc?.documentName}
            className="grid grid-cols-4 border-b pb-3 pt-5 mb-2"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-gray-700">
                {doc.documentName
                  .split(/(?=[A-Z])/)
                  .map(
                    (word) => word?.charAt(0)?.toUpperCase() + word?.slice(1)
                  )
                  .join(" ")}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center space-x-2">
              {doc?.documentUrl && (
                <button
                  onClick={() => openModal(doc)}
                  className="text-sm mb-2 text-blue-500"
                >
                  View Document
                </button>
              )}
            </div>
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

      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className=" rounded-md overflow-y-scroll">
          {selectedDocument && (
            <div className=" flex flex-col justify-start items-center gap-10">
              <h2>{selectedDocument.documentName}</h2>
              {selectedDocument.documentUrl.endsWith(".pdf") ? (
                <Document
                  file={`${imagesBaseUrl}${selectedDocument.documentUrl}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {Array.from({ length: numPages }, (_, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                  ))}
                </Document>
              ) : (
                <img
                  src={`${imagesBaseUrl}${selectedDocument.documentUrl}`}
                  alt={selectedDocument.documentName}
                  className="w-full h-full"
                />
              )}
              <div>
                {selectedDocument?.status === "pending" && (
                  <button
                    onClick={() => handleVerify(selectedDocument.documentId)}
                    className="btn-primary w-[200px]"
                  >
                    Verify
                  </button>
                )}
                <button
                  onClick={closeModal}
                  className=" btn-secondary w-[200px] ml-2"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default AdminVendorDocumentsVerification;
