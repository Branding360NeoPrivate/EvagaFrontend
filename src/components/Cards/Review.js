import React from "react";
import { useState } from "react";
import Submit from "../../assets/Temporary Images/submit.png";
import Avatar1 from "../../assets/Temporary Images/avatar1.png";
import useServices from "../../hooks/useServices";
import commonApis from "../../services/commonApis";
import Cookies from "js-cookie";
const reviewsData = {
  overallRating: 0,
  totalReviews: 0,
  ratingsBreakdown: {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  },
  reviews: [
    // {
    //   id: 1,
    //   name: "Lorem Ipsum",
    //   avatarImage: Avatar1,
    //   rating: 4.2,
    //   text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    // },
  ],
};

const Reviews = ({ serviceId, packageId }) => {
  const userId = Cookies.get("userId");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const addReviewWithUserIdApi = useServices(commonApis.addReviewWithUserId);
  const addReviewWithUserIdApiHandle = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("userId", userId);
    formdata.append("serviceId", serviceId);
    formdata.append("packageId", packageId);
    formdata.append("rating", rating);
    formdata.append("review", review);
    const response = await addReviewWithUserIdApi.callApi(formdata);
    console.log(response);
  };
  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <div className="text-[Poppins] inset-0 z-50 flex items-center justify-start ">
      <div className="bg-white w-full w-full p-1 rounded-md overflow-y-auto ">
        <div className="flex justify-between border-b border-textGray/30  mb-4">
          <h2 className="text-2xl font-semibold text-primary">Reviews</h2>
        </div>
        <div className="flex mb-6 ml-2 border-b border-gray-300">
          <div className="flex flex-col justify-center mb-2">
            <span className="text-xl text-primary mr-2">
              {reviewsData.overallRating}{" "}
              <span className="text-[3rem] text-[#FFE500]">★</span>
            </span>
            <span className="text-primary">
              ({reviewsData.totalReviews}) Reviews
            </span>
          </div>
          <div className="ml-2">
            {Object.keys(reviewsData.ratingsBreakdown)
              .sort((a, b) => b - a)
              .map((rating) => (
                <div key={rating} className="flex items-center text-purple-600">
                  <span className="flex items-center mr-2">
                    {Array.from({ length: rating }).map((_, index) => (
                      <span
                        key={rating - index}
                        className="text-xl text-[#FFE500] px-2"
                      >
                        ★
                      </span>
                    ))}
                  </span>
                  <span className="text-primary">
                    ({reviewsData.ratingsBreakdown[rating]})
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="divide-y border-b border-gray-300">
          {reviewsData.reviews.map((review) => (
            <div key={review.id} className="py-4 flex">
              <div>
                <img
                  className="w-[3.5rem]"
                  src={review.avatarImage}
                  alt="avatar"
                />
              </div>
              <div className="ml-2">
                <h4 className="font-semibold text-primary flex items-center">
                  {review.name}{" "}
                  <span className="text-[#FFE500] text-sm ml-2">★</span>
                  <span className="text-gray-500 text-sm ml-2">
                    {review.rating}
                  </span>
                </h4>
                <p className="text-textGray mt-1 text-sm">{review.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex">
            <p className="mt-1 mr-4">Rate Us</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-7 h-7 cursor-pointer text-white stroke-gray-300 fill-none m-[2pX] ${
                  rating >= star ? "stroke-yellow-500 fill-yellow-500" : ""
                }`}
                onClick={() => handleClick(star)}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 8.5 12 2" />
              </svg>
            ))}
          </div>
          <div className="flex mt-2 w-full">
            <form
              className="flex w-full"
              onSubmit={addReviewWithUserIdApiHandle}
            >
              <input
                type="text"
                placeholder="Write a review"
                className="w-full h-[60px] px-4 py-2 border-[15px] border-textGray/20 rounded-lg focus:outline-none"
                onChange={(e) => setReview(e.target.value)}
                required
              />
              <button
                className="btn-primary w-fit px-2"
                style={{ marginLeft: "2rem", marginTop: "0.5rem" }}
                disabled={!userId ? true : false}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
