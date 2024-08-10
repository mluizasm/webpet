"use client"
import * as Yup from 'yup';
import ColoredButton from "@/components/Buttons/ColoredButton"
import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { Formik, useFormik } from 'formik';


const RegisterPage = () => {

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Insira um nome completo')
            .max(200, 'Nome inserido é muito grande, favor verificar!')
            .required('O campo nome é obrigatório'),
        email: Yup.string().email('Favor inserir um e-mail válido!').required('O campo e-mail é obrigatório'),
        birth: Yup.date().required('O campo data de aniversário é obrigatório'),
        password: Yup.string()
            .min(6, 'A senha escolhida precisa conter um mínimo de 6 caracteres.')
            .max(20, 'A senha precisa conter menos de 20 caracteres.')
            .required('O campo senha é obrigatório'),
        confirm_password: Yup.string()
            .min(6, 'A senha escolhida precisa conter um mínimo de 6 caracteres.')
            .max(20, 'A senha precisa conter menos de 20 caracteres.')
            .required('O campo confirmação de senha é obrigatório')

    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            birth: new Date(),
            password: "",
            confirm_password: ""
        },
        validationSchema: SignupSchema,
        onSubmit: (values: any) => {
            // alert(JSON.stringify(values, null, 2));
            postData(values)
        },
    });

    const postData = async (data: any) => {

        const response = await fetch("/api/user", {
            method: "POST",
            body: JSON.stringify(data),
        });

        console.log(response.status);
        if (response.status == 200 || response.status == 201) {
            location.href = "/auth/login"
        }
        return response.json();
    };



    return (
        <>
            <Grid container sx={{ height: "100vh" }}>
                <Grid item xs={12} md={7} sx={{}}>
                    <Box sx={{ height: "100%", width: "100%", background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(75,0,130,1) 50%, rgba(47,2,80,1) 100%)" }} />
                    {/* <Box sx={{ height: "100%", width: "100%", bgcolor: "#4b0082", backgroundImage: "url(/assets/img/bg-home.png)", backgroundSize: "cover" }} /> */}
                </Grid>
                <Grid item xs={12} md={5}>
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
                            <Grid item xs={12} >
                                <img src="/assets/img/logo.png" alt="Logo WEB PET" />
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 5 }}>
                                <Typography component="h2" variant="h4" sx={{ color: "#4b0082", mb: 2 }}>
                                    Crie agora a sua conta!
                                </Typography>
                                <Typography component="p" fontSize={13}>
                                    Já tem uma conta? <Typography component="a" sx={{ color: "#4b0082" }} href="/auth/login">Entre agora!</Typography>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Nome Completo"
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
                                    label="E-mail"
                                    type='email'
                                    variant="outlined"
                                    fullWidth
                                    {...formik.getFieldProps("email")}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={`${formik.touched.email && formik.errors.email ? formik.errors.email : ""}`}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Data de Aniversário"
                                    type='date'
                                    variant="outlined"
                                    fullWidth
                                    {...formik.getFieldProps("birth")}
                                    error={formik.touched.birth && Boolean(formik.errors.birth)}
                                    helperText={`${formik.touched.birth && formik.errors.birth ? formik.errors.birth : ""}`}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Senha"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={`${formik.touched.password && formik.errors.password ? formik.errors.password : ""}`}
                                    {...formik.getFieldProps("password")}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Confirmação de Senha"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                                    helperText={`${formik.touched.confirm_password && formik.errors.confirm_password ? formik.errors.confirm_password : ""}`}
                                    {...formik.getFieldProps("confirm_password")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ColoredButton
                                    type="submit"
                                    fullWidth
                                    sx={{ borderRadius: 15 }}
                                >
                                    Criar Conta
                                </ColoredButton>
                            </Grid>
                        </Grid>

                    </Box>
                </Grid>
            </Grid>

        </>
    )
}

export default RegisterPage