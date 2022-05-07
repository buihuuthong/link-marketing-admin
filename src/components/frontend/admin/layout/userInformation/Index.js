import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LeftInformation from "./left/LeftContainer";
import RightInformation from "./right/RightContainer";
import "../../../../../assets/auth/css/styles.css";
import "../../../../../assets/auth/js/scripts";
import "./user.css";

// import './user.scss';

const UserInformation = (userId) => {
  const navigate = useNavigate();
  console.log(userId);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ flexGrow: 1 }} className="boxContainer">
      <Grid container spacing={0}>
        <Grid item xs={8}>
          <LeftInformation />
        </Grid>
        <Grid item xs={4}>
          <RightInformation />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserInformation;
