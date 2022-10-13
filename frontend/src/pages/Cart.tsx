import React, { useEffect, useState } from 'react'
import { ItemProps } from '../models/Order';
import { useAuth } from '../services/AuthContext';
import { DeleteOutline } from '@mui/icons-material';
import { Button, ButtonGroup, Box, Paper, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, TextField, Grid, InputAdornment, Typography } from '@mui/material';
import { requestInsertOrder } from '../services/OrderService';
import { useNavigate } from 'react-router-dom';
import { Contain } from '../components/molecule/Layout/style';

const Cart: React.FC = () => {

    const auth = useAuth();
    let navigate = useNavigate();
    const [distance, setDistance] = useState(0);
    const [invoiceShipping, setInvoiceShipping] = useState(0);
    const [invoiceTotal, setInvoiceTotal] = useState(0);

    let invoiceSubtotal = 0;
    let weightTotal = 0;


    function calcShipping(peso: number, distance: number) {
        let frete = 0;

        if (distance < Number(import.meta.env.VITE_CALC_MIN_KM)) {
            frete = (peso / Number(import.meta.env.VITE_CALC_QTDE_KILO)) * Number(import.meta.env.VITE_CALC_POR_QTDE_KILO);
        } else if (distance >= Number(import.meta.env.VITE_CALC_MIN_KM)) {
            frete = peso * distance / Number(import.meta.env.VITE_CALC_DIV)
        }

        setInvoiceShipping(frete);
    }

    useEffect(() => {

        if (invoiceShipping > 0 && invoiceSubtotal > 0) {
            setInvoiceTotal(invoiceShipping + invoiceSubtotal);
        }
    });


    const handleRemoveItem = async (id: number) => {
        await auth.updateCart({ type: 'remove', payload: { id } });
        await auth.createNotification({ status: "success", message: 'Produto removido do carrinho.' })
        calcShipping(weightTotal, distance);
    }

    const handleChangeQuantity = async (item: ItemProps, action: string) => {
        if (action == 'up') {
            await auth.updateCart({ type: 'update', payload: { id: item.product.id, quantity: item.quantity + 1 } })
        } else if (action == 'down') {
            await auth.updateCart({ type: 'update', payload: { id: item.product.id, quantity: item.quantity - 1 } })
        }
        calcShipping(weightTotal, distance);
    }

    const handleFinishOrder = async () => {
        const paramRequest = requestInsertOrder({ cart: auth.cart, distance, price: invoiceTotal })
        const response = await auth.request(paramRequest);

        if (response.status == 'success') {
            await auth.createNotification({ status: "success", message: 'Compra finalizada!' });
            navigate(`/order/${response.data.id}`);
        }
    }




    if (auth.cart?.length > 0) {
        return (
            <>
                <h1>Carrinho</h1>
                <p>Confira abaixo os itens incluidos ao seu carrinho!</p>

                <TableContainer component={Paper}>
                    <Box sx={{ p: 2, textAlign: 'right' }}>
                        <Button onClick={auth.clearCart} >Limpar carrinho</Button>
                    </Box>
                    <Table sx={{ minWidth: 300 }} aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell width={40}>#</TableCell>
                                <TableCell align='center' width={90}>Ação</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell align="center">Qty.</TableCell>
                                <TableCell align="center">Peso</TableCell>
                                <TableCell align="right">Valor</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {auth.cart?.map((item, indexItem) => {
                                invoiceSubtotal += item.product.price * item.quantity;
                                weightTotal += (item.product.weight * item.quantity) / 1000;
                                return (
                                    <TableRow key={indexItem}>
                                        <TableCell>{item.product.id}</TableCell>
                                        <TableCell width={90}>
                                            <Button
                                                size='small'
                                                color='error'
                                                onClick={() => handleRemoveItem(item.product.id)}
                                            >
                                                <DeleteOutline />
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Box className='wine-name'>
                                                {item.product.name}
                                            </Box>
                                            <Box className='wine-type'>
                                                {item.product.type}
                                            </Box>
                                            <Box className='wine-weight'>
                                                R$ {Number(item.product.price).toLocaleString('pt-br', { maximumFractionDigits: 2 })} - {item.product.weight > 1000 ? ((item.product.weight / 1000) + 'L') : item.product.weight + 'ml'}
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                <Button onClick={() => handleChangeQuantity(item, 'down')}>-</Button>
                                                <Button disabled>{item.quantity}</Button>
                                                <Button onClick={() => handleChangeQuantity(item, 'up')}>+</Button>
                                            </ButtonGroup>
                                        </TableCell>
                                        <TableCell align="center">{(item.product.weight * item.quantity / 1000) + 'kg'}</TableCell>
                                        <TableCell align="right">R$ {(item.product.price * item.quantity).toLocaleString('pt-br', { maximumFractionDigits: 2 })}</TableCell>
                                    </TableRow>
                                )

                            })}
                        </TableBody>
                    </Table>

                    <Grid
                        container
                        spacing={2}
                        justifyContent="end"
                    >
                        <Grid
                            item xs={8} md={6} lg={4}
                            sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end', my: 3 }}
                        >
                            Distancia da entrega:
                            <TextField
                                type={'number'}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                size="small"
                                variant="standard"
                                sx={{ mx: 2, width: 100 }}
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                                onBlur={() => calcShipping(weightTotal, distance)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">km</InputAdornment>,
                                }}
                            />
                        </Grid>
                    </Grid>
                </TableContainer>
                <Grid
                    container
                    spacing={2}
                    justifyContent="end"
                >
                    <Grid
                        item xs={8} md={6} lg={4} xl={3}
                        sx={{ justifyContent: 'end', my: 3 }}
                    >
                        <Paper>
                            <Table sx={{ width: '100%' }} aria-label="spanning table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Subtotal</TableCell>
                                        <TableCell align='right'>R$ {invoiceSubtotal.toLocaleString('pt-br', { maximumFractionDigits: 2 })}</TableCell>
                                    </TableRow>
                                    {invoiceShipping > 0 && (
                                        <TableRow>
                                            <TableCell>Frete</TableCell>
                                            <TableCell align='right'>R$ {invoiceShipping.toLocaleString('pt-br', { maximumFractionDigits: 2 })}</TableCell>
                                        </TableRow>
                                    )}
                                    {invoiceShipping > 0 && invoiceSubtotal > 0 && (
                                        <TableRow>
                                            <TableCell>
                                                <Typography variant="h6">
                                                    Total
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='right'>R$ {(invoiceTotal).toLocaleString('pt-br', { maximumFractionDigits: 2 })}</TableCell>
                                        </TableRow>
                                    )}

                                </TableBody>
                            </Table>
                        </Paper>
                        {(invoiceTotal > 0 && invoiceSubtotal > 0) && (
                            <Box
                                sx={{ py: 4, textAlign: 'right' }}
                            >
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    onClick={handleFinishOrder}
                                >Concluir pedido</Button>
                            </Box>
                        )}

                    </Grid>
                </Grid>
            </>
        )
    } else {
        return (
            <Contain>
                <h1>Carrinho</h1>
                <p>Seu carrinho está vaziu.</p>
            </Contain>
        )
    }

}




export default Cart;