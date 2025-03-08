import { regexList } from "./regex";

const formfields = {
  adminLogin: [
    {
      fields: [
        {
          name: "identifier",
          type: "text",
          placeholder: "Email or Phone Number",
          validation: {
            required: "Email or Phone Number is required",
            pattern: {
              value: regexList.emailAndPhone,
              message: "Enter a valid email or 10-digit phone number",
            },
          },
        },
        {
          name: "password",
          type: "password",
          placeholder: "Password",
          validation: {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          },
        },
      ],
    },
  ],

  userLogin: [
    {
      fields: [
        {
          name: "identifier",
          type: "text",
          placeholder: "Email or Phone Number",
          validation: {
            required: "Email or Phone Number is required",
            pattern: {
              value: regexList.emailAndPhone,
              message: "Enter a valid email or 10-digit phone number",
            },
          },
        },
        {
          name: "password",
          type: "password",
          placeholder: "Password",
          validation: {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          },
        },
      ],
    },
    // {
    //   fields: [
    //     {
    //       name: "otp",
    //       type: "otp",
    //       placeholder: "OTP",
    //       validation: {
    //         required: "OTP is required",
    //         minLength: { value: 4, message: "OTP must be 4 or 6 digits" },
    //         maxLength: { value: 6, message: "OTP must be 4 or 6 digits" },
    //       },
    //     },
    //   ],
    // },
  ],
  userSignUp: [
    {
      fields: [
        {
          name: "name",
          type: "text",
          placeholder: "Name",
          validation: { required: "Name is required" },
        },
        {
          name: "email",
          type: "text",
          placeholder: "Email",
          validation: {
            required: "Email is required",
            pattern: { value: regexList.email, message: "Enter a valid email" },
          },
        },
        {
          name: "phone",
          type: "text",
          placeholder: "Phone",
          validation: {
            required: "Phone is required",
            pattern: {
              value: regexList.phone,
              message: "Enter a valid 10-digit phone number",
            },
          },
        },
      ],
    },
    {
      fields: [
        {
          name: "password",
          type: "password",
          placeholder: "Password",
          validation: {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          },
        },
        {
          name: "confirmPassword",
          type: "password",
          placeholder: "Re-enter Password",
          validation: { required: "Please confirm your password" },
        },
      ],
    },

    // {
    //   fields: [
    //     {
    //       name: "otp",
    //       type: "otp",
    //       placeholder: "OTP",
    //       validation: {
    //         required: "OTP is required",
    //         minLength: { value: 4, message: "OTP must be 4 or 6 digits" },
    //         maxLength: { value: 6, message: "OTP must be 4 or 6 digits" },
    //       },
    //     },
    //   ],
    // },
  ],
  userForgotPassword: [
    {
      fields: [
        {
          name: "identifier",
          type: "text",
          placeholder: "Email or Phone Number",
          validation: {
            required: "Email or Phone Number is required",
            pattern: {
              value: regexList.emailAndPhone,
              message: "Enter a valid email or 10-digit phone number",
            },
          },
        },
      ],
    },
    {
      fields: [
        {
          name: "otp",
          type: "otp",
          placeholder: "OTP",
          validation: {
            required: "OTP is required",
            minLength: { value: 4, message: "OTP must be 4 or 6 digits" },
            maxLength: { value: 6, message: "OTP must be 4 or 6 digits" },
          },
        },
      ],
    },
    {
      fields: [
        {
          name: "password",
          type: "password",
          placeholder: "Password",
          validation: {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          },
        },
        {
          name: "confirmPassword",
          type: "password",
          placeholder: "Re-enter Password",
          validation: {
            required: "Please confirm your password",
            validate: (value, allValues) =>
              value === allValues.password || "Passwords do not match",
          },
        },
      ],
    },
  ],
  vendorSignUp: [
    {
      fields: [
        {
          name: "name",
          type: "text",
          placeholder: "Vendor/Trade Name",
          validation: {
            required: "Name is required",
          },
        },
        {
          name: "email",
          type: "text",
          placeholder: "Email",
          validation: {
            required: "Email is required",
            pattern: {
              value: regexList.email,
              message: "Enter a valid email",
            },
          },
        },
        {
          name: "phoneNumber",
          type: "text",
          placeholder: "Phone",
          validation: {
            required: "Phone is required",
            pattern: {
              value: regexList.phone,
              message: "Enter a valid 10-digit phone number",
            },
          },
        },
        {
          name: "location",
          type: "searchable",
          placeholder: "Location",
          validation: {
            required: "Location is required",
          },
        },
        {
          name: "areaOfInterest",
          type: "searchable",
          placeholder: "Area of Interest",
        },
        {
          name: "yearOfExperience",
          type: "number",
          placeholder: "Years of Experience",
          def: 0,
          min: 0,
        },
      ],
    },
    {
      fields: [
        {
          name: "password",
          type: "password",
          placeholder: "Password",
          validation: {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          },
        },
        {
          name: "confirmPassword",
          type: "password",
          placeholder: "Re-enter Password",
          validation: {
            required: "Please confirm your password",
            validate: (value, allValues) =>
              value === allValues.password || "Passwords do not match",
          },
        },
      ],
    },
  ],
  vendorLogin: [
    {
      fields: [
        {
          name: "identifier",
          type: "text",
          placeholder: "Email or Phone Number",
          validation: {
            required: "Email or Phone Number is required",
            pattern: {
              value: regexList.emailAndPhone,
              message: "Enter a valid email or 10-digit phone number",
            },
          },
        },
        {
          name: "password",
          type: "password",
          placeholder: "Password",
          validation: {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          },
        },
      ],
    },
  ],

  vendorForgotPassword: [
    {
      fields: [
        {
          name: "identifier",
          type: "text",
          placeholder: "Email or Phone Number",
          validation: {
            required: "Email or Phone Number is required",
            pattern: {
              value: regexList.emailAndPhone,
              message: "Enter a valid email or 10-digit phone number",
            },
          },
        },
      ],
    },
    {
      fields: [
        {
          name: "otp",
          type: "otp",
          placeholder: "OTP",
          validation: {
            required: "OTP is required",
            minLength: { value: 4, message: "OTP must be 4 or 6 digits" },
            maxLength: { value: 6, message: "OTP must be 4 or 6 digits" },
          },
        },
      ],
    },
    {
      fields: [
        {
          name: "password",
          type: "password",
          placeholder: "Password",
          validation: {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          },
        },
        {
          name: "confirmPassword",
          type: "password",
          placeholder: "Re-enter Password",
          validation: {
            required: "Please confirm your password",
            validate: (value, allValues) =>
              value === allValues.password || "Passwords do not match",
          },
        },
      ],
    },
  ],

  vendorProfileDetails: {
    bioDetails: {
      fields: [
        {
          name: "bio",
          type: "textarea",
          placeholder: "Bio",
          validation: {
            required: "Bio is required",
          },
        },
      ],
    },
    name: {
      fields: [
        {
          name: "name",
          type: "input",
          placeholder: "name",
          validation: {
            required: "name is required",
          },
        },
      ],
    },
    profilePicture: {
      fields: [
        {
          name: "profilePicture",
          type: "file",
          accept: "image/jpeg, image/png",
          validation: {
            required: "Profile picture is required",
            maxSize: {
              value: 2 * 1024 * 1024, // 2MB
              message: "Profile picture size should not exceed 2MB",
            },
          },
        },
      ],
    },
    personalDetails: {
      fields: [
        {
          name: "phoneNumber",
          type: "tel",
          placeholder: "Phone Number",
          validation: {
            required: "Phone number is required",
            pattern: {
              value: regexList.phone,
              message: "Enter a valid 10-digit phone number",
            },
          },
        },
        {
          name: "alternatePhoneNumber",
          type: "tel",
          placeholder: "Alternate Phone Number",
          validation: {
            // required: "Phone number is required",
            pattern: {
              value: regexList.phone,
              message: "Enter a valid 10-digit phone number",
            },
          },
        },
        {
          name: "email",
          type: "email",
          placeholder: "Email",
          validation: {
            required: "Email is required",
            pattern: { value: regexList.email, message: "Enter a valid email" },
          },
        },
        {
          name: "website",
          type: "text",
          placeholder: "Website Link",
          validation: {
            pattern: {
              value: regexList.url,
              message: "Enter a valid URL",
            },
          },
        },
        {
          name: "facebook",
          type: "text",
          placeholder: "Facebook Link",
          validation: {
            pattern: {
              value: regexList.url,
              message: "Enter a valid URL",
            },
          },
        },
        {
          name: "instagram",
          type: "text",
          placeholder: "Instagram Link",
          validation: {
            pattern: {
              value: regexList.url,
              message: "Enter a valid URL",
            },
          },
        },
      ],
    },
    bankDetails: {
      fields: [
        {
          name: "accountNumber",
          type: "text",
          placeholder: "Account Number",
          validation: { required: "Account number is required" },
        },
        {
          name: "bankName",
          type: "text",
          placeholder: "Bank Name",
          validation: { required: "Bank name is required" },
        },
        {
          name: "ifscCode",
          type: "text",
          placeholder: "IFSC Code",
          validation: { required: "IFSC code is required" },
        },
        {
          name: "accountType",
          type: "select",
          placeholder: "Account Type",
          options: ["savings", "current"],
          validation: { required: "Account type is required" },
        },
      ],
    },
    businessDetails: {
      fields: [
        {
          name: "typeOfBusiness",
          type: "select",
          placeholder: "Type of Business",
          options: [
            "Private Limited",
            "Public Limited",
            "Sole Proprietorship",
            "Partnership",
            "LLP",
            "Others",
          ],
          validation: { required: "Type of business is required" },
        },
        {
          name: "panNumber",
          type: "text",
          placeholder: "PAN Number",
          validation: { required: "PAN number is required" },
        },
        {
          name: "nameOfApplicant",
          type: "text",
          placeholder: "Name of Applicant",
          validation: { required: "Name of applicant is required" },
        },
        {
          name: "applicantID",
          type: "text",
          placeholder: "Applicant ID",
          // validation: { required: "Applicant ID is required " },
        },
        {
          name: "udyamAadhaar",
          type: "text",
          placeholder: "Aadhaar Number",
          validation: { required: "Aadhaar Number is required" },
        },
        {
          name: "gstNumber",
          type: "text",
          placeholder: "GST Number",
          validation: { required: "GST number is required" },
        },
        {
          name: "businessAddress",
          type: "text",
          placeholder: "Business Address",
          validation: { required: "Business address is required" },
        },
        {
          name: "city",
          type: "text",
          placeholder: "City",
          validation: { required: "City is required" },
        },
        {
          name: "state",
          type: "text",
          placeholder: "State",
          validation: { required: "State is required" },
        },

        {
          name: "pincode",
          type: "text",
          placeholder: "Pincode",
          validation: { required: "Pincode is required" },
        },
        {
          name: "serviceableRadius",
          type: "number",
          def: 0,
          min: 0,
          placeholder: "Serviceable Radius (in km)",
          validation: { required: "Serviceable radius is required" },
        },
        {
          name: "categoriesOfServices",
          type: "searchableCategoryAndSubCategory",
          placeholder: "Category and Subcategory",
          validation: {
            required: "Category and Subcategory is required",
          },
        },
      ],
    },
    categoryAndSubCategory: {
      fields: [
        {
          name: "categoriesOfServices",
          type: "searchableCategoryAndSubCategory",
          placeholder: "Category and Subcategory",
          validation: {
            required: "Category and Subcategory is required",
          },
        },
      ],
    },
    documents: {
      fields: [
        {
          name: "gstCertificate",
          type: "file",
          placeholder: "GST Certificate",
          validation: {
            required: "GST Certificate is required",
            validate: {
              fileType: (value) => {
                const acceptedTypes = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                  "application/pdf",
                ];
                return (
                  (value && acceptedTypes.includes(value[0].type)) ||
                  "File must be JPEG, JPG, PNG, or PDF"
                );
              },
              fileSize: (value) => {
                const maxSize = 2 * 1024 * 1024; // 2MB
                return (
                  (value && value[0].size <= maxSize) ||
                  "File size must not exceed 2MB"
                );
              },
            },
          },
        },
        {
          name: "bankStatement",
          type: "file",
          placeholder: "Bank Statement",
          validation: {
            required: "Bank Statement is required",
            validate: {
              fileType: (value) => {
                const acceptedTypes = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                  "application/pdf",
                ];
                return (
                  (value && acceptedTypes.includes(value[0].type)) ||
                  "File must be JPEG, JPG, PNG, or PDF"
                );
              },
              fileSize: (value) => {
                const maxSize = 2 * 1024 * 1024; // 2MB
                return (
                  (value && value[0].size <= maxSize) ||
                  "File size must not exceed 2MB"
                );
              },
            },
          },
        },
        {
          name: "insurance",
          type: "file",
          placeholder: "Insurance",
          validation: {
            required: "Insurance document is required",
            validate: {
              fileType: (value) => {
                const acceptedTypes = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                  "application/pdf",
                ];
                return (
                  (value && acceptedTypes.includes(value[0].type)) ||
                  "File must be JPEG, JPG, PNG, or PDF"
                );
              },
              fileSize: (value) => {
                const maxSize = 2 * 1024 * 1024; // 2MB
                return (
                  (value && value[0].size <= maxSize) ||
                  "File size must not exceed 2MB"
                );
              },
            },
          },
        },
        {
          name: "panCard",
          type: "file",
          placeholder: "PAN Card",
          validation: {
            required: "PAN Card is required",
            validate: {
              fileType: (value) => {
                const acceptedTypes = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                  "application/pdf",
                ];
                return (
                  (value && acceptedTypes.includes(value[0].type)) ||
                  "File must be JPEG, JPG, PNG, or PDF"
                );
              },
              fileSize: (value) => {
                const maxSize = 2 * 1024 * 1024; // 2MB
                return (
                  (value && value[0].size <= maxSize) ||
                  "File size must not exceed 2MB"
                );
              },
            },
          },
        },
        {
          name: "certificateOfIncorporation",
          type: "file",
          placeholder: "Certificate of Incorporation",
          validation: {
            required: "Certificate of Incorporation is required",
            validate: {
              fileType: (value) => {
                const acceptedTypes = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                  "application/pdf",
                ];
                return (
                  (value && acceptedTypes.includes(value[0].type)) ||
                  "File must be JPEG, JPG, PNG, or PDF"
                );
              },
              fileSize: (value) => {
                const maxSize = 2 * 1024 * 1024; // 2MB
                return (
                  (value && value[0].size <= maxSize) ||
                  "File size must not exceed 2MB"
                );
              },
            },
          },
        },
        {
          name: "itrIncomeTax",
          type: "file",
          placeholder: "ITR-Income Tax",
          validation: {
            required: "ITR-Income Tax document is required",
            validate: {
              fileType: (value) => {
                const acceptedTypes = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                  "application/pdf",
                ];
                return (
                  (value && acceptedTypes.includes(value[0].type)) ||
                  "File must be JPEG, JPG, PNG, or PDF"
                );
              },
              fileSize: (value) => {
                const maxSize = 2 * 1024 * 1024; // 2MB
                return (
                  (value && value[0].size <= maxSize) ||
                  "File size must not exceed 2MB"
                );
              },
            },
          },
        },
        {
          name: "foodSafetyCertificate",
          type: "file",
          placeholder: "Food Safety Certificate",
          validation: {
            required: "Food Safety Certificate is required",
            validate: {
              fileType: (value) => {
                const acceptedTypes = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                  "application/pdf",
                ];
                return (
                  (value && acceptedTypes.includes(value[0].type)) ||
                  "File must be JPEG, JPG, PNG, or PDF"
                );
              },
              fileSize: (value) => {
                const maxSize = 2 * 1024 * 1024; // 2MB
                return (
                  (value && value[0].size <= maxSize) ||
                  "File size must not exceed 2MB"
                );
              },
            },
          },
        },
        {
          name: "fireLicense",
          type: "file",
          placeholder: "Fire License",
          validation: {
            required: "Fire License is required",
            validate: {
              fileType: (value) => {
                const acceptedTypes = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                  "application/pdf",
                ];
                return (
                  (value && acceptedTypes.includes(value[0].type)) ||
                  "File must be JPEG, JPG, PNG, or PDF"
                );
              },
              fileSize: (value) => {
                const maxSize = 2 * 1024 * 1024; // 2MB
                return (
                  (value && value[0].size <= maxSize) ||
                  "File size must not exceed 2MB"
                );
              },
            },
          },
        },
        {
          name: "miscellaneous",
          type: "file",
          placeholder: "Miscellaneous",
          validation: {
            validate: {
              fileType: (value) => {
                const acceptedTypes = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                  "application/pdf",
                ];
                return (
                  !value ||
                  acceptedTypes.includes(value[0].type) ||
                  "File must be JPEG, JPG, PNG, or PDF"
                );
              },
              fileSize: (value) => {
                const maxSize = 2 * 1024 * 1024; // 2MB
                return (
                  !value ||
                  value[0].size <= maxSize ||
                  "File size must not exceed 2MB"
                );
              },
            },
          },
        },
      ],
    },
  },
};

export default formfields;
