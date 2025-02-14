import React, { useCallback, useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styles for React Calendar
import { FaCalendarAlt } from "react-icons/fa"; // Import calendar icon
import { CiLocationOn } from "react-icons/ci";
import AddOnCounter from "../../utils/AddOnCounter";
import location from "../../assets/Temporary Images/marker (1) 2.png";
import Recommended from "../../assets/Temporary Images/cursor-plus.png";
import session from "../../assets/Temporary Images/stopwatch 1.png";
import order from "../../assets/Temporary Images/order.png";
import pkg from "../../assets/Temporary Images/package.png";
import formatCurrency from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import { internalRoutes } from "../../utils/internalRoutes";
function AddorBuyCard({ bio, renderPrice, addTocart, packageIncart }) {
  const navigate = useNavigate();
  const [pincode, setPincode] = useState("");
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateInput, setDateInput] = useState("");
  const [selectedTime, setSelectedTime] = useState("AM");
  const [basePrice, setBasePrice] = useState(
    Number(renderPrice?.Price || renderPrice?.Pricing) || 0
  );
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setDateInput(newDate.toLocaleDateString());
    setShowCalendar(false);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };
  const keysToRender = [
    "AddOns",
    "Capacity & Pricing",
    "SessionLength",
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
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const calculatedPrice = useMemo(() => {
    const basePrice = Number(renderPrice?.Price || renderPrice?.Pricing) || 0;
    setBasePrice(basePrice);
    const addOnsPrice = selectedAddOns.reduce((total, addOn) => {
      console.log(addOn, total);
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
    setSelectedAddOns((prevAddOns) => {
      const index = prevAddOns.findIndex(
        (item) => item.Particulars === addOn.Particulars
      );

      if (type === "Package") {
        if (operation === "add") {
          return [{ ...addOn, type, quantity: 1 }];
        } else if (operation === "remove") {
          return [];
        }
      } else {
        if (operation === "add") {
          if (index > -1) {
            const updatedAddOns = [...prevAddOns];
            updatedAddOns[index] = {
              ...updatedAddOns[index],
              type,
              quantity: updatedAddOns[index].quantity + 1,
            };
            return updatedAddOns;
          } else {
            return [...prevAddOns, { ...addOn, type, quantity: 1 }];
          }
        } else if (operation === "remove") {
          if (index > -1) {
            const updatedAddOns = [...prevAddOns];
            if (updatedAddOns[index].quantity > 1) {
              updatedAddOns[index] = {
                ...updatedAddOns[index],
                type,
                quantity: updatedAddOns[index].quantity - 1,
              };
            } else {
              updatedAddOns.splice(index, 1);
            }
            return updatedAddOns;
          }
        }
      }
      return prevAddOns;
    });
  }, []);

  const handleAddTocart = async () => {
    addTocart(basePrice, selectedAddOns);
  };

  if (!renderPrice || Object.keys(renderPrice).length === 0) {
    return <div>Loading...</div>; 
  }
  return (
    <div className="flex items-start justify-start flex-col gap-2">
      <div className="max-w-md p-6 bg-white border-borderPrimary rounded-md border-2 ">
        <div className="text-center flex flex-row mb-6">
          <div>
            {" "}
            <p className="text-primary font-semibold pr-2 pt-2 text-xl  w-full ">
              Price{" "}
            </p>
          </div>
          <div>
            {" "}
            <p className="text-3xl font-bold text-primary pl-2 w-full">
              {formatCurrency(calculatedPrice)}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className=" mb-4 relative">
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
                  className="react-calendar"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className=" block text-primary mb-2">Time</label>
            <div className="flex gap-2">
              <input
                type="time"
                className="w-full py-2 px-3 border rounded-md text-gray-600 focus:outline-primary"
              />
              <div className="flex ">
                <button
                  onClick={() => handleTimeSelect("AM")}
                  className={`px-2 py-1 font-bold rounded ${
                    selectedTime === "AM"
                      ? "bg-yellow-300 text-primary"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  AM
                </button>
                <button
                  onClick={() => handleTimeSelect("PM")}
                  className={`px-2 py-1 font-bold rounded ${
                    selectedTime === "PM"
                      ? "bg-yellow-300 text-primary"
                      : "bg-gray-200 text-gray-600"
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
                src={location}
                alt="recommended"
                className="h-[1.5rem] object-fit"
              />
            </span>
            <p className="text-primary font-semibold text-xl">Location</p>
          </div>
          <div className="flex items-end">
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full py-2 px-1 border rounded-md text-gray-600 focus:outline-primary"
            />
          </div>
        </div>
        {renderPrice?.SecurityDeposit && (
          <span className="flex items-center justify-between py-2">
            <p className="text-primary font-semibold text-xl">
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
                    <p className="text-primary font-semibold text-xl">
                      {key === "AddOns" ? "Recommended Add-Ons " : key}
                    </p>
                  </div>
                  {value.map((item, idx) => {
                    const isPackage = key === "Package";
                    const rateInfo = isPackage
                      ? item.Rates
                      : item.Amount || item?.Rates;
                    const uom = isPackage ? item.days : item.Uom || item.UOM;

                    return (
                      <AddOnCounter
                        key={`${key}-${idx}`}
                        itemName={item.Particulars}
                        rateInfo={rateInfo}
                        uom={uom}
                        note={item.Note || ""}
                        minQuantity={1}
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

          <button className="btn-primary">Buy Now</button>
        </div>
      </div>
      <span className="">
        <h3 className="text-xl font-medium text-primary">Seller Bio</h3>
        <p className="text-textGray text-sm">{bio}</p>
      </span>
    </div>
  );
}

export default AddorBuyCard;
