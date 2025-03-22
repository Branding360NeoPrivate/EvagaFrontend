import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../context/redux/slices/categorySlice";
function AddBannerForm({ onSubmit }) {
  const { categories } = useSelector((state) => state.category);
  const allCategoriesOption = { _id: "all", name: "All" };
  const [isCategoriesFetched, setIsCategoriesFetched] = useState(false);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [altText, setAltText] = useState("");
  const [forType, setForType] = useState("vendor");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState(true);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ image, altText, forType, category, status });
    setImage(null);
    setCategory("");
    setForType("vendor");
    setAltText("");
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
        required
      />
      {image && (
        <img
          src={URL?.createObjectURL(image)}
          alt="Preview"
          className="w-full h-32 object-conatin mb-4"
        />
      )}

      <TextField
        label="Alt Text"
        value={altText}
        onChange={(e) => setAltText(e.target.value)}
        fullWidth
        className="mb-4"
      />

      <FormControl fullWidth className="mb-4" required>
        <InputLabel>For Type</InputLabel>
        <Select value={forType} onChange={(e) => setForType(e.target.value)}>
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
          >
            {[allCategoriesOption, ...categories]?.map((item) => (
              <MenuItem value={item?._id}>{item?.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <FormControl fullWidth className="mb-4" required>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value === "true")}
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
        Submit
      </Button>
    </form>
  );
}

export default AddBannerForm;
