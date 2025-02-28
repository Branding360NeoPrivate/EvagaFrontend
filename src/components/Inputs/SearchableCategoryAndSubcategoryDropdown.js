import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  fetchSubCategories,
} from "../../context/redux/slices/categorySlice";
import categoryApi from "../../services/categoryServices";
import useServices from "../../hooks/useServices";
import { FaChevronDown } from "react-icons/fa6";
import { MdArrowDropDown } from "react-icons/md";
const SearchableInput = ({
  items,
  value,
  onSelect,
  onChange,
  placeholder,
  disabled,
  defaultValue,
  handleSetDisabledCategoryState,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [disabledState, setDisabledState] = useState(false);
  useEffect(() => {
    if (defaultValue) {
      setSearchTerm(defaultValue?.name);
      setDisabledState(true);
      if (handleSetDisabledCategoryState) {
        handleSetDisabledCategoryState(true);
      }
    } else {
      setDisabledState(disabled);
    }
  }, [defaultValue, items, disabled, handleSetDisabledCategoryState]);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    const filtered = items.filter((item) =>
      item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onChange(newSearchTerm);
  };

  const handleSelect = (item) => {
    console.log(item);
    onSelect(item);
    setSearchTerm(item.name);
    setTimeout(() => {
      setIsInputFocused(false);
    }, 200);
  };


  return (
    <div
      className="relative w-full cursor-pointer"
      onFocus={() => setIsInputFocused(true)}
    >
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder={placeholder}
          defaultValue={defaultValue?.name}
          value={searchTerm}
          onChange={handleInputChange}
          disabled={disabledState}
          className={`w-full px-4 py-2 border rounded-md focus:outline-nonep-2 text-gray-500  outline-none cursor-pointer
              ${!disabledState ? " border " : " bg-grayBg border-none"} 
                errors[field.name] ? "border-red-500" : "border-gray-300"
            `}
        />
        <MdArrowDropDown className="absolute right-3 pointer-events-none text-gray-500 text-3xl" />
      </div>
      {isInputFocused && filteredItems.length > 0 && (
        <ul
          onBlur={() => setIsInputFocused(false)}
          className="absolute z-10 bg-white border rounded-md mt-1 max-h-[200px] w-full overflow-y-auto"
        >
          {filteredItems.map((item) => (
            <li
              key={item._id}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SearchableCategoryAndSubcategoryDropdown = ({
  onSelect,
  disabled,
  defaultValues,
  textColor,
  textSize,
  width,
}) => {
  const dispatch = useDispatch();
  const { categories, subCategories } = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [subCategorySearchTerm, setSubCategorySearchTerm] = useState("");
  const [disabledCategoryState, setDisabledCategoryState] = useState(false);
  const [subCategoriesByCategory, setSubCategoriesByCategory] = useState([]);

  const {
    error: subCategoryError,
    loading: subCategoryLoading,
    callApi: subCategoryCall,
  } = useServices(categoryApi.getSubCategoriesByCategory);

  const handleSetDisabledCategoryState = (newState) => {
    setDisabledCategoryState(newState);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    // use subcategory call to fetch subcategories for selected category's id and update subcategoriesByCategory state
    if (
      selectedCategory &&
      !subCategoryLoading &&
      !subCategoryError &&
      categorySearchTerm !== ""
    ) {
      subCategoryCall(selectedCategory?._id).then((response) => {
        setSubCategoriesByCategory(response);
      });
    } else {
      setSubCategoriesByCategory(null);
    }
  }, [selectedCategory, categorySearchTerm]);

  //   console.log("subcategoriesByCategory:", subCategoriesByCategory);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setCategorySearchTerm(category.name);
    setSubCategorySearchTerm("");
    // dispatch(fetchSubCategories(category._id));
  };

  const handleSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setSubCategorySearchTerm(subCategory.name);
    onSelect({
      category: { id: selectedCategory._id, name: selectedCategory.name },
      subCategory: { id: subCategory._id, name: subCategory.name },
    });
  };

  return (
    <div
      className={`${
        width
          ? `w-${width} grid grid-cols-1 md:grid-cols-2 gap-5`
          : "grid grid-cols-1 md:grid-cols-2 gap-5"
      }`}
    >
      <div className="">
        <label
          className={
            textColor && textSize
              ? `block text-[${textSize}] text-base font-semibold text-[#6A1B9A] mb-1`
              : "block text-sm font-semibold text-gray-700 mb-1"
          }
        >
          Category
        </label>
        <SearchableInput
          items={categories}
          value={categorySearchTerm}
          onSelect={handleCategorySelect}
          onChange={setCategorySearchTerm}
          placeholder="Search or select a category"
          defaultValue={defaultValues[0]?.category}
          handleSetDisabledCategoryState={handleSetDisabledCategoryState}
          disabled={disabled}
        />
      </div>
      <div className="">
        <label
          className={
            textColor && textSize
              ? `block text-[${textSize}] text-base font-semibold text-[#6A1B9A] mb-1`
              : "block text-sm font-semibold text-gray-700 mb-1"
          }
        >
          Subcategory
        </label>
        <SearchableInput
          items={subCategoriesByCategory || []}
          value={subCategorySearchTerm}
          onSelect={handleSubCategorySelect}
          onChange={setSubCategorySearchTerm}
          placeholder="Search or select a subcategory"
          defaultValue={defaultValues[0]?.subCategories}
          disabled={!selectedCategory || disabled}
        />
        {!selectedCategory && !disabled && !disabledCategoryState && (
          <p className="text-red-500 text-sm mt-1">
            Please select a category first
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchableCategoryAndSubcategoryDropdown;
