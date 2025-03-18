import React, { useEffect, useState } from "react";
import TableComponet from "../../utils/TableComponet";
import useServices from "../../hooks/useServices";
import commonApis from "../../services/commonApis";
import { useDispatch } from "react-redux";
import useDebounce from "../../utils/useDebounce";
import TableComponetWithApi from "../../utils/TableComponetWithApi";

function WaitlistTable({ term }) {
  const [page, setPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const debounce = useDebounce(term);
  const getAllAaitlistApi = useServices(commonApis.getAllAaitlist);
  const [waitlist, setWaitlist] = useState([]);
  const dispatch = useDispatch();
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const getAllFeedBackFormHandle = async () => {
    const queryParams = {
      search: debounce || "",
      page: page || 1,
      // sortOrder: sortvalue || "asc",
    };
    const response = await getAllAaitlistApi.callApi(queryParams);
    setWaitlist(response ? response?.data : []);
    settotalPages(response ? response?.pagination?.totalPages : 1);
  };
  useEffect(() => {
    getAllFeedBackFormHandle();
  }, [page, debounce]);
  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Email",
      key: "email",
    },
  ];
  return (
    <div>
      {" "}
      <TableComponetWithApi
        columns={columns}
        data={waitlist}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
}

export default WaitlistTable;
