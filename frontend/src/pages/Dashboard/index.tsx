import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import { Url } from "../../components/atoms/Navbar/style";
import { Contain } from "../../components/molecule/Layout/style";

const Dashboard: React.FC = () => {

    return (
        <Contain>
            <h1>Dashboard</h1>
            <p>Bem vindo ao painel administrativo. Através desse painel você pode gerenciar seus produtos e as ordens de compra.</p>
            <Grid 
            container 
            spacing={3}
            sx={{my:2,mx:2}}
            >
                <Url to={'/dashboard/wine'}>Vinhos</Url>
                <Url to={'/dashboard/order'}>Pedidos</Url>
            </Grid>
        </Contain>
    )

}


export default Dashboard;