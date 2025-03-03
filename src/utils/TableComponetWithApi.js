import React from "react";
import { Pagination, Stack } from "@mui/material";
function TableComponetWithApi({
  columns,
  data,
  page = 1,
  itemsPerPage = 10,
  onPageChange,
  totalPages,
}) {
  const style = {
    "& .Mui-selected": {
      backgroundColor: "#6A1B9A !important",
      color: "white",
    },
  };
  const count = totalPages;
  const paginatedData = data || [];
  return (
    <div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-primary text-white">
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-2 font-normal">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="text-center border text-textGray border-gray-200"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-2">
                    {col.render
                      ? col.render(row, rowIndex)
                      : row[col.key] || "N/A"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Component */}
      <div className="flex items-center justify-center w-full py-3">
        <Stack spacing={2}>
          <Pagination
            count={count}
            page={page}
            onChange={onPageChange}
            sx={style}
          />
        </Stack>
      </div>
    </div>
  );
}

export default TableComponetWithApi;
