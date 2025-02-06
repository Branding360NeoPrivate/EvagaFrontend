import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Grid,
  FormHelperText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../context/redux/slices/categorySlice";

const EditFeesCatehoryForm = ({ existingFee, onUpdate }) => {
  const [formData, setFormData] = useState({
    category: "",
    percentage: "",
    status: "true",
  });
  const [feeId, setFeeId] = useState(null);
  useEffect(() => {
    if (existingFee) {
      setFormData({
        category: existingFee.categoryId || "",
        percentage: existingFee.feesPercentage || "",
        status: existingFee.status ? "true" : "false",
      });
      setFeeId(existingFee?._id);
    }
  }, [existingFee]);
  const [isCategoriesFetched, setIsCategoriesFetched] = useState(false);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isCategoriesFetched && (!categories || categories.length === 0)) {
      dispatch(fetchCategories()).then((response) => {
        if (response.payload.length === 0) {
          setIsCategoriesFetched(true);
        }
      });
    }
  }, [categories, isCategoriesFetched, dispatch]);

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.category = formData.category ? "" : "Category is required";
    tempErrors.percentage = formData.percentage
      ? formData.percentage > 0
        ? ""
        : "Percentage must be greater than 0"
      : "Percentage is required";
    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (typeof onUpdate === "function") {
        onUpdate({
          category: formData.category,
          percentage: formData.percentage,
          status: formData.status,// Convert to boolean
          feeId
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {/* Category Dropdown */}
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.category}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories?.map((item) => (
                <MenuItem value={item?._id}>{item?.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.category}</FormHelperText>
          </FormControl>
        </Grid>

        {/* Percentage Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Percentage"
            name="percentage"
            type="number"
            value={formData.percentage}
            onChange={handleChange}
            error={!!errors.percentage}
            helperText={errors.percentage}
            required
          />
        </Grid>

        {/* Status Dropdown */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Deactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              backgroundColor: "#6A1B9A",
              "&:hover": {
                backgroundColor: "#4A0072",
              },
            }}
          >
            Update Fee
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditFeesCatehoryForm;
