import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { internalRoutes } from "../../utils/internalRoutes";
import logo from "../../assets/Temporary Images/Evaga Logo.png";
import cart from "../../assets/Temporary Images/cart.png";
import celebrate from "../../assets/Temporary Images/Animation - 1739604047964.gif";

import { MdExitToApp } from "react-icons/md";
import { LiaLanguageSolid } from "react-icons/lia";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { TbLanguageHiragana } from "react-icons/tb";
import HomeSearchableCityDropdown from "../Inputs/HomeSearchableCityDropdown";
import HomeSearchBar from "../Inputs/HomeSearchBar";
import { MdOutlineSort } from "react-icons/md";
import { useSelector } from "react-redux";
import useDebounce from "../../utils/useDebounce";
import Cookies from "js-cookie";
import ReusableModal from "../Modal/Modal";
import { Backdrop, Fade, Modal } from "@mui/material";
import { Box } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "white",
  border: "0px solid transparent",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  outline: "none",
};
const DynamicNav = () => {
  const { auth, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [modalType, setModalType] = useState("evagaXperience");
  const { categories } = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [search, setSearch] = useState();
  const debounce = useDebounce(search);
  const { searchTerm } = useSelector((state) => state.userSearch);
  const allCategoriesOption = { _id: "all", name: "All" };
  const menuItems = [
    {
      label: "Services",
      path: internalRoutes.vendorDashboard,
      roles: ["vendor"],
    },
    {
      label: "Orders",
      path: internalRoutes.vendorOrders,
      roles: ["vendor"],
    },
    {
      label: "Support",
      path: internalRoutes.vendorSupport,
      roles: ["vendor"],
    },
    {
      label: "Community",
      path: internalRoutes.vendorCommunity,
      roles: ["vendor"],
    },
  ];

  const guestMenu = [
    { component: <HomeSearchableCityDropdown />, roles: [] },
    { component: <HomeSearchBar />, roles: [] },
  ];

  const filteredMenuItems =
    auth.isAuthenticated && auth.role === "vendor"
      ? menuItems.filter((item) => item.roles.includes(auth.role))
      : guestMenu;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const sliderRef = useRef(null);

  const toggleSlider = () => {
    console.log(isSliderOpen);
    setIsSliderOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sliderRef.current &&
        !sliderRef.current.contains(event.target) &&
        event.target.id !== "sliderButton"
      ) {
        setIsSliderOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category?.name);
    setSelectedCategoryId(category?._id);
    Cookies.set("selectedCategory", category?.name, { expires: 1 });
    Cookies.set("selectedCategoryId", category?._id, { expires: 1 });
    setIsDropdownOpen(false);
  };
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
    <>
      <nav className="sticky top-0 z-50 bg-purpleSecondary text-white shadow-lg w-full flex justify-between items-center flex-wrap px-4 md:px-10">
        <div className="flex items-center justify-between w-full lg:w-auto py-3">
          {/* Brand */}
          <Link to="/" className="hover:text-gray-300">
            <img src={logo} alt="logo" className="w-[50px]" />
          </Link>

          {/* Hamburger Menu for Mobile */}
          <button
            className="lg:hidden float-right lg:float-right"
            onClick={toggleMobileMenu}
          >
            <GiHamburgerMenu className="text-3xl text-white" />
          </button>
        </div>

        {/* Desktop Menu Items */}
        <ul className="hidden lg:flex flex-row justify-start items-center gap-5 w-full md:w-auto">
          {filteredMenuItems.map((item, index) => (
            <div key={index}>
              {item.component ? (
                item.component
              ) : (
                <li>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-lg font-medium ${
                        isActive ? "text-white" : "text-[#FAFAFA4D]"
                      } hover:text-gray-300`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              )}
            </div>
          ))}
        </ul>

        <div className="hidden lg:flex items-center justify-center gap-5">
          <button className="flex items-center">
            <TbLanguageHiragana className="text-3xl text-white" />
            <MdKeyboardArrowDown />
          </button>
          {/* User Controls */}
          {auth.isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to={`/${auth.role}/profile`}>
                <span className="text-lg font-medium capitalize border px-3 py-2 rounded-md">
                  My Profile
                </span>
              </Link>
              <button
                onClick={logout}
                className="text-2xl text-white hover:text-red-500 font-bold"
              >
                <MdExitToApp />
              </button>
            </div>
          ) : (
            <Link to={internalRoutes?.userLogin}>
              <button className="bg-highlightYellow max-w-[200px] w-[200px] px-6 py-3 text-primary font-semibold text-lg rounded-md">
                Sign In
              </button>
            </Link>
          )}
          {(!auth?.isAuthenticated || auth?.role == "user") && (
            <Link to={internalRoutes.checkout}>
              <img
                src={cart}
                alt="cart"
                className="h-[2rem] object-contain cursor-pointer"
              />
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMobileMenu}
          >
            <div
              className="fixed right-0 top-0 h-full w-3/4 bg-purpleSecondary text-white shadow-lg z-50 p-5 space-y-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="mb-5" onClick={closeMobileMenu}>
                <IoClose className="text-3xl text-white" />
              </button>
              <ul className="flex flex-col gap-5">
                {filteredMenuItems.map((item, index) => (
                  <div key={index}>
                    {item.component ? (
                      item.component
                    ) : (
                      <li>
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `text-lg font-medium ${
                              isActive ? "text-white" : "text-[#FAFAFA4D]"
                            } hover:text-gray-300`
                          }
                          onClick={closeMobileMenu}
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    )}
                  </div>
                ))}
              </ul>
              <div className=" flex lg:hidden flex-col items-start justify-center gap-5">
                <button className="flex items-center">
                  <LiaLanguageSolid className="text-3xl text-white" />
                  <MdKeyboardArrowDown />
                </button>
                {/* User Controls */}
                {auth.isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <Link to={`/${auth.role}/profile`}>
                      <span className="text-lg font-medium capitalize">
                        My Profile
                      </span>
                    </Link>
                    <button
                      onClick={logout}
                      className="text-2xl text-white hover:text-red-500 font-bold"
                    >
                      <MdExitToApp />
                    </button>
                  </div>
                ) : (
                  <Link to={internalRoutes?.userLogin}>
                    <button className="bg-highlightYellow max-w-[200px] w-[200px] px-6 py-3 text-primary font-semibold text-lg rounded-md">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      <div className="bg-primary px-[2.5%] flex items-center justify-start gap-12 text-white flex-wrap gap-y-2">
        <span
          className="flex items-center justify-center gap-2 text-white cursor-pointer"
          onClick={toggleSlider}
        >
          <MdOutlineSort className="text-2xl text-white" />
          <p>All</p>
        </span>
        <Link to={"#"} onClick={handleOpen}>
          Evaga Xperience
        </Link>
        <Link to={"#"}>Blog</Link>
        <Link to={internalRoutes.wishlist}>Wishlist</Link>
        <Link to={"#"} onClick={handleOpen}>
          Community
        </Link>
        <Link to={internalRoutes.customerService}>Customer Service</Link>
      </div>
      <div
        ref={sliderRef}
        className={`slider rounded-r-md ${
          isSliderOpen ? "open z-50" : "closed z-50"
        }`}
      >
        <ul className="rounded-r-md">
          {[allCategoriesOption, ...categories].map((category, index) => (
            <li
              key={index}
              className="px-4 py-1 text-sm text-textGray hover:bg-purpleHighlight hover:text-white hover:rounded-md font-medium cursor-pointer border-spacing-5 border-b-solid border-gray-200"
              onClick={() => [
                handleCategorySelect(category),
                setShouldRedirect(true),
                toggleSlider(),
              ]}
            >
              {category?.name}
            </li>
          ))}
        </ul>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="bg-white w-full rounded-md flex flex-col items-center justify-center ">
              <img src={celebrate} alt="celebrate" className="object-fit " />

              <h2 className="flex text-primary text-2xl font-semibold item-center justify-center mt-4">
                Coming Soon
              </h2>
              <div className="mx-10 flex flex-col gap-2">
                <p className="mt-2 text-primary font-semibold text-lg mt-4">
                  Join the Waitlist
                </p>
                <div className="flex mb-32">
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    className="w-full mt-1 p-2 border rounded-lg outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button className="btn-primary w-fit px-2 border rounded-lg">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
      <style jsx>{`
        .slider-button {
          padding: 10px 15px;
          font-size: 16px;
          background-color: #555;
          color: white;
          border: none;
          cursor: pointer;
        }

        .slider-button:hover {
          background-color: #777;
        }

        /* Slider */
        .slider {
          position: fixed;
          top: 15%;
          left: 0%;
          height: fit-content;
          width: 275px;
          background-color: #f4f4f4;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
        }

        .slider.open {
          transform: translateX(0);
        }

        .slider.closed {
          transform: translateX(-100%);
        }

        .slider ul {
          list-style: none;
          padding: 10px;
        }
      `}</style>
    </>
  );
};

export default DynamicNav;
