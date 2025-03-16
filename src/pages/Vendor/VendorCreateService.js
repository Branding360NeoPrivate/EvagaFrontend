import React, { useEffect, useState } from "react";
import SearchableCategoryAndSubcategoryDropdown from "../../components/Inputs/SearchableCategoryAndSubcategoryDropdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../context/redux/slices/categorySlice";
import useServices from "../../hooks/useServices";
import vendorApi from "../../services/vendorApi";
import { toast } from "react-toastify";
import DynamicForm from "../../components/Forms/DynamicForm";
import Cookies from "js-cookie";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import PrimaryButton from "../../components/buttons/PrimaryButton";
function VendorCreateService() {
  const selectedCategoryForm = useServices(vendorApi.getSelectedcategoryForm);
  const [loading, setLoading] = useState(false);
  const [inhouseCategoringOrBoth, setInhouseCategoringOrBoth] = useState(false);
  const [formInstances, setFormInstances] = useState([]);
  const addNewService = useServices(vendorApi.addNewvendorService);
  const [formFeilds, setFormFeilds] = useState([]);
  const [menuFeilds, setMenuFeilds] = useState([]);
  const [inhouseCategoringOrBothFeilds, setInhouseCategoringOrBothFeilds] =
    useState([]);
  const [
    inhouseCategoringOrBothPackageFeilds,
    setInhouseCategoringOrBothPackageFeilds,
  ] = useState([]);
  const [masterMenuData, setMasterMenuData] = useState(null);
  const [inHouseCateringMenuData, setInHouseCateringMenuData] = useState(null);
  const [inHouseCateringPackageData, setInHouseCateringPackageDataData] =
    useState([]);
  const [filedFormData, setfiledFormData] = useState([]);
  const [menuFields, setMenuFields] = useState([]);
  const { categories, subCategories } = useSelector((state) => state.category);
  const [selectedFormId, setselectedFormId] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [yearofExperience, setyearofExperience] = useState(0);
  const [abouttheService, setAbouttheService] = useState("");

  const [openMasterVenueModal, setOpenMasterVenueModal] = useState(false);
  const [openInHouseCateringModal, setOpenInHouseCateringModal] =
    useState(false);

  const dispatch = useDispatch();
  const history = useNavigate();
  const CHUNK_SIZE = 5 * 1024 * 1024;

  const uploadChunk = async (formData, chunkIndex) => {
    // use this later
    try {
      const response = await addNewService.callApi(
        Cookies.get("userId"),
        formData
      );
      console.log(`Chunk ${chunkIndex} uploaded successfully`, response);
      return response;
    } catch (error) {
      console.error(`Failed to upload chunk ${chunkIndex}`, error);
      throw error;
    }
  };

  const addNewServiceHandle = async () => {
    try {
      if (!abouttheService.trim()) {
        toast.error("Please fill in the 'About the Service' field.");
        return;
      }

      if (
        !yearofExperience.trim() ||
        isNaN(yearofExperience) ||
        yearofExperience <= 0
      ) {
        toast.error("Please enter a valid 'Year(s) of Experience'.");
        return;
      }
      setLoading(true);
      const userId = Cookies.get("userId");
      const formData = new FormData();
      formData.append("formTemplateId", selectedFormId);
      formData.append("Category", selectedCategory);
      formData.append("SubCategory", selectedSubCategory);
      formData.append("AbouttheService", abouttheService);
      formData.append("YearofExperience", yearofExperience);

      const services = formInstances.map((service, serviceIndex) => {
        const correspondingCateringPackages =
          inHouseCateringPackageData[serviceIndex] || [];

        return {
          values: service.data || [],
          menuTemplateId: menuFeilds?._id,
          menu: masterMenuData,
          cateringValueInVenue: inHouseCateringMenuData,
          cateringPackageVenue: correspondingCateringPackages.map(
            (packageItem) => packageItem.data || []
          ), 
        };
      });

      formData.append("services", JSON.stringify(services));
      services.forEach((service, serviceIndex) => {
        const values = service.values;
        const cateringPackageVenue = service.cateringPackageVenue;
        values.forEach((value) => {
          if (value.key === "CoverImage") {
            // Check if value.items is an array and contains File(s)
            if (Array.isArray(value.items)) {
              value.items.forEach((file, index) => {
                if (file instanceof File) {
                  formData.append(`CoverImage_${serviceIndex}`, file);
                } else {
                  console.log(
                    `Item at index ${index} is not a File instance`,
                    file
                  );
                }
              });
            } else if (value.items instanceof File) {
              formData.append(`CoverImage_${serviceIndex}`, value.items);
            } else {
              console.log("Unexpected type for CoverImage items:", value.items);
            }
          }
          if (value.key === "RecceReport") {
            if (Array.isArray(value.items)) {
              value.items.forEach((file, index) => {
                if (file instanceof File) {
                  formData.append(`RecceReport${serviceIndex}`, file);
                } else {
                  console.log(
                    `Item at index ${index} is not a File instance`,
                    file
                  );
                }
              });
            } else if (value.items instanceof File) {
              formData.append(`RecceReport${serviceIndex}`, value.items);
            } else {
              console.log(
                "Unexpected type for RecceReport items:",
                value.items
              );
            }
          }
          if (value.key === "FloorPlan") {
            if (Array.isArray(value.items)) {
              value.items.forEach((file, index) => {
                if (file instanceof File) {
                  formData.append(`FloorPlan${serviceIndex}`, file);
                } else {
                  console.log(
                    `Item at index ${index} is not a File instance`,
                    file
                  );
                }
              });
            } else if (value.items instanceof File) {
              formData.append(`FloorPlan${serviceIndex}`, value.items);
            } else {
              console.log("Unexpected type for FloorPlan items:", value.items);
            }
          }
          if (value.key === "3DTour") {
            if (Array.isArray(value.items)) {
              value.items.forEach((file, index) => {
                if (file instanceof File) {
                  formData.append(`3DTour${serviceIndex}`, file);
                } else {
                  console.log(
                    `Item at index ${index} is not a File instance`,
                    file
                  );
                }
              });
            } else if (value.items instanceof File) {
              formData.append(`3DTour${serviceIndex}`, value.items);
            } else {
              console.log("Unexpected type for 3DTour items:", value.items);
            }
          }
          if (value.key === "Certifications&Licenses") {
            if (Array.isArray(value.items)) {
              value.items.forEach((file, index) => {
                if (file instanceof File) {
                  formData.append(
                    `Certifications&Licenses${serviceIndex}`,
                    file
                  );
                } else {
                  console.log(
                    `Item at index ${index} is not a File instance`,
                    file
                  );
                }
              });
            } else if (value.items instanceof File) {
              formData.append(
                `Certifications&Licenses${serviceIndex}`,
                value.items
              );
            } else {
              console.log(
                "Unexpected type for Certifications&Licenses items:",
                value.items
              );
            }
          }

          if (value.key === "Portfolio") {
            console.log("Portfolio items:", value.items, "value.items");

            // Check if value.items is an object with photos and videos
            if (value.items && typeof value.items === "object") {
              // Handle photos
              if (Array.isArray(value.items.photos)) {
                value.items.photos.forEach((photo, photoIndex) => {
                  console.log(
                    `Appending Portfolio_photos_${serviceIndex}_${photoIndex}:`,
                    photo
                  );
                  formData.append(
                    `Portfolio_photos_${serviceIndex}_${photoIndex}`,
                    photo
                  );
                });
              }

              // Handle videos
              if (Array.isArray(value.items.videos)) {
                value.items.videos.forEach((video, videoIndex) => {
                  console.log(
                    `Appending Portfolio_videos_${serviceIndex}_${videoIndex}:`,
                    video
                  );
                  formData.append(
                    `Portfolio_videos_${serviceIndex}_${videoIndex}`,
                    video
                  );
                });
              }
            } else {
              console.log(
                "Unexpected structure for Portfolio items:",
                value.items
              );
            }
          }

          if (value.key === "ProductImage") {
            console.log("ProductImage items:", value.items);
            value.items.forEach((image, imageIndex) => {
              console.log(
                `Appending ProductImage_${serviceIndex}_${imageIndex}:`,
                image
              );
              formData.append(
                `ProductImage_${serviceIndex}_${imageIndex}`,
                image
              );
            });
          }
        });
        cateringPackageVenue?.forEach(function processNestedArray(
          value,
          outerIndex
        ) {
          if (Array.isArray(value)) {
            // If value is an array, process it recursively
            value.forEach((nestedValue, nestedIndex) =>
              processNestedArray(nestedValue, `${outerIndex}_${nestedIndex}`)
            );
          } else if (value && typeof value === "object") {
            console.log(value, "value");

            if (value.key === "CoverImage") {
              // Check if value.items is an array and contains File(s)
              if (Array.isArray(value.items)) {
                value.items.forEach((file, fileIndex) => {
                  if (file instanceof File) {
                    formData.append(
                      `CoverImage_cateringPackageVenue_${outerIndex}_${fileIndex}`,
                      file
                    );
                  } else {
                    console.log(
                      `Item at index ${fileIndex} is not a File instance`,
                      file
                    );
                  }
                });
              } else if (value.items instanceof File) {
                formData.append(
                  `CoverImage_cateringPackageVenue_${outerIndex}`,
                  value.items
                );
              } else {
                console.log(
                  "Unexpected type for CoverImage items:",
                  value.items
                );
              }
            }

            if (value.key === "Portfolio") {
              console.log("Portfolio items:", value.items, "value.items");
              if (value.items && typeof value.items === "object") {
                // Handle photos
                if (Array.isArray(value.items.photos)) {
                  value.items.photos.forEach((photo, photoIndex) => {
                    if (photo instanceof File) {
                      console.log(
                        `Appending Portfolio_photos_${outerIndex}_${photoIndex}:`,
                        photo
                      );
                      formData.append(
                        `Portfolio_photos_cateringPackageVenue_${outerIndex}_${photoIndex}`,
                        photo
                      );
                    } else {
                      console.log(
                        `Portfolio photo at index ${photoIndex} is not a File instance:`,
                        photo
                      );
                    }
                  });
                }

                // Handle videos
                if (Array.isArray(value.items.videos)) {
                  value.items.videos.forEach((video, videoIndex) => {
                    if (video instanceof File) {
                      console.log(
                        `Appending Portfolio_videos_${outerIndex}_${videoIndex}:`,
                        video
                      );
                      formData.append(
                        `Portfolio_videos_cateringPackageVenue_${outerIndex}_${videoIndex}`,
                        video
                      );
                    } else {
                      console.log(
                        `Portfolio video at index ${videoIndex} is not a File instance:`,
                        video
                      );
                    }
                  });
                }
              } else {
                console.log(
                  "Unexpected structure for Portfolio items:",
                  value.items
                );
              }
            }
          } else {
            console.log("Skipping unexpected item:", value);
          }
        });
      });

      const response = await addNewService.callApi(userId, formData);
      toast.success(response?.message);
      history("/vendor/dashboard");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to Get Form Value. Please try again.");
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories]);

  const getSelectedCategoryAndSubCategoryFormhandle = async (
    catId,
    subCatId
  ) => {
    try {
      setLoading(true);
      setyearofExperience("");
      setAbouttheService("");
      setyearofExperience("");
      setAbouttheService("");
      const response = await selectedCategoryForm.callApi(catId, subCatId);
      setFormFeilds(response?.Form);

      setMenuFeilds(response?.Menu && response?.Menu);
      setInhouseCategoringOrBothFeilds(
        response?.InHouseCategoringMasterMenu &&
          response?.InHouseCategoringMasterMenu
      );
      setInhouseCategoringOrBothPackageFeilds(
        response?.InHouseCategoringPackage && response?.InHouseCategoringPackage
      );
      setselectedFormId(response?.Form?._id);
      // Automatically add one form instance when form fields are set
      setFormInstances([
        {
          id: Date.now(),
          saved: false,
          data: null,
        },
      ]);
      if (response?.InHouseCategoringPackage) {
        setInHouseCateringPackageDataData([
          [
            {
              id: Date.now() + 10,
              saved: false,
              data: null,
            },
          ],
        ]);
      }
      // setMenuFields(response?.Menu);
      // toast.success(response?.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // toast.error("Failed to Get Form Value. Please try again.");
    }
  };

  const handleAddPackage = (index) => {
    setFormInstances((prev) => [
      ...prev,
      { id: Date.now(), saved: false, data: null },
    ]);
    if (inHouseCateringPackageData?.length > 0) {
      // setInHouseCateringPackageDataData((prev) => [
      //   ...prev,
      //   { id: Date.now(), saved: false, data: null },
      // ]);
      setInHouseCateringPackageDataData((prev) =>
        prev.map(
          (array, idx) =>
            idx === index
              ? [
                  ...array,
                  { id: Date.now(), saved: false, data: null }, // Add the new package to the matched array
                ]
              : array // Keep other arrays unchanged
        )
      );
    }
  };
  const handleAddPInHouseCateringPackage = (groupIndex) => {
 

    setInHouseCateringPackageDataData((prev) => {
      // Ensure the group exists
      const newData = [...prev];
      if (!newData[groupIndex]) {
        newData[groupIndex] = []; // Initialize the group if it doesn't exist
      }

      // Add the new package to the target group
      newData[groupIndex] = [
        ...newData[groupIndex],
        { id: Date.now(), saved: false, data: null },
      ];

      return newData;
    });
  };

  const handleRemoveForm = (index) => {
 
    setFormInstances((prev) => {
      const updated = prev.filter((_, i) => i !== index);
   
      return updated;
    });
  };

  const handleCreateService = () => {
    // const savedData = JSON.parse(localStorage.getItem("savedFormData")) || [];
    // console.log("Submitting Service with Data:", savedData);
  };

  // Master Venue Modal Functionality
  const handleOpenMasterVenueModal = () => {
    setOpenMasterVenueModal(true);
  };
  const handleOpenInHouseCateringMasterVenueModal = () => {
    setOpenInHouseCateringModal(true);
  };

  const handleCloseMasterVenueModal = () => {
    setOpenMasterVenueModal(false);
  };
  const handleClosInHouseCateringeMasterVenueModal = () => {
    setOpenInHouseCateringModal(false);
  };

  const allFormsSaved = inhouseCategoringOrBoth
    ? formInstances.every((form) => form.saved) &&
      inHouseCateringPackageData.flat().every((form) => form.saved === true)
    : formInstances.every((form) => form.saved);

  return (
    <div className="w-full flex items-center justify-center flex-col gap-4 my-4 relative">
      <div className="w-11/12 flex items-start justify-start flex-col">
        <h6 className="text-primary text-base font-medium">
          Create New Service
        </h6>

        <div className="w-full flex items-start justify-start flex-col border-2 border-textLightGray rounded-lg py-4 px-[5%] gap-4">
          <div className="w-full gap-4 grid grid-cols-1 cursor-pointer">
            <SearchableCategoryAndSubcategoryDropdown
              defaultValues={categories}
              onSelect={(fun) => [
                getSelectedCategoryAndSubCategoryFormhandle(
                  fun?.category?.id,
                  fun?.subCategory?.id,
                  fun
                ),

                setSelectedSubCategory(fun?.subCategory?.id),
                setSelectedCategory(fun?.category?.id),
              ]}
              textColor={"#6A1B9A"}
              textSize={"1rem"}
            />
          </div>
          <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-4 text-primary">
            <p className="text-base font-semibold">About the Service</p>
            <textarea
              type="text"
              className="col-span-3 bg-textLightGray p-2 border-none outline-none text-textGray"
              rows={5}
              onChange={(e) => setAbouttheService(e.target.value)}
            />
          </div>
          <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-4 text-primary">
            <p className="text-base font-semibold">Year(s) of Experience</p>
            <span className="col-span-1 flex items-center justfiy-center">
              <input
                type="number"
                className="bg-textLightGray outline-none border-none p-1 text-textGray"
                onChange={(e) => setyearofExperience(e.target.value)}
              />
              <p className="bg-textYellow p-1 text-textGray rounded-r-lg">
                Years
              </p>
            </span>
          </div>
        </div>
      </div>
      <div className="w-11/12 flex items-start justify-start flex-col">
        {menuFeilds && menuFeilds?.fields && (
          <>
            <h6 className="text-primary text-base font-semibold">
              Create Master Menu
            </h6>
            <div className="w-full flex items-start justify-start flex-col border-2 border-textLightGray rounded-lg py-4 px-[5%] gap-4">
              <div className="w-11/12 flex items-center justify-center flex-col">
                {masterMenuData ? (
                  <button
                    disabled={masterMenuData?.length > 0}
                    className=" btn-secondary w-fit px-5 flex items-center justify-center gap-4 mt-4"
                  >
                    Master Created
                  </button>
                ) : (
                  <PrimaryButton
                    className=" w-fit px-5 flex items-center justify-center gap-4 mt-4"
                    onClick={handleOpenMasterVenueModal}
                  >
                    Create A Master
                  </PrimaryButton>
                )}
                {inhouseCategoringOrBoth &&
                  (inHouseCateringMenuData ? (
                    <button
                      disabled={inHouseCateringMenuData?.length > 0}
                      className="btn-secondary w-fit px-5 flex items-center justify-center gap-4 mt-4"
                    >
                      Catering Master Created
                    </button>
                  ) : (
                    <PrimaryButton
                      className="w-fit px-5 flex items-center justify-center gap-4 mt-4"
                      onClick={handleOpenInHouseCateringMasterVenueModal}
                    >
                      Create Catering Master
                    </PrimaryButton>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-11/12 flex items-start justify-start flex-col">
        <h6 className="text-primary text-base font-semibold">
          Create Package(s)
        </h6>
        {formInstances.map((form, index) => (
          <div className="w-full flex items-start justify-start flex-col border-2 border-textLightGray rounded-lg py-4 px-[5%] gap-4">
            <div key={form.id} className="mb-4">
              <DynamicForm
                formData={formFeilds}
                key={form.id}
                index={index}
                setfiledFormData={(formData) => {
                  const updatedInstances = [...formInstances];
                  updatedInstances[index] = {
                    ...updatedInstances[index],
                    data: formData,
                    saved: true,
                  };
             
                  setFormInstances(updatedInstances);
                }}
                setOpenMasterVenueModal={setOpenMasterVenueModal}
                setOpenInHouseCateringModal={setOpenInHouseCateringModal}
                setInhouseCategoringOrBoth={setInhouseCategoringOrBoth}
              />

              {form.saved && formInstances.length > 1 && (
                <button
                  className="text-red-500 self-end mt-2 flex items-center gap-2"
                  onClick={(e) => [e.preventDefault(), handleRemoveForm(index)]}
                >
                  Remove
                </button>
              )}
            </div>
            {inhouseCategoringOrBoth &&
              inHouseCateringPackageData[index]?.map(
                (packageInstance, pkgIndex) => (
                  <div
                    key={`package-container-${index}-${packageInstance.id}`}
                    className="package-container"
                  >
                    <DynamicForm
                      key={`package-${index}-${packageInstance.id}`}
                      formData={inhouseCategoringOrBothPackageFeilds}
                      setfiledFormData={(formData) => {
                        const updatedPackageData = [
                          ...inHouseCateringPackageData,
                        ];
                        updatedPackageData[index][pkgIndex] = {
                          ...updatedPackageData[index][pkgIndex],
                          data: formData,
                          saved: true,
                        };
                        setInHouseCateringPackageDataData(updatedPackageData);
                      }}
                      setOpenMasterVenueModal={setOpenMasterVenueModal}
                      setOpenInHouseCateringModal={setOpenInHouseCateringModal}
                      setInhouseCategoringOrBoth={setInhouseCategoringOrBoth}
                    />
                    {/* Remove Button */}
                    {inHouseCateringPackageData[index]?.length > 1 && (
                      <button
                        onClick={() => {
                          const updatedPackageData = [
                            ...inHouseCateringPackageData,
                          ];
                          updatedPackageData[index] = updatedPackageData[
                            index
                          ].filter((_, i) => i !== pkgIndex);
                          setInHouseCateringPackageDataData(updatedPackageData);
                        }}
                        className="text-red-500 self-end mt-2 flex items-center gap-2"
                      >
                        Remove Package
                      </button>
                    )}
                  </div>
                )
              )}

            {allFormsSaved && inhouseCategoringOrBoth && (
              <button
                onClick={() => handleAddPInHouseCateringPackage(index)}
                className="btn-primary w-fit px-3 add-package-button"
              >
                Add New Catering Package
              </button>
            )}
          </div>
        ))}
        {allFormsSaved && (
          <p className="text-textGray py-2">
            {" "}
            Note: Once you've saved package, click on 'Create Service' to
            proceed.
          </p>
        )}{" "}
        {allFormsSaved && (
          <div className="flex items-center justify-end w-full gap-4 mt-4">
            {/* <button
              className="btn-primary w-fit px-3 add-package-button"
              onClick={handleAddPackage}
            >
              Add Package
            </button> */}
            {!loading ? (
              <button
                onClick={addNewServiceHandle}
                className="btn-transparent-border w-fit px-3 add-package-button"
              >
                Create Service
              </button>
            ) : (
              <button>Saving...</button>
            )}
          </div>
        )}
      </div>

      <Modal open={openMasterVenueModal} onClose={handleCloseMasterVenueModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: "80%",
            maxHeight: "80vh",
            minHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {
            <div className=" flex flex-col justify-center items-center w-full">
              <h2 className="font-bold text-xl mb-4 text-purpleHighlight">
                Master Venue On Boarding Form{" "}
              </h2>
              <DynamicForm
                formData={menuFeilds}
                setfiledFormData={setMasterMenuData}
                setOpenMasterVenueModal={setOpenMasterVenueModal}
                setOpenInHouseCateringModal={setOpenInHouseCateringModal}
                setInhouseCategoringOrBoth={setInhouseCategoringOrBoth}
              />
            </div>
          }
        </Box>
      </Modal>
      <Modal
        open={openInHouseCateringModal}
        onClose={handleClosInHouseCateringeMasterVenueModal}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: "80%",
            maxHeight: "80vh",
            minHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {
            <div className=" flex flex-col justify-center items-center w-full">
              <h2 className="font-bold text-xl mb-4 text-purpleHighlight">
                Master Venue On Boarding Form{" "}
              </h2>
              <DynamicForm
                formData={inhouseCategoringOrBothFeilds}
                setfiledFormData={setInHouseCateringMenuData}
                setOpenMasterVenueModal={setOpenMasterVenueModal}
                setOpenInHouseCateringModal={setOpenInHouseCateringModal}
                setInhouseCategoringOrBoth={setInhouseCategoringOrBoth}
              />
            </div>
          }
        </Box>
      </Modal>
    </div>
  );
}

export default VendorCreateService;
