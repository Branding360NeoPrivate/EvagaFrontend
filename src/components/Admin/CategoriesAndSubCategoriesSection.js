import React, { useCallback, useEffect, useMemo, useState } from "react";
import categoryApi from "../../services/categoryServices";
import { Typography, Button, TextField } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReusableTable from "../Tables/ReusableTable";
import ReusableModal from "../Modal/Modal";
import PrimaryButton from "../buttons/PrimaryButton";

function CategoriesAndSubCategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [refreshCategoryTable, setRefreshCategoryTable] = useState(false);
  const [refreshSubCategoryTable, setRefreshSubCategoryTable] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const categoryHeaders = ["#", "Name", "Icon", "Actions"];
  const subCategoryHeaders = ["#", "Name", "Actions"];

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await categoryApi.getCategories();
        const data = response?.data;
        console.log("data in loadCategories:", data);

        setCategories(data || []);
        if (data.length > 0) {
          setCurrentCategory(data[0]);
          fetchSubCategories(data[0]._id);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    loadCategories();
  }, [refreshCategoryTable]);

  console.log("currentCategory:", currentCategory);

  const handleCategoryChange = (event) => {
    const selectedCategory = categories.find(
      (category) => category._id === event.target.value
    );
    setCurrentCategory(selectedCategory);
    fetchSubCategories(selectedCategory._id);
  };
  // console.log("categories:", categories);

  const fetchCategories = useCallback(
    async (page, pageSize) => {
      const data = await categoryApi.getCategories(page, pageSize);
      // console.log("data in fetchCategories:", data);

      setCategories(data?.data || []);
      return { data: data?.data, total: data?.data?.length };
    },
    [refreshCategoryTable]
  );

  const fetchSubCategories = useCallback(
    async (categoryId) => {
      const data = await categoryApi.getSubCategoriesByCategory(categoryId);
      setSubCategories(data?.data || []);
      return { data: data?.data, total: data?.data?.length };
    },
    [refreshSubCategoryTable] //remove the currentCategory._id dependancy here
  );

  const memoizedFetchSubCategories = useMemo(() => {
    return () => fetchSubCategories(currentCategory?._id);
  }, [currentCategory, fetchSubCategories]);

  const handleEditCategoryClick = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setModalType("editCategory");
    setIsModalOpen(true);
  };

  const handleDeleteCategoryClick = (category) => {
    setSelectedCategory(category);
    setModalType("deleteCategory");
    setIsModalOpen(true);
  };

  const handleEditSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setSubCategoryName(subCategory.name);
    setModalType("editSubCategory");
    setIsModalOpen(true);
  };

  const handleDeleteSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setModalType("deleteSubCategory");
    setIsModalOpen(true);
  };

  const handleAddCategoryClick = () => {
    setCategoryName("");
    setCategoryIcon(null);
    setModalType("addCategory");
    setIsModalOpen(true);
  };

  const handleAddSubCategoryClick = () => {
    setSubCategoryName("");
    setModalType("addSubCategory");
    setIsModalOpen(true);
  };

  const handleUpdateCategory = async () => {
    try {
      await categoryApi.updateCategory(selectedCategory._id, {
        name: categoryName,
        icon: categoryIcon,
      });
      setRefreshCategoryTable((prev) => !prev);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      await categoryApi.addCategory({ name: categoryName, icon: categoryIcon });
      setRefreshCategoryTable((prev) => !prev);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const handleUpdateSubCategory = async () => {
    try {
      await categoryApi.updateSubCategory(selectedSubCategory._id, {
        name: subCategoryName,
      });
      setRefreshSubCategoryTable((prev) => !prev);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update subcategory:", error);
    }
  };

  const handleAddSubCategory = async () => {
    try {
      await categoryApi.addSubCategory({
        name: subCategoryName,
        categoryId: currentCategory._id,
      });
      setRefreshSubCategoryTable((prev) => !prev);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add subcategory:", error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await categoryApi.deleteCategory(selectedCategory._id);
      setRefreshCategoryTable((prev) => !prev);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleDeleteSubCategory = async () => {
    try {
      await categoryApi.deleteSubCategory(selectedSubCategory._id);
      setRefreshSubCategoryTable((prev) => !prev);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete subcategory:", error);
    }
  };

  const renderCategoryRow = (category, index) => (
    <tr key={category.id} className="text-left">
      <td>{index + 1}</td>
      <td>{category.name}</td>
      <td>
        <img
          src={category.icon}
          alt={category.name}
          style={{ height: "2rem", objectFit: "contain" }}
        />
      </td>
      <td>
        <Button onClick={() => handleEditCategoryClick(category)}>
          <FaEdit />
        </Button>
        <Button onClick={() => handleDeleteCategoryClick(category)}>
          <FaTrash />
        </Button>
      </td>
    </tr>
  );

  const renderSubCategoryRow = (subCategory, index) => (
    <tr key={subCategory.id} className="text-left">
      <td>{index + 1}</td>
      <td>{subCategory.name}</td>
      <td>
        <Button onClick={() => handleEditSubCategoryClick(subCategory)}>
          <FaEdit />
        </Button>
        <Button onClick={() => handleDeleteSubCategoryClick(subCategory)}>
          <FaTrash />
        </Button>
      </td>
    </tr>
  );

  return (
    <div>
      <PrimaryButton
        className={`w-[200px] mb-5`}
        onClick={handleAddCategoryClick}
      >
        Add Category
      </PrimaryButton>
      {categories.length > 0 ? (
        <ReusableTable
          headers={categoryHeaders}
          fetchData={fetchCategories}
          renderRow={renderCategoryRow}
        />
      ) : (
        <Typography>No Categories Found</Typography>
      )}

      <div className="mb-5 mt-10">
        <label className="block mb-2 font-bold">Selected Category</label>
        <select
          className="btn-primary w-fit px-5 outline-none"
          value={currentCategory?._id || ""}
          onChange={handleCategoryChange}
        >
          {categories &&
            categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      <PrimaryButton
        className={`w-[200px] mb-5`}
        onClick={handleAddSubCategoryClick}
      >
        Add SubCategory
      </PrimaryButton>
      {subCategories.length > 0 ? (
        <ReusableTable
          headers={subCategoryHeaders}
          fetchData={memoizedFetchSubCategories}
          renderRow={renderSubCategoryRow}
        />
      ) : (
        <Typography>No Sub-Categories Found</Typography>
      )}

      <ReusableModal
        height={"auto"}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {modalType === "editCategory" ? (
          <div>
            <Typography variant="h6">Edit Category</Typography>
            <TextField
              label="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <h5>Choose Icon:</h5>
            <input
              type="file"
              onChange={(e) => setCategoryIcon(e.target.files[0])}
              accept="image/*"
            />
            <PrimaryButton className="mt-4" onClick={handleUpdateCategory}>
              Update
            </PrimaryButton>
          </div>
        ) : modalType === "addCategory" ? (
          <div>
            <Typography variant="h6">Add Category</Typography>
            <TextField
              label="Category Name"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
              fullWidth
              margin="normal"
            />
            <h5>Choose Icon:</h5>
            <input
              type="file"
              onChange={(e) => setCategoryIcon(e.target.files[0])}
              accept="image/*"
            />
            <PrimaryButton className="mt-4" onClick={handleAddCategory}>
              Add
            </PrimaryButton>
          </div>
        ) : modalType === "editSubCategory" ? (
          <div>
            <Typography variant="h6">Edit SubCategory</Typography>
            <TextField
              label="SubCategory Name"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <PrimaryButton className="mt-4" onClick={handleUpdateSubCategory}>
              Update
            </PrimaryButton>
          </div>
        ) : modalType === "addSubCategory" ? (
          <div>
            <Typography variant="h6">Add SubCategory</Typography>
            <TextField
              label="SubCategory Name"
              value={subCategoryName}
              onChange={(e) => {
                setSubCategoryName(e.target.value);
              }}
              fullWidth
              margin="normal"
            />
            <PrimaryButton className="mt-4" onClick={handleAddSubCategory}>
              Add
            </PrimaryButton>
          </div>
        ) : modalType === "deleteCategory" ? (
          <div>
            <Typography variant="h6">
              Are you sure you want to delete{" "}
              <h6 className=" inline-block font-bold">
                "{selectedCategory?.name}"
              </h6>
              ?
            </Typography>
            <PrimaryButton className="mt-4" onClick={handleDeleteCategory}>
              Delete
            </PrimaryButton>
          </div>
        ) : (
          <div>
            <Typography variant="h6">
              Are you sure you want to delete{" "}
              <h6 className=" inline-block font-bold">
                "{selectedSubCategory?.name}"
              </h6>
              ?
            </Typography>
            <PrimaryButton className="mt-4" onClick={handleDeleteSubCategory}>
              Delete
            </PrimaryButton>
          </div>
        )}
      </ReusableModal>
    </div>
  );
}

export default CategoriesAndSubCategoriesSection;
