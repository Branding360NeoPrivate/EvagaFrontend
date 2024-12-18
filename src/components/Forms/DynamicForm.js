import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineEnter } from "react-icons/ai";
import { FaArrowTurnUp, FaIndianRupeeSign, FaRupeeSign } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const DynamicForm = ({ formData, setfiledFormData, index }) => {
  const { fields = [] } = formData || {};
  const [isEditing, setIsEditing] = useState(false);
  const totalNumberOfPhotoAllowed =
    process.env.REACT_APP_API_Number_of_Images_allowed || 6;
  const editorStyle = {
    backgroundColor: "#7575751a",
  };

  const [formValues, setFormValues] = useState(
    fields.reduce((acc, field) => {
      if (field.type === "array") {
        acc[field.key] = [];
      } else if (field.type === "object") {
        acc[field.key] = field.items || [];
      } else {
        acc[field.key] = "";
      }
      return acc;
    }, {})
  );

  const handleChange = (key, value) => {
    setFormValues((prev) => {
      if (key === "Title") {
        return {
          ...prev,
          [key]: value,
          "Capacity&Pricing": {},
        };
      }

      return {
        ...prev,
        [key]: value, // Dynamically updates any key, including file uploads
      };
    });
  };

  const handleImageChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [`${key}_${index}`]: value, // Add the form index to uniquely scope the key
    }));
  };

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
        : []; // Ensure it's an array
      updatedArray.push({ ...templateObject }); // Add new object
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const transformedData = fields.map((field) => ({
  //     label: field.label,
  //     key: field.key,
  //     type: field.type,
  //     items: formValues[field.key],
  //   }));

  //   setfiledFormData(transformedData);
  //   setIsEditing(false);
  //   console.log("Form submitted:", transformedData);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transformedData = fields.map((field) => {
      if (field.key === "Portfolio") {
        // Transform Portfolio structure
        const portfolioData = {};

        // Collect all indexed keys for Portfolio
        Object.keys(formValues).forEach((key) => {
          if (key.startsWith("Portfolio_")) {
            const index = key.split("_")[1]; // Extract index
            portfolioData[`Portfolio_${index}`] = formValues[key];
          }
        });

        // Combine into desired Portfolio format
        const portfolioItems = Object.keys(portfolioData).map(
          (portfolioKey) => {
            const { photos = [], videos = [] } = portfolioData[portfolioKey];
            return { photos, videos };
          }
        );

        return {
          label: field.label,
          key: field.key,
          type: field.type,
          items: portfolioItems, // items array contains {photos, videos}
        };
      }

      // Default behavior for other fields
      const items = [];
      Object.keys(formValues).forEach((key) => {
        if (key.startsWith(`${field.key}_`)) {
          items.push(formValues[key]);
        }
      });

      return {
        label: field.label,
        key: field.key,
        type: field.type,
        items: items.length > 0 ? items : formValues[field.key],
      };
    });

    setfiledFormData(transformedData);
    setIsEditing(false);
    console.log("Form submitted:", transformedData);
  };

  // const handleFileChange = (key, subKey, newFiles) => {
  //   setFormValues((prev) => ({
  //     ...prev,
  //     [key]: {
  //       ...(prev[key] || {}),
  //       [subKey]: newFiles,
  //     },
  //   }));
  // };
  // const handleFileChange = (key, subKey, index, newFiles) => {
  //   console.log("New Files:", newFiles);
  //   console.log("Key:", key, "SubKey:", subKey, "Index:", index);

  //   setFormValues((prev) => {
  //     console.log("Previous formValues:", prev);

  //     // Ensure the key exists in prev
  //     const updatedItems = [...(prev[key] || [])];

  //     // Ensure the item at the given index exists
  //     if (!updatedItems[index]) {
  //       updatedItems[index] = {};
  //     }

  //     // Update the specific subKey (videos or photos)
  //     if (subKey === "videos") {
  //       updatedItems[index] = {
  //         ...updatedItems[index],
  //         [subKey]: newFiles[0], // Replace for single video
  //       };
  //     } else if (subKey === "photos") {
  //       updatedItems[index] = {
  //         ...updatedItems[index],
  //         [subKey]: [
  //           ...(updatedItems[index]?.[subKey] || []), // Append to existing photos
  //           ...newFiles,
  //         ],
  //       };
  //     }

  //     console.log("Updated formValues:", updatedItems);

  //     return {
  //       ...prev,
  //       [key]: updatedItems,
  //     };
  //   });
  // };

  // const handleFileRemove = (key, index, subKey, fileIdx = null) => {
  //   setFormValues((prev) => {
  //     const updatedItems = [...(prev[key] || [])];

  //     if (subKey === "videos") {
  //       // Clear the video file
  //       updatedItems[index] = {
  //         ...updatedItems[index],
  //         [subKey]: null,
  //       };
  //     } else if (subKey === "photos" && fileIdx !== null) {
  //       // Remove a specific photo by index
  //       const updatedPhotos = [...(updatedItems[index]?.[subKey] || [])];
  //       updatedPhotos.splice(fileIdx, 1);

  //       updatedItems[index] = {
  //         ...updatedItems[index],
  //         [subKey]: updatedPhotos,
  //       };
  //     }

  //     return {
  //       ...prev,
  //       [key]: updatedItems,
  //     };
  //   });
  // };

  const handleFileChange = (key, subKey, index, newFiles) => {
    console.log(`Handling ${subKey} at ${key}_${index}`);
    const portfolioKey = `${key}_${index}`; // Unique key: Portfolio_0, Portfolio_1

    setFormValues((prev) => {
      const existingData = prev[portfolioKey] || { photos: [], videos: [] };

      // Update photos or videos
      const updatedValue = {
        ...existingData,
        [subKey]:
          subKey === "videos"
            ? [...(existingData[subKey] || []), newFiles[0]] // Append single video
            : [...(existingData[subKey] || []), ...newFiles], // Append multiple photos
      };

      return {
        ...prev,
        [portfolioKey]: updatedValue,
      };
    });
  };

  // handleFileRemove: Removes specific files from photos or clears videos
  const handleFileRemove = (key, index, subKey, fileIdx = null) => {
    console.log(`Removing ${subKey} from ${key}_${index}`);
    const portfolioKey = `${key}_${index}`; // Unique key: Portfolio_0, Portfolio_1

    setFormValues((prev) => {
      const existingData = prev[portfolioKey] || { photos: [], videos: [] };

      const updatedValue = { ...existingData };

      if (subKey === "videos") {
        updatedValue[subKey] = []; // Clear videos
      } else if (subKey === "photos" && fileIdx !== null) {
        const updatedPhotos = [...existingData[subKey]];
        updatedPhotos.splice(fileIdx, 1); // Remove specific photo
        updatedValue[subKey] = updatedPhotos;
      }

      return {
        ...prev,
        [portfolioKey]: updatedValue,
      };
    });
  };

  console.log(formValues);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-[2.5rem] py-4 w-full"
    >
      {fields.map((field) => {
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
            <div key={field._id} className="grid grid-cols-3 gap-4">
              <label className="text-primary text-xl font-semibold">
                {field.label}:
              </label>
              <input
                type={field.type}
                value={formValues[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="col-span-2 border-2 w-[25rem] border-2 outline-none p-1 rounded-md text-textGray font-medium"
                required
                disabled={isEditing}
              />
            </div>
          );
        } else if (field.key === "Capacity&Pricing") {
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
              <div key={field._id} className="grid grid-cols-3 gap-4">
                <label className="text-primary text-xl font-semibold">
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
            <div key={field._id} className="grid grid-cols-3 gap-4">
              <label className="text-primary text-xl font-semibold">
                {field.label}:
              </label>
              <div className="col-span-2 flex flex-col gap-4">
                {selectedStaffData &&
                selectedStaffData.staffDetails.length > 0 ? (
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
        } else if (field.type === "text" && field.key === "Terms&Conditions") {
          return (
            <div key={field._id} className="grid grid-cols-3 gap-4">
              <label className="text-primary text-xl font-semibold">
                {field.label}:
              </label>
              <div className="bg-textLightGray col-span-2">
                <ReactQuill
                  theme="snow"
                  value={formValues[field.key] || ""}
                  onChange={(value) => handleChange(field.key, value)}
                  style={editorStyle}
                  required
                  readOnly={isEditing}
                />
              </div>
            </div>
          );
        } else if (field.type === "object" && field.key === "TravelCharges") {
          const items = Array.isArray(field.items) ? field.items : []; // Ensure it's always an array
          return (
            <div key={field._id} className="grid grid-cols-3 gap-4">
              <label className="text-primary text-xl font-semibold">
                {field.label}:
              </label>
              <div className="col-span-2">
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
                          disabled={isEditing}
                        />
                        <p className="bg-textYellow text-primary h-full flex items-center justify-center rounded-r-md p-1">
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
                          className="border-2 p-1 rounded-l-md text-textGray font-medium w-[5rem] h-full outline-none"
                          required
                          disabled={isEditing}
                        />
                        <p className="bg-textYellow text-primary h-full flex items-center justify-center rounded-r-md p-1">
                          Kms
                        </p>
                      </span>
                    </div>

                    {/* UOM */}
                    <div className="flex flex-row gap-2">
                      <label className="text-textGray font-medium">UOM:</label>
                      <p>{item["Uom"] || ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (
          field.type === "object" &&
          (field.key === "SessionLength" || field.key === "Duration&Pricing")
        ) {
          const items = Array.isArray(field.items) ? field.items : [];

          // Add condition for BookforIngredients to check if it's "no" to render Duration&Pricing
          const isBookForIngredientsNo =
            formValues["BookforIngredients"] === "no";

          // Skip rendering Duration&Pricing if BookforIngredients is "no"
          if (field.key === "Duration&Pricing" && !isBookForIngredientsNo) {
            return null; // Don't render Duration&Pricing unless BookforIngredients is "no"
          }

          return (
            <div key={field._id} className="grid grid-cols-3 gap-4">
              <label className="text-primary text-xl font-semibold">
                {field.label}:
              </label>
              <div className="col-span-2">
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    {/* Amount */}
                    <div className="flex flex-row gap-2">
                      <label className="text-textGray font-medium">
                        Amount:
                      </label>
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
                        className="border-2 p-1 rounded-md text-textGray font-medium w-[5rem] h-full outline-none"
                        disabled={isEditing}
                      />
                    </div>

                    {/* Max */}
                    <div className="flex flex-row gap-2">
                      <label className="text-textGray font-medium">Max:</label>
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
                        className="border-2 p-1 rounded-md text-textGray font-medium w-[5rem] h-full outline-none"
                        disabled={isEditing}
                      />
                    </div>

                    {/* Min */}
                    <div className="flex flex-row gap-2">
                      <label className="text-textGray font-medium">Min:</label>
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
                        className="border-2 p-1 rounded-md text-textGray font-medium w-[5rem] h-full outline-none"
                        disabled={isEditing}
                      />
                    </div>

                    {/* UOM */}
                    <div className="flex flex-row gap-2">
                      <label className="text-textGray font-medium">UOM:</label>
                      <p>{item["UOM"] || ""}</p>
                    </div>
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
            <div key={field._id} className="grid grid-cols-4 gap-4">
              <label className="text-primary text-xl font-semibold">
                {field.label}:
              </label>
              <div className="col-span-3 flex items-center flex-col-reverse justify-center  gap-2">
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
                  <div key={index} className="flex flex-wrap gap-4  ">
                    {Object.keys(item).map((objectKey, subIndex) => (
                      <div
                        key={subIndex}
                        className="flex items-center justify-center flex-col gap-1 items-center"
                      >
                        <label>{objectKey}:</label>
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
                          className="border p-2 rounded outline-none border-2 w-[7rem]"
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
          field.type === "array" &&
          field.key === "OrderQuantity&Pricing"
        ) {
          const isBookForIngredients =
            formValues["BookforIngredients"] === "yes";

          if (!isBookForIngredients) {
            return null;
          }

          return (
            <div key={field._id} className="grid grid-cols-4 gap-4">
              <label className="text-primary text-xl font-semibold">
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
                        <label>{objectKey}:</label>
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
                          className="border p-2 rounded outline-none border-2 w-[7rem]"
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
            field.key === "3DTour" ||
            field.key === "RecceReport")
        ) {
          return (
            <div key={field._id} className="grid grid-cols-3 gap-4">
              <label className="text-primary text-xl font-semibold">
                {field.label}:{index}
              </label>
              <div className="col-span-2 flex  items-center justify-start gap-4 ">
                <div className="flex items-center justify-center flex-col text-textGray border-2 border-dashed border-primary p-3 rounded-md">
                  {/* <input
                    type={field.type}
                    id={`file-upload-${field.key}`}
                    className="hidden"
                    // onChange={(e) => [
                    //   console.log(index),
                    //   handleChange(field.key, e.target.files[0]),
                    // ]}
                    onChange={(e) =>
                      handleChange(`${field.key}_${index}`, e.target.files[0])
                    }
                    required
                    // disabled={isEditing}
                  />{" "}
                  <label
                    htmlFor={`file-upload-${field.key}`}
                    className="cursor-pointer flex items-center justify-center flex-col"
                  >
                    {" "}
                    <IoCloudUploadOutline className="text-primary  text-2xl mb-4" />{" "}
                    <p className="text-textGray">
                      {" "}
                      Drop your files or <span className="">
                        Browse files
                      </span>{" "}
                    </p>{" "}
                  </label>{" "} */}

                  <input
                    type={field.type}
                    id={`file-upload-${field.key}-${index}`}
                    className="hidden"
                    onChange={(e) =>
                      handleImageChange(field.key, e.target.files[0])
                    }
                    disabled={isEditing}
                  />
                  <label
                    htmlFor={`file-upload-${field.key}-${index}`}
                    className="cursor-pointer flex items-center justify-center flex-col"
                  >
                    <IoCloudUploadOutline className="text-primary text-2xl mb-4" />
                    <p className="text-textGray">
                      Drop your files or Browse files
                    </p>
                  </label>
                </div>
                {formValues?.[`${field.key}_${index}`] && (
                  <span className="text-textGray bg-textLightGray flex p-1 rounded-md gap-1">
                    <p>{formValues[`${field.key}_${index}`]?.name}</p>
                    <button
                      onClick={() =>
                        handleChange(`${field.key}_${index}`, null)
                      } // Remove specific file
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
            <div key={field._id} className="grid grid-cols-3 gap-4">
              <label className="text-primary text-xl font-semibold">
                {field.label}:
              </label>
              <div className="col-span-2 flex items-center justify-start gap-4">
                <div className="flex items-center justify-center flex-col text-textGray border-2 border-dashed border-primary p-3 rounded-md">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const selectedFiles = Array.from(e.target.files);
                      const existingFiles = formValues?.ProductImage || [];
                      if (selectedFiles.length + existingFiles.length > 3) {
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
                    required
                    disabled={isEditing}
                    multiple
                  />

                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex items-center justify-center flex-col"
                  >
                    <IoCloudUploadOutline className="text-primary text-2xl mb-4" />
                    <p className="text-textGray">
                      Drop your files or <span>Browse files</span>
                    </p>
                  </label>
                  {formValues?.ProductImage && (
                    <p className="text-textGray mt-2">*Upload up to 3 photos</p>
                  )}
                </div>
                {Array.isArray(formValues?.ProductImage) &&
                  formValues.ProductImage.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formValues.ProductImage.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-textGray bg-textLightGray flex p-1 rounded-md justify-between items-center gap-1"
                        >
                          <p>{item?.name || "Uploaded File"}</p>
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
            <div key={field._id} className="grid grid-cols-3 gap-4">
              <label className="text-primary text-xl font-semibold">
                {field.label}:
              </label>
              <div className="col-span-2  flex flex-col gap-4">
                {field.items?.map((item, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 ">
                    {/* Handle Photos */}
                    {item.photos && (
                      <div className="flex flex-col items-start gap-2">
                        <div className="flex items-center justify-center flex-col text-textGray border-2 border-dashed border-primary p-3 rounded-md">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            // onChange={(e) => {
                            //   console.log(index);
                            //   const existingFiles =
                            //     formValues[field.key]?.[index]?.photos || [];
                            //   const selectedFiles = Array.from(e.target.files);
                            //   const totalFiles =
                            //     existingFiles.length + selectedFiles.length;

                            //   if (totalFiles > totalNumberOfPhotoAllowed) {
                            //     alert(
                            //       `You can only upload up to ${totalNumberOfPhotoAllowed} images in total.`
                            //     );
                            //     return;
                            //   }

                            //   const onlyImages = selectedFiles.filter((file) =>
                            //     file.type.startsWith("image/")
                            //   );

                            //   handleFileChange(field.key, "photos", index, [
                            //     ...existingFiles,
                            //     ...onlyImages,
                            //   ]);
                            // }}
                            onChange={(e) => {
                              console.log("Handling photos at index:", index); // Verify correct index
                              const existingFiles =
                                formValues[field.key]?.[index]?.photos || [];
                              const selectedFiles = Array.from(e.target.files);
                              handleFileChange(field.key, "photos", index, [
                                ...existingFiles,
                                ...selectedFiles,
                              ]);
                            }}
                            id={`photo-upload-${field.key}-${index}`} // Unique id
                            className="hidden"
                            // required
                            disabled={isEditing}
                          />
                          <label
                            htmlFor={`photo-upload-${field.key}-${index}`} // Match the id
                            className="cursor-pointer flex items-center justify-center flex-col"
                          >
                            <IoCloudUploadOutline className="text-primary text-2xl mb-4" />
                            <p className="text-textGray">
                              Drop your Photo or{" "}
                              <span className="">Browse Photo</span>
                            </p>
                          </label>
                        </div>
                        {formValues[field.key]?.length > 0 && (
                          <div className="mt-2 grid grid-cols-2 flex-wrap gap-1">
                            {formValues[field.key].map(
                              (portfolioItem, portfolioIdx) =>
                                portfolioItem.photos?.length > 0
                                  ? portfolioItem.photos.map(
                                      (file, fileIdx) => (
                                        <span
                                          key={`${portfolioIdx}-${fileIdx}`}
                                          className="text-textGray bg-textLightGray flex p-1 rounded-md justify-between items-center gap-2"
                                        >
                                          {/* Display File Name */}
                                          <p className="truncate max-w-[10rem]">
                                            {file.name}
                                          </p>

                                          {/* Cancel Button */}
                                          <button
                                            className="text-red-500 px-2 py-1"
                                            onClick={() =>
                                              handleFileRemove(
                                                field.key,
                                                portfolioIdx,
                                                "photos",
                                                fileIdx
                                              )
                                            }
                                          >
                                            <ImCancelCircle />
                                          </button>
                                        </span>
                                      )
                                    )
                                  : null
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Handle Videos */}
                    {item.videos && (
                      <div className="flex flex-col items-start gap-2">
                        <div className="flex items-center justify-center flex-col text-textGray border-2 border-dashed border-primary p-3 rounded-md">
                          <input
                            type="file"
                            accept="video/mp4, video/webm"
                            multiple={false} // Single file only
                            onChange={(e) => {
                              const selectedFile = Array.from(e.target.files);
                              console.log("Selected File:", selectedFile); // Debugging file input
                              handleFileChange(
                                field.key,
                                "videos",
                                index,
                                selectedFile
                              );
                            }}
                            id={`video-upload-${field.key}-${index}`}
                            className="hidden"
                          />

                          <label
                            htmlFor={`video-upload-${field.key}-${index}`}
                            className="cursor-pointer flex items-center justify-center flex-col"
                          >
                            <IoCloudUploadOutline className="text-primary text-2xl mb-4" />
                            <p className="text-textGray">
                              Drop your video or{" "}
                              <span className="text-primary">Browse video</span>
                            </p>
                          </label>
                        </div>

                        {/* Display Video */}
                        {formValues[field.key]?.[index]?.videos && (
                          <div className="mt-2 flex justify-between items-center bg-gray-200 p-2 rounded">
                            <span className="truncate max-w-[10rem]">
                              {formValues[field.key][index].videos.name}
                            </span>
                            <button
                              type="button"
                              className="text-red-500"
                              onClick={() =>
                                handleFileRemove(field.key, index, "videos")
                              }
                            >
                              <ImCancelCircle />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div className="col-span-2 flex flex-col gap-4">
                  {field.items?.map((item, index) => {
                    const portfolioKey = `${field.key}_${index}`; // Generate unique key: Portfolio_X
                    const portfolioData = formValues[portfolioKey] || {
                      photos: [],
                      videos: [],
                    };

                    return (
                      <div
                        key={portfolioKey}
                        className="grid grid-cols-2 gap-4"
                      >
                        {/* Handle Photos */}
                        <div className="flex flex-col gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              const selectedFiles = Array.from(e.target.files);
                              handleFileChange(
                                field.key,
                                "photos",
                                index,
                                selectedFiles
                              );
                            }}
                          />
                          {/* Display Photos */}
                          {portfolioData.photos.map((file, fileIdx) => (
                            <div
                              key={fileIdx}
                              className="flex items-center gap-2"
                            >
                              <p>{file.name}</p>
                              <button
                                onClick={() =>
                                  handleFileRemove(
                                    field.key,
                                    index,
                                    "photos",
                                    fileIdx
                                  )
                                }
                                className="text-red-500"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Handle Videos */}
                        <div className="flex flex-col gap-2">
                          <input
                            type="file"
                            accept="video/mp4, video/webm"
                            onChange={(e) => {
                              const selectedFile = Array.from(e.target.files);
                              handleFileChange(
                                field.key,
                                "videos",
                                index,
                                selectedFile
                              );
                            }}
                          />
                          {/* Display Videos */}
                          {portfolioData.videos.map((file, fileIdx) => (
                            <div
                              key={fileIdx}
                              className="flex items-center gap-2"
                            >
                              <p>{file.name}</p>
                              <button
                                onClick={() =>
                                  handleFileRemove(
                                    field.key,
                                    index,
                                    "videos",
                                    fileIdx
                                  )
                                }
                                className="text-red-500"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                ;
              </div>
            </div>
          );
        } else if (field.type === "array" && field.key !== "SubVenueDetails") {
          return (
            <div key={field._id} className="grid grid-cols-3 gap-4">
              <label className="text-primary text-xl font-semibold">
                {field.label}:
              </label>
              <div className="col-span-2 flex items-start justify-start flex-col gap-2">
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
                    className="border-2 w-[25rem] border-2 outline-none p-1 rounded-l-lg text-textGray font-medium"
                    disabled={isEditing}
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
                        disabled={isEditing}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        } else if (field.type === "multi-select") {
          return (
            <div key={field._id} className="grid grid-cols-3 gap-4">
              <label className="text-primary text-xl font-semibold">
                {field.label}:
              </label>
              <div className="col-span-2 flex items-start justify-start flex-wrap gap-3">
                {(field.items || []).map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`py-2 px-4 rounded border ${
                      formValues[field.key]?.includes(item)
                        ? "bg-textYellow text-textGray border-textYellow"
                        : "bg-white text-textGray border-gray-300"
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
                    disabled={isEditing}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          );
        } else if (field.type === "select") {
          return (
            <div key={field._id} className="grid grid-cols-3 gap-4">
              <label className="text-primary text-xl font-semibold">
                {field.label}:
              </label>
              <div className="col-span-2 flex items-start justify-start flex-col gap-2">
                <select
                  value={formValues[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="border-2 w-[25rem] outline-none p-2 rounded-md text-textGray font-medium"
                  disabled={isEditing}
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
            <div key={field._id} className="grid grid-cols-3 gap-4">
              <label className="text-primary text-xl font-semibold">
                {field.label}:
              </label>
              <div className="col-span-2 flex items-start justify-start flex-col gap-2">
                {(field.items || []).map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
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
                            [field.key]: item.key, // Update the selected radio option
                          };

                          // Clear text and sub-item fields if "No" is selected
                          if (item.key === "NoOption") {
                            Object.keys(prev).forEach((key) => {
                              if (key.startsWith(`${field.key}_Yes`)) {
                                delete updatedValues[key];
                              }
                            });
                          }

                          // Reset the additional text input
                          if (item.key !== "YesOption") {
                            updatedValues[`${field.key}_text`] = "";
                          }

                          return updatedValues;
                        });
                      }}
                      disabled={isEditing}
                    />
                    <label
                      htmlFor={item.key}
                      className="text-textGray font-medium"
                    >
                      {item.label}
                    </label>

                    {/* Render sub-item textboxes if available */}
                    {item.items && item.items.length > 0 && (
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
            <div key={field._id} className="grid grid-cols-3 gap-4">
              <label className="text-primary text-xl font-semibold">
                {field.label}:
              </label>
              <div className="col-span-2 flex flex-row gap-4">
                {/* Render Radio Buttons */}
                {field.items.map((item, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 text-textGray"
                  >
                    <input
                      type="radio"
                      name={field.key} // Ensure all radio buttons for this field share the same name
                      value={item.value || item} // Support object or string options
                      checked={formValues[field.key] === (item.value || item)}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      disabled={isEditing} // Disable radio buttons if not in edit mode
                      className="accent-primary"
                    />
                    {item.label || item}{" "}
                  </label>
                ))}
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
                    CapacityMax: 0,
                    PricesDuration: [],
                    CapacitySeating: [],
                    IndoorOutdoor: "",
                    EventType: [],
                    Inclusions: [],
                  },
                ];

          return (
            <div key={field._id} className="flex flex-col gap-4">
              <label className="text-primary text-xl font-semibold">
                {field.label}:
              </label>

              {subVenues.map((subVenue, index) => (
                <div key={index} className="rounded-md p-4 grid gap-4 ">
                  <h3 className="text-primary text-xl font-semibold">
                    Sub Venue {index + 1}
                  </h3>

                  {field.items.map((item, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4">
                      <label className="text-primary text-xl font-semibold">
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
                            className="border-2 p-2 rounded-md w-full outline-none"
                            disabled={isEditing}
                          />
                        )}

                        {/* Number Input */}
                        {item.type === "number" && (
                          <input
                            type="number"
                            value={subVenue[item.key] || 0}
                            onChange={(e) =>
                              handleObjectChange(
                                field.key,
                                index,
                                item.key,
                                e.target.value
                              )
                            }
                            className="border-2 p-2 rounded-md w-full outline-none"
                            disabled={isEditing}
                          />
                        )}
                        {item.type === "array" &&
                          item.key !== "PricesDuration" && (
                            <div className="flex flex-col gap-2">
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
                                className="border-2 p-2 rounded-md outline-none"
                                disabled={isEditing}
                              />

                              <div className="flex flex-wrap gap-2">
                                {(subVenue[item.key] || []).map((val, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-gray-200 py-1 px-2 rounded flex items-center gap-2"
                                  >
                                    {val}
                                    <button
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
                                      disabled={isEditing}
                                      className="text-red-500 font-bold"
                                    >
                                      &times;
                                    </button>
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
                                      disabled={isEditing}
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
                                        disabled={isEditing}
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
                                      disabled={isEditing}
                                    />

                                    {/* Remove Button */}
                                    {isEditing && (
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
                                        className="bg-red-500 text-white py-1 px-2 rounded-md"
                                      >
                                        Remove
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
                                disabled={isEditing}
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
                                  disabled={isEditing}
                                  className="accent-primary"
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
                                <span className="text-textGray text-base font-normal">
                                  {seatingItem.Style}:
                                </span>
                                <input
                                  type="number"
                                  value={seatingItem.Capacity || ""}
                                  onChange={(e) => {
                                    const newValue = e.target.value;

                                    // Debugging
                                    console.log(
                                      `Typing in field: ${seatingItem.Style}, Value: ${newValue}`
                                    );

                                    const updatedSeating = item.items.map(
                                      (seat, index) =>
                                        index === seatingIndex
                                          ? { ...seat, Capacity: newValue }
                                          : seat
                                    );

                                    // Debugging updated items
                                    console.log(
                                      "Updated Seating Items:",
                                      updatedSeating
                                    );

                                    handleObjectChange(
                                      field.key,
                                      index,
                                      "CapacitySeating",
                                      {
                                        ...subVenue.CapacitySeating,
                                        items: updatedSeating,
                                      }
                                    );
                                  }}
                                  className="border-2 p-2 rounded-md w-full outline-none"
                                  disabled={isEditing}
                                />
                                {console.log(
                                  "Rendered Input Value:",
                                  seatingItem.Capacity
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Remove Sub Venue */}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveObject(field.key, index)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md mt-2"
                    >
                      Remove Sub Venue
                    </button>
                  )}
                </div>
              ))}
              {/* {isEditing && ( */}
              <button
                onClick={() =>
                  handleAddObject(field.key, {
                    Title: "",
                    CapacityMax: 0,
                    PricesDuration: [],
                    CapacitySeating: [],
                    IndoorOutdoor: "",
                    EventType: [],
                    Inclusions: [],
                  })
                }
                className="bg-primary text-white py-2 px-4 rounded-md mt-2"
              >
                + Add New Sub Venue
              </button>
              {/* )} */}
            </div>
          );
        }

        return null;
      })}

      <div className="flex items-center justify-end w-full gap-4">
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

export default DynamicForm;
