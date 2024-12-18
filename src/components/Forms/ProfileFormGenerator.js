import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SearchableCategoryAndSubcategoryDropdown from "../Inputs/SearchableCategoryAndSubcategoryDropdown";
import { toast } from "react-toastify";

const ProfileFormGenerator = ({
  fields,
  defaultValues,
  onSubmit,
  editable,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
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
          ? "grid grid-cols-2 gap-x-6 gap-y-4 space-y-0"
          : " space-y-4"
      }`}
    >
      {fields.map((field, index) => {
        if (field.type === "searchableCategoryAndSubCategory") {
          return (
            <div
              key={index}
              className="grid grid-cols-1 gap-y-2 col-span-2 gap-x-2 pt-5"
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
        } else {
          return (
            <div key={index} className="grid grid-cols-2 gap-x-2">
              <label htmlFor={field.name}>{field.placeholder}</label>
              <input
                id={field.name}
                type={field.type}
                accept={field.accept}
                {...register(field.name, field.validation)}
                disabled={!editable}
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
