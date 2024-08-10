import { Box, Typography } from "@mui/material"


const DefaultFooter = () => {

    return (
        <>
            <Box sx={{ width: "100%", textAlign: "center" }}>
                <Typography component="span" textAlign={"center"} color={"InfoText"}>
                    Copyright @ 2024 - Todos os Direitos Reservados
                </Typography>
            </Box>
        </>
    )
}

export default DefaultFooter