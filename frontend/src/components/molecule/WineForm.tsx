import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { WineProps } from '../../models/Wine';
import { useAuth } from '../../services/AuthContext';
import { requestAddWine, requestUpdateWine } from '../../services/WineService';



const ValidationForm = Yup.object().shape({
    name: Yup.string().required('Campo Obrigatório').max(45),
    price: Yup.number().required('Campo Obrigatório').test(
        'is-decimal',
        'Formato inválido',
        value => (value + "").match(/^\d*[\.{1}\d*]\d*$/) || value?.length === 0,
    ),
    type: Yup.string().required('Campo Obrigatório').max(45),
    weight: Yup.number().required('Campo Obrigatório').max(70000, 'Máximo 70L').min(3)
});


const WineForm = (props: { wine?: WineProps }) => {

    const { wine } = props;
    const { request, createNotification } = useAuth();
    let navigate = useNavigate();

    const returnInitialValues = () => {
        return {
            name: wine?.name || '',
            price: wine?.price || 0,
            type: wine?.type || '',
            weight: wine?.weight || 0
        }

    }

    const formik = useFormik({
        initialValues: returnInitialValues(),
        validationSchema: ValidationForm,
        onSubmit: async (values) => {
            if (wine?.id) {
                const paramRequest = requestUpdateWine(values, wine.id);
                const response = await request(paramRequest);

                if (response.status == 'success') {
                    await createNotification({ status: "success", message: 'Vinho atualizado!' });
                    navigate(`/dashboard/wine`);
                }
            } else {
                const paramRequest = requestAddWine(values);
                const response = await request(paramRequest);

                if (response.status == 'success') {
                    await createNotification({ status: "success", message: 'Vinho cadastrado!' });
                    navigate(`/dashboard/wine`);
                }
            }
        }


    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid
                    container
                    spacing={3}
                    rowSpacing={2}
                    alignItems="center"
                    justifyContent="space-evenly"
                    py={3}
                    px={2}
                >
                    <Grid item>
                        <TextField
                            name="name"
                            label="Nome vinho"
                            variant='standard'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            helperText={
                                (formik.touched.name &&
                                    formik.errors.name)
                                    ? formik.errors.name
                                    : ''
                            }
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            name="type"
                            label="Tipo vinho"
                            variant='standard'
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            helperText={
                                (formik.touched.type &&
                                    formik.errors.type)
                                    ? formik.errors.type
                                    : ''
                            }
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            name="weight"
                            label="Tamanho"
                            variant='standard'
                            value={formik.values.weight}
                            onChange={formik.handleChange}
                            helperText={
                                (formik.touched.weight &&
                                    formik.errors.weight)
                                    ? formik.errors.weight
                                    : ''
                            }
                            InputProps={{
                                endAdornment: <InputAdornment position="end">ml</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            name="price"
                            label="000.00"
                            variant='standard'
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            helperText={
                                (formik.touched.price &&
                                    formik.errors.price)
                                    ? formik.errors.price
                                    : ''
                            }
                            InputProps={{
                                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button type='submit' variant='contained' color='secondary'>
                            {wine ? 'Atualizar' : 'Cadastrar'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )


}


export default WineForm;