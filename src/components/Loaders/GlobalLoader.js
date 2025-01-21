import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const GlobalLoader = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default GlobalLoader;
