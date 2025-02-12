import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
const FeedbackForm = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const clickAnimation = {
    whileTap: { scale: 0.95 },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center text-primary">
        Evaga Entertainment - Feedback Form
      </h2>
      <p className="text-textGray text-center mb-6">
        Thank you for sharing your valuable feedback! Your insights will help us
        improve our platform and services to create a seamless event planning
        experience.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.fieldset
          className="border p-4 rounded-md"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <legend className="font-semibold text-xl text-primary">
            1. Overall Experience & NPS
          </legend>
          <label className="block mt-2 font-semibold text-primary">
            How would you rate your overall experience?
          </label>
          <div className="flex flex-col">
            {["Excellent", "Good", "Average", "Poor"].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 mt-1 text-textGray"
              >
                <input
                  type="radio"
                  value={option}
                  className="customRadio"
                  {...register("experience", { required: true })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.experience && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="block mt-4 font-semibold text-primary">
            How likely are you to recommend us? (0-10)
          </label>
          <div className="grid grid-cols-6 lg:grid-cols-11">
            {[...Array(11).keys()].map((num) => (
              <label
                key={num}
                className="flex items-center space-x-2  mt-1 text-textGray"
              >
                <input
                  type="radio"
                  value={num}
                  className="customRadio"
                  {...register("recommend", { required: true })}
                />
                <span>{num}</span>
              </label>
            ))}
          </div>
          {errors.recommend && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="block mt-4 font-semibold text-primary">
            What was the primary reason for your rating?
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            {...register("rating", { required: true })}
          ></textarea>
          {errors.rating && (
            <p className="text-red-500">This field is required</p>
          )}
        </motion.fieldset>

        <motion.fieldset
          className="border p-4 rounded-md"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <legend className="font-semibold text-xl text-primary">
            2. User Experience (UI/UX & Platform Usability)
          </legend>
          <label className="block mt-2 font-semibold text-primary">
            How easy was it to navigate the Evaga platform?
          </label>
          <div className="flex flex-col">
            {["Very Easy", "Somewhat Easy", "Neutral", "Difficult"].map(
              (option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 mt-1 text-textGray"
                >
                  <input
                    type="radio"
                    value={option}
                    className="customRadio"
                    {...register("navigation", { required: true })}
                  />
                  <span>{option}</span>
                </label>
              )
            )}
          </div>
          {errors.navigation && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="block mt-2 font-semibold text-primary">
            Did you find the information about vendors and services clear and
            comprehensive?
          </label>
          <div className="flex flex-col">
            {[
              "Yes, it was well-organized",
              "Somewhat, but could be improved",
              "No, I found it confusing",
            ].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 mt-1 text-textGray"
              >
                <input
                  type="radio"
                  value={option}
                  className="customRadio"
                  {...register("information", { required: true })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.information && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="block mt-2 font-semibold text-primary">
            Did you face any technical issues while using the platform?{" "}
            <i>(Select all that apply)</i>
          </label>
          <div className="flex flex-col">
            {[
              "Slow website loading",
              "Issues with search or filtering",
              "Payment or booking issues",
              "Mobile responsiveness issues",
              "No issues encountered",
            ].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 mt-1 text-textGray "
              >
                <input
                  type="checkbox"
                  value={option}
                  className="customCheckbox"
                  {...register("technical", { required: true })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.technical && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="block mt-4 font-semibold text-primary">
            Any suggestions to improve our website’s UI/UX?
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            {...register("suggestions", { required: true })}
          ></textarea>
          {errors.suggestions && (
            <p className="text-red-500">This field is required</p>
          )}
        </motion.fieldset>

        <motion.fieldset
          className="border p-4 rounded-md"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <legend className="font-semibold text-xl text-primary">
            3. Customer Service Experience
          </legend>
          <label className="block mt-2 font-semibold text-primary">
            Did you interact with our customer support team?
          </label>
          <div className="flex flex-col">
            {["Yes", "No"].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 mt-1 text-textGray"
              >
                <input
                  type="radio"
                  value={option}
                  className="customRadio"
                  {...register("interact", { required: true })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.interact && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="block mt-2 font-semibold text-primary">
            If yes, how satisfied were you with our customer service?
          </label>
          <div className="flex flex-col">
            {["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"].map(
              (option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 mt-1 text-textGray"
                >
                  <input
                    type="radio"
                    value={option}
                    className="customRadio"
                    {...register("service", { required: true })}
                  />
                  <span>{option}</span>
                </label>
              )
            )}
          </div>
          {errors.service && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="block mt-2 font-semibold text-primary">
            How responsive was our support team?
          </label>
          <div className="flex flex-col">
            {[
              "Extremely responsive",
              "Somewhat responsive",
              "Neutral",
              "Slow response",
              "No response",
            ].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 mt-1 text-textGray"
              >
                <input
                  type="radio"
                  value={option}
                  className="customRadio"
                  {...register("support", { required: true })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.support && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="block mt-4 font-semibold text-primary">
            Any feedback on our customer support?
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            {...register("customer", { required: true })}
          ></textarea>
          {errors.customer && (
            <p className="text-red-500">This field is required</p>
          )}
        </motion.fieldset>

        <motion.fieldset
          className="border p-4 rounded-md"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <legend className="font-semibold text-xl text-primary">
            4. Platform Uniqueness & Future Improvements
          </legend>
          <label className="block mt-2 font-semibold text-primary">
            What do you think makes Evaga unique compared to other event
            planning platforms? <i>(Select all that apply)</i>
          </label>
          <div className="flex flex-col">
            {[
              "Wide range of vendor options",
              "Easy-to-use interface",
              "Transparent pricing & reviews",
              "Unique event planning features",
              "Customer support & assistance",
            ].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 mt-1 text-textGray"
              >
                <input
                  type="checkbox"
                  value={option}
                className="customCheckbox"
                  {...register("unique", { required: true })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.unique && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="block mt-2 font-semibold text-primary">
            What would you like to see improved or added to our platform?{" "}
            <i>(Select all that apply)</i>
          </label>
          <div className="flex flex-col">
            {[
              "More vendor categories",
              "Enhanced search & filtering",
              "More customer support options",
              "Better pricing transparency",
              "Mobile app version",
            ].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 mt-1 text-textGray"
              >
                <input
                  type="checkbox"
                  value={option}
                   className="customCheckbox"
                  {...register("platform", { required: true })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.platform && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="block mt-4 font-semibold text-primary">
            Any additional comments or suggestions?
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            {...register("comments", { required: true })}
          ></textarea>
          {errors.comments && (
            <p className="text-red-500">This field is required</p>
          )}
        </motion.fieldset>

        <motion.fieldset
          className="border p-4 rounded-md"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <legend className="font-semibold text-xl text-primary">
            5. Vendor Feedback
          </legend>
          <label className="block mt-2 font-semibold text-primary">
            Did you book any services through Evaga?
          </label>
          <div className="flex flex-col">
            {["Yes", "No, I just explored the platform"].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 mt-1 text-textGray"
              >
                <input
                  type="radio"
                  value={option}
                  className="customRadio"
                  {...register("booking", { required: true })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.booking && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="block mt-2 font-semibold text-primary">
            Which services did you book?{" "}
            <i>
              (Select all that apply, or select "None" if no service was booked)
            </i>
          </label>
          <div className="flex flex-col">
            {[
              "Venue & Location Services",
              "Catering & Beverage Services",
              "Photography & Videography",
              "Entertainment & Performances",
              "Event Staffing & Management",
              "Decor & Design Services",
              "Fashion & Beauty Services",
              "Rentals & Props",
              "None",
            ].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 mt-1 text-textGray"
              >
                <input
                  type="checkbox"
                  value={option}
                    className="customCheckbox"
                  {...register("serviceType", { required: true })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.serviceType && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="block mt-2 font-semibold text-primary">
            How satisfied were you with the vendor(s) you booked?
          </label>
          <div className="flex flex-col">
            {["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"].map(
              (option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 mt-1 text-textGray"
                >
                  <input
                    type="radio"
                    value={option}
                    className="customRadio"
                    {...register("vendor", { required: true })}
                  />
                  <span>{option}</span>
                </label>
              )
            )}
          </div>
          {errors.vendor && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="block mt-2 font-semibold text-primary">
            Did the vendor(s) meet your expectations in terms of quality and
            service?
          </label>
          <div className="flex flex-col">
            {[
              "Exceeded Expectations",
              "Met Expectations",
              "Below Expectations",
            ].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 mt-1 text-textGray"
              >
                <input
                  type="radio"
                  value={option}
                  className="customRadio"
                  {...register("expectations", { required: true })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.expectations && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="block mt-2 font-semibold text-primary">
            Would you book a vendor through Evaga again?
          </label>
          <div className="flex flex-col">
            {["Yes", "No"].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 mt-1 text-textGray"
              >
                <input
                  type="radio"
                  value={option}
                  className="customRadio"
                  {...register("bookAgain", { required: true })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.bookAgain && (
            <p className="text-red-500">This field is required</p>
          )}
          <label className="block mt-4 font-semibold text-primary">
            Any specific feedback for the vendor(s)?
          </label>
          <textarea
            className="w-full p-2 border rounded-md text-textGray"
            {...register("reason", { required: true })}
          ></textarea>
          {errors.reason && (
            <p className="text-red-500">This field is required</p>
          )}
        </motion.fieldset>
        <label className="block mt-2 font-semibold text-primary">
          Would you like to be contacted for follow-up?
        </label>
        <div className="flex flex-col">
          {["Yes, via Email", "Yes, via Phone", "No, thanks"].map((option) => (
            <label
              key={option}
              className="flex items-center space-x-2 text-textGray"
            >
              <input
                type="radio"
                value={option}
                className="customRadio"
                {...register("contact_preference", { required: true })}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.contact_preference && (
          <p className="text-red-500">This field is required</p>
        )}

        <div>
          <label className="block mt-2 font-semibold text-primary">
            Your Contact Details (Optional)
          </label>
          <label className="block">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="border p-2 w-full rounded-md text-textGray"
          />
          <label className="block">Phone</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            {...register("phone")}
            className="border p-2 w-full rounded-md text-textGray"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit Feedback
        </button>
      </form>
    </motion.div>
  );
};

export default FeedbackForm;
