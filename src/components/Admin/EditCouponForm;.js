import React, { useState, useEffect } from "react";
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
import { formatDate } from "../../utils/formatDate";
import useDebounce from "../../utils/useDebounce";

const EditCouponForm = ({
  existingCoupon,
  onUpdate,
  categories,
  vendorsList,
  getVendors,
  vendorpackageListHandle,
  vendorPackageList,
}) => {
  const [coupon, setCoupon] = useState({
    code: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
    discountType: "amount",
    discountAmount: "",
    discountPercentage: "",
    cap: "",
    vendor: "",
    selectedpackage: "",
    packageName: "",
    autoApplyCoupon: false,
  });
  console.log(existingCoupon);

  const [couponId, setCouponId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const allCategoriesOption = { _id: "all", name: "All" };
  const [vendorSearch, setVendorSearch] = useState("");
  const [filteredVendors, setFilteredVendors] = useState([]);
  useEffect(() => {
    if (existingCoupon) {
      setCoupon({
        ...existingCoupon,
        startDate: formatDate(existingCoupon.startDate),
        endDate: formatDate(existingCoupon.endDate),
        discountType: existingCoupon.discountAmount ? "amount" : "percentage",
        autoApplyCoupon: existingCoupon?.applyAutoCoupon,
        vendor: existingCoupon?.vendorId?._id,
      });
      setCouponId(existingCoupon?._id);
      setSelectedCategory(existingCoupon?.categoryId);
    }
  }, [existingCoupon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  };
  const handleCheckboxChange = (event) => {
    setCoupon({ ...coupon, autoApplyCoupon: event.target.checked });
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleVendorPackageChange = (event) => {
    const selectedPackageId = event.target.value;

    // Find the selected package details from the vendorPackageList
    const selectedPackage = vendorPackageList.find(
      (pkg) => pkg._id === selectedPackageId
    );

    // Update the coupon state with the selected package ID and name
    setCoupon((prevState) => ({
      ...prevState,
      selectedpackage: selectedPackageId, // Store the ID
      packageName: selectedPackage?.title || "", // Store the name for display purposes
    }));
  };
  // Handle discount type change: clear old value when switching
    useEffect(() => {
      if (coupon?.vendor && selectedCategory) {
        vendorpackagesHandle();
      }
    }, [coupon?.vendor, selectedCategory]);
  const vendorpackagesHandle = async () => {
    await vendorpackageListHandle(coupon?.vendor, selectedCategory);
  };
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
  const debounce = useDebounce(vendorSearch);
  // const handleVendorSearch = async (event) => {
  //   const searchTerm = event.target.value;
  //   setVendorSearch(searchTerm);
  // };
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        await getVendors(debounce);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, [debounce]);

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
        applyAutoCoupon: coupon.autoApplyCoupon,
        vendor: coupon.vendor,
        selectedCategory: selectedCategory,
        couponId,
      });
    } else {
      console.warn("onUpdate is not defined");
    }
  };
  console.log(coupon);
  const handleVendorSearch = (event) => {
    const searchText = event.target.value;
    setVendorSearch(searchText);

    if (searchText.length > 0) {
      setFilteredVendors(
        vendorsList.filter((vendor) =>
          vendor.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      setFilteredVendors([]);
    }
  };
  const handleVendorSelect = (vendor) => {
    setCoupon({ ...coupon, vendor: vendor._id }); // Store selected vendor's ID in the state
    setVendorSearch(vendor.name); // Display the selected vendor's name in the input field
    setFilteredVendors([]); // Clear the dropdown
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
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              required
            >
              {[allCategoriesOption, ...categories]?.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Vendor Selection with Optional Search */}
        <Grid item xs={12} style={{ position: "relative" }}>
          <TextField
            fullWidth
            label="Search Vendor (Optional)"
            value={vendorSearch}
            onChange={handleVendorSearch}
          />

          {vendorSearch && filteredVendors.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                backgroundColor: "white",
                border: "1px solid #ccc",
                zIndex: 10,
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {filteredVendors.map((vendor) => (
                <div
                  key={vendor._id}
                  onClick={() => handleVendorSelect(vendor)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {vendor.name}
                </div>
              ))}
            </div>
          )}
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Vendor Package (optional)</InputLabel>
            <Select
              value={coupon?.selectedpackage}
              onChange={handleVendorPackageChange} // Use the new function
            >
              {vendorPackageList?.map((pkg) => (
                <MenuItem key={pkg._id} value={pkg._id}>
                  {pkg.title} {/* Show the package name */}
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
        <FormControlLabel
          control={
            <Checkbox
              checked={coupon.autoApplyCoupon}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label="Apply Coupon Automatically"
          style={{ marginTop: "12px" }}
        />
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
