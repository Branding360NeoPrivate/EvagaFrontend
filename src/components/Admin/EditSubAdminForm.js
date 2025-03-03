import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function EditSubAdminForm({ defaultValues, onSubmit }) {
  console.log(defaultValues, "defaultValues");

  const {
    handleSubmit: handleEditSubmit,
    control: editControl,
    formState: { errors: editErrors },
    setValue,
  } = useForm({ defaultValues });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  useEffect(() => {
    if (defaultValues) {
      setValue("name", defaultValues.name || "");
      setValue("email", defaultValues.email || "");
      const permissionValue = defaultValues.permissions?.[0] || "";
      setValue("adminType", permissionValue);
      setValue("status", defaultValues.status);
    }
  }, [defaultValues, setValue]);

  return (
    <Box>
      <form onSubmit={handleEditSubmit(onSubmit)}>
        {/* Name Field */}
        <Controller
          name="name"
          control={editControl}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!editErrors.name}
              helperText={editErrors.name ? editErrors.name.message : ""}
            />
          )}
        />

        {/* Email Field */}
        <Controller
          name="email"
          control={editControl}
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
              error={!!editErrors.email}
              helperText={editErrors.email ? editErrors.email.message : ""}
            />
          )}
        />

        {/* Password Field */}
        <Controller
          name="password"
          control={editControl}
          rules={{
            validate: {
              optionalPassword: (value) =>
                !value ||
                value.length >= 6 ||
                "Password must be at least 6 characters long",
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
              error={!!editErrors.password}
              helperText={
                editErrors.password ? editErrors.password.message : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
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
          control={editControl}
          rules={{ required: "Admin type is required" }}
          render={({ field }) => (
            <FormControl
              fullWidth
              margin="normal"
              error={!!editErrors.adminType}
            >
              <InputLabel>Admin Type</InputLabel>
              <Select
                {...field}
                label="Admin Type"
                value={field.value || ""} // Ensure a controlled value is always provided
              >
                <MenuItem value="superadmin">Super Admin</MenuItem>
                <MenuItem value="ContentModerator">Content Moderator</MenuItem>
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

        <Controller
          name="status"
          control={editControl}
          rules={{
            validate: (value) => value !== undefined || "Status is required",
          }}
          render={({ field }) => (
            <FormControl fullWidth margin="normal" error={!!editErrors.status}>
              <InputLabel>Status</InputLabel>
              <Select {...field} label="Status">
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
              {editErrors.status && (
                <FormHelperText>{editErrors.status.message}</FormHelperText>
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
            mt: 2,
          }}
        >
          Update
        </Button>
      </form>
    </Box>
  );
}

export default EditSubAdminForm;
