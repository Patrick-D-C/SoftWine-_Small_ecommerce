import React from "react";
import AppBar from '@mui/material/AppBar';

import { Badge, Button, Link, Toolbar, Typography } from '@mui/material'
import { LocalMall, ManageAccounts, ShoppingCart, VerifiedUser } from "@mui/icons-material";
import { useAuth } from "../../../services/AuthContext";
import { Url } from "./style";
import { Box } from "@mui/system";

function Navbar() {

  const auth = useAuth();

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar

        sx={{ flexWrap: 'wrap' }}
      >
        <Typography variant="h6" color="secondary" noWrap sx={{ flexGrow: 1 }}>
          Soft Wine
        </Typography>
        <Box
          component='nav'
          sx={{ px: 3 }}
        >
          <Url title="Pagina Inicial" to={'/'}>
            Início
          </Url>
        </Box>
        <nav>
          <Url title="Dashboard" to={'/dashboard'}>
            <Badge>
              <ManageAccounts />
            </Badge>
          </Url>
          <Url title="Carrinho de compras" to={'/cart'}>
            <Badge badgeContent={auth.cart?.length} color="primary">
              <LocalMall />
            </Badge>
          </Url>
        </nav>


      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
