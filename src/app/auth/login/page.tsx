"use client"
import ColoredButton from "@/components/Buttons/ColoredButton"
import { saveSignIn, verifyIfUserLogged } from "@/repositories/user"
import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"


const LoginPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmail = (event: any) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event: any) => {
        setPassword(event.target.value)
    }
    const postData = async (data: any) => {

        const response = await fetch("/api/auth/signin", {
            method: "POST",
            body: JSON.stringify(data),
        });

        console.log(response);
        return response.json();
    };

    const onSubmit = async (ev: any) => {
        ev.preventDefault()
        ev.stopPropagation()

        let signinData = {
            email: email,
            password: password
        }
        console.log("tentativa de login: ", signinData)

        const res = await postData(signinData)

        if (res.success) {
            if (saveSignIn(res.data.token, res.data.user)) {
                location.href = "/"
            }
        }

    }


    useEffect(() => {
        if (verifyIfUserLogged())
            location.href = "/"
    }, [])

    return (
        <>
            <Grid container sx={{ height: "100vh" }}>
                <Grid item xs={12} md={7} sx={{}}>
                    <Box sx={{ height: "100%", width: "100%", background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(75,0,130,1) 50%, rgba(47,2,80,1) 100%)" }} />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box
                        component="form"
                        sx={{
                            maxWidth: {
                                sx: "100%",
                                md: 450
                            },
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            justifyItems: "center",
                            // mx: 5,
                            // my: 5
                            mx: "auto",
                            my: 10,
                            px: { xs: 10, md: 4 }
                        }}
                        // noValidate
                        autoComplete="off"
                        onSubmit={(ev) => onSubmit(ev)}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <img src="/assets/img/logo.png" alt="Logo WEB PET" />
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 5 }}>
                                <Typography component="h2" variant="h4" sx={{ color: "#4b0082", mb: 2 }}>
                                    Entre em sua conta
                                </Typography>
                                <Typography component="p" fontSize={13}>
                                    Ainda não criou sua conta? <Typography component="a" sx={{ color: "#4b0082" }} href="/auth/register">Crie agora!</Typography>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={email}
                                    onChange={handleEmail}
                                    label="E-mail"
                                    type="email"
                                    typeof="email"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={password}
                                    onChange={handlePassword}
                                    label="Senha"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ColoredButton
                                    type="submit"
                                    fullWidth
                                    sx={{ borderRadius: 15 }}
                                >
                                    Entrar
                                </ColoredButton>
                            </Grid>
                        </Grid>

                    </Box>
                </Grid>
            </Grid>

        </>
    )
}

export default LoginPage