import React, { useEffect, useState } from "react";
import adminActionsApi from "../../services/adminActionsApi";
import useServices from "../../hooks/useServices";
import formatCurrency from "../../utils/formatCurrency";

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
    totalVendor: "",
  });
  const AddRecentViewApi = useServices(
    adminActionsApi.GetAdminDashboardDataHandle
  );
  const AddRecentViewApiHandle = async () => {
    const response = await AddRecentViewApi.callApi();
    setDashboardData({
      ...dashboardData,
      totalVendor: response?.totalVendor,
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

      return matchingStatus
        ? {
            ...item,
            count: matchingStatus.count,
            total: matchingStatus.totalCombined.toFixed(2),
          }
        : item;
    });
    setData(updatedData);
  };

  const vendorAndUser = [
    { title: "Total Active Vendors ", value: dashboardData?.totalVendor },
    { title: "Total Registered Vendors ", value: dashboardData?.totalVendor },
  ];
  useEffect(() => {
    AddRecentViewApiHandle();
  }, []);
  return (
    <div className="w-full flex items-center justify-center flex-col  gap-2">
      <h2 className="text-2xl font-semibold w-full flex items-start justify-start text-primary">
        Vendor & Customer
      </h2>
      <div className="flex items-center justify-start flex-wrap gap-4 w-full">
        {vendorAndUser.map((item, index) => (
          <div
            key={index}
            className="bg-textLightGray p-4 py-8 rounded-md flex-[0.3] min-w-[400px] flex flex-col"
          >
            <h3 className="text-primary text-xl font-medium">{item.title}</h3>
            <span className="text-textGray">
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
