// src/utils/generateDefaultValues.js

const generateDefaultValues = (vendorDetails, fields) => {
  const defaultValues = {};

  fields.forEach((field) => {
    const keys = field.name.split(".");
    let value = vendorDetails;

    keys.forEach((key) => {
      value = value ? value[key] : null;
    });

    defaultValues[field.name] = value || "";
  });

  return defaultValues;
};

export default generateDefaultValues;
