import React from 'react'
import Sidenav from '../Layout/Sidenav'
import Navbar from '../Layout/Navbar'
import { Box } from '@mui/material'


function Home() {
    return (
        <>
        <Navbar/>
        <Box height={30} />
        <Box sx={{ display: 'flex' }}>
        <Sidenav/>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <h1>Dashboard</h1>
                
            </Box>
        </Box>
        
        </>
        
    )
}

export default Home