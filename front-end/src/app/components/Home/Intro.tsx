import { Box } from '@mui/material'
import React from 'react'
import Slider from './Slider'
import ContactForm from './ContactForm'

function Intro() {
  return (
    <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
      <Box sx={{width: '65%'}}>
        <Slider />
      </Box>

      <Box sx={{width: '35%'}}>
        <ContactForm />
      </Box>
    </Box>
  )
}

export default Intro