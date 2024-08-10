"use client"

import TopNavigation from "@/components/Navbars/TopNavigation"
import SectionFeed from "./components/Sections/SectionFeed"
import DefaultFooter from "@/components/Footers/DefaultFooter"
import CreateDogRegisterDialog from "./components/Dialogs/CreateDogRegister"
import { useEffect, useState } from "react"

import CameraAltIcon from '@mui/icons-material/CameraAlt';


const HomePage = () => {

    const [openRegisterDialog, setOpenRegisterDialog] = useState(false)
    return (
        <>
            <TopNavigation
                rightAction={() => {
                    setOpenRegisterDialog(true)
                }}
                rightIcon={<CameraAltIcon />}
            />
            <SectionFeed />
            <DefaultFooter />

            <CreateDogRegisterDialog open={openRegisterDialog} onClose={() => setOpenRegisterDialog(false)} />
        </>
    )
}

export default HomePage