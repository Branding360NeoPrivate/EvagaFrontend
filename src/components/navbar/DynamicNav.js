import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { MdKeyboardArrowDown } from "react-icons/md";
import { fetchCategories } from "../../context/redux/slices/categorySlice";
import { setSearchTerm } from "../../context/redux/slices/userSearchSlice";
import useDebounce from "../../utils/useDebounce";
import useServices from "../../hooks/useServices";
import packageApis from "../../services/packageApis";
import { useNavigate } from "react-router-dom";

function HomeSearchBar({ cities, value, onChange }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const dropdownRef = useRef(null);
  const [search, setSearch] = useState();
  const debounce = useDebounce(search);
  const { searchTerm } = useSelector((state) => state.userSearch);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    const savedCategory = Cookies.get("selectedCategory");
    const savedCategoryId = Cookies.get("selectedCategoryId");
    if (savedCategory) {
      setSelectedCategory(savedCategory);
      setSelectedCategoryId(savedCategoryId);
    } else {
      setSelectedCategory(allCategoriesOption.name);
      setSelectedCategoryId(null);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category?.name);
    setSelectedCategoryId(category?._id);
    Cookies.set("selectedCategory", category?.name, { expires: 1 });
    Cookies.set("selectedCategoryId", category?._id, { expires: 1 });
    setIsDropdownOpen(false);
  };

  const handleSearchInputChange = (e) => {
    const searchTerm = e.target.value;

    dispatch(setSearchTerm(searchTerm));
  };
  const allCategoriesOption = { _id: "all", name: "All" };

  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const handleSearch = useCallback(
    (bypassSearchTermCheck = true) => {
      if (bypassSearchTermCheck || searchTerm.trim()) {
        const query = new URLSearchParams({
          q: searchTerm.trim(),
          category: selectedCategoryId ? selectedCategoryId : "all",
        }).toString();

        navigate(`/search?${query}`);
      }
    },
    [searchTerm, selectedCategoryId, navigate]
  );

  useEffect(() => {

      handleSearch(shouldRedirect);
      setShouldRedirect(false);

  }, [debounce, shouldRedirect]);
  useEffect(() => {
    const handleCookieChange = () => {
      const currentCategory = Cookies.get("selectedCategory") || "All";
      setSelectedCategory((prev) =>
        prev !== currentCategory ? currentCategory : prev
      );
    };

    const onCookieChange = (e) => {
      if (e.detail.key === "selectedCategory") {
        handleCookieChange();
      }
    };

    window.addEventListener("cookieChange", onCookieChange);

    return () => {
      window.removeEventListener("cookieChange", onCookieChange);
    };
  }, []);
  Cookies.set = ((originalSet) => {
    return (...args) => {
      const result = originalSet.apply(Cookies, args);

      const event = new CustomEvent("cookieChange", {
        detail: { key: args[0], value: args[1] },
      });
      window.dispatchEvent(event);

      return result;
    };
  })(Cookies.set);

  return (
    <div
      className="w-[200px] lg:w-[40vw] xl:w-[50vw] h-[45px] flex justify-start bg-gray-100 items-center rounded-md relative"
      ref={dropdownRef}
    >
      <div
        className="flex justify-center items-center h-full w-auto text-nowrap px-2 rounded-md bg-highlightYellow text-textPrimary font-bold cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className=" text-sm text-primary">
          {selectedCategory ? selectedCategory : "Not Found"}
        </span>
        <MdKeyboardArrowDown className="ml-1" />
      </div>
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-1 w-[200px] max-h-[50vh] overflow-y-scroll text-textPrimary bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul>
            {[allCategoriesOption, ...categories].map((category, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-purpleHighlight hover:text-white font-semibold cursor-pointer border-spacing-5 border-b-solid border-gray-200"
                onClick={() => [
                  handleCategorySelect(category),
                  setShouldRedirect(true),
                ]}
              >
                {category?.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Input through which the user can search */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        className="ml-2 px-2 py-1 border-none rounded-md bg-transparent text-primary outline-none"
        onChange={(e) => [
          handleSearchInputChange(e),
          setSearch(e.target.value),
        ]}
      />
    </div>
  );
}

export default HomeSearchBar;
