import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styles for React Calendar
import { FaCalendarAlt } from "react-icons/fa"; // Import calendar icon
import { CiLocationOn } from "react-icons/ci";
import AddOnCounter from "../../utils/AddOnCounter";
import locationImg from "../../assets/Temporary Images/marker (1) 2.png";
import Recommended from "../../assets/Temporary Images/cursor-plus.png";
import session from "../../assets/Temporary Images/stopwatch 1.png";
import order from "../../assets/Temporary Images/order.png";
import pkg from "../../assets/Temporary Images/package.png";
import formatCurrency from "../../utils/formatCurrency";
import { useLocation, useNavigate } from "react-router-dom";
import { internalRoutes } from "../../utils/internalRoutes";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function AddorBuyCard({
  bio,
  renderPrice,
  addTocart,
  packageIncart,
  packageIncartData,
  packageId,
  serviceId,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const [pincode, setPincode] = useState("");
  const calendarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateInput, setDateInput] = useState("");
  const [basePrice, setBasePrice] = useState(
    Number(renderPrice?.Price || renderPrice?.Pricing) || 0
  );
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setDateInput(newDate.toLocaleDateString());
    setShowCalendar(false);
  };

  const keysToRender = [
    "AddOns",
    "Capacity & Pricing",
    "SessionLength",
    "SessionLength&Pricing",
    "Duration&Pricing",
    "OrderQuantity&Pricing",
    "Car Tarrifs",
    "Session & Tarrif",
    "Order Quantity & Pricing",
    "Duration & Pricing",
    "List Of Devices & Prices",
    "Package",
    "Size & Pricing",
    "Pricing per qt",
    "Qty & Pricing",
    "Prices & Duration",
    "Price && MOQ",
    "QtyPricing",
  ];
  const iconMapping = {
    AddOns: Recommended,
    "Capacity & Pricing": "capacity-pricing-icon-url",
    SessionLength: session,
    "OrderQuantity&Pricing": order,
    "Car Tarrifs": "car-tarrifs-icon-url",
    "Session & Tarrif": "session-tarrif-icon-url",
    "Order Quantity & Pricing": "order-quantity-icon-url",
    "Duration & Pricing": "duration-pricing-icon-url",
    "List Of Devices & Prices": "devices-prices-icon-url",
    Package: pkg,
    "Size & Pricing": "size-pricing-icon-url",
    "Pricing per qt": "pricing-qt-icon-url",
    "Qty & Pricing": "qty-pricing-icon-url",
    "Prices & Duration": "prices-duration-icon-url",
    "Price && MOQ": "price-moq-icon-url",
  };
  const [formattedTime, setFormattedTime] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const calculatedPrice = useMemo(() => {
    const basePrice = Number(renderPrice?.Price || renderPrice?.Pricing) || 0;
    setBasePrice(basePrice);
    const addOnsPrice = selectedAddOns.reduce((total, addOn) => {
      if (addOn.type === "Package") {
        return total + Number(addOn.Rates || 0);
      }
      return total + Number(addOn.Amount || addOn.Rates || 0) * addOn.quantity;
    }, 0);

    return basePrice + addOnsPrice;
  }, [renderPrice, selectedAddOns]);

  const handleQuantityChange = useCallback((newQuantity) => {
    setQuantity(newQuantity);
  }, []);
  const handleAddOnUpdate = useCallback((addOn, operation, type) => {
    console.log(addOn, "addOn", operation, type);
    return new Promise((resolve) => {
      setSelectedAddOns((prevAddOns) => {
        console.log("Current Add-Ons:", prevAddOns);
        const index = prevAddOns.findIndex(
          (item) => item.Particulars === addOn.Particulars
        );
        console.log("Index found:", index);

        const minQty =
          addOn.MinQty && !isNaN(addOn.MinQty) ? parseInt(addOn.MinQty, 10) : 1;
        const basePrice = parseFloat(addOn.Rates || addOn.rateInfo) || 0;

        console.log("Type:", type, "Operation:", operation);

        if (type === "Package") {
          if (operation === "add") {
            console.log("Adding package...");
            if (index > -1) {
              console.log(
                "Package already exists, returning previous Add-Ons."
              );
              return prevAddOns; // ✅ Do nothing if package already exists
            } else {
              console.log("Adding new package:", addOn);
              return [
                {
                  ...addOn,
                  type,
                  quantity: 1, // ✅ Allow only one package
                  rateInfo: basePrice, // ✅ Set initial price
                },
              ];
            }
          } else if (operation === "remove") {
            console.log("Removing package...");
            return [];
          }
        } else {
          if (operation === "add") {
            console.log("Adding non-package item...");
            if (index > -1) {
              const updatedAddOns = [...prevAddOns];
              updatedAddOns[index] = {
                ...updatedAddOns[index],
                type,
                quantity: Math.max(updatedAddOns[index].quantity + 1, minQty),
              };
              console.log("Updated Add-Ons:", updatedAddOns);
              return updatedAddOns;
            } else {
              console.log("Adding new non-package item:", addOn);
              return [...prevAddOns, { ...addOn, type, quantity: minQty }];
            }
          } else if (operation === "remove") {
            console.log("Removing non-package item...");
            if (index > -1) {
              const updatedAddOns = [...prevAddOns];
              if (updatedAddOns[index].quantity > minQty) {
                updatedAddOns[index] = {
                  ...updatedAddOns[index],
                  type,
                  quantity: updatedAddOns[index].quantity - 1,
                };
                console.log(
                  "Decreased quantity for Add-On:",
                  updatedAddOns[index]
                );
              } else {
                console.log(
                  "Removing Add-On completely:",
                  updatedAddOns[index]
                );
                updatedAddOns.splice(index, 1);
              }
              return updatedAddOns;
            }
          }
        }

        resolve(prevAddOns);
        return prevAddOns;
      });
    });
  }, []);
  // console.log(selectedAddOns,);

  const handleAddTocart = async () => {
    const missingFields = [];
    if (!dateInput) missingFields.push("Date");
    if (!pincode) missingFields.push("Pin Code");
    if (!formattedTime) missingFields.push("Time");
  
    if (missingFields.length > 0) {
      toast.warning(`${missingFields.join(", ")} is required.`);
      return false;
    }
  
    // Add default Add-On if basePrice and selectedAddOns are empty
    if (!basePrice && selectedAddOns.length === 0) {
      const defaultKey = keysToRender.find(
        (key) =>
          Array.isArray(renderPrice?.[key]) && renderPrice[key].length > 0
      );
  
      if (!defaultKey || !renderPrice[defaultKey]?.length) {
        toast.warning("No default add-on is available.");
        return false;
      }
  
      const defaultAddOn = renderPrice[defaultKey][0];
      const isPackage = defaultKey === "Package"; // Define isPackage here
  
      // Add rateInfo and uom directly to defaultAddOn
      defaultAddOn.rateInfo = isPackage
        ? defaultAddOn.Rates
        : defaultAddOn.Amount || defaultAddOn?.Rates;
  
      defaultAddOn.uom = isPackage
        ? defaultAddOn.days
        : defaultAddOn.Uom || defaultAddOn.UOM;
  
      const minQty =
        defaultAddOn.MinQty && !isNaN(defaultAddOn.MinQty)
          ? parseInt(defaultAddOn.MinQty, 10)
          : 1;
  
      await handleAddOnUpdate(
        { ...defaultAddOn, MinQty: minQty },
        "add",
        defaultKey
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (auth?.isAuthenticated && auth?.role === "user") {
      try {
        await addTocart(
          basePrice,
          selectedAddOns,
          dateInput,
          formattedTime,
          pincode
        );
        toast.success("Item added to the cart successfully.");
        return true;
      } catch (error) {
        toast.error("Failed to Add To Cart. Please try again.");
        console.error(error);
        return false;
      }
    } else {
      localStorage.setItem(
        "addToCart",
        JSON.stringify({
          dateInput,
          formattedTime,
          pincode,
          basePrice,
          selectedAddOns,
          serviceId,
          packageId,
        })
      );
      const currentPath = `${location.pathname}${location.search || ""}`;
      navigate(
        `${internalRoutes.userLogin}?redirect=${encodeURIComponent(currentPath)}`
      );
      return false;
    }
  };
  

  const disablePastDates = ({ date }) => {
    const today = new Date();
    return date < new Date(today.setHours(0, 0, 0, 0));
  };
  useEffect(() => {
    if (packageIncartData) {
      const formattedDate = new Date(
        packageIncartData?.date
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      setDateInput(formattedDate);

      const [time, period] = packageIncartData?.time.split(" ");
      let [hours, minutes] = time.split(":");
      if (period === "PM" && parseInt(hours) !== 12) {
        hours = parseInt(hours) + 12;
      } else if (period === "AM" && parseInt(hours) === 12) {
        hours = "00";
      }
      const formattedTime24Hour = `${hours}:${minutes}`;
      setFormattedTime(formattedTime24Hour);
      setSelectedTime(period);
      setPincode(packageIncartData?.pincode);
    } else {
      const storedAddToCart = JSON.parse(localStorage.getItem("addToCart"));
      if (storedAddToCart) {
        const {
          dateInput,
          formattedTime,
          pincode,
          serviceId: storedServiceId,
          packageId: storedPackageId,
        } = storedAddToCart;

        if (storedServiceId === serviceId && storedPackageId === packageId) {
          setDateInput(dateInput || "");
          setFormattedTime(formattedTime || "");
          setPincode(pincode || "");
        } else {
          setDateInput("");
          setFormattedTime("");
          setPincode("");
        }
      } else {
        setDateInput("");
        setFormattedTime("");
        setPincode("");
      }
    }
  }, [packageIncartData, serviceId, packageId]);

  const handleTimeChange = (event) => {
    const timeValue = event.target.value;
    setFormattedTime(timeValue);

    const [hours, minutes] = timeValue.split(":");
    let period = "AM";
    let displayHours = parseInt(hours);
    if (displayHours >= 12) {
      period = "PM";
      if (displayHours > 12) displayHours -= 12;
    } else if (displayHours === 0) {
      displayHours = 12;
    }
    setSelectedTime(period);
  };

  const handleTimeSelect = (period) => {
    setSelectedTime(period);

    if (formattedTime) {
      let [hours, minutes] = formattedTime.split(":");
      hours = parseInt(hours);
      if (period === "PM" && hours < 12) {
        hours += 12;
      } else if (period === "AM" && hours >= 12) {
        hours -= 12;
      }
      const formatted24Hour = `${String(hours).padStart(2, "0")}:${minutes}`;
      setFormattedTime(formatted24Hour);
    }
  };

  if (!renderPrice || Object.keys(renderPrice).length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex items-start justify-start flex-col gap-2">
      <div className="max-w-md p-6 bg-white border-borderPrimary rounded-md border-2 ">
        <div className="text-center flex flex-row mb-6 flex items-center justify-start">
          <div>
            {" "}
            <p className="text-primary font-semibold pr-2  text-normal  w-full ">
              Price{" "}
            </p>
          </div>
          <div>
            {" "}
            <p className="text-xl font-bold text-primary  w-full">
              {formatCurrency(calculatedPrice)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className=" mb-4 relative" ref={calendarRef}>
            <label className="block text-primary mb-2">Date</label>
            <div className="flex items-center">
              <input
                type="text"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                onClick={() => setShowCalendar(!showCalendar)}
                placeholder="MM/DD/YYYY"
                className="w-full py-2 px-1 border rounded-md text-gray-600 focus:outline-primary"
              />

              <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="ml-2 text-primary"
              >
                <FaCalendarAlt size={20} />
              </button>
            </div>

            {showCalendar && (
              <div className="absolute z-10">
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  tileDisabled={disablePastDates}
                  className="react-calendar"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className=" block text-primary mb-2">Time</label>
            <div className="flex items-center justify-center gap-2">
              <input
                type="time"
                className="w-full py-2 px-3 border rounded-md text-gray-600 focus:outline-primary"
                value={formattedTime}
                onChange={handleTimeChange}
              />
              <div className="flex  gap-2">
                <button
                  onClick={() => handleTimeSelect("AM")}
                  className={`px-3 py-1 font-bold rounded ${
                    selectedTime === "AM"
                      ? "bg-yellow-300 text-primary py-2"
                      : "bg-gray-200 text-gray-600 py-2"
                  }`}
                >
                  AM
                </button>
                <button
                  onClick={() => handleTimeSelect("PM")}
                  className={`px-3 py-1 font-bold rounded ${
                    selectedTime === "PM"
                      ? "bg-yellow-300 text-primary py-2"
                      : "bg-gray-200 text-gray-600 py-2"
                  }`}
                >
                  PM
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="my-4 flex flex-row gap-2 justify-between ">
          <div className=" text-primary text-xl font-semibold pt-2 flex items-center justify-center gap-1">
            <span className="bg-textLightGray rounded-[50%] p-2">
              <img
                src={locationImg}
                alt="recommended"
                className="h-[1.5rem] object-fit"
              />
            </span>
            <p className="text-primary text-sm font-semibold text-normal">Event Location </p>
          </div>
          <div className="flex items-end justify-end w-[10rem]">
            <input
              type="number"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full py-2 px-1 border rounded-md text-gray-600 focus:outline-primary w-[8rem]"
            />
          </div>
        </div>
        {renderPrice?.SecurityDeposit && (
          <span className="flex items-center justify-between py-2">
            <p className="text-primary text-sm font-semibold text-normal">
              Security Deposit
            </p>
            <p className="text-textGray">
              {formatCurrency(Number(renderPrice?.SecurityDeposit))}
            </p>
          </span>
        )}
        <div>
          {keysToRender.map((key, index) => {
            const value = renderPrice?.[key];

            if (Array.isArray(value) && value.length > 0) {
              return (
                <div key={`heading-${key}`} className="">
                  <div className="flex items-center justify-start gap-2">
                    <span className="bg-textLightGray rounded-full p-2">
                      <img
                        src={iconMapping[key] ? iconMapping[key] : pkg}
                        alt={key}
                        className="h-[1.5rem] object-fit"
                      />
                    </span>
                    <p className="text-primary text-sm font-semibold text-normal">
                      {key === "AddOns" ? "Recommended Add-Ons " : key}
                    </p>
                  </div>
                  {value.map((item, idx) => {
                    const isPackage = key === "Package";
                    const rateInfo = isPackage
                      ? item.Rates
                      : item.Amount || item?.Rates;
                    const uom = isPackage ? item.days : item.Uom || item.UOM;

                    // Extract MinQty, fallback to 1 if not available
                    const minQuantity =
                      item.MinQty && !isNaN(item.MinQty)
                        ? parseInt(item.MinQty, 10)
                        : 1;

                    return (
                      <AddOnCounter
                        key={`${key}-${idx}`}
                        itemName={item.Particulars}
                        rateInfo={rateInfo}
                        uom={uom}
                        note={item.Note || ""}
                        minQuantity={minQuantity}
                        type={isPackage ? "Package" : key}
                        onAdd={() =>
                          handleAddOnUpdate(
                            { ...item, rateInfo, uom },
                            "add",
                            isPackage ? "Package" : key
                          )
                        }
                        onRemove={() =>
                          handleAddOnUpdate(
                            { ...item, rateInfo, uom },
                            "remove",
                            isPackage ? "Package" : key
                          )
                        }
                        disableAdd={
                          isPackage &&
                          selectedAddOns.some(
                            (addon) => addon.type === "Package"
                          )
                        }
                      />
                    );
                  })}
                </div>
              );
            }
          })}
        </div>

        <div className="space-y-3 mt-4">
          {!packageIncart ? (
            <button className="btn-primary" onClick={handleAddTocart}>
              Add to Cart
            </button>
          ) : (
            <button
              className="btn-primary"
              onClick={() => navigate(internalRoutes.checkout)}
            >
              Go to Cart
            </button>
          )}

          <button
            className="btn-primary"
            onClick={async () => {
              if (!packageIncart) {
                const success = await handleAddTocart();
                if (!success) return;
              }
              navigate(internalRoutes.checkout);
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
      <span className="">
        <h3 className="text-normal font-medium text-primary">Seller Bio</h3>
        <p className="text-textGray text-sm">{bio}</p>
      </span>
    </div>
  );
}

export default AddorBuyCard;
