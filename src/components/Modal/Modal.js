import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { height } from "@mui/system";
import { IoMdCloseCircleOutline } from "react-icons/io";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid transparent",
  outline: "2px solid transparent",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  height: "450px",
  overflowY: "scroll",
};

const ReusableModal = ({
  open,
  onClose,
  title,
  description,
  children,
  width,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className={`w-[90%] md:w-[80%] lg:w-[${width || '45%'}]`}


        >
          <span className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold text-primary mb-4">{title?title:""}</h2>
          <IoMdCloseCircleOutline className='text-textGray text-2xl cursor-pointer' onClick={onClose}/>
          </span>
          {children}
        </Box>
      </Modal>
    </div>
  );
};
export default ReusableModal;
