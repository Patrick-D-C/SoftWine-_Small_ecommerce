import React, { useEffect, useState } from "react"
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import { Contain } from "../../../components/molecule/Layout/style";
import { WineProps } from "../../../models/Wine";
import { useAuth } from "../../../services/AuthContext";
import { requestListWines, requestRemoveWine } from "../../../services/WineService";
import { Link } from "react-router-dom";


const ListWines: React.FC = () => {

    const { request, createNotification } = useAuth();
    const [listWines, setListWines] = useState<WineProps[]>();

    useEffect(() => {
        const fetchListWines = async () => {
            const paramRequest = requestListWines()
            const response = await request(paramRequest);

            if (response.status == 'success') {
                setListWines(response.data);
            }

        }
        if (!listWines)
            fetchListWines();

    }, []);


    const handleDeleteWine = async (id: number) => {
        const paramRequest = requestRemoveWine(id)
        const response = await request(paramRequest);
        if (response.status == 'success') {
            await createNotification({ status: "success", message: 'Vinho removido!' });
            setListWines(listWines?.filter(wine => wine.id != id));
        }
    }


    return (
        <Contain>
            <Grid
                container
                justifyContent="space-between"
                py={2}
            >
                <Typography variant="h5">Vinhos</Typography>
                <Link to={'/dashboard/wine/add'}>
                    <Button
                        sx={{ float: 'right' }}
                        variant="contained"
                        color="success"
                        size="small"
                    >

                        + Vinho


                    </Button>
                </Link>
            </Grid>
            <Table sx={{ minWidth: 200 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell width={40}>#</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell align="center">Tamanho</TableCell>
                        <TableCell align="right">Valor</TableCell>
                        <TableCell align="right" width={120}>Ação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listWines?.map(wine => {
                        return (
                            <TableRow
                                key={wine.id}
                            >
                                <TableCell>{wine.id}</TableCell>
                                <TableCell>{wine.name}</TableCell>
                                <TableCell>{wine.type}</TableCell>
                                <TableCell align="center">{wine.weight >= 1000 ? (wine.weight / 1000) + 'L' : wine.weight + 'ml'}</TableCell>
                                <TableCell align="right">{wine.price}</TableCell>
                                <TableCell align="right" width={120}>
                                    <Link to={`/dashboard/wine/edit/${wine.id}`}>
                                        <IconButton
                                            title="Editar Vinho"
                                            color="primary"
                                            size="small"
                                        >
                                            <EditOutlined />
                                        </IconButton>
                                    </Link>
                                    <IconButton
                                        title="Deletar Vinho"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDeleteWine(wine.id)}
                                    >
                                        <DeleteOutline />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Contain>
    )
}


export default ListWines;