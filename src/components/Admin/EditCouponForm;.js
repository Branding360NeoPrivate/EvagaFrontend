import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Grid,
} from "@mui/material";
import { formatDate } from "../../utils/formatDate";

const EditCouponForm = ({ existingCoupon, onUpdate }) => {
  const [coupon, setCoupon] = useState({
    code: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
    discountType: "amount", // Default value
    discountAmount: "",
    discountPercentage: "",
    cap: "",
  });

  const [couponId, setCouponId] = useState(null);
  useEffect(() => {
    if (existingCoupon) {
      setCoupon({
        ...existingCoupon,
        startDate: formatDate(existingCoupon.startDate),
        endDate: formatDate(existingCoupon.endDate),
        discountType: existingCoupon.discountAmount ? "amount" : "percentage",
      });
      setCouponId(existingCoupon?._id);
    }
  }, [existingCoupon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  };

  // Handle discount type change: clear old value when switching
  const handleDiscountTypeChange = (e) => {
    const newType = e.target.value;
    setCoupon({
      ...coupon,
      discountType: newType,
      discountAmount: newType === "amount" ? coupon.discountAmount : "",
      discountPercentage:
        newType === "percentage" ? coupon.discountPercentage : "",
      cap: newType === "percentage" ? coupon.cap : "", // Clear cap when switching to amount
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof onUpdate === "function") {
      onUpdate({
        code: coupon.code,
        startDate: coupon.startDate,
        endDate: coupon.endDate,
        usageLimit: coupon.usageLimit,
        discountType: coupon.discountType,
        discountAmount:
          coupon.discountType === "amount" ? coupon.discountAmount : "",
        discountPercentage:
          coupon.discountType === "percentage" ? coupon.discountPercentage : "",
        cap: coupon.discountType === "percentage" ? coupon.cap : "",
        couponId
      });
    } else {
      console.warn("onUpdate is not defined");
    }
  };
  console.log(coupon);

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
            <Select
              name="discountType"
              value={coupon.discountType}
              onChange={handleDiscountTypeChange} // Handle reset when switching types
            >
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
            Update Coupon
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditCouponForm;
