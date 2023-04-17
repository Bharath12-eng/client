import React from 'react'
import Sidenav from '../Layout/Sidenav'
import { Box } from '@mui/material'
import Navbar from '../Layout/Navbar'


function Employee() {
    return (
        <>
        <Navbar />
        <Box height={30} />
        <Box sx={{ display: 'flex' }}>
        <Sidenav/>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <h1>Employee Details</h1>
                
            </Box>
        </Box>
        
        </>
        
    )
}

export default Employee