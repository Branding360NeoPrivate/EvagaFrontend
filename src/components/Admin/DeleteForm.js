import React, { useState, memo } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const DeleteForm = memo(({ onDelete }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteConfirm = () => {
    setOpenDeleteDialog(false);
    onDelete();
  };

  return (
    <>
      <Button onClick={() => setOpenDeleteDialog(true)} variant="outlined" color="secondary" fullWidth>
        Delete Banner
      </Button>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this banner? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default DeleteForm;
