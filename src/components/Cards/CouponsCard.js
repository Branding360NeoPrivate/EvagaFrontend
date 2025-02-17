import React from "react";
const offersData = {
  code: "GOEVAGANEW",
  description: "Get ₹ 4,000 Instant Discount",
  link: "#",
};

function CouponsCard({ code, setCouponCode }) {
  return (
    <div className="space-y-3" onClick={() => setCouponCode(code)}>
      <div className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center cursor-pointer transition-colors focus:outline focus:outline-primary">
        <div>
          <p className="text-primary font-semibold">{code}</p>
          {/* <p className="text-textGray text-sm">{offersData.description}</p> */}
        </div>
        <a
          href={offersData.link}
          className="text-primary font-medium underline"
        >
          View T&Cs
        </a>
      </div>
    </div>
  );
}

export default CouponsCard;
