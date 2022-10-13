import { Box, Divider, Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderProps } from "../models/Order";
import { useAuth } from "../services/AuthContext";
import { requestOrder } from "../services/OrderService";
import WineImg from '../assets/wine.jpg';
import { Contain } from "../components/molecule/Layout/style";



const Order = () => {
    let { id } = useParams();
    const auth = useAuth();
    const [order, setOrder] = useState<OrderProps>();
    let invoiceSubtotal = 0;


    useEffect(() => {
        const fetchOrder = async () => {
            const paramRequest = requestOrder(id)
            const response = await auth.request(paramRequest);

            if (response.status == 'success') {
                setOrder(response.data);
            }

        }
        if (id)
            fetchOrder();

    }, [id]);



    return (
        <>
            {order ? (
                <Contain>
                    <Box>
                        <Typography variant="overline" color={"GrayText"}>
                            {order.created_at}
                        </Typography>
                        <Typography variant="h4">Ordem {order.id}</Typography>

                    </Box>
                    <Box sx={{ pt: 3, pb: 1, px: 2 }}>
                        <Typography variant="h5">
                            Produto(s)
                        </Typography>
                    </Box>
                    {order.itens.map((item, indexItem) => {
                        invoiceSubtotal += item.price * item.quantity;
                        return (
                            <Fragment
                                key={item.id_wine}
                            >
                                <Grid
                                    container
                                    spacing={4}
                                    sx={{ py: 2, px: 3 }}

                                >
                                    <Grid item xs={4} md={3} lg={3} xl={2}>
                                        <img src={WineImg} width="100%" />
                                    </Grid>
                                    <Grid item xs={8} md={7} lg={7} xl={8}>
                                        <Typography variant="subtitle2">
                                            {item.name} - {item.type} - {(item.weight * item.quantity / 1000) + 'kg'}
                                        </Typography>
                                        <Typography variant="body2">
                                            Quantidade: {item.quantity}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={2} lg={2} textAlign={'right'}>
                                        R$ {(item.price * item.quantity).toFixed(2)}
                                    </Grid>
                                </Grid>
                                <Divider />
                            </Fragment>
                        )
                    })}

                    <Grid
                        container
                        spacing={3}
                        sx={{ p: 3 }}
                    >
                        <Grid item xs>
                            Subtotal
                        </Grid>
                        <Grid item xs={2} md={2} lg={2} textAlign={'right'}>
                            R$ {invoiceSubtotal.toFixed(2)}
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid
                        container
                        spacing={3}
                        sx={{ p: 3 }}
                        alignItems={'center'}
                    >
                        <Grid item xs>
                            Frete
                        </Grid>
                        <Grid item xs={2} md={2} lg={2} textAlign={'right'}>
                            <Typography variant="body2">
                                {order.distance} Km
                            </Typography>
                            <Typography variant="inherit">
                                R$ {(order.price - invoiceSubtotal).toFixed(2)}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid
                        container
                        spacing={3}
                        sx={{ p: 3 }}
                        alignItems={'center'}
                    >
                        <Grid item xs>
                            <Typography variant="h6">
                                TOTAL PEDIDO
                            </Typography>
                        </Grid>
                        <Grid item xs={2} md={2} lg={2} textAlign={'right'}>
                            <Typography variant="h6">
                                R$ {order.price}
                            </Typography>
                        </Grid>
                    </Grid>

                </Contain>
            ) : (
                <Contain></Contain>
            )}
        </>
    )
}



export default Order;