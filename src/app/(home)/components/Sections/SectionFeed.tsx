"use client"

import { Container, Grid, Typography } from "@mui/material"
import HomeDogCard from "../Cards/HomeDogCard"
import { useEffect, useState } from "react"
import { getLoggedUser, verifyIfUserLogged } from "@/repositories/user"
import axios from "axios"


const SectionFeed = () => {

    const [dogsFeed, setDogsFeed] = useState([])
    const [loading, setLoading] = useState(false)

    const getData = async (user_id: any) => {
        setLoading(true)

        const res = await axios.get(`/api/dog-register?id=${user_id}`)

        console.log(res.data)

        setDogsFeed(res.data.data)

    }
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        if (verifyIfUserLogged()) {
            setLogged(true)
            let user = getLoggedUser()
            getData(user.id)
        } else {
            setLogged(false)
        }

    }, [])

    return (
        <>
            <Container maxWidth={"md"}>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mt: 5,
                        pb: 5
                    }}
                >
                    {
                        logged ?
                            <>
                                {
                                    dogsFeed.map((df: any) => {
                                        return <Grid key={df.id} item xs={12}>
                                            <HomeDogCard
                                                dogInfo={df}
                                            />
                                        </Grid>

                                    })
                                }
                                {
                                    dogsFeed.length == 0 && <>
                                        <Grid item xs={12}>
                                            <Typography variant="h3" sx={{ color: "#4b0082" }}>
                                                Infelizmente você ainda não compartilhou nenhum momento de seu pet conosco...
                                            </Typography>
                                            <Typography variant="h5">
                                               Registre agora uma ação de seu pet ;)
                                            </Typography>
                                        </Grid>
                                    </>
                                }
                            </>

                            :
                            <Grid item xs={12}>
                                <Typography variant="h3" sx={{ color: "#4b0082" }}>
                                    Só é possível visualizar o feed, se estiver logado...
                                </Typography>
                                <Typography variant="h5">
                                    Efetue o login e visualize o seu feed ;)
                                </Typography>
                            </Grid>
                    }

                </Grid>
            </Container>
        </>
    )
}

export default SectionFeed