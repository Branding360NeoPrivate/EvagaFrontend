import React, { useEffect, useState } from "react";
import adminActionsApi from "../../services/adminActionsApi";
import useServices from "../../hooks/useServices";
import formatCurrency from "../../utils/formatCurrency";
import DateRangePicker from "../../utils/DateRangePicker";

function AdminDashBoardchart() {
  const [data, setData] = useState([
    { title: "Total New Orders", count: 0, total: "" },
    { title: "Total Confirmed Orders", count: 0, total: "" },
    { title: "Total Ongoing Orders", count: 0, total: "" },
    { title: "Total Completed Orders", count: 0, total: "" },
    { title: "Total Cancelled Orders", count: 0, total: "" },
  ]);
  const [dashboardData, setDashboardData] = useState({
    orderStatusSummary: [],
    serviceSummary: {},
    totalVendors: "",
    totalRegisteredVendors: "",
    totalVerifiedRegisteredVendors: "",
  });
  const AddRecentViewApi = useServices(
    adminActionsApi.GetAdminDashboardDataHandle
  );
  const AddRecentViewApiHandle = async (fromDate, toDate) => {
    const queryParams = {
      fromDate: fromDate || "",
      toDate: toDate || "",
    };
    const response = await AddRecentViewApi.callApi(queryParams);
    setDashboardData({
      ...dashboardData,
      totalVendors: response?.totalVendors,
      totalVerifiedRegisteredVendors: response?.totalVerifiedRegisteredVendors,
      totalRegisteredVendors: response?.totalRegisteredVendors,
      serviceSummary: response?.serviceSummary,
    });
    const orderSummary = response.orderStatusSummary;

    const updatedData = data.map((item) => {
      const statusMapping = {
        "Total New Orders": "new",
        "Total Confirmed Orders": "confirmed",
        "Total Cancelled Orders": "cancelled",
        "Total Ongoing Orders": "active",
        "Total Completed Orders": "completed",
      };
    
      const matchingStatus = orderSummary.find(
        (status) => status.orderStatus === statusMapping[item.title]
      );
    
      return {
        ...item,
        count: matchingStatus ? matchingStatus.count : 0, // Reset count to 0 if no match
        total: matchingStatus ? matchingStatus.totalCombined.toFixed(2) : "0.00", // Reset total to "0.00" if no match
      };
    });
    setData(updatedData);
    
  };

  const vendorAndUser = [
    { title: "Total Sign Up Vendors", value: dashboardData?.totalVendors },
    {
      title: "Total Pending Vendors",
      value: dashboardData?.totalRegisteredVendors,
    },
    {
      title: "Total Approved Vendors ",
      value: dashboardData?.totalVerifiedRegisteredVendors,
    },
  ];
  const vendorService = [
    {
      title: "Total Services Listed ",
      value: dashboardData?.serviceSummary?.totalServices,
    },
    {
      title: "Total Verified Services  ",
      value: dashboardData?.serviceSummary?.verifiedCount,
    },
    {
      title: "Total Pending Services  ",
      value: dashboardData?.serviceSummary?.pendingCount,
    },
    {
      title: "Total Rejected Services ",
      value: dashboardData?.serviceSummary?.rejectedCount,
    },
  ];
  useEffect(() => {
    AddRecentViewApiHandle();
  }, []);
  return (
    <div className="w-full flex items-center justify-center flex-col  gap-2">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-semibold w-full flex items-start justify-start text-primary">
          Vendor & Customer
        </h2>
        <DateRangePicker onSearch={AddRecentViewApiHandle}/>
      </div>
      <div className="flex items-center justify-start flex-wrap gap-4 w-full">
        {vendorAndUser.map((item, index) => (
          <div
            key={index}
            className="bg-textLightGray p-4 py-8 rounded-md flex-[0.3] min-w-[300px] flex flex-col items-center"
          >
            <h3 className="text-primary text-xl font-medium">{item.title}</h3>
            <span className="text-textGray flex items-center justify-center text-xl">
              <strong>{item.value}</strong>
            </span>
          </div>
        ))}
      </div>{" "}
      <h2 className="text-2xl font-semibold w-full flex items-start justify-start text-primary">
        Vendor Listed Service
      </h2>
      <div className="flex items-center justify-start flex-wrap gap-4 w-full">
        {vendorService.map((item, index) => (
          <div
            key={index}
            className="bg-textLightGray p-4 py-8 rounded-md flex-[0.3] min-w-[250px] flex flex-col items-center"
          >
            <h3 className="text-primary text-xl font-medium">{item.title}</h3>
            <span className="text-textGray flex items-center justify-center text-xl">
              <strong>{item.value}</strong>
            </span>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-semibold w-full flex items-start justify-start text-primary">
        Orders
      </h2>
      <div className="flex items-center justify-start flex-wrap gap-4 w-full">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-textLightGray p-4 py-8 rounded-md flex-[0.3] min-w-[380px] flex flex-col"
          >
            <h3 className="text-primary text-xl font-medium">{item.title}</h3>
            <span className="text-textGray">
              Number Of Order: <strong>{item.count}</strong>
            </span>{" "}
            <span className="text-textGray">
              Order Value: <strong>{formatCurrency(item.total)}</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashBoardchart;
