import React, { useState, useEffect, memo } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { fetchCategories } from "../../context/redux/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const EditForm = memo(({ onSubmit, existingData }) => {
  const { categories } = useSelector((state) => state.category);
  const allCategoriesOption = { _id: "all", name: "All" };
  const [isCategoriesFetched, setIsCategoriesFetched] = useState(false);
  const dispatch = useDispatch();
  const [bannerId, setBannerId] = useState(null);
  const [image, setImage] = useState(null);
  const [altText, setAltText] = useState(existingData?.altText || "");
  const [forType, setForType] = useState(existingData?.forType || "vendor");
  const [category, setCategory] = useState(existingData?.categoryId || "");
  const [status, setStatus] = useState(existingData?.status ?? true);

  useEffect(() => {
    setImage(null);
    setAltText(existingData?.altText || "");
    setForType(existingData?.forType || "vendor");
    setCategory(existingData?.categoryId || "");
    setStatus(existingData?.status ?? true);
    setBannerId(existingData?._id ?? true);
  }, [existingData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage((file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !altText ||
      !forType ||
      (forType === "user" && !category) ||
      status === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    onSubmit({ image, altText, forType, category, status,bannerId });
  };
  useEffect(() => {
    if (!isCategoriesFetched && (!categories || categories.length === 0)) {
      dispatch(fetchCategories()).then((response) => {
        if (response.payload.length === 0) {
          setIsCategoriesFetched(true);
        }
      });
    }
  }, [categories, isCategoriesFetched, dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-lg w-full flex flex-col gap-8"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
     {(image || existingData?.BannerUrl) && (
        <img
          src={image ? URL.createObjectURL(image) : `${process.env.REACT_APP_API_Aws_Image_BASE_URL}${existingData.BannerUrl}`}
          alt="Preview"
          className="w-full h-32 object-contain mb-4"
        />
      )}

      <TextField
        label="Alt Text"
        value={altText}
        onChange={(e) => setAltText(e.target.value)}
        fullWidth
        className="mb-4"
        required
      />

      <FormControl fullWidth className="mb-4" required>
        <InputLabel>For Type</InputLabel>
        <Select
          value={forType}
          onChange={(e) => setForType(e.target.value)}
          required
        >
          <MenuItem value="vendor">Vendor</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
      </FormControl>

      {forType === "user" && (
        <FormControl fullWidth className="mb-4" required>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {[allCategoriesOption, ...categories]?.map((item) => (
              <MenuItem key={item?._id} value={item?._id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <FormControl fullWidth className="mb-4" required>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value === "true")}
          required
        >
          <MenuItem value={"true"}>Active</MenuItem>
          <MenuItem value={"false"}>Inactive</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          backgroundColor: "#6A1B9A", // Custom background color
          "&:hover": {
            backgroundColor: "#4A0072", // Custom hover color
          },
        }}
      >
        Save Changes
      </Button>
    </form>
  );
});
export default EditForm;
