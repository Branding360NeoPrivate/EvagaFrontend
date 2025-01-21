import React, { useState, useEffect } from "react";
import { FaArrowTurnUp } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";

const FoodMenuForm = ({
  cuisines,
  categories,
  type,
  foodMenu,
  setFoodMenu,
  isEditing = true,
}) => {
  // Initialize foodMenu only once if empty
  useEffect(() => {
    console.log("1st useEffect called");
    if (foodMenu.length === 0) {
      const initialMenu = categories.map((category) => ({
        ...category,
        items: cuisines.map((cuisine) => ({
          label: cuisine,
          key: cuisine.replace(/\s+/g, ""),
          type: "array",
          items: [{ veg: [], nonVeg: [] }],
        })),
      }));
      setFoodMenu(initialMenu);
    }
  }, [categories, cuisines, setFoodMenu, foodMenu.length]);

  // Update foodMenu when cuisines or categories change
  useEffect(() => {
    console.log("2nd useEffect called");
    setFoodMenu((prevMenu) => {
      const updatedMenu = categories.map((category) => {
        const existingCategory = prevMenu.find(
          (item) => item.key === category.key
        );

        return {
          ...category,
          items: cuisines.map((cuisine) => {
            const existingCuisine = existingCategory?.items.find(
              (item) => item.key === cuisine.replace(/\s+/g, "")
            );

            return {
              label: cuisine,
              key: cuisine.replace(/\s+/g, ""),
              type: "array",
              items: existingCuisine?.items || [{ veg: [], nonVeg: [] }],
            };
          }),
        };
      });
      return updatedMenu;
    });
  }, [cuisines, categories, setFoodMenu]);

  // Handle adding a menu item without duplicates
  const handleAddItem = (categoryKey, cuisineKey, menuType, value) => {
    if (!value.trim()) return;

    setFoodMenu((prevMenu) =>
      prevMenu.map((category) => {
        if (category.key === categoryKey) {
          return {
            ...category,
            items: category.items.map((cuisine) => {
              if (cuisine.key === cuisineKey) {
                const updatedItems = { ...cuisine.items[0] };
                // Prevent duplicates
                if (!updatedItems[menuType].includes(value.trim())) {
                  updatedItems[menuType] = [
                    ...updatedItems[menuType],
                    value.trim(),
                  ];
                }
                return { ...cuisine, items: [updatedItems] };
              }
              return cuisine;
            }),
          };
        }
        return category;
      })
    );
  };

  // Handle removing a menu item using index
  const handleRemoveItem = (categoryKey, cuisineKey, menuType, index) => {
    setFoodMenu((prevMenu) =>
      prevMenu.map((category) => {
        if (category.key === categoryKey) {
          return {
            ...category,
            items: category.items.map((cuisine) => {
              if (cuisine.key === cuisineKey) {
                const updatedItems = { ...cuisine.items[0] };
                updatedItems[menuType] = updatedItems[menuType].filter(
                  (_, idx) => idx !== index
                );
                return { ...cuisine, items: [updatedItems] };
              }
              return cuisine;
            }),
          };
        }
        return category;
      })
    );
  };

  // Function to render inputs
  const renderInputs = (category, cuisine) => {
    const inputTypes =
      type === "Both"
        ? ["veg", "nonVeg"]
        : type === "Veg"
        ? ["veg"]
        : ["nonVeg"];

    return inputTypes.map((menuType) => (
      <div key={menuType} className="grid grid-cols-3 gap-4 mt-4">
        <label className="text-primary text-xl font-semibold capitalize">
          {menuType === "veg" ? "Veg" : "Non-Veg"}:
        </label>
        <div className="col-span-2 flex items-start justify-start flex-col gap-2">
          <span className="flex items-center">
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  e.preventDefault();
                  handleAddItem(
                    category.key,
                    cuisine.key,
                    menuType,
                    e.target.value.trim()
                  );
                  e.target.value = "";
                }
              }}
              className="border-2 w-[25rem] outline-none p-1 rounded-l-lg text-textGray font-medium"
              disabled={!isEditing}
              placeholder={`Add ${menuType} items`}
            />
            <p className="bg-textYellow p-2 rounded-r-lg">
              <FaArrowTurnUp className="text-xl text-textGray rotate-90" />
            </p>
          </span>
          <div className="flex items-center justify-start gap-2 flex-wrap">
            {cuisine.items[0][menuType].map((item, index) => (
              <span
                key={index}
                className="bg-textLightGray text-textGray py-1 px-3 flex items-center gap-1 rounded"
              >
                {item}
                <ImCancelCircle
                  className="text-textGray cursor-pointer"
                  onClick={() =>
                    handleRemoveItem(category.key, cuisine.key, menuType, index)
                  }
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="p-4 bg-gray-50 rounded shadow">
      {foodMenu.map((category) => (
        <div key={category.key} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {category.label}
          </h3>
          {category.items.map((cuisine) => (
            <div key={cuisine.key} className="p-4 mb-4 bg-white rounded shadow">
              <h4 className="text-md font-medium text-gray-700 mb-2">
                {cuisine.label}
              </h4>
              {renderInputs(category, cuisine)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FoodMenuForm;
