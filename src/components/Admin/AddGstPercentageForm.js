import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
function AddGstPercentageForm({ onSubmit, categories }) {
  const [gst, setGst] = useState({
    gstPercenatge: "",
    categoryId: "",
    categoryName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGst({ ...gst, [name]: value });
  };
  const handleCategoryChange = (event) => {
    const selectedId = event.target.value;
    const selectedCategory = categories.find(
      (category) => category._id === selectedId
    );

    setGst({
      ...gst,
      categoryId: selectedId,
      categoryName: selectedCategory ? selectedCategory.name : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      categoryId: gst.categoryId,
      gstPercentage: gst.gstPercenatge,
      categoryName: gst.categoryName,
    });

    
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {/* Category Selection */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={gst.categoryId}
              onChange={handleCategoryChange}
              required
            >
              {categories?.map((category) => (
                <MenuItem key={category?._id} value={category?._id}>
                  {category?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Usage Limit */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Gst Percentage"
            name="gstPercenatge"
            type="number"
            value={gst.gstPercenatge}
            onChange={handleChange}
          />
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
            Add Gst Percenatge
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddGstPercentageForm;
