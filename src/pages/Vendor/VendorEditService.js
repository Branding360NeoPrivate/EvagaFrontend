import React, { useEffect, useMemo, useState } from "react";
import SearchableCategoryAndSubcategoryDropdown from "../../components/Inputs/SearchableCategoryAndSubcategoryDropdown";
import useServices from "../../hooks/useServices";
import vendorApi from "../../services/vendorApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DynamicForm from "../../components/Forms/DynamicForm";
import EditDynamicForm from "../../components/Forms/EditDynamicForm";

function VendorEditService() {
  const { serviceId } = useParams();
  const getOneServiceByid = useServices(vendorApi.getOnevendorService);

  const selectedCategoryForm = useServices(vendorApi.getSelectedcategoryForm);
  const [loading, setLoading] = useState(false);
  const [yearofExperience, setyearofExperience] = useState(0);
  const [abouttheService, setAbouttheService] = useState("");
  const [formInstances, setFormInstances] = useState([]);
  const [formFeilds, setFormFeilds] = useState([]);
  const [menuFeilds, setMenuFeilds] = useState([]);
  const [selectedCatgeory, setSelectedCategory] = useState();
  const [selectedSubCatgeory, setSelectedSubCategory] = useState();
  const { categories, subCategories } = useSelector((state) => state.category);
  const [selectedFormId, setselectedFormId] = useState();
  const [serviceValue, setServiceValue] = useState();
  const [openMasterVenueModal, setOpenMasterVenueModal] = useState(false);
  const getSelectedCategoryAndSubCategoryFormhandle = async (
    catId,
    subCatId
  ) => {
    try {
      setLoading(true);
      setyearofExperience("");
      setAbouttheService("");
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
  const updateServiceHandle=()=>{
    console.log(formInstances);
    
  }

  const handleAddPackage = () => {
    setFormInstances((prev) => [
      ...prev,
      { id: Date.now(), saved: false, data: formFeilds?.fields || [], },
    ]);
  };

  const handleRemoveForm = (index) => {
    setFormInstances((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGetOneServiceWithId = async () => {
    const response = await getOneServiceByid.callApi(serviceId);
    setServiceValue(response && response);
    setyearofExperience(response && response.YearofExperience);
    setAbouttheService(response && response.AbouttheService);
    setSelectedSubCategory(response && response.SubCategory?._id);
    setSelectedCategory(response && response?.Category?._id);
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
        id: service.id,
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
              items: Array.isArray(field.items) ? field.items : [],
            };
          } else {
            return {
              ...field,
              items: service?.values?.[field.key] || field.items || "",
            };
          }
        }),
        saved: true,
      }));
      setFormInstances(initialInstances);
    }
  }, [serviceValue, formFeilds?.fields]);

  console.log(formInstances, "formstance");

  return (
    <div className="w-full flex items-center justify-center flex-col gap-4 my-4 relative">
      <div className="w-11/12 flex items-start justify-start flex-col gap-2">
        <h6 className="text-primary text-xl font-medium">Create New Service</h6>
        <div className="w-full flex items-start justify-start flex-col border-2 border-textLightGray rounded-lg py-4 px-[5%] gap-4">
          <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2">
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
                formData={{ fields: form.data }} // Pass current form data
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

              {form.saved && formInstances.length < 1 && (
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

        {/* Buttons Section */}
        {formInstances.every((form) => form.saved) && ( // Ensure all forms are saved
          <div className="flex items-center justify-end w-full gap-4 mt-4">
            <button
              className="btn-primary w-fit px-3 add-package-button"
              onClick={handleAddPackage}
            >
              Add Package
            </button>
            {!loading ? (
              <button
                onClick={updateServiceHandle}
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
    </div>
  );
}

export default VendorEditService;
