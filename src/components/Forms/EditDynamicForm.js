import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { FaArrowTurnUp, FaIndianRupeeSign, FaRupeeSign } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SeasonsSelector from "../Inputs/SeasonsSelector";
import FoodMenuForm from "./FoodMenuForm";
import maxCapicty from "../../assets/Temporary Images/Max Capacity.png";
import Theater from "../../assets/Temporary Images/Theater.png";
import CocktailRounds from "../../assets/Temporary Images/Cocktail Rounds.png";
import BanquetRounds from "../../assets/Temporary Images/Banquet Rounds.png";
import UShape from "../../assets/Temporary Images/U Shape.png";
const EditDynamicForm = ({
  formData,
  setfiledFormData,
  index,
  setOpenMasterVenueModal,
}) => {
  const { fields = [] } = formData || {};
  const [isEditing, setIsEditing] = useState(false);
  const [foodMenu, setFoodMenu] = useState([]);
  const totalNumberOfPhotoAllowed =
    process.env.REACT_APP_API_Number_of_Images_allowed || 30;
  const totalNumberOfvideeAllowed =
    process.env.REACT_APP_API_VIDEO_BASE_URL || 10;
  const editorStyle = {
    backgroundColor: "#7575751a",
  };

  const [seasons, setSeasons] = useState({
    lowSeason: [],
    shoulderSeason: [],
    highSeason: [],
  });

  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (formData?.fields) {
      const initialValues = formData.fields.reduce((acc, field) => {
        acc[field.key] = field.items || "";
        return acc;
      }, {});
      setFormValues(initialValues);
    }
  }, [formData]);

  const handleChange = (key, value) => {
    setFormValues((prev) => {
      if (key === "Title") {
        return {
          ...prev,
          [key]: value,
          "Capacity&Pricing": {},
        };
      }

      if (
        Array.isArray(prev[key]) &&
        prev[key].every((item) => item.hasOwnProperty("checked"))
      ) {
        return {
          ...prev,
          [key]: value, // Update the selected value
          [`${key}_options`]: prev[key].map((item) => ({
            ...item,
            checked: item.value === value, // Dynamically update the checked status
          })),
        };
      }
      return {
        ...prev,
        [key]: value, // Dynamically updates any key, including file uploads
      };
    });
  };

  const handleRadioChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: prev[key].map((item) => ({
        ...item,
        checked: item.value === value, // Set only the selected option as checked
      })),
    }));
  };

  const handleImageChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [`${key}_${index}`]: value, // Add the form index to uniquely scope the key
    }));
  };
  useEffect(() => {
    if (formData?.entityModel === "Catering") {
      if (foodMenu?.length > 0) {
        setFormValues((prev) => ({
          ...prev,
          Cuisine: {
            label: "Cuisine",
            key: "Cuisine",
            type: "section",
            items: foodMenu,
          },
        }));
      }
    }
  }, [foodMenu]);

  const handleArrayChange = (key, value, index = null) => {
    setFormValues((prev) => {
      const updatedArray = Array.isArray(prev[key]) ? [...prev[key]] : [];

      if (index !== null) {
        updatedArray[index] = value;
      } else {
        updatedArray.push(value);
      }

      return {
        ...prev,
        [key]: updatedArray,
      };
    });
  };

  const handleObjectChange = (fieldKey, index, objectKey, value) => {
    setFormValues((prev) => {
      const updatedArray = Array.isArray(prev[fieldKey])
        ? [...prev[fieldKey]]
        : [];

      updatedArray[index] = {
        ...updatedArray[index],
        [objectKey]: value,
      };

      return { ...prev, [fieldKey]: updatedArray };
    });
  };

  const handleAddObject = (fieldKey, templateObject) => {
    setFormValues((prev) => {
      const updatedArray = Array.isArray(prev[fieldKey])
        ? [...prev[fieldKey]]
        : [];
      updatedArray.push({ ...templateObject });
      return {
        ...prev,
        [fieldKey]: updatedArray,
      };
    });
  };

  const handleRemoveObject = (fieldKey, index) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldKey]: prev[fieldKey].filter((_, idx) => idx !== index),
    }));
  };
  const handleSeasonsChange = (updatedSeasons) => {
    setSeasons(updatedSeasons);
  };
  const handleObjectChangeForSeating = (
    parentKey,
    index,
    key,
    updatedSeating
  ) => {
    const parentArray = formValues[parentKey] || [];

    const updatedSubVenues = [...parentArray];

    if (!updatedSubVenues[index]) {
      updatedSubVenues[index] = {};
    }

    updatedSubVenues[index][key] = updatedSeating;

    setFormValues((prevValues) => ({
      ...prevValues,
      [parentKey]: updatedSubVenues,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const transformedData = fields?.map((field) => {
        const items = [];
        if (field.key === "ProductImage") {
          return {
            label: field.label,
            key: field.key,
            type: field.type,
            items: formValues[field.key],
          };
        }
        if (field.key === "CoverImage") {
          return {
            label: field.label,
            key: field.key,
            type: field.type,
            items: formValues[field.key],
          };
        }
        if (field.key === "CustomThemeRequest") {
          const selectedOption = formValues[field.key]; // This will be either "Yes" or "No"

          // Update the items array to include the `checked` property
          field.items = field.items.map((item) => ({
            ...item,
            checked: item.key === selectedOption, // Set `checked: true` for the selected option
          }));

          // Log the updated field object
          console.log(field);

          // Return the updated field object if needed
          return field;
        }
        Object?.keys(formValues)?.forEach((key) => {
          if (key?.startsWith(`${field.key}_`)) {
            items?.push(formValues[key]);
          }
        });

        if (field.type === "radio") {
          return {
            label: field.label,
            key: field.key,
            type: field.type,
            items: formValues[`${field.key}_options`]
              ? formValues[`${field.key}_options`]
              : field.items,
            selectedValue: formValues[field.key],
          };
        }

        return {
          label: field.label,
          key: field.key,
          type: field.type,
          items: items?.length > 0 ? items : formValues[field.key],
        };
      });

      setfiledFormData(transformedData);
      setOpenMasterVenueModal(false);
      setIsEditing(false);
      console.log("✅ Form submitted successfully:", transformedData);
    } catch (error) {
      console.error("❌ Error in form submission:", error);
    }
  };

  const handleSingleFileChange = (key, file) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: file,
    }));
  };

  const handleFileChange = (fieldKey, type, files) => {
    setFormValues((prev) => {
      const updatedField = {
        ...prev[fieldKey],
        [type]: [...(prev[fieldKey]?.[type] || []), ...files],
      };
      return { ...prev, [fieldKey]: updatedField };
    });
  };

  const handleFileRemove = (fieldKey, type, fileIdx) => {
    setFormValues((prev) => {
      const updatedFiles = [...(prev[fieldKey]?.[type] || [])];

      updatedFiles.splice(fileIdx, 1);
      return {
        ...prev,
        [fieldKey]: { ...prev[fieldKey], [type]: updatedFiles },
      };
    });
  };
  // console.log(formValues);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-[2.5rem] py-4 w-full"
    >
      {fields?.map((field) => {
        if (!field) return null;

        if (
          (field.type === "text" || field.type === "number") &&
          field.key !== "Terms&Conditions"
        ) {
          if (field.key === "DurationofStall") {
            const isBookForIngredientsAvailable =
              formValues.hasOwnProperty("BookforIngredients");
            const isBookForIngredientsYes =
              formValues["BookforIngredients"] === "yes";

            if (
              isBookForIngredientsAvailable &&
              formValues["BookforIngredients"] === "no"
            ) {
              return null;
            }
          }
          return (
            <div key={field._id} className=" col-span-1 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <p></p>
              <span className="flex items-center justify-start col-span-2">
                {(field.key === "Price" || field.key === "Pricing") && (
                  <span className="bg-textYellow px-3 py-1  rounded-l-md font-medium text-primary">
                    ₹
                  </span>
                )}
                <input
                  type={field.type}
                  value={formValues[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className={
                    field.key === "PricePerplate" ||
                    field.key === "MOQ" ||
                    field.key === "DurationofStall" ||
                    field.key === "TeamSize" ||
                    field.key === "DeliveryCharges" ||
                    field.key === "Price" ||
                    field.key === "Pricing" ||
                    field.key === "NoofDrivers" ||
                    field.key === "Duration of Stall" ||
                    field.key === "SessionDuration"
                      ? "col-span-1 border-2 w-[10rem] border-2 outline-none p-1 rounded-r-md text-textGray font-medium"
                      : "col-span-2 border-2 w-[25rem] border-2 outline-none p-1 rounded-md text-textGray font-medium "
                  }
                  required={
                    field.key === "Brand" || field.key === "SetupCost"
                      ? false
                      : true
                  }
                />
                {field.key === "MOQ" && (
                  <p className="text-sm text-textGray">*heads</p>
                )}
              </span>
            </div>
          );
        } else if (field.type === "time") {
          return (
            <div key={field._id} className=" col-span-1 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <span className="flex items-center justify-center gap-1 col-span-3">
                <input
                  type={field.type}
                  value={formValues[field.key] || "00:00:00"}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className={
                    field.key === "PricePerplate" ||
                    field.key === "MOQ" ||
                    field.key === "DurationofStall" ||
                    field.key === "TeamSize" ||
                    field.key === "DeliveryCharges"
                      ? "col-span-1 border-2 w-[10rem] border-2 outline-none p-1 rounded-md text-textGray font-medium"
                      : "col-span-2 border-2 w-[25rem] border-2 outline-none p-1 rounded-md text-textGray font-medium "
                  }
                  required
                />
                {field.key === "MOQ" && (
                  <p className="text-sm text-textGray">*heads</p>
                )}
              </span>
            </div>
          );
        } else if (field.key === "Capacity&Pricing" && field.type === "array") {
          const selectedTitle = formValues["Title"];

          const handleCapacityChange = (staffType, key, value) => {
            setFormValues((prev) => {
              const updatedCapacity = { ...prev[field.key] };
              if (!updatedCapacity[staffType]) {
                updatedCapacity[staffType] = {};
              }
              updatedCapacity[staffType][key] = value;
              return { ...prev, [field.key]: updatedCapacity };
            });
          };

          if (!selectedTitle) {
            return (
              <div
                key={field._id}
                className="col-span-2 grid grid-cols-3 gap-4"
              >
                <label className="text-primary text-base font-semibold">
                  {field.label}:
                </label>
                <p className="col-span-2 text-gray-500">
                  Please select a valid title to view capacity and pricing
                  details.
                </p>
              </div>
            );
          }

          const selectedStaffData = field.items.find(
            (item) => item.title === selectedTitle
          );

          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3 flex flex-col gap-4">
                {selectedStaffData &&
                selectedStaffData.staffDetails?.length > 0 ? (
                  selectedStaffData.staffDetails.map((staff, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-5 items-center justify-center gap-2"
                    >
                      <p className="text-lg text-primary font-semibold">
                        {staff.type}
                      </p>
                      <div className="col-span-4 flex gap-4">
                        {/* Min Capacity */}
                        <div className="flex flex-col gap-1">
                          <label className="text-primary">Min</label>
                          <input
                            type="number"
                            value={
                              formValues[field.key]?.[staff.type]
                                ?.minCapacity || staff.minCapacity
                            }
                            onChange={(e) =>
                              handleCapacityChange(
                                staff.type,
                                "minCapacity",
                                e.target.value
                              )
                            }
                            className="border p-2 rounded-md w-[5rem] outline-none"
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-primary">Max</label>
                          <input
                            type="number"
                            value={
                              formValues[field.key]?.[staff.type]
                                ?.maxCapacity || staff.maxCapacity
                            }
                            onChange={(e) =>
                              handleCapacityChange(
                                staff.type,
                                "maxCapacity",
                                e.target.value
                              )
                            }
                            className="border p-2 rounded-md w-[5rem] outline-none"
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-primary">Pricing</label>
                          <input
                            type="number"
                            value={
                              formValues[field.key]?.[staff.type]?.pricing ||
                              staff.pricing
                            }
                            onChange={(e) =>
                              handleCapacityChange(
                                staff.type,
                                "pricing",
                                e.target.value
                              )
                            }
                            className="border p-2 rounded-md w-[6rem] outline-none"
                            required
                          />
                        </div>
                        {/* UOM */}
                        <div className="flex flex-col gap-1">
                          <label className="text-primary">UOM</label>
                          <input
                            type="text"
                            value={
                              formValues[field.key]?.[staff.type]?.UOM ||
                              staff.UOM
                            }
                            onChange={(e) =>
                              handleCapacityChange(
                                staff.type,
                                "UOM",
                                e.target.value
                              )
                            }
                            className="border p-2 rounded-md w-[5rem] outline-none"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No staff details available for {selectedTitle}.
                  </p>
                )}
              </div>
            </div>
          );
        } else if (
          field.key === "Capacity&Pricing" &&
          field.type === "object"
        ) {
          const handleCapacityChange = (staffType, key, value) => {
            setFormValues((prev) => {
              const updatedCapacity = { ...prev[field.key] };
              if (!updatedCapacity[staffType]) {
                updatedCapacity[staffType] = {};
              }
              updatedCapacity[staffType][key] = value;
              return { ...prev, [field.key]: updatedCapacity };
            });
          };

          // Check if field.items is an array (with staffType) or an object (without staffType)
          const isArrayWithStaffType = Array.isArray(field.items);
          const isObjectWithoutStaffType =
            typeof field.items === "object" && !Array.isArray(field.items);

          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3 flex flex-col gap-4">
                {/* Case 1: field.items is an array with staffType */}
                {isArrayWithStaffType &&
                  field.items?.map((staff, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-5 items-center justify-center gap-2"
                    >
                      <p className="text-lg text-primary font-semibold">
                        {staff?.type}
                      </p>
                      <div className="col-span-4 flex gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-primary">Min</label>
                          <input
                            type="number"
                            value={
                              formValues[field.key]?.[staff.type]
                                ?.minCapacity || staff.minCapacity
                            }
                            onChange={(e) =>
                              handleCapacityChange(
                                staff.type,
                                "minCapacity",
                                e.target.value
                              )
                            }
                            className="border p-2 rounded-md w-[5rem] outline-none"
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-primary">Max</label>
                          <input
                            type="number"
                            value={
                              formValues[field.key]?.[staff.type]
                                ?.maxCapacity || staff.maxCapacity
                            }
                            onChange={(e) =>
                              handleCapacityChange(
                                staff.type,
                                "maxCapacity",
                                e.target.value
                              )
                            }
                            className="border p-2 rounded-md w-[5rem] outline-none"
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-primary">Pricing</label>
                          <input
                            type="number"
                            value={
                              formValues[field.key]?.[staff.type]?.pricing ||
                              staff.pricing
                            }
                            onChange={(e) =>
                              handleCapacityChange(
                                staff.type,
                                "pricing",
                                e.target.value
                              )
                            }
                            className="border p-2 rounded-md w-[6rem] outline-none"
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-primary">UOM</label>
                          <input
                            type="text"
                            value={
                              formValues[field.key]?.[staff.type]?.UOM ||
                              staff.UOM
                            }
                            onChange={(e) =>
                              handleCapacityChange(
                                staff.type,
                                "UOM",
                                e.target.value
                              )
                            }
                            className="border p-2 rounded-md w-[5rem] outline-none"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Case 2: field.items is an object without staffType */}
                {isObjectWithoutStaffType &&
                  Object.entries(field.items).map(
                    ([staffType, details], index) => (
                      <div
                        key={index}
                        className="grid grid-cols-5 items-center justify-center gap-2"
                      >
                        <p className="text-lg text-primary font-semibold">
                          {staffType}
                        </p>
                        <div className="col-span-4 flex gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-primary">Min</label>
                            <input
                              type="number"
                              value={
                                formValues[field.key]?.[staffType]
                                  ?.minCapacity || details.minCapacity
                              }
                              onChange={(e) =>
                                handleCapacityChange(
                                  staffType,
                                  "minCapacity",
                                  e.target.value
                                )
                              }
                              className="border p-2 rounded-md w-[5rem] outline-none"
                              required
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-primary">Max</label>
                            <input
                              type="number"
                              value={
                                formValues[field.key]?.[staffType]
                                  ?.maxCapacity || details.maxCapacity
                              }
                              onChange={(e) =>
                                handleCapacityChange(
                                  staffType,
                                  "maxCapacity",
                                  e.target.value
                                )
                              }
                              className="border p-2 rounded-md w-[5rem] outline-none"
                              required
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-primary">Pricing</label>
                            <input
                              type="number"
                              value={
                                formValues[field.key]?.[staffType]?.pricing ||
                                details.pricing
                              }
                              onChange={(e) =>
                                handleCapacityChange(
                                  staffType,
                                  "pricing",
                                  e.target.value
                                )
                              }
                              className="border p-2 rounded-md w-[6rem] outline-none"
                              required
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-primary">UOM</label>
                            <input
                              type="text"
                              value={
                                formValues[field.key]?.[staffType]?.UOM ||
                                details.UOM || "Per Person"
                              }
                              onChange={(e) =>
                                handleCapacityChange(
                                  staffType,
                                  "UOM",
                                  e.target.value
                                )
                              }
                              className="border p-2 rounded-md w-[5rem] outline-none"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          );
        } else if (field.type === "text" && field.key === "Terms&Conditions") {
          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="bg-textLightGray col-span-3">
                <ReactQuill
                  theme="snow"
                  value={
                    typeof formValues[field.key] === "string"
                      ? formValues[field.key]
                      : ""
                  }
                  onChange={(value) => handleChange(field.key, value)}
                  style={editorStyle}
                  required
                  readOnly={isEditing}
                />
              </div>
            </div>
          );
        } else if (field.type === "textarea" && field.key === "Description") {
          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className=" col-span-3  border-2 w-[25rem] border-2 outline-none p-1 rounded-md text-textGray font-medium ">
                <textarea
                  value={formValues[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  rows={2}
                  required
                  readOnly={isEditing}
                  className="border-none outline-none w-full"
                />
              </div>
            </div>
          );
        } else if (field.type === "object" && field.key === "TravelCharges") {
          const items = Array.isArray(field.items) ? field.items : []; // Ensure it's always an array
          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3">
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    {/* Free Upto */}
                    <div className="flex flex-row gap-2">
                      <label className="text-textGray font-medium">
                        Free Upto:
                      </label>
                      <span className="flex items-center justify-center h-[2rem]">
                        <input
                          type="number"
                          value={
                            formValues[field.key]?.[index]?.["Free Upto"] || ""
                          }
                          onChange={(e) =>
                            handleObjectChange(
                              field.key,
                              index,
                              "Free Upto",
                              e.target.value
                            )
                          }
                          className="border-2 p-1 rounded-l-md text-textGray font-medium w-[5rem] h-full outline-none"
                          required
                        />
                        <p className="bg-textYellow text-primary font-medium h-full flex items-center justify-center rounded-r-md p-1">
                          Kms
                        </p>
                      </span>
                    </div>

                    {/* Thereon */}
                    <div className="flex flex-row gap-2">
                      <label className="text-textGray font-medium">
                        Thereon:
                      </label>
                      <span className="flex items-center justify-center h-[2rem]">
                        <p className="bg-textYellow px-3 py-1 h-full rounded-l-md font-medium text-primary">
                          ₹
                        </p>
                        <input
                          type="number"
                          value={formValues[field.key]?.[index]?.thereon || ""}
                          onChange={(e) =>
                            handleObjectChange(
                              field.key,
                              index,
                              "thereon",
                              e.target.value
                            )
                          }
                          className="border-2 p-1 rounded-r-md text-textGray font-medium w-[5rem] h-full outline-none"
                          required
                        />
                      </span>
                      <p className="text-textGray text-sm">*Per Km</p>
                    </div>

                    {/* <div className="flex flex-row gap-2 items-center justify-center">
                      <label className="text-textGray font-medium">UOM:</label>
                      <p className="text-textGray text-sm">
                        {item["Uom"] || ""}
                      </p>
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (
          field.type === "object" &&
          (field.key === "SessionLength" ||
            field.key === "Duration&Pricing" ||
            field.key === "Session&Tarrif" ||
            field.key === "SessionLength&Pricing")
        ) {
          const items = Array.isArray(field.items) ? field.items : [];

          const isBookForIngredientsNo =
            formValues["BookforIngredients"] === "no";

          if (field.key === "Duration&Pricing" && !isBookForIngredientsNo) {
            return null;
          }

          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3">
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2">
                    {/* Min */}
                    <div className="flex flex-col items-center justify-center gap-2">
                      <label className="text-textGray font-medium">Min</label>
                      <div className="border-2 p-1 rounded-md text-textGray font-medium flex items-center justify-center">
                        <input
                          type="text"
                          value={formValues[field.key]?.[index]?.Min || ""}
                          onChange={(e) =>
                            handleObjectChange(
                              field.key,
                              index,
                              "Min",
                              e.target.value
                            )
                          }
                          className="w-[4rem] h-full outline-none h-[2rem]"
                          required
                        />
                        <p>{item["UOM"] === "Per Hrs" ? "hrs" : "mins"} </p>
                      </div>
                    </div>
                    {/* Max */}
                    <div className="flex flex-col items-center justify-center gap-2">
                      <label className="text-textGray font-medium">Max</label>
                      <div className="border-2 p-1 rounded-md text-textGray font-medium flex items-center justify-center">
                        <input
                          type="text"
                          value={formValues[field.key]?.[index]?.Max || ""}
                          onChange={(e) =>
                            handleObjectChange(
                              field.key,
                              index,
                              "Max",
                              e.target.value
                            )
                          }
                          className=" w-[4rem] h-full outline-none h-[2rem]"
                          required
                        />
                        <p>{item["UOM"] === "Per Hrs" ? "hrs" : "mins"} </p>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <label className="text-textGray font-medium">
                        Amount
                      </label>
                      <div className="h-[2rem]">
                        <span className="bg-textYellow px-3 py-1 h-full rounded-l-md font-medium text-primary">
                          ₹
                        </span>
                        <input
                          type="text"
                          value={formValues[field.key]?.[index]?.Amount || ""}
                          onChange={(e) =>
                            handleObjectChange(
                              field.key,
                              index,
                              "Amount",
                              e.target.value
                            )
                          }
                          className="border-2 p-1 rounded-r-md text-textGray font-medium w-[5rem] h-full outline-none h-full"
                          required
                        />
                      </div>
                    </div>

                    {/* UOM */}
                    <div className="flex flex-col items-center justify-center gap-2">
                      <label className="text-textGray font-medium">UOM</label>
                      <select
                        value={formValues[field.key]?.[index]?.UOM || ""}
                        onChange={(e) =>
                          handleObjectChange(
                            field.key,
                            index,
                            "UOM",
                            e.target.value
                          )
                        }
                        className="border-2  outline-none p-2 rounded-md text-textGray font-medium w-full"
                        required
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        {[
                          "Per 30 mins",
                          "Per Hour",
                          "Per Session",
                          "Per Package",
                          "Per Unit",
                        ]?.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (field.type === "object" && field.key === "NightTimeSlot") {
          const items = Array.isArray(field.items) ? field.items : [];

          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 items-center justify-center gap-4"
                  >
                    <div className=" border-2 flex items-center gap-1 px-2 py-1 h-fit w-fit rounded-md">
                      <div className="flex flex-row items-center justfiy-center gap-2">
                        <input
                          type="time"
                          value={
                            formValues[field.key]?.[index]?.StartTime ||
                            "00:00:00"
                          }
                          onChange={(e) =>
                            handleObjectChange(
                              field.key,
                              index,
                              "StartTime",
                              e.target.value
                            )
                          }
                          className=" rounded-md text-textGray font-medium w-[5rem] h-full outline-none"
                          disabled={isEditing}
                          required
                        />
                        <p className="text-textGray font-medium ">PM</p>
                      </div>
                      <p className="text-textGray font-medium ">TO</p>
                      <div className="flex flex-row items-center justfiy-center gap-2">
                        <input
                          type="time"
                          value={
                            formValues[field.key]?.[index]?.EndTime ||
                            "00:00:00"
                          }
                          onChange={(e) =>
                            handleObjectChange(
                              field.key,
                              index,
                              "EndTime",
                              e.target.value
                            )
                          }
                          className=" rounded-md text-textGray font-medium w-[5rem] h-full outline-none"
                          disabled={isEditing}
                          required
                        />
                        <p className="text-textGray font-medium ">AM</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-row gap-2">
                      <div className="flex items-center justify-center h-[2rem]">
                        <span className="bg-textYellow px-3 py-1 h-full rounded-l-md font-medium text-primary">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={
                            formValues[field.key]?.[index]?.AdditionalCharges ||
                            ""
                          }
                          onChange={(e) =>
                            handleObjectChange(
                              field.key,
                              index,
                              "AdditionalCharges",
                              e.target.value
                            )
                          }
                          className="border-2 p-1 rounded-r-md text-textGray font-medium w-[5rem] h-full outline-none"
                          disabled={isEditing}
                          required
                        />
                      </div>
                      <p className="text-sm text-textGray">
                        {"*" + item["Uom"] || "*extra per hour"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (field.type === "object" && field.key === "QtyPricing") {
          const items = Array.isArray(field.items) ? field.items : [];

          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3">
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4">
                    {/* Max */}
                    <div className="flex flex-col gap-2">
                      <label className="text-textGray font-medium">
                        Min Qty
                      </label>
                      <input
                        type="number"
                        value={formValues[field.key]?.[index]?.MinQty || ""}
                        onChange={(e) =>
                          handleObjectChange(
                            field.key,
                            index,
                            "MinQty",
                            e.target.value
                          )
                        }
                        className="border-2 p-1 rounded-md text-textGray font-medium w-[5rem] h-full outline-none"
                        disabled={isEditing}
                        required
                      />
                    </div>

                    {/* Min */}
                    <div className="flex flex-col gap-2">
                      <label className="text-textGray font-medium">Rates</label>
                      <div className="h-[2rem]">
                        <span className="bg-textYellow px-3 py-1 h-full rounded-l-md font-medium text-primary">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={formValues[field.key]?.[index]?.Rates || ""}
                          onChange={(e) =>
                            handleObjectChange(
                              field.key,
                              index,
                              "Rates",
                              e.target.value
                            )
                          }
                          className="border-2 p-1 rounded-r-md text-textGray font-medium w-[5rem] h-full outline-none"
                          disabled={isEditing}
                          required
                        />
                      </div>
                    </div>

                    {/* UOM */}
                    <div className="flex flex-col gap-2">
                      <label className="text-textGray font-medium">UOM:</label>
                      <p>{item["Uom"] || "extra per hour"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (field.type === "object" && field.key === "Pricing") {
          const items = Array.isArray(field.items) ? field.items : [];

          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3">
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4">
                    {/* Max */}
                    <div className="flex flex-col gap-2">
                      <label className="text-textGray font-medium">
                        Min Qty
                      </label>
                      <input
                        type="number"
                        value={formValues[field.key]?.[index]?.MinQty || ""}
                        onChange={(e) =>
                          handleObjectChange(
                            field.key,
                            index,
                            "MinQty",
                            e.target.value
                          )
                        }
                        className="border-2 p-1 rounded-md text-textGray font-medium w-[5rem] h-full outline-none"
                        disabled={isEditing}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-textGray font-medium">
                        Max Qty
                      </label>
                      <input
                        type="number"
                        value={formValues[field.key]?.[index]?.MaxQty || ""}
                        onChange={(e) =>
                          handleObjectChange(
                            field.key,
                            index,
                            "MaxQty",
                            e.target.value
                          )
                        }
                        className="border-2 p-1 rounded-md text-textGray font-medium w-[5rem] h-full outline-none"
                        disabled={isEditing}
                        required
                      />
                    </div>
                    {/* Min */}
                    <div className="flex flex-col gap-2">
                      <label className="text-textGray font-medium">Rates</label>
                      <div className="h-[2rem] ">
                        <span className="bg-textYellow px-3 py-1 h-full rounded-l-md font-medium text-primary">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={formValues[field.key]?.[index]?.Rates || ""}
                          onChange={(e) =>
                            handleObjectChange(
                              field.key,
                              index,
                              "Rates",
                              e.target.value
                            )
                          }
                          className="border-2 p-1 rounded-r-md text-textGray font-medium w-[5rem] h-full outline-none"
                          disabled={isEditing}
                          required
                        />
                      </div>
                    </div>

                    {/* UOM */}
                    <div className="flex flex-col gap-2">
                      <label className="text-textGray font-medium">UOM:</label>
                      <p>{item["Uom"] || "extra per hour"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (
          field.type === "object" &&
          (field.key === "SizePricing" ||
            field.key === "Size&Pricing" ||
            field.key === "GuestCapacity" ||
            field.key === "Size&Dimensions" ||
            field.key === "SizeAndDimension")
        ) {
          const items = Array.isArray(field.items) ? field.items : [];

          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3">
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 mb-2">
                    {Object.keys(item).map((key) => {
                      if (key !== "Uom") {
                        return (
                          <div
                            key={key}
                            className="flex flex-col items-center gap-2"
                          >
                            <label className="text-textGray font-medium">
                              {key}
                            </label>
                            {
                              <div className="flex items-center justify-center">
                                {key === "Price" && (
                                  <span className="bg-textYellow px-3 py-1 h-full rounded-l-md font-medium text-primary">
                                    ₹
                                  </span>
                                )}
                                <input
                                  type="text"
                                  value={
                                    formValues[field.key]?.[index]?.[key] || ""
                                  }
                                  onChange={(e) =>
                                    handleObjectChange(
                                      field.key,
                                      index,
                                      key,
                                      e.target.value
                                    )
                                  }
                                  className={
                                    key === "Price"
                                      ? "border-2 p-1 rounded-r-md text-textGray font-medium w-[5rem] h-full outline-none"
                                      : "border-2 p-1 rounded-md text-textGray font-medium w-[5rem] h-full outline-none"
                                  }
                                  disabled={isEditing}
                                  required={
                                    field.key == "SizeAndDimension"
                                      ? false
                                      : true
                                  }
                                />
                              </div>
                            }
                          </div>
                        );
                      }
                      return null;
                    })}

                    {/* UOM */}
                    {field.key !== "Size&Dimensions" ||
                      (field.key !== "SizeAndDimension" && (
                        <div className="flex flex-col gap-2">
                          <label className="text-textGray font-medium">
                            UOM:
                          </label>
                          <p className="text-textGray">
                            {item["Uom"] || "extra per hour"}
                          </p>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (field.type === "object" && field.key === "Menu&Breakup") {
          const items = Array.isArray(field.items) ? field.items : [];

          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3">
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    {/* Dynamically render inputs */}
                    <p></p>
                    <p className="col-span-1 text-textGray grid items-center justify-start ">
                      No. of Items
                    </p>
                    {Object.keys(item).map((key) => {
                      if (key !== "Uom") {
                        return (
                          <div
                            key={key}
                            className=" col-span-2 flex flex-row gap-4"
                          >
                            <label
                              className="text-textGray font-medium"
                              style={{ flex: "0.45" }}
                            >
                              {key}
                            </label>
                            <input
                              type="text"
                              value={
                                formValues[field.key]?.[index]?.[key] || ""
                              }
                              onChange={(e) =>
                                handleObjectChange(
                                  field.key,
                                  index,
                                  key,
                                  e.target.value
                                )
                              }
                              className="border-2 p-1 rounded-md text-textGray font-medium w-[5rem] h-full outline-none"
                              required
                              disabled={isEditing}
                              style={{ flex: "0.45" }}
                            />
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (
          field.type === "array" &&
          (field.key === "AddOns" ||
            field.key === "QtyPricing" ||
            field.key === "Package")
        ) {
          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3 flex items-center flex-col-reverse justify-start  gap-8">
                <button
                  type="button"
                  className="text-primary px-4 py-2 rounded flex items-center justify-center gap-1 font-medium"
                  onClick={() =>
                    handleAddObject(field.key, field.items[0] || {})
                  }
                >
                  <IoAddCircleOutline className="text-xl" /> {field.label}
                </button>
                {(formValues[field.key] || []).map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-wrap gap-4 h-fit mb-[5%] w-full"
                  >
                    {Object.keys(item).map((objectKey, subIndex) => (
                      <div
                        key={subIndex}
                        className="flex items-center justify-center flex-col gap-1 items-center"
                      >
                        <label className="text-primary text-base">
                          {objectKey}
                        </label>
                        <div
                          className={
                            objectKey === "Note"
                              ? "h-[2rem] flex items-center justify-center px-4"
                              : "h-[2rem] flex items-center justify-center"
                          }
                        >
                          {objectKey === "Amount" && (
                            <span className="bg-textYellow px-3 py-1 h-full rounded-l-md font-medium text-primary">
                              ₹
                            </span>
                          )}{" "}
                          {objectKey === "Rates" && (
                            <span className="bg-textYellow px-3 py-1 h-full rounded-l-md font-medium text-primary">
                              ₹
                            </span>
                          )}{" "}
                          {objectKey === "UOM" && (
                            <span className="h-full px-2 py-1 bg-textYellow text-primary font-medium">
                              Per
                            </span>
                          )}
                          {objectKey === "Details" ? (
                            <div className=" h-fit">
                              <ReactQuill
                                theme="snow"
                                value={item[objectKey] || ""}
                                onChange={(value) =>
                                  handleObjectChange(
                                    field.key,
                                    index,
                                    objectKey,
                                    value
                                  )
                                }
                                style={editorStyle}
                                required
                                readOnly={isEditing}
                                placeholder={objectKey}
                                className="h-[5rem] overflow-y bg-textLightGray"
                              />
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={item[objectKey] || ""}
                              onChange={(e) =>
                                handleObjectChange(
                                  field.key,
                                  index,
                                  objectKey,
                                  e.target.value
                                )
                              }
                              className="border p-2 rounded outline-none border-2 w-[10rem] h-full "
                              placeholder={objectKey}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="text-red-500 self-end mt-2 flex items-center gap-2"
                      onClick={() => handleRemoveObject(field.key, index)}
                    >
                      <ImCancelCircle />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (
          field.type === "array" &&
          field.key === "OrderQuantity&Pricing"
        ) {
          const isBookForIngredients =
            formValues["BookforIngredients"] === "yes";
          if (!("BookforIngredients" in formValues) || isBookForIngredients) {
            return (
              <div
                key={field._id}
                className="col-span-2 grid grid-cols-4 gap-4"
              >
                <label className="text-primary text-base font-semibold">
                  {field.label}:
                </label>
                <div className="col-span-3 flex items-center flex-col-reverse justify-center gap-2">
                  <button
                    type="button"
                    className="text-primary px-4 py-2 rounded flex items-center justify-center gap-1 font-medium"
                    onClick={() =>
                      handleAddObject(field.key, field.items[0] || {})
                    }
                    disabled={isEditing}
                  >
                    <IoAddCircleOutline className="text-xl" /> {field.label}
                  </button>
                  {(formValues[field.key] || []).map((item, index) => (
                    <div key={index} className="flex flex-wrap gap-4">
                      {Object.keys(item).map((objectKey, subIndex) => (
                        <div
                          key={subIndex}
                          className="flex items-center justify-center flex-col gap-1 items-center"
                        >
                          {objectKey !== "Device Name" &&
                          objectKey !== "Name" &&
                          objectKey !== "Flavour/Variety" ? (
                            <label className="text-textGray text-sm text-wrap  ">
                              {objectKey}
                            </label>
                          ) : (
                            <label className="text-textGray text-sm opacity-0">
                              {objectKey}
                            </label>
                          )}

                          {objectKey === "Uom" ? (
                            <p className="text-textGray text-sm">
                              {item[objectKey]}
                            </p>
                          ) : (
                            <div className="h-[2rem]">
                              {objectKey === "Rates" && (
                                <span className="bg-textYellow px-3 py-1 h-full rounded-l-md font-medium text-primary">
                                  ₹
                                </span>
                              )}
                              <input
                                type="text"
                                value={item[objectKey] || ""}
                                onChange={(e) =>
                                  handleObjectChange(
                                    field.key,
                                    index,
                                    objectKey,
                                    e.target.value
                                  )
                                }
                                className={
                                  objectKey === "Min Days" ||
                                  objectKey === "Max Days" ||
                                  objectKey === "Stock" ||
                                  objectKey === "Rates" ||
                                  objectKey === "Min servings" ||
                                  objectKey === "Max servings" ||
                                  objectKey === "Serving Size" ||
                                  objectKey === "Servings per Batch"
                                    ? "border p-2 rounded outline-none border-2 w-[4rem] h-full"
                                    : "border p-2 rounded outline-none border-2 w-[7rem] h-full"
                                }
                                required={
                                  objectKey === "Servings per Batch"
                                    ? false
                                    : true
                                }
                                disabled={isEditing}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="text-red-500 self-end mt-2 flex items-center gap-2"
                        onClick={() => handleRemoveObject(field.key, index)}
                        disabled={isEditing}
                      >
                        <ImCancelCircle />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return null;
        } else if (field.type === "array" && field.key === "VehicleTarrifs") {
          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3 flex items-center flex-col-reverse justify-center gap-2">
                <button
                  type="button"
                  className="text-primary px-4 py-2 rounded flex items-center justify-center gap-1 font-medium"
                  onClick={() =>
                    handleAddObject(field.key, field.items[0] || {})
                  }
                  disabled={isEditing}
                >
                  <IoAddCircleOutline className="text-xl" /> {field.label}
                </button>
                {(formValues[field.key] || []).map((item, index) => (
                  <div key={index} className="flex flex-wrap gap-4">
                    {Object.keys(item).map((objectKey, subIndex) => (
                      <div
                        key={subIndex}
                        className="flex items-center justify-center flex-col gap-1 items-center"
                      >
                        <label className="text-sm">{objectKey}</label>
                        <input
                          type="text"
                          value={item[objectKey] || ""}
                          onChange={(e) =>
                            handleObjectChange(
                              field.key,
                              index,
                              objectKey,
                              e.target.value
                            )
                          }
                          className="border p-2 rounded outline-none border-2 w-[6rem]"
                          required
                          disabled={isEditing}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="text-red-500 self-end mt-2 flex items-center gap-2"
                      onClick={() => handleRemoveObject(field.key, index)}
                      disabled={isEditing}
                    >
                      <ImCancelCircle />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (
          field.type === "file" &&
          (field.key === "CoverImage" ||
            field.key === "FloorPlan" ||
            field.key === "RecceReport" ||
            field.key === "Certifications&Licenses")
        ) {
          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3 flex  items-center justify-start gap-4 ">
                <div className="relative cursor-pointer flex items-center justify-center flex-col text-textGray border-2 border-dashed border-primary p-3 rounded-md">
                  <IoCloudUploadOutline className="text-primary text-2xl mb-4" />
                  <p className="text-textGray">
                    Drop your {field.label} or <span>Browse {field.label}</span>
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const selectedFiles = Array.from(e.target.files);
                      handleSingleFileChange(field.key, selectedFiles);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                {formValues?.[`${field.key}`] && (
                  <span className="text-textGray bg-textLightGray flex p-1 rounded-md gap-2 items-center flex-col">
                    {formValues[`${field.key}`] && (
                      <img
                        src={
                          process.env.REACT_APP_API_Aws_Image_BASE_URL +
                          formValues[`${field.key}`]
                        }
                        alt="Selected"
                        className="w-[10rem] rounded-md object-cover"
                      />
                    )}

                    <button
                      onClick={() => handleChange(`${field.key}`, null)}
                      className="px-3 py-1"
                    >
                      <ImCancelCircle />
                    </button>
                  </span>
                )}
              </div>
            </div>
          );
        } else if (field.type === "file" && field.key === "3DTour") {
          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}*:
              </label>
              <div className="col-span-3 flex items-center justify-start gap-4">
                <div className="flex items-center justify-center flex-col text-textGray ">
                  <div className="relative cursor-pointer flex items-center justify-center flex-col text-textGray border-2 border-dashed border-primary p-3 rounded-md">
                    <IoCloudUploadOutline className="text-primary text-2xl mb-4" />
                    <p className="text-textGray">
                      Drop your Video or <span>Browse Video</span>
                    </p>
                    <input
                      type="file"
                      accept="video/mp4, video/webm"
                      onChange={(e) => {
                        const maxFileSize = 50 * 1024 * 1024; // 50 MB in bytes
                        const selectedFiles = Array.from(e.target.files);
                        const oversizedFiles = selectedFiles.filter(
                          (file) => file.size > maxFileSize
                        );

                        if (oversizedFiles?.length > 0) {
                          alert(
                            "One or more files exceed the maximum size of 50MB."
                          );
                          return;
                        }

                        handleSingleFileChange(field.key, selectedFiles);
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>

                  {formValues?.["3DTour"] && (
                    <p className="text-textGray mt-2">*Upload 1 Video</p>
                  )}
                </div>
                {formValues?.[`${field.key}`] && (
                  <span className="text-textGray bg-textLightGray flex p-1 rounded-md gap-1">
                    <img
                      src={
                        typeof formValues[`${field.key}`] === "string"
                          ? process.env.REACT_APP_API_Aws_Image_BASE_URL +
                            formValues[`${field.key}`]
                          : URL?.createObjectURL(formValues[`${field.key}`])
                      }
                      alt="Selected"
                      className="w-[10rem] rounded-md object-cover"
                    />
                    {/* Display the name if the value is a File */}
                    {typeof formValues[`${field.key}`] === "object" &&
                      formValues[`${field.key}`]?.name && (
                        <p>{formValues[`${field.key}`].name}</p>
                      )}
                    <button
                      onClick={() => handleChange(`${field.key}`, null)} // Remove specific file
                      className="px-3 py-1"
                    >
                      <ImCancelCircle />
                    </button>
                  </span>
                )}
              </div>
            </div>
          );
        } else if (field.type === "file" && field.key === "ProductImage") {
          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3 flex items-center justify-start gap-4">
                <div className="flex items-center justify-center flex-col text-textGray ">
                  <div className="relative cursor-pointer flex items-center justify-center flex-col text-textGray border-2 border-dashed border-primary p-3 rounded-md">
                    <IoCloudUploadOutline className="text-primary text-2xl mb-4" />
                    <p className="text-textGray">
                      Drop your Photo or <span>Browse Photo</span>
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const selectedFiles = Array.from(e.target.files);
                        const existingFiles = formValues?.ProductImage || [];
                        if (selectedFiles?.length + existingFiles?.length > 3) {
                          alert("You can only upload up to 3 images.");
                          return;
                        }

                        const onlyImages = selectedFiles.filter((file) =>
                          file.type.startsWith("image/")
                        );
                        handleChange(field.key, [
                          ...existingFiles,
                          ...onlyImages,
                        ]);
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>

                  {formValues?.ProductImage && (
                    <p className="text-textGray mt-2">*Upload up to 3 photos</p>
                  )}
                </div>
                {Array.isArray(formValues?.ProductImage) &&
                  formValues?.ProductImage?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formValues?.ProductImage?.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-textGray bg-textLightGray flex p-1 rounded-md justify-between items-center gap-1"
                        >
                          <img
                            src={
                              typeof item === "string"
                                ? process.env.REACT_APP_API_Aws_Image_BASE_URL +
                                  item
                                : item instanceof File || item instanceof Blob
                                ? URL.createObjectURL(item)
                                : "" // Fallback for invalid types
                            }
                            alt="Selected"
                            className="w-[10rem] rounded-md object-cover"
                          />
                          <p>
                            {typeof item === "object" && item?.name
                              ? item.name
                              : "Uploaded File"}
                          </p>
                          <button
                            className="text-primary hover:text-red-500"
                            onClick={() => {
                              const updatedImages = [
                                ...formValues.ProductImage,
                              ];
                              updatedImages.splice(idx, 1); // Remove image by index
                              handleChange(field.key, updatedImages); // Update form values
                            }}
                          >
                            <ImCancelCircle />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          );
        } else if (field.type === "array" && field.key === "Portfolio") {
          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3 flex flex-col gap-4">
                <div className="col-span-2 flex flex-col gap-4">
                  {/* Ensure field.items is a valid object */}
                  {field.items && (
                    <div className="grid grid-cols-2 gap-4">
                      {/* Photos Section */}
                      <div className="flex flex-col gap-2">
                        <div className="relative cursor-pointer flex items-center justify-center flex-col text-textGray border-2 border-dashed border-primary p-3 rounded-md">
                          <IoCloudUploadOutline className="text-primary text-2xl mb-4" />
                          <p className="text-textGray">
                            Drop your Photo or <span>Browse Photo</span>
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            multiple={totalNumberOfPhotoAllowed}
                            onChange={(e) => {
                              const selectedFiles = Array.from(e.target.files);
                              const existingPhotos =
                                formValues?.Portfolio?.photos || [];
                              const totalSelected =
                                existingPhotos?.length + selectedFiles?.length;

                              if (totalSelected > totalNumberOfPhotoAllowed) {
                                alert(
                                  `You can only upload up to ${totalNumberOfPhotoAllowed} photos.`
                                );
                                return;
                              }

                              handleFileChange(
                                field.key,
                                "photos",
                                selectedFiles
                              ); // No index
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                        {/* Render Photos */}
                        <div className="flex flex-wrap gap-1">
                          {(formValues?.Portfolio?.photos || [])?.map(
                            (photo, photoIdx) => (
                              <div
                                key={photoIdx}
                                className="text-textGray bg-textLightGray flex p-1 rounded-md gap-1"
                              >
                                <img
                                  src={
                                    typeof photo === "string"
                                      ? process.env
                                          .REACT_APP_API_Aws_Image_BASE_URL +
                                        photo
                                      : URL?.createObjectURL(photo)
                                  }
                                  alt="Selected"
                                  className="w-[10rem] rounded-md object-cover"
                                />
                                <button
                                  onClick={() =>
                                    handleFileRemove(
                                      field.key,
                                      "photos",
                                      photoIdx
                                    )
                                  }
                                  className="px-3 py-1"
                                >
                                  <ImCancelCircle />
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Videos Section */}
                      <div className="flex flex-col gap-2">
                        <div className="relative cursor-pointer flex items-center justify-center flex-col text-textGray border-2 border-dashed border-primary p-3 rounded-md">
                          <IoCloudUploadOutline className="text-primary text-2xl mb-4" />
                          <p className="text-textGray">
                            Drop your Video or <span>Browse Video</span>
                          </p>
                          <input
                            type="file"
                            accept="video/mp4, video/webm"
                            multiple={totalNumberOfvideeAllowed}
                            onChange={(e) => {
                              const maxFileSize = 100 * 1024 * 1024; // 100 MB
                              const selectedFiles = Array.from(e.target.files);

                              const existingVideos =
                                formValues?.Portfolio?.videos || [];
                              if (existingVideos?.length > 10) {
                                alert(
                                  "You can only upload !0 video. Please remove the existing video before uploading a new one."
                                );
                                return;
                              }

                              // Check for oversized files
                              const oversizedFiles = selectedFiles.filter(
                                (file) => file.size > maxFileSize
                              );
                              if (oversizedFiles?.length > 0) {
                                alert(
                                  "One or more files exceed the maximum size of 100MB."
                                );
                                return;
                              }

                              handleFileChange(
                                field.key,
                                "videos",
                                selectedFiles
                              ); // No index
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                        {/* Render Videos */}
                        <div className="flex flex-wrap gap-1">
                          {(formValues?.Portfolio?.videos || [])?.map(
                            (video, videoIdx) => (
                              <div
                                key={videoIdx}
                                className="text-textGray bg-textLightGray flex p-1 rounded-md gap-1"
                              >
                                <video
                                  controls
                                  className="w-[10rem] rounded-md object-cover"
                                >
                                  <source
                                    src={
                                      typeof video === "string"
                                        ? process.env
                                            .REACT_APP_API_Aws_Image_BASE_URL +
                                          video
                                        : URL?.createObjectURL(video)
                                    }
                                    type="video/mp4"
                                    alt="Selected"
                                  />
                                </video>
                                <button
                                  onClick={() =>
                                    handleFileRemove(
                                      field.key,
                                      "videos",
                                      videoIdx
                                    )
                                  }
                                  className="px-3 py-1"
                                >
                                  <ImCancelCircle />
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        } else if (
          field.type === "array" &&
          field.key !== "SubVenueDetails" &&
          field.key !== "Seasons" &&
          field.key !== "DistanceFrom"
        ) {
          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3 flex items-start justify-start flex-col gap-2">
                <span className="flex items-center justify-start w-full">
                  <input
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value.trim()) {
                        e.preventDefault();
                        handleArrayChange(field.key, e.target.value.trim());
                        e.target.value = "";
                      }
                    }}
                    className="border-2 w-[60%] border-2 outline-none p-1 rounded-l-lg text-textGray font-medium"
                    disabled={isEditing}
                  />
                  <p className="bg-textYellow p-2 rounded-r-lg">
                    <FaArrowTurnUp className="font-normal text-xl text-textGray rotate-90 " />
                  </p>
                </span>
                <p className="text-sm text-textGray">
                  After typing each word, press Enter to submit.
                </p>
                <div className="flex items-center justify-start gap-2 flex-wrap">
                  {(formValues[field.key] || []).map((item, index) => (
                    <span
                      key={index}
                      className="bg-textLightGray text-textGray py-1 px-3 flex items-center justify-center gap-1"
                    >
                      {item}{" "}
                      <ImCancelCircle
                        className="text-textGray cursor-pointer"
                        onClick={() => {
                          setFormValues((prev) => ({
                            ...prev,
                            [field.key]: prev[field.key].filter(
                              (_, idx) => idx !== index
                            ),
                          }));
                        }}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        } else if (field.type === "multi-select") {
          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3 flex items-start justify-start flex-wrap gap-3">
                {(field.items || []).map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`py-2 px-4 rounded border ${
                      formValues[field.key]?.includes(item)
                        ? "bg-textYellow text-textGray border-textYellow"
                        : "bg-white text-textGray border-gray-300 border-textYellow"
                    }`}
                    onClick={() => {
                      setFormValues((prev) => {
                        const currentSelection = prev[field.key] || [];
                        if (currentSelection.includes(item)) {
                          return {
                            ...prev,
                            [field.key]: currentSelection.filter(
                              (selectedItem) => selectedItem !== item
                            ),
                          };
                        } else {
                          return {
                            ...prev,
                            [field.key]: [...currentSelection, item],
                          };
                        }
                      });
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          );
        } else if (field.type === "sub-multi-select") {
          const selectedType = formValues["Type"];
          if (
            String(field.key).trim() !==
            String(selectedType).replace(/\s+/g, "")
          ) {
            return null;
          }

          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3 flex items-start justify-start flex-wrap gap-3">
                {(field.items || []).map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`py-2 px-4 rounded border ${
                      formValues[field.key]?.includes(item)
                        ? "bg-textYellow text-textGray border-textYellow"
                        : "bg-white text-textGray border-gray-300 border-textYellow"
                    }`}
                    onClick={() => {
                      setFormValues((prev) => {
                        const currentSelection = prev[field.key] || [];
                        if (currentSelection.includes(item)) {
                          return {
                            ...prev,
                            [field.key]: currentSelection.filter(
                              (selectedItem) => selectedItem !== item
                            ),
                          };
                        } else {
                          return {
                            ...prev,
                            [field.key]: [...currentSelection, item],
                          };
                        }
                      });
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          );
        } else if (field.type === "select") {
          return (
            <div key={field._id} className="col-span-1 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <p></p>
              <div className="col-span-2 flex items-start justify-start flex-col gap-2">
                <select
                  value={formValues[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="border-2  outline-none p-2 rounded-md text-textGray font-medium w-full"
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {field.items.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        } else if (field.type === "sub-select") {
          const selectedType = formValues["Type"];

          const normalizeKey = (type) => {
            const typeMap = {
              Bouquets: "Bouquet",
              Centerpieces: "Centerpiece",
              " Floral Arches": "FloralArche",
              "Flower Walls": "FlowerWalls",
              "Floral Installations": "FloralInstallation",
              Backdrops: "Backdrop",
            };

            // Ensure `type` is always a string and apply the default fallback
            const normalized = (typeMap[type] || type || "").toString();
            return normalized.replace(/\s+/g, "");
          };

          const normalizedType = normalizeKey(selectedType);
          const matchingKey = `${normalizedType}Type`;

          if (String(field.key).trim() !== String(matchingKey).trim()) {
            return null;
          }

          return (
            <div key={field._id} className="col-span-1 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <p></p>
              <div className="col-span-2 flex items-start justify-start flex-col gap-2">
                <select
                  value={formValues[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="border-2 outline-none p-2 rounded-md text-textGray font-medium w-full"
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {field.items.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        } else if (
          field.type === "radio" &&
          field.key === "CustomThemeRequest"
        ) {
          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3 flex items-start justify-start flex-row gap-2">
                {(field?.items || [])?.map((item, index) => (
                  <div key={index} className="flex items-start flex-col gap-4">
                    <div className="flex items-center justify-start gap-1">
                      <input
                        type="radio"
                        id={item.key}
                        name={field.key}
                        value={item.key}
                        checked={formValues[field.key] === item.key}
                        onChange={() => {
                          setFormValues((prev) => {
                            const updatedValues = {
                              ...prev,
                              [field.key]: item.key,
                            };
                            if (item.key === "NoOption") {
                              Object.keys(prev).forEach((key) => {
                                if (key.startsWith(`${field.key}_Yes`)) {
                                  delete updatedValues[key];
                                }
                              });
                            }

                            if (item.key !== "YesOption") {
                              updatedValues[`${field.key}_text`] = "";
                            }

                            return updatedValues;
                          });
                        }}
                      />
                      <label
                        htmlFor={item.key}
                        className="text-textGray font-medium"
                      >
                        {item.label}
                      </label>
                    </div>

                    {/* Render sub-item textboxes if available */}
                    {item.items && item.items?.length > 0 && (
                      <div className="ml-4">
                        {item.items.map((subItem, subIndex) => (
                          <div
                            key={subIndex}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="text"
                              placeholder={
                                subItem.placeholder || "Enter details here..."
                              }
                              className="border rounded p-2 w-full"
                              value={
                                formValues[
                                  `${field.key}_${item.key}_${subItem.key}`
                                ] || ""
                              }
                              onChange={(e) => {
                                setFormValues((prev) => ({
                                  ...prev,
                                  [`${field.key}_${item.key}_${subItem.key}`]:
                                    e.target.value,
                                }));
                              }}
                              disabled={formValues[field.key] !== item.key} // Disable input if the radio option is not selected
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Conditionally render textbox when "Yes" is selected */}
                {formValues[field.key] === "YesOption" && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Enter details here..."
                      className="border rounded p-2 w-full"
                      value={formValues[`${field.key}_text`] || ""} // Store text separately
                      onChange={(e) => {
                        setFormValues((prev) => ({
                          ...prev,
                          [`${field.key}_text`]: e.target.value, // Store text input separately
                        }));
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        } else if (field.type === "radio") {
          return (
            <div key={field._id} className="col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field?.label}:
              </label>
              <div className="col-span-3 flex flex-row gap-4">
                {(Array.isArray(field?.items) ? field.items : []).map(
                  (item, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 text-textGray"
                    >
                      <input
                        type="radio"
                        name={field.key}
                        value={item.value}
                        checked={
                          Array.isArray(formValues[field?.key])
                            ? formValues[field.key]?.some(
                                (option) =>
                                  option?.value === item?.value &&
                                  option?.checked
                              )
                            : formValues[field.key] === item?.value
                        }
                        onChange={(e) =>
                          handleChange(field.key, e.target.value)
                        }
                        className="accent-primary"
                        required
                      />
                      {item.label}
                    </label>
                  )
                )}
              </div>
            </div>
          );
        } else if (field.type === "array" && field.key === "SubVenueDetails") {
          const subVenues =
            formValues[field.key]?.length > 0
              ? formValues[field.key]
              : [
                  {
                    Title: "",
                    CapacityMax: "",
                    PricesDuration: [],
                    CapacitySeating: [],
                    IndoorOutdoor: "",
                    EventType: [],
                    Inclusions: [],
                  },
                ];

          return (
            <div key={field._id} className="col-span-2 flex flex-col gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>

              {subVenues.map((subVenue, index) => (
                <div key={index} className="rounded-md p-4 grid gap-4 ">
                  {field.items.map((item, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4">
                      <label className="text-primary text-base font-semibold">
                        {item.label}:
                      </label>

                      <div className="col-span-2">
                        {/* Text Input */}
                        {item.type === "text" && (
                          <input
                            type="text"
                            value={subVenue[item.key] || ""}
                            onChange={(e) =>
                              handleObjectChange(
                                field.key,
                                index,
                                item.key,
                                e.target.value
                              )
                            }
                            className="border-2 p-2 rounded-md w-[25rem] text-textGray outline-none"
                            required
                          />
                        )}

                        {/* Number Input */}
                        {item.type === "number" && (
                          <input
                            type="number"
                            value={subVenue[item.key] || ""}
                            onChange={(e) =>
                              handleObjectChange(
                                field.key,
                                index,
                                item.key,
                                e.target.value
                              )
                            }
                            className="border-2 p-2 rounded-md text-textGray outline-none"
                            required
                          />
                        )}
                        {item.type === "array" &&
                          item.key !== "PricesDuration" && (
                            <div className="flex flex-col gap-2">
                              <span className="flex items-center w-full justify-start h-[2.3rem]">
                                <input
                                  type="text"
                                  placeholder={`Add ${item.label}`}
                                  onKeyDown={(e) => {
                                    if (
                                      e.key === "Enter" &&
                                      e.target.value.trim()
                                    ) {
                                      e.preventDefault();
                                      handleObjectChange(
                                        field.key,
                                        index,
                                        item.key,
                                        [
                                          ...(subVenue[item.key] || []),
                                          e.target.value.trim(),
                                        ]
                                      );
                                      e.target.value = "";
                                    }
                                  }}
                                  className="border-2 p-2 rounded-l-md w-[80%] text-textGray outline-none h-full"
                                />

                                <p className="bg-textYellow p-2 rounded-r-lg h-full">
                                  <FaArrowTurnUp className="font-normal text-xl text-textGray rotate-90 " />
                                </p>
                              </span>

                              <div className="flex flex-wrap gap-2">
                                {(subVenue[item.key] || []).map((val, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-textLightGray text-textGray py-1 px-3 flex items-center justify-center gap-1"
                                  >
                                    {val}
                                    <ImCancelCircle
                                      className="text-textGray cursor-pointer"
                                      onClick={() => {
                                        const updatedArray = (
                                          subVenue[item.key] || []
                                        ).filter((_, i) => i !== idx);
                                        handleObjectChange(
                                          field.key,
                                          index,
                                          item.key,
                                          updatedArray
                                        );
                                      }}
                                    />
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* Prices & Duration */}
                        {item.type === "array" &&
                          item.key === "PricesDuration" && (
                            <div className="flex flex-col gap-2">
                              {subVenue.PricesDuration?.map(
                                (priceDuration, pdIndex) => (
                                  <div
                                    key={pdIndex}
                                    className=" p-2 rounded-md grid grid-cols-4 gap-4"
                                  >
                                    {/* Max Capacity Input */}
                                    <input
                                      type="number"
                                      placeholder="Max Cap"
                                      value={priceDuration.MaxCapacity}
                                      onChange={(e) =>
                                        handleObjectChange(
                                          field.key,
                                          index,
                                          "PricesDuration",
                                          subVenue.PricesDuration.map(
                                            (p, idx) =>
                                              idx === pdIndex
                                                ? {
                                                    ...p,
                                                    MaxCapacity: e.target.value,
                                                  }
                                                : p
                                          )
                                        )
                                      }
                                      className="border-2 p-2 rounded-md outline-none w-[7rem] h-[2rem]"
                                      required
                                    />

                                    {/* Rent Input */}
                                    <div className="flex items-center justify-center w-[10rem] h-[2rem]">
                                      <span className="flex items-center justify-center bg-textYellow text-primary rounded-l-md p-2 h-full">
                                        <FaIndianRupeeSign />
                                      </span>
                                      <input
                                        type="number"
                                        placeholder="Rent"
                                        value={priceDuration.Rent}
                                        onChange={(e) =>
                                          handleObjectChange(
                                            field.key,
                                            index,
                                            "PricesDuration",
                                            subVenue.PricesDuration.map(
                                              (p, idx) =>
                                                idx === pdIndex
                                                  ? {
                                                      ...p,
                                                      Rent: e.target.value,
                                                    }
                                                  : p
                                            )
                                          )
                                        }
                                        className="border-2 p-2 rounded-r-md outline-none w-[7rem] h-full"
                                        required
                                      />
                                    </div>

                                    {/* Duration Input */}
                                    <input
                                      type="text"
                                      placeholder="Duration"
                                      value={priceDuration.Duration}
                                      onChange={(e) =>
                                        handleObjectChange(
                                          field.key,
                                          index,
                                          "PricesDuration",
                                          subVenue.PricesDuration.map(
                                            (p, idx) =>
                                              idx === pdIndex
                                                ? {
                                                    ...p,
                                                    Duration: e.target.value,
                                                  }
                                                : p
                                          )
                                        )
                                      }
                                      className="border-2 p-2 rounded-md outline-none w-[10rem] h-[2rem]"
                                      required
                                    />

                                    {/* Remove Button */}
                                    {!isEditing && (
                                      <button
                                        onClick={() => {
                                          const updatedArray =
                                            subVenue.PricesDuration.filter(
                                              (_, idx) => idx !== pdIndex
                                            );
                                          handleObjectChange(
                                            field.key,
                                            index,
                                            "PricesDuration",
                                            updatedArray
                                          );
                                        }}
                                        className="text-red-500 "
                                      >
                                        <ImCancelCircle />
                                      </button>
                                    )}
                                  </div>
                                )
                              )}

                              <button
                                type="button"
                                className="text-primary px-4 py-2 rounded flex items-center justify-center gap-1 font-medium"
                                onClick={() =>
                                  handleObjectChange(
                                    field.key,
                                    index,
                                    "PricesDuration",
                                    [
                                      ...(subVenue.PricesDuration || []),
                                      {
                                        Duration: "",
                                        MaxCapacity: "",
                                        Rent: "",
                                      },
                                    ]
                                  )
                                }
                              >
                                <IoAddCircleOutline className="text-xl" /> Price
                                & Duration
                              </button>
                            </div>
                          )}

                        {/* Radio Input (Your Original Code) */}
                        {item.type === "radio" && (
                          <div className="flex flex-row gap-4">
                            {item.items.map((radioItem, radioIndex) => (
                              <label
                                key={radioIndex}
                                className="flex items-center gap-2 text-textGray"
                              >
                                <input
                                  type="radio"
                                  name={`${field.key}-${index}-${item.key}`}
                                  value={radioItem.value || radioItem}
                                  checked={
                                    subVenue[item.key] ===
                                    (radioItem.value || radioItem)
                                  }
                                  onChange={(e) =>
                                    handleObjectChange(
                                      field.key,
                                      index,
                                      item.key,
                                      e.target.value
                                    )
                                  }
                                  className="accent-primary"
                                  required
                                />
                                {radioItem.label || radioItem}
                              </label>
                            ))}
                          </div>
                        )}
                        {item.key === "CapacitySeating" && (
                          <div className="grid grid-cols-5 gap-4">
                            {item?.items?.map((seatingItem, seatingIndex) => (
                              <div
                                key={seatingIndex}
                                className="flex flex-col items-center gap-2"
                              >
                                <span className="text-textGray text-base font-normal flex flex-col items-center">
                                  <img
                                    src={
                                      seatingItem.Style === "Max Capacity"
                                        ? maxCapicty
                                        : seatingItem.Style === "Banquet Rounds"
                                        ? BanquetRounds
                                        : seatingItem.Style ===
                                          "Cocktail Rounds"
                                        ? CocktailRounds
                                        : seatingItem.Style === "Theater"
                                        ? Theater
                                        : seatingItem.Style === "U Shape"
                                        ? UShape
                                        : ""
                                    }
                                    alt="capicty style"
                                    className="object-contain h-[4rem]"
                                  />
                                  {seatingItem.Style}
                                </span>
                                <input
                                  type="number"
                                  // value={seatingItem.Capacity || ""}
                                  onChange={(e) => {
                                    const newValue = e.target.value;

                                    const updatedSeating = [
                                      ...(subVenue?.CapacitySeating || []),
                                    ];

                                    if (!updatedSeating[seatingIndex]) {
                                      updatedSeating[seatingIndex] = {
                                        Style: seatingItem.Style,
                                        Capacity: "",
                                      };
                                    }

                                    updatedSeating[seatingIndex].Capacity =
                                      newValue;

                                    handleObjectChangeForSeating(
                                      field.key,
                                      index,
                                      "CapacitySeating",
                                      updatedSeating
                                    );
                                  }}
                                  className="border-2 p-2 rounded-md w-full outline-none"
                                  required
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Remove Sub Venue */}
                  {/*          
                    <button
                      onClick={() => handleRemoveObject(field.key, index)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md mt-2"
                    >
                      Remove Sub Venue
                    </button> */}
                  <div className="flex items-center justify-center">
                    {formValues[field.key]?.length > 1 && (
                      <button
                        onClick={() => handleRemoveObject(field.key, index)}
                        className="bg-red-500 text-white py-1 px-3 rounded-md mt-2 w-fit"
                      >
                        Remove Sub Venue
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {/* {isEditing && ( */}
              {/* <button
                onClick={() =>
                  handleAddObject(field.key, {
                    Title: "",
                    CapacityMax: "",
                    PricesDuration: [],
                    CapacitySeating: [],
                    IndoorOutdoor: "",
                    EventType: [],
                    Inclusions: [],
                  })
                }
                className="text-primary px-4 py-2 rounded flex items-center justify-center gap-1 font-medium"
              >
                <IoAddCircleOutline className="text-xl" /> Add New Sub Venue
              </button> */}
              {/* )} */}
            </div>
          );
        }

        // Changed code by Amaan
        else if (field.type === "array" && field.key === "DistanceFrom") {
          return (
            <div key={field._id} className=" col-span-2 grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3 flex items-center flex-col-reverse justify-center  gap-2">
                <button
                  type="button"
                  className="text-primary px-4 py-2 rounded flex items-center justify-center gap-1 font-medium"
                  onClick={() =>
                    handleAddObject(field.key, field.items[0] || {})
                  }
                >
                  <IoAddCircleOutline className="text-xl" /> {field.label}
                </button>
                {(formValues[field.key] || []).map((item, index) => (
                  <div key={index} className="flex  gap-4  ">
                    {Object.keys(item).map((objectKey, subIndex) => (
                      <div
                        key={subIndex}
                        className="flex items-center justify-center flex-col gap-1 "
                      >
                        <label>{objectKey}:</label>
                        <input
                          type="text"
                          value={
                            typeof item[objectKey] === "object"
                              ? ""
                              : item[objectKey] || ""
                          }
                          onChange={(e) => [
                            handleObjectChange(
                              field.key,
                              index,
                              objectKey,
                              e.target.value
                            ),
                          ]}
                          className=" p-2 rounded outline-none border-2"
                          required
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="text-red-500 self-end mt-2 flex items-center gap-2"
                      onClick={() => handleRemoveObject(field.key, index)}
                    >
                      <ImCancelCircle />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (field.type === "array" && field.key === "Seasons") {
          return (
            <div className="col-span-2">
              <SeasonsSelector
                seasons={seasons}
                onSeasonsChange={handleSeasonsChange}
                className="col-span-2"
              />
            </div>
          );
        } else if (field.type === "section" && field.key === "Cuisine") {
          return (
            <>
              {formValues?.ChooseCuisinesAvailable.length > 0 &&
              formValues?.ChooseType ? (
                <div className="col-span-2">
                  <FoodMenuForm
                    cuisines={formValues?.ChooseCuisinesAvailable}
                    categories={
                      formData?.fields?.find((item) => item.key === "Cuisine")
                        .items
                    }
                    type={formValues?.ChooseType}
                    foodMenu={foodMenu}
                    setFoodMenu={setFoodMenu}
                  />
                </div>
              ) : (
                <div className="col-span-2 text-textGray text-xl">
                  Please select cuisine and type to create a food menu.
                </div>
              )}
            </>
          );
        } else if (
          field.type === "array" &&
          (field.key !== "SubVenueDetails" || field.key !== "DistanceFrom")
        ) {
          return (
            <div key={field._id} className="grid grid-cols-4 gap-4">
              <label className="text-primary text-base font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3 flex items-start justify-start flex-col gap-2">
                <span className="flex items-center justify-center">
                  <input
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value.trim()) {
                        e.preventDefault();
                        handleArrayChange(field.key, e.target.value.trim());
                        e.target.value = "";
                      }
                    }}
                    className="border-2 w-[25rem] outline-none p-1 rounded-l-lg text-textGray font-medium"
                    disabled={!isEditing}
                  />
                  <p className="bg-textYellow p-2 rounded-r-lg">
                    <FaArrowTurnUp className="font-normal text-xl text-textGray rotate-90 " />
                  </p>
                </span>

                <div className="flex items-center justify-start gap-2 flex-wrap">
                  {(formValues[field.key] || []).map((item, index) => (
                    <span
                      key={index}
                      className="bg-textLightGray text-textGray py-1 px-3 flex items-center justify-center gap-1"
                    >
                      {item}{" "}
                      <ImCancelCircle
                        className="text-textGray cursor-pointer"
                        onClick={() => {
                          setFormValues((prev) => ({
                            ...prev,
                            [field.key]: prev[field.key].filter(
                              (_, idx) => idx !== index
                            ),
                          }));
                        }}
                        disabled={!isEditing}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        return null;
      })}

      <div className="col-span-2 flex items-center justify-end w-full gap-4">
        {isEditing ? (
          <button
            type="button"
            onClick={(e) => [e.preventDefault(), setIsEditing(true)]}
            className="btn-primary w-fit px-2"
          >
            Edit
          </button>
        ) : (
          <button type="submit" className="btn-secondary">
            Save
          </button>
        )}
      </div>
    </form>
  );
};

export default EditDynamicForm;
