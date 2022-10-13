import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../../atoms/Navbar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Notification from "../../atoms/Notification";
import { Container } from "@mui/material";

const theme = createTheme();


const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container>
        <Outlet />
      </Container>
      <Notification/>
      
    </ThemeProvider>
  );
};

export default Layout;