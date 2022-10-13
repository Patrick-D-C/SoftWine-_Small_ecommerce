import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Contain } from "../../../components/molecule/Layout/style";
import WineForm from "../../../components/molecule/WineForm";
import { WineProps } from "../../../models/Wine";
import { useAuth } from "../../../services/AuthContext";
import { requestWine } from "../../../services/WineService";

const EditWine: React.FC = () => {
    let { id } = useParams();
    const { request } = useAuth();
    const [wine, setWine] = useState<WineProps>();

    useEffect(() => {
        const handleGetWine = async () => {
            const paramRequest = requestWine(id);
            const response = await request(paramRequest);

            if (response.status == 'success') {
                setWine(response.data);
            }
        }

        if (id)
            handleGetWine();
    }, [id]);


    return (
        <Contain>
            <Box pt={3}>
                <Typography variant="h5">Editar Vinho</Typography>
            </Box>
            {wine && <WineForm wine={wine} />}

        </Contain>
    )
}


export default EditWine;


