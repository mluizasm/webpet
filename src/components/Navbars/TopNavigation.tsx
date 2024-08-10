"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import TopNavigationDrawer from './TopNavigationDrawer';
import { Button } from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import { logoutUser, verifyIfUserLogged } from '@/repositories/user';

const TopNavigation = (props: any) => {

    const { rightAction, rightIcon } = props

    const [openDrawer, setOpenDrawer] = React.useState(false);

    const [auth, setAuth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event: any) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useLayoutEffect(() => {
        if (verifyIfUserLogged())
            setAuth(true)
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" sx={{ bgcolor: "#4b0082" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setOpenDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        WebPET
                    </Typography>
                    {auth ? (
                        <>
                            {
                                rightAction && (
                                    <div>
                                        <IconButton
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={() => rightAction()}
                                            color="inherit"
                                        >
                                            {rightIcon}
                                        </IconButton>
                                    </div>
                                )
                            }
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Perfil</MenuItem>
                                    <MenuItem onClick={() => {
                                        logoutUser()
                                        handleClose()
                                        location.href = "/"
                                    }}>Sair</MenuItem>
                                </Menu>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button
                                startIcon={<LoginIcon />}
                                onClick={() => location.href = "/auth/login"}
                                size="large"
                                aria-haspopup="true"
                                color="inherit"

                            >
                                Entrar
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <TopNavigationDrawer
                open={openDrawer}
                onChange={(n: boolean) => setOpenDrawer(n)}
            />
        </Box>
    );
}

export default TopNavigation