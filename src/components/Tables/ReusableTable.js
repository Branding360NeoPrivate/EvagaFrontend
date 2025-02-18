import React, { useState, useEffect } from "react";
import CustomPagination from "../../utils/CustomPagination";

function ReusableTable({ headers, fetchData, renderRow }) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchData(pagination.page, pagination.pageSize);
      setData(response.data);
      setPagination((prev) => ({ ...prev, total: response.total }));
    };
    loadData();
  }, [fetchData, pagination.page, pagination.pageSize]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newPageSize) => {
    setPagination((prev) => ({ ...prev, pageSize: newPageSize, page: 1 }));
  };

  return (
    <div className="w-full px-6 py-4 bg-white shadow-md rounded-lg">
      {data && data?.length > 0 ? (
        <>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-primary text-white">
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className={`font-normal  px-4 py-2 text-left ${
                      index === 0
                        ? "rounded-s-md"
                        : index === headers.length - 1
                        ? "rounded-e-md"
                        : ""
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{data?.map((item, index) => renderRow(item, index))}</tbody>
          </table>
          <CustomPagination
            currentPage={pagination.page}
            pageSize={pagination.pageSize}
            totalItems={pagination.total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      ) : (
        <div>No Data Found</div>
      )}
    </div>
  );
}

export default ReusableTable;
