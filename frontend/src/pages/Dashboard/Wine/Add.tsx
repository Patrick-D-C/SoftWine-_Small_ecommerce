import { Box, Typography } from "@mui/material";
import React from "react";
import { Contain } from "../../../components/molecule/Layout/style";
import WineForm from "../../../components/molecule/WineForm";

const AddWine: React.FC = () => {


    return (
        <Contain>
            <Box pt={3}>
                <Typography variant="h5">Cadastrar Vinho</Typography>
            </Box>
            <WineForm />
        </Contain>
    )
}


export default AddWine;


