import React, { useEffect, useState } from "react";
import useServices from "../../hooks/useServices";
import vendorApi from "../../services/vendorApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditDynamicForm from "../../components/Forms/EditDynamicForm";
import { toast } from "react-toastify";

function EditVendorService({ serviceId }) {
  const getOneServiceByid = useServices(vendorApi.getOnevendorService);
  const [inHouseCateringMenuData, setInHouseCateringMenuData] = useState(null);
  const [masterMenuData, setMasterMenuData] = useState(null);
  const selectedCategoryForm = useServices(vendorApi.getSelectedcategoryForm);
  const updateVendorServiceApi = useServices(vendorApi.updateVendorService);
  const [loading, setLoading] = useState(false);
  const [yearofExperience, setyearofExperience] = useState(0);
  const [abouttheService, setAbouttheService] = useState("");
  const [formInstances, setFormInstances] = useState([]);
  const [formFeilds, setFormFeilds] = useState([]);
  const [menuFeilds, setMenuFeilds] = useState([]);
  const [selectedCatgeory, setSelectedCategory] = useState();
  const [selectedSubCatgeory, setSelectedSubCategory] = useState();
  const [inHouseCateringPackageData, setInHouseCateringPackageDataData] =
    useState([]);
  const [selectedFormId, setselectedFormId] = useState();
  const [serviceValue, setServiceValue] = useState();
  const [openMasterVenueModal, setOpenMasterVenueModal] = useState(false);
  const getSelectedCategoryAndSubCategoryFormhandle = async (
    catId,
    subCatId
  ) => {
    try {
      setLoading(true);
      // setyearofExperience("");
      // setAbouttheService("");
      const response = await selectedCategoryForm.callApi(catId, subCatId);
      setFormFeilds(response?.Form);
      setMenuFeilds(response?.Menu && response?.Menu);
      setselectedFormId(response?.Form?._id);
      setFormInstances([
        {
          id: Date.now(),
          saved: false,
          data: null,
        },
      ]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleGetOneServiceWithId = async () => {
    const response = await getOneServiceByid.callApi(serviceId);
    setServiceValue(response && response);
    setyearofExperience(response.YearofExperience && response.YearofExperience);
    setAbouttheService(response.AbouttheService && response.AbouttheService);
    setSelectedSubCategory(response && response.SubCategory?._id);
    setSelectedCategory(response && response?.Category?._id);
  };
  const updateServiceHandle = async (e) => {
    e.preventDefault()
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
      const formData = new FormData();
      formData.append("formTemplateId", selectedFormId);
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

      const processFileFields = (key, value, serviceIndex) => {
        if (Array.isArray(value)) {
          value.forEach((item, itemIndex) => {
            if (item instanceof File) {
              formData.append(`${key}_${serviceIndex}_${itemIndex}`, item);
            } else if (typeof item === "string") {
              formData.append(`${key}_${serviceIndex}_${itemIndex}`, item);
            }
          });
        } else if (value instanceof File) {
          formData.append(`${key}_${serviceIndex}`, value);
        } else if (typeof value === "string") {
          formData.append(`${key}_${serviceIndex}`, value);
        }
      };

      services.forEach((service, serviceIndex) => {
        const values = service.values;

        values.forEach((value) => {
          switch (value.key) {
            case "CoverImage":
            case "RecceReport":
            case "FloorPlan":
            case "3DTour":
            case "Certifications&Licenses":
            case "ProductImage":
              processFileFields(value.key, value.items, serviceIndex);
              break;

            case "Portfolio":
              if (value.items && typeof value.items === "object") {
                // Handle Portfolio photos
                if (Array.isArray(value.items.photos)) {
                  value.items.photos.forEach((photo, photoIndex) => {
                    if (photo instanceof File) {
                      formData.append(
                        `Portfolio_photos_${serviceIndex}_${photoIndex}`,
                        photo
                      );
                    } else if (typeof photo === "string") {
                      formData.append(
                        `Portfolio_photos_${serviceIndex}_${photoIndex}`,
                        photo
                      );
                    }
                  });
                }

                // Handle Portfolio videos
                if (Array.isArray(value.items.videos)) {
                  value.items.videos.forEach((video, videoIndex) => {
                    if (video instanceof File) {
                      formData.append(
                        `Portfolio_videos_${serviceIndex}_${videoIndex}`,
                        video
                      );
                    } else if (typeof video === "string") {
                      formData.append(
                        `Portfolio_videos_${serviceIndex}_${videoIndex}`,
                        video
                      );
                    }
                  });
                }
              }
              break;

            default:
              // Skip non-file fields like Title, Price, etc.
              console.log(`Skipping non-file field: ${value.key}`);
          }
        });
      });

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const response = await updateVendorServiceApi.callApi(
        serviceId,
        formData
      );

      setLoading(false);
      console.log(response);
      toast.success("Service updated successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Error updating service:", error);
      toast.error("Something went wrong!");
    }
  };
  const handleAddPackage = () => {
    setFormInstances((prev) => [
      ...prev,
      { id: Date.now(), saved: false, data: formFeilds?.fields || [] },
    ]);
  };

  const handleRemoveForm = (index) => {
    setFormInstances((prev) => prev.filter((_, i) => i !== index));
  };
  useEffect(() => {
    handleGetOneServiceWithId();
  }, [serviceId]);
  useEffect(() => {
    if (selectedCatgeory && selectedSubCatgeory) {
      getSelectedCategoryAndSubCategoryFormhandle(
        selectedCatgeory,
        selectedSubCatgeory
      );
    }
  }, [selectedCatgeory, selectedSubCatgeory]);
  useEffect(() => {
    if (serviceValue?.services) {
      const initialInstances = serviceValue.services.map((service) => ({
        id: service._id,
        data: formFeilds?.fields?.map((field) => {
          if (field.type === "select") {
            const selectedValue = service?.values?.[field.key];
            return {
              ...field,
              items: Array.isArray(field.items)
                ? [...new Set([selectedValue, ...field.items].filter(Boolean))]
                : [],
            };
          } else if (field.type === "radio") {
            const selectedValue = service?.values?.[field.key];
            return {
              ...field,
              items: Array.isArray(field.items)
                ? field.items.map((item) => ({
                    ...item,
                    checked: item.value === selectedValue,
                  }))
                : [],
            };
          } else if (field.key === "AddOns") {
            const userValues = service?.values?.[field.key];
            return {
              ...field,
              items:
                Array.isArray(userValues) && userValues.length > 0
                  ? userValues
                  : Array.isArray(field.items) && field.items.length > 0
                  ? field.items.map((item) => ({ ...item }))
                  : [],
            };
          } else if (field.key === "Package") {
            const userValues = service?.values?.[field.key];
            return {
              ...field,
              items:
                Array.isArray(userValues) && userValues.length > 0
                  ? userValues
                  : Array.isArray(field.items) && field.items.length > 0
                  ? field.items.map((item) => ({ ...item }))
                  : [],
            };
          } else if (field.key === "VehicleTarrifs") {
            const userValues = service?.values?.[field.key];
            return {
              ...field,
              items:
                Array.isArray(userValues) && userValues.length > 0
                  ? userValues
                  : Array.isArray(field.items) && field.items.length > 0
                  ? field.items.map((item) => ({ ...item }))
                  : [],
            };
          } else {
            return {
              ...field,
              items: service?.values?.[field.key] || field.items || "",
            };
          }
        }),
        saved: false,
      }));
      setFormInstances(initialInstances);
    }
  }, [serviceValue, formFeilds?.fields]);

  return (
    <div className="w-full flex items-center justify-center flex-col gap-4 my-4 relative">
      <div className="w-11/12 flex items-start justify-start flex-col gap-2">
        <h6 className="text-primary text-xl font-medium">Create New Service</h6>
        <div className="w-full flex items-start justify-start flex-col border-2 border-textLightGray rounded-lg py-4 px-[5%] gap-4">
          <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-1">
            <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-4 text-primary">
              <p className="text-xl font-normal">Category</p>
              <input
                type="text"
                className="col-span-3 bg-textLightGray p-2 border-none outline-none text-textGray rounded-md"
                value={serviceValue?.Category?.name}
                disabled
              />
            </div>
            <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-4 text-primary">
              <p className="text-xl font-normal">Sub Category</p>
              <input
                type="text"
                className="col-span-3 bg-textLightGray p-2 border-none outline-none text-textGray rounded-md"
                value={serviceValue?.SubCategory?.name}
                disabled
              />
            </div>
          </div>
          <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-4 text-primary">
            <p className="text-xl font-normal">About the Service</p>
            <textarea
              type="text"
              className="col-span-3 bg-textLightGray p-2 border-none outline-none text-textGray rounded-md"
              rows={5}
              value={abouttheService}
              onChange={(e) => setAbouttheService(e.target.value)}
            />
          </div>
          <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-4 text-primary">
            <p className="text-xl font-normal">Year(s) of Experience</p>
            <span className="col-span-1 flex items-center justfiy-center">
              <input
                type="number"
                className="bg-textLightGray outline-none border-none p-1 text-textGray"
                value={yearofExperience}
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
        <h6 className="text-primary text-xl font-medium">Create Package(s)</h6>
        {formInstances.map((form, index) => (
          <div className="w-full flex items-start justify-start flex-col border-2 border-textLightGray rounded-lg py-4 px-[5%] gap-4">
            <div key={form.id} className="mb-4">
              <EditDynamicForm
                formData={{ fields: form.data }} 
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
              />

              {form.saved && formInstances.length > 1 && (
                <button
                  className="btn-danger mt-2"
                  onClick={() => handleRemoveForm(index)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        {formInstances.every((form) => form.saved) && ( 
          <div className="flex items-center justify-end w-full gap-4 mt-4">
            {/* <button
              className="btn-primary w-fit px-3 add-package-button"
              onClick={handleAddPackage}
            >
              Add Package
            </button> */}
            {!loading ? (
              <button
                onClick={updateServiceHandle}
                className="btn-transparent-border w-fit px-3 add-package-button"
              >
                Update Service
              </button>
            ) : (
              <button>Saving...</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EditVendorService;
