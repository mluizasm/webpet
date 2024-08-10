import { Button, ButtonProps, styled } from "@mui/material";


const ColoredButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText("#4b0082"),
    backgroundColor: "#4b0082",
    '&:hover': {
        backgroundColor: "#2c183b",
    },
}));

export default ColoredButton