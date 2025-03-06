import React from "react";
import { useForm } from "react-hook-form";
function NonOrderRelatedQuery({ saveForm }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      await saveForm(data);
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };

  return (
    <div className=" w-full flex items-center justify-center flex-col">
      <div className="w-full md:w-[70%] bg-textLightGray px-4 py-8 rounded-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full  p-6 bg-transparent space-y-4"
        >
          <div>
            <label className="block text-normal font-semibold text-primary ">
              Subject
            </label>
            <input
              type="text"
              {...register("subject", { required: "Subject is required" })}
              className={`w-full bg-transparent mt-1 p-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none ${
                errors.subject ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-500">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-normal font-semibold text-primary ">
              Type Your Query
            </label>
            <textarea
              {...register("query", {
                required: "Query is required",
                minLength: {
                  value: 10,
                  message: "Query must be at least 10 characters long",
                },
              })}
              rows="4"
              className={`w-full bg-transparent  mt-1 p-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none ${
                errors.query ? "border-red-500" : "border-gray-300"
              }`}
            ></textarea>
            {errors.query && (
              <p className="mt-1 text-sm text-red-500">
                {errors.query.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-fit px-2 bg-primary text-white py-2 px-4 rounded-lg hover:bg-purpleSecondary transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NonOrderRelatedQuery;
