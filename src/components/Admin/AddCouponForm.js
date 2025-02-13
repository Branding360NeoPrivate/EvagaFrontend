import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Grid,
} from "@mui/material";

const AddCouponForm = ({ onSubmit,categories,getVendors }) => {
  const [coupon, setCoupon] = useState({
    code: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
    discountType: "amount", // "amount" or "percentage"
    discountAmount: "",
    discountPercentage: "",
    cap: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const [vendorSearch, setVendorSearch] = useState("");
  const [filteredVendors, setFilteredVendors] = useState();

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleVendorSearch = (event) => {
    // getVendors(event.target.value)
    setVendorSearch(event.target.value);
    // setFilteredVendors(
    //   vendors.filter((vendor) =>
    //     vendor.name.toLowerCase().includes(event.target.value.toLowerCase())
    //   )
    // );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      code: coupon.code,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      usageLimit: coupon.usageLimit,
      discountType: coupon.discountType,
      discountAmount: coupon.discountAmount,
      discountPercentage: coupon.discountPercentage,
      cap: coupon.cap,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
      {/* Coupon Code */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Coupon Code"
          name="code"
          value={coupon.code}
          onChange={handleChange}
          required
        />
      </Grid>

      {/* Category Selection */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select value={selectedCategory} onChange={handleCategoryChange}>
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Vendor Selection with Optional Search */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Search Vendor (Optional)"
          value={vendorSearch}
          onChange={handleVendorSearch}
        />
        <FormControl fullWidth>
          <InputLabel>Vendor</InputLabel>
          <Select name="vendor" value={coupon.vendor} onChange={handleChange}>
            {filteredVendors?.map((vendor) => (
              <MenuItem key={vendor.id} value={vendor.id}>
                {vendor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Start Date */}
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          name="startDate"
          value={coupon.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
      </Grid>

      {/* End Date */}
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="End Date"
          type="date"
          name="endDate"
          value={coupon.endDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
      </Grid>

      {/* Usage Limit */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Usage Limit"
          name="usageLimit"
          type="number"
          value={coupon.usageLimit}
          onChange={handleChange}
        />
      </Grid>

      {/* Discount Type Selection */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Discount Type</InputLabel>
          <Select name="discountType" value={coupon.discountType} onChange={handleChange}>
            <MenuItem value="amount">Discount Amount</MenuItem>
            <MenuItem value="percentage">Discount Percentage</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Discount Amount (Only if "Amount" is selected) */}
      {coupon.discountType === "amount" && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Discount Amount"
            name="discountAmount"
            type="number"
            value={coupon.discountAmount}
            onChange={handleChange}
            required
          />
        </Grid>
      )}

      {/* Discount Percentage (Only if "Percentage" is selected) */}
      {coupon.discountType === "percentage" && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Discount Percentage"
            name="discountPercentage"
            type="number"
            value={coupon.discountPercentage}
            onChange={handleChange}
            required
          />
        </Grid>
      )}

      {/* Cap (Only if "Percentage" is selected) */}
      {coupon.discountType === "percentage" && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Cap (Optional)"
            name="cap"
            type="number"
            value={coupon.cap}
            onChange={handleChange}
          />
        </Grid>
      )}

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
          Add Coupon
        </Button>
      </Grid>
    </Grid>
  </form>
  );
};

export default AddCouponForm;
