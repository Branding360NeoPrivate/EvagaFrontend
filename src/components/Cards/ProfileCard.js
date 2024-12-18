import React from "react";
import image from "../../assets/Temporary Images/image.png";
function ProfileCard({
  profilePic,
  BusinessName,
  Category,
  profilePerccentage,
}) {
  return (
    <div className="flex items-center justify-center flex-col gap-2 w-full h-full px-4">
      <div className="w-full flex items-center justify-start mb-4">
        <div className="w-20 h-20 border-2 border-text-textGray rounded-full flex items-center justify-center mr-4">
          <img
            src={
              profilePic
                ? process.env.REACT_APP_API_Image_BASE_URL + profilePic
                : image
            }
            alt="GH Catering Logo"
            className="w-16 h-16 rounded-full flex"
          />
        </div>
        <div>
          <h2 className="text-2xl font-normal text-primary">
            {BusinessName ? BusinessName : "Geeta Pvt Ltd"}
          </h2>
          <p className="text-textGray">{Category ? Category : "Catering"}</p>
        </div>
      </div>

      <div className="w-full mb-4">
        {Number(profilePerccentage) < 100 ? (
          <p className="text-lg font-normal text-primary underline  underline-offset-1">
            {" "}
            Complete your profile
          </p>
        ) : (
          <p className="text-lg font-normal text-primary ">
            Profile is complete
          </p>
        )}
        <span className="w-full flex items-end justify-end text-primary">
          <p>{Number(profilePerccentage ? profilePerccentage : "60")}%</p>
        </span>
        <div className="progress-bar bg-gray-200  h-2 rounded-full mt-2">
          <div
            className="progress-bar-fill bg-primary h-2 rounded-full"
            style={{ width: `${profilePerccentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;