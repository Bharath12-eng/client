import React from 'react'
import Navbar from '../components/Layout/Navbar'
import { Box } from '@mui/material'
import Sidenav from '../components/Layout/Sidenav'

const Wrapper = (props) => {
  return (
    <div>
    <Navbar />
    <Box height={30} />
    <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
           
            {props.children}
        </Box>
    </Box>
    </div>
  )
}

export default Wrapper