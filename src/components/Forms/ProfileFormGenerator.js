import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SearchableCategoryAndSubcategoryDropdown from "../Inputs/SearchableCategoryAndSubcategoryDropdown";
import { toast } from "react-toastify";
import vendorApi from "../../services/vendorApi";

const ProfileFormGenerator = ({
  fields,
  defaultValues,
  onSubmit,
  editable,
  verifyDocs,
  getVerifyDetails,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues,
  });

  const [oldDefaultValues, setOldDefaultValues] = useState(defaultValues);

  useEffect(() => {
    setOldDefaultValues(defaultValues);
  }, []);

  useEffect(() => {
    if (oldDefaultValues !== defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleCategorySubcategorySelect = (data) => {
    setValue("categoriesOfServices", [
      {
        category: data.category.id,
        subCategories: data.subCategory.id,
      },
    ]);
    // console.log(data);
  };

  // console.log("defaultValues:", defaultValues);

  const onFormSubmit = (data) => {
    // console.log("data in ProfileFormGenerator:", data);

    if (data) {
      const { categoryAndSubcategory, ...formData } = data;
      onSubmit(formData);
    } else {
      toast.error("Form data is required.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className={`w-full text-sm font-semibold ${
        fields.length > 7
          ? "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 space-y-0"
          : " space-y-4"
      }`}
    >
      {fields.map((field, index) => {
        if (field.type === "searchableCategoryAndSubCategory") {
          return (
            <div
              key={index}
              className="grid grid-cols-1 gap-y-2 md:col-span-2 gap-x-2 pt-5"
            >
              <label htmlFor={field.name}>{field.placeholder}</label>

              <SearchableCategoryAndSubcategoryDropdown
                onSelect={handleCategorySubcategorySelect}
                disabled={!editable}
                defaultValues={defaultValues?.categoriesOfServices}
              />
              {errors[field.name] && (
                <span className="text-red-500">
                  {errors[field.name].message}
                </span>
              )}
            </div>
          );
        } else if (field.type === "select") {
          return (
            <div key={index} className="grid grid-cols-2 gap-x-2">
              <label htmlFor={field.name}>{field.placeholder}</label>
              <select
                id={field.name}
                {...register(field.name, field.validation)}
                disabled={!editable}
                className={`p-2 text-gray-500 rounded-md ${
                  editable ? "border" : "bg-grayBg border-none"
                } ${errors[field.name] ? "border-red-500" : "border-gray-300"}`}
              >
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors[field.name] && (
                <span className="text-red-500">
                  {errors[field.name].message}
                </span>
              )}
            </div>
          );
        } else if (field.type === "textarea") {
          return (
            <div key={index} className="grid grid-cols-2 gap-x-2">
              <label htmlFor={field.name}>{field.placeholder}</label>
              <textarea
                id={field.name}
                type={field.type}
                accept={field.accept}
                {...register(field.name, field.validation)}
                disabled={!editable}
                rows={5}
                className={`p-2 text-gray-500 rounded-md ${
                  editable ? "border" : "bg-grayBg border-none"
                } ${errors[field.name] ? "border-red-500" : "border-gray-300"}`}
              />
              {errors[field.name] && (
                <span className="text-red-500">
                  {errors[field.name].message}
                </span>
              )}
            </div>
          );
        } else {
          return (
            <div key={index} className="grid grid-cols-2 gap-x-2">
              <label htmlFor={field.name}>{field.placeholder}</label>
              <div className="flex items-start flex-col gap-1">
                <input
                  id={field.name}
                  type={field.type}
                  accept={field.accept}
                  {...register(field.name, field.validation)}
                  disabled={!editable}
                  className={`p-2 text-gray-500 rounded-md w-full ${
                    editable ? "border" : "bg-grayBg border-none"
                  } ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {!editable &&
                  ["udyamAadhaar", "gstNumber", "panNumber"].includes(
                    field.name
                  ) &&
                  watch(field?.name) && (
                    <button
                      type="button"
                      onClick={() => verifyDocs(field?.name)}
                      className={`px-2 py-1 text-white rounded-md ${
                        field.name === "udyamAadhaar" &&
                        getVerifyDetails?.adharVerificationStatus === "Verified"
                          ? "bg-green-500"
                          : field.name === "gstNumber" &&
                            getVerifyDetails?.gstVerificationStatus ===
                              "Verified"
                          ? "bg-green-500"
                          : field.name === "panNumber" &&
                            getVerifyDetails?.panVerificationStatus ===
                              "Verified"
                          ? "bg-green-500"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      disabled={
                        (field.name === "udyamAadhaar" &&
                          getVerifyDetails?.adharVerificationStatus ===
                            "Verified") ||
                        (field.name === "gstNumber" &&
                          getVerifyDetails?.gstVerificationStatus ===
                            "Verified") ||
                        (field.name === "panNumber" &&
                          getVerifyDetails?.panVerificationStatus === "Verified")
                      }
                    >
                      {field.name === "udyamAadhaar" &&
                      getVerifyDetails?.adharVerificationStatus === "Verified"
                        ? "Verified"
                        : field.name === "gstNumber" &&
                          getVerifyDetails?.gstVerificationStatus === "Verified"
                        ? "Verified"
                        : field.name === "panNumber" &&
                          getVerifyDetails?.panVerificationStatus === "Verified"
                        ? "Verified"
                        : "Verify"}
                    </button>
                  )}
              </div>
              {errors[field.name] && (
                <span className="text-red-500">
                  {errors[field.name].message}
                </span>
              )}
            </div>
          );
        }
      })}
      {editable && (
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      )}
    </form>
  );
};

export default React.memo(ProfileFormGenerator);
