import React, { useEffect, useState } from "react";
import TableComponet from "../../utils/TableComponet";
import useServices from "../../hooks/useServices";
import commonApis from "../../services/commonApis";
import { useDispatch } from "react-redux";

function WaitlistTable() {
  const [page, setPage] = useState(1);
  const getAllAaitlistApi = useServices(commonApis.getAllAaitlist);
  const [waitlist, setWaitlist] = useState([]);
  const dispatch = useDispatch();
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const getAllFeedBackFormHandle = async () => {
    const response = await getAllAaitlistApi.callApi();
    setWaitlist(response ? response?.data : []);
  };
  useEffect(() => {
    getAllFeedBackFormHandle();
  }, []);
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
      <TableComponet
        columns={columns}
        data={waitlist}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default WaitlistTable;
