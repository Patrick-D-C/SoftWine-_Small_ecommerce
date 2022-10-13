import React, { useEffect, useState } from "react"
import { Visibility } from "@mui/icons-material";
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import { Contain } from "../../../components/molecule/Layout/style";
import { useAuth } from "../../../services/AuthContext";
import { Link } from "react-router-dom";
import { requestListOrders } from "../../../services/OrderService";
import { OrderProps } from "../../../models/Order";


const ListOrders: React.FC = () => {

    const { request } = useAuth();
    const [listOrders, setListOrders] = useState<OrderProps[]>();

    useEffect(() => {
        const fetchListOrders = async () => {
            const paramRequest = requestListOrders()
            const response = await request(paramRequest);

            if (response.status == 'success') {
                setListOrders(response.data);
            }

        }
        if (!listOrders)
            fetchListOrders();

    }, []);



    return (
        <Contain>
            <Grid
                container
                justifyContent="space-between"
                py={2}
            >
                <Typography variant="h5">Pedidos</Typography>
            </Grid>
            <Table sx={{ minWidth: 200 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell width={40}>#</TableCell>
                        <TableCell>Data</TableCell>
                        <TableCell align="center">Distancia</TableCell>
                        <TableCell align="right">Valor</TableCell>
                        <TableCell align="right" width={120}>Ação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listOrders?.map(order => {
                        return (
                            <TableRow
                                key={order.id}
                            >
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.created_at}</TableCell>
                                <TableCell align="center">{order.distance >= 1000 ? (order.distance / 1000) + 'Km' : order.distance + 'm'}</TableCell>
                                <TableCell align="right">{order.price}</TableCell>
                                <TableCell align="right" width={120}>
                                    <Link to={`/order/${order.id}`}>
                                        <IconButton
                                            title="Visualizar Ordem"
                                            color="warning"
                                            size="small"
                                        >
                                            <Visibility />
                                        </IconButton>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Contain>
    )
}


export default ListOrders;