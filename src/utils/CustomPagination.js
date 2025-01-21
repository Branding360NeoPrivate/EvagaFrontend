import { Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

function CustomPagination({totalPage,currentPage,onChange}) {
  const style = {
    "& .Mui-selected": {
      backgroundColor: "#6A1B9A !important",
      color: "white",
    },
  };
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const itemsPerPage = 10;


  
  return (
    <div className="flex items-center justify-center w-full py-3">
      <Stack spacing={2}>
        <Pagination
          count={totalPage>0?totalPage:1}
          page={currentPage}
          onChange={onChange}
          sx={style}
        />
      </Stack>
    </div>
  );
}

export default CustomPagination;
