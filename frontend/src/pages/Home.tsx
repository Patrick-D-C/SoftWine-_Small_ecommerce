import React, { useEffect, useState } from 'react';
import { useAuth } from '../services/AuthContext';
import { WineProps } from '../models/Wine';
import { requestListWines } from '../services/WineService';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, } from '@mui/material';

import Select, { SelectChangeEvent } from '@mui/material/Select';

import WineImg from '../assets/wine.jpg';


function Home() {

    const auth = useAuth();
    const [listWine, setListWine] = useState<WineProps[]>();
    const [open, setOpen] = React.useState(false);
    const [quantity, setQuantity] = useState(1);
    const [wine, setWine] = useState<WineProps>()

    useEffect(() => {
        const fetchListWine = async () => {

            const paramRequest = requestListWines();
            const response = await auth.request(paramRequest);
            if (response.status == 'success') {
                setListWine(response.data);
            }
        }
        if (!listWine)
            fetchListWine();

    });

    const handleChange = (event: SelectChangeEvent<typeof quantity>) => {
        setQuantity(event.target.value as number);
    };

    const handleClickOpen = (wine: WineProps) => {
        setWine(wine);
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const handleAddCart = async () => {
        if (wine && quantity) {
            const data = {
                product: wine,
                quantity
            }
            auth.updateCart({ type: 'add', payload: data });
            auth.createNotification({ status: "success", message: 'Produto adicionado ao carrinho.' })
            setOpen(false);
            setWine(undefined);
            setQuantity(1);
        }
    }

    return (
        <>
            <h1>Bem Vindo</h1>
            <h4></h4>
            <Grid
                container
                spacing={4}
                justifyContent="space-around"
            >
                {listWine?.map((wine, wineIndex) => {
                    return (
                        <Grid item xs={6} sm={4} md={3} xl={2} key={`wine${wine.id}`} sx={{ mb: 2 }}>
                            <Box

                                sx={{ p: 2, boxShadow: '0 0 7px 1px rgba(175,175,175, 0.35)', borderRadius: 4, textAlign: 'center' }}
                            >
                                <img src={WineImg} width="100%" />
                                <Box className='wine-name'>
                                    {wine.name}
                                </Box>
                                <Box className='wine-type'>
                                    {wine.type}
                                </Box>
                                <Box className='wine-weight'>
                                    {wine.weight >= 1000 ? wine.weight / 1000 + 'L' : wine.weight + 'ml'}
                                </Box>
                                <Box sx={{ py: 2 }} className='wine-price'>
                                    R$ {wine.price}
                                </Box>
                                <Grid sx={{ textAlign: 'center' }}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color='secondary'
                                        title='Adicionar ao carrinho'
                                        onClick={() => handleClickOpen(wine)}
                                    >
                                        Comprar
                                    </Button>
                                </Grid>

                            </Box>
                        </Grid>
                    );


                })}

            </Grid>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Quantos vinhos?</DialogTitle>
                <DialogContent>
                    <Box component="form">
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-dialog-select-label">Quantide</InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={quantity}
                                onChange={handleChange}
                                input={<OutlinedInput label="Qtde" />}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddCart}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>


    )

}


export default Home;