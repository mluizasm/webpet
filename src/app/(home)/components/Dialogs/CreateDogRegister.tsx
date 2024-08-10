import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ColoredButton from '@/components/Buttons/ColoredButton';
import { getLoggedUser } from '@/repositories/user';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateDogRegisterDialog(props: any) {

    const { open, onClose } = props

    const handleClose = () => {
        onClose(false);
    };
    const createDogRegister = () => {

        formik.handleSubmit()
    };

    const DogRegisterSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Insira um nome completo')
            .max(200, 'Nome inserido é muito grande, favor verificar!')
            .required('O campo nome é obrigatório'),
        text: Yup.string()
            .min(3, 'Insira no mínimo 3 caracteres!')
            .max(500, 'O limite de caracteres é 500!')
            .required('O campo Texto é obrigatório'),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            text: "",
        },
        validationSchema: DogRegisterSchema,
        onSubmit: (values: any) => {
            // alert(JSON.stringify(values, null, 2));
            submitHandler(values)
        },
    });

    const postData = async (data: any) => {

        const response = await fetch("/api/dog-register", {
            method: "POST",
            body: JSON.stringify(data),
        });

        console.log(response);
        return response.json();
    };


    const submitHandler = async (data: any) => {

        console.log("tentativa de cadastro:", data)
        let userLogged = getLoggedUser()

        let nRegister = {
            user_id: userLogged.id,
            created: new Date(),
            image: null,
            ...data,

        }


        const res = await postData(nRegister)
        console.log(res)
        onClose()

    }

    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'sticky', bgcolor: "#4b0082" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Registrar Atividade do Dog
                        </Typography>
                        <Button autoFocus color="inherit" onClick={createDogRegister}>
                            Salvar
                        </Button>
                    </Toolbar>
                </AppBar>
                <Grid container sx={{ height: "100vh" }}>
                    <Grid item xs={12} md={12}>
                        <Box
                            component="form"
                            sx={{
                                maxWidth: {
                                    sx: "100%",
                                    md: "100%"
                                },
                                alignContent: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                justifyItems: "center",
                                mx: "auto",
                                my: 10,
                                px: { xs: 10, md: 4 }
                            }}
                            // noValidate
                            autoComplete="off"
                            onSubmit={formik.handleSubmit}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Nome do Pet"
                                        autoComplete='name'
                                        variant="outlined"
                                        fullWidth
                                        {...formik.getFieldProps("name")}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={`${formik.touched.name && formik.errors.name ? formik.errors.name : ""}`}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Texto"
                                        variant="outlined"
                                        fullWidth
                                        {...formik.getFieldProps("text")}
                                        error={formik.touched.text && Boolean(formik.errors.text)}
                                        helperText={`${formik.touched.text && formik.errors.text ? formik.errors.text : ""}`}
                                        minRows={4}
                                        multiline
                                    />
                                </Grid>
                            </Grid>

                        </Box>
                    </Grid>
                </Grid>
            </Dialog>
        </React.Fragment>
    );
}