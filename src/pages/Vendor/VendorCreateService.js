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
function VendorCreateService() {
  const selectedCategoryForm = useServices(vendorApi.getSelectedcategoryForm);
  const [formInstances, setFormInstances] = useState([]);
  const addNewService = useServices(vendorApi.addNewvendorService);
  const [formFeilds, setFormFeilds] = useState([]);
  const [menuFeilds, setMenuFeilds] = useState([]);
  const [filedFormData, setfiledFormData] = useState([]);
  const { categories, subCategories } = useSelector((state) => state.category);
  const [selectedFormId, setselectedFormId] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [yearofExperience, setyearofExperience] = useState(0);
  const [abouttheService, setAbouttheService] = useState("");
  const dispatch = useDispatch();

  const addNewServiceHandle = async () => {
   
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

    const userId = Cookies.get("userId");
    const formData = new FormData();
    formData.append("formTemplateId", selectedFormId);
    formData.append("Category", selectedCategory);
    formData.append("SubCategory", selectedSubCategory);
    formData.append("AbouttheService", abouttheService);
    formData.append("YearofExperience", yearofExperience);

    const services = formInstances.map((service) => {
      return {
        values: service.data || [],
      };
    });

    formData.append("services", JSON.stringify(services));
    services.forEach((service, serviceIndex) => {
      const values = service.values;
      console.log("values:", values);
      values.forEach((value) => {
        if (value.key === "CoverImage") {
          console.log("CoverImage: hyu6y", value.items);

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

        if (value.key === "Portfolio") {
          console.log("Portfolio items:", value.items);

          if (Array.isArray(value.items)) {
            value.items.forEach((item, itemIndex) => {
              // Handle photos
              if (item.photos) {
                item.photos.forEach((photo, photoIndex) => {
                  console.log(
                    `Appending Portfolio_photos_${serviceIndex}_${itemIndex}:`,
                    photo
                  );
                  formData.append(
                    `Portfolio_photos_${serviceIndex}_${itemIndex}`,
                    photo
                  );
                });
              }

              // Handle videos
              if (item.videos) {
                item.videos.forEach((video, videoIndex) => {
                  console.log(
                    `Appending Portfolio_videos_${serviceIndex}_${itemIndex}:`,
                    video
                  );
                  formData.append(
                    `Portfolio_videos_${serviceIndex}_${itemIndex}`,
                    video
                  );
                });
              }
            });
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
    });
    const response = await addNewService.callApi(userId, formData);
    toast.success(response?.message);
    console.log(response, "responce fron form creation");
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
      setyearofExperience("")
      setAbouttheService("")
      const response = await selectedCategoryForm.callApi(catId, subCatId);
      console.log(response);
      setFormFeilds(response?.Form);

      setMenuFeilds(response?.Menu && response?.Menu);
      setselectedFormId(response?.Form?._id);
      // Automatically add one form instance when form fields are set
      setFormInstances([
        {
          id: Date.now(),
          saved: false,
          data: null,
        },
      ]);
      toast.success(response?.message);
    } catch (error) {
      toast.error("Failed to Get Form Value. Please try again.");
    }
  };

  const handleAddPackage = () => {
    setFormInstances((prev) => [
      ...prev,
      { id: Date.now(), saved: false, data: null },
    ]);
  };

  const handleRemoveForm = (index) => {
    setFormInstances((prev) => prev.filter((_, i) => i !== index));

    const existingData =
      JSON.parse(localStorage.getItem("savedFormData")) || [];
    const updatedData = existingData.filter((_, i) => i !== index);
    localStorage.setItem("savedFormData", JSON.stringify(updatedData));
  };
  console.log(formInstances, "formInstances all filed form ");

  return (
    <div className="w-full flex items-center justify-center flex-col gap-4 my-4">
      <div className="w-11/12 flex items-start justify-start flex-col">
        <h6 className="text-primary text-xl font-medium">Create New Service</h6>

        <div className="w-full flex items-start justify-start flex-col border-2 border-textLightGray rounded-lg py-4 px-[5%] gap-4">
          <div className="w-full gap-4 grid grid-cols-1">
            <SearchableCategoryAndSubcategoryDropdown
              defaultValues={categories}
              onSelect={(fun) => [
                getSelectedCategoryAndSubCategoryFormhandle(
                  fun?.category?.id,
                  fun?.subCategory?.id,
                  fun
                ),
                setSelectedSubCategory(fun?.category?.id),
                setSelectedCategory(fun?.subCategory?.id),
              ]}
            />
          </div>
          <div className="w-full gap-4 grid grid-cols-4 text-primary">
            <p className="text-xl font-normal">About the Service</p>
            <textarea
              type="text"
              className="col-span-3 bg-textLightGray p-2 border-none outline-none text-textGray"
              rows={5}
              onChange={(e) => setAbouttheService(e.target.value)}
            />
          </div>
          <div className="w-full gap-4 grid grid-cols-4 text-primary">
            <p className="text-xl font-normal">Year(s) of Experience</p>
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
        <h6 className="text-primary text-xl font-medium">Create Package(s)</h6>
        {formInstances.map((form, index) => (
          <div className="w-full flex items-start justify-start flex-col border-2 border-textLightGray rounded-lg py-4 px-[5%] gap-4">
            <div key={form.id} className="mb-4">
              <DynamicForm
                formData={formFeilds}
                setfiledFormData={(formData) => {
                  setFormInstances((prevInstances) =>
                    prevInstances.map((instance, idx) =>
                      idx === index
                        ? { ...instance, data: formData, saved: true }
                        : instance
                    )
                  );
                }}
                key={form.id}
                index={index}
              />
              {form.saved && (
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

        {formInstances.some((form) => form.saved) && (
          <div className="flex items-center justify-end w-full gap-4 mt-4">
            <button
              className="btn-primary w-fit px-3 add-package-button"
              onClick={handleAddPackage}
            >
              Add Package
            </button>
            <button
              onClick={addNewServiceHandle}
              className="btn-transparent-border w-fit px-3 add-package-button"
            >
              Create Service
            </button>
          </div>
        )}
        <button
          onClick={addNewServiceHandle}
          className="btn-transparent-border w-fit px-3 add-package-button"
        >
          Create Service
        </button>
      </div>
    </div>
  );
}

export default VendorCreateService;
