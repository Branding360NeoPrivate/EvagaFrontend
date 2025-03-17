import React, { useEffect, useState } from "react";
import TableComponet from "../../utils/TableComponet";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import ReusableModal from "../Modal/Modal";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import EditSubAdminForm from "./EditSubAdminForm";
import useServices from "../../hooks/useServices";
import adminApi from "../../services/adminApi";
import { toast } from "react-toastify";
import DeleteForm from "./DeleteForm";
function CreateSubAdmin() {
  const [allSubAdmin, setAllSubAdmin] = useState([]);
  const [oneAdmin, setOneAdmin] = useState(null);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("addSubAdmin");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const registerApi = useServices(adminApi.register);
  const getOneApi = useServices(adminApi.getOne);
  const getAllAdminApi = useServices(adminApi.getAllAdmin);
  const updateAdminApi = useServices(adminApi.update);
  const deleteProfileApi = useServices(adminApi.deleteProfile);
  const getAllAdminApiHandle = async () => {
    const response = await getAllAdminApi.callApi();
    setAllSubAdmin(response ? response : []);
  };
  const getOneApiHandle = async (userId) => {
    const response = await getOneApi.callApi(userId);
    setOneAdmin(response ? response : null);
  };
  const updateAdminApiHandle = async (data) => {
    const formdata = new FormData();
    formdata.append("name", data?.name);
    formdata.append("email", data?.email);
    formdata.append("password", data?.password);
    formdata.append("role", "sub_admin");
    formdata.append("permissions", data?.adminType);
    formdata.append("status", data?.status);

    try {
      const response = await updateAdminApi.callApi(selectedAdminId, formdata);
      if (response) {
        toast.success("Admin updated successfully!");
        getAllAdminApiHandle();
      } else {
        toast.error(response?.message || "Failed to update admin.");
      }
    } catch (error) {
      console.error("Error updating admin:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  const deleteProfileApiHandle = async (adminId) => {
    const response = await deleteProfileApi.callApi(adminId);
    getAllAdminApiHandle();
    handleClose();
  };
  useEffect(() => {
    getAllAdminApiHandle();
  }, []);
  const onSubmit = async (data) => {
    try {
      const formdata = new FormData();
      formdata.append("name", data?.name);
      formdata.append("email", data?.email);
      formdata.append("password", data?.password);
      formdata.append("role", "sub_admin");
      formdata.append("permissions", data?.adminType);
      formdata.append("status", data?.status);

      const response = await registerApi.callApi(formdata);
      toast.success(response?.message);
      getAllAdminApiHandle();
      handleClose();
      reset();
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error(
        error?.message || "An error occurred while submitting the form."
      );
    }
  };

  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Admin Name",
      key: "name",
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Controls",
      key: "permissions",
    },
    {
      label: "Role",
      key: "role",
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
              setModalType("editSubAdmin"),
              getOneApiHandle(row?._id),
              setSelectedAdminId(row?._id),
            ]}
          />
          <MdOutlineDelete
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => [
              handleOpen(),
              setModalType("deleteSubAdmin"),
              setSelectedAdminId(row?._id),
            ]}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <button
        onClick={() => [handleOpen(), setModalType("addSubAdmin")]}
        className="float-right btn-primary w-fit px-2 mb-2"
      >
        Add New Roles
      </button>
      <TableComponet
        columns={columns}
        data={allSubAdmin}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
      <ReusableModal
        open={open}
        onClose={handleClose}
        title={modalType === "addSubAdmin" ? "Add New Sub Admin" : ""}
        width={"50%"}
      >
        {modalType === "addSubAdmin" && (
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ""}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    autoComplete="off"
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? (
                              <AiOutlineEyeInvisible />
                            ) : (
                              <AiOutlineEye />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Controller
                name="adminType"
                control={control}
                defaultValue=""
                rules={{ required: "Admin type is required" }}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.adminType}
                  >
                    <InputLabel>Admin Type</InputLabel>
                    <Select {...field} label="Admin Type">
                      <MenuItem value="superadmin">Super Admin</MenuItem>
                      <MenuItem value="ContentModerator">
                        Content Moderator
                      </MenuItem>
                      <MenuItem value="marketingandPromotions">
                        Marketing & Promotions
                      </MenuItem>
                      <MenuItem value="support">Customer Support</MenuItem>
                      <MenuItem value="vendorManager">Vendor Manager</MenuItem>
                      <MenuItem value="eventManager">Event Manager</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />

              {/* Status Dropdown */}
              <Controller
                name="status"
                control={control}
                defaultValue={true} // Default value set to "Active"
                rules={{
                  validate: (value) =>
                    value !== undefined || "Status is required", // Ensure value is not undefined
                }}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.status}
                  >
                    <InputLabel>Status</InputLabel>
                    <Select {...field} label="Status">
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Deactivated</MenuItem>
                    </Select>
                    {errors.status && (
                      <FormHelperText>{errors.status.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#6A1B9A",
                  "&:hover": {
                    backgroundColor: "#4A0072",
                  },
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        )}
        {modalType === "editSubAdmin" && (
          <EditSubAdminForm
            defaultValues={oneAdmin}
            onSubmit={updateAdminApiHandle}
          />
        )}{" "}
        {modalType === "deleteSubAdmin" && (
          <DeleteForm
            deleteText={"Admin"}
            onDelete={() => deleteProfileApiHandle(selectedAdminId)}
          />
        )}
      </ReusableModal>
    </div>
  );
}

export default CreateSubAdmin;
