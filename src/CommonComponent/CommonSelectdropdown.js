import { FormControl, InputLabel, Select } from '@mui/material'
import React from 'react'

const CommonSelectdropdown = (props) => {
  return (
    <div><FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Accommodation</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
     value={props.value}
      label="Accommodation"
      onChange={props.onChange}
      size='small'
    >
   {props.children}
    </Select>
  </FormControl></div>
  )
}

export default CommonSelectdropdown
