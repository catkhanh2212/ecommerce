'use client'

import { AccountCircle, Draw, Mail, Phone } from '@mui/icons-material'
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    issue: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <Box sx={{ borderRadius: 2, backgroundColor: '#D4EBF8', padding: 3 }}>
      <Typography variant='h5' sx={{ color: '#0A5EB0', fontWeight: 'bold', textAlign: 'center', mb: 3 }}>Schedule consultation</Typography>

      <TextField
        fullWidth
        placeholder='Full name'
        variant='outlined'
        name='name'
        value={formData.name}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <AccountCircle />
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            gap: 2,
            mb: 2,
            borderRadius: 2,
            '&:hover fieldset': {
              borderColor: '#96C9F4',
              borderWidth: 4
            },
            '&.Mui-focused fieldset': {
              borderColor: '#96C9F4',
              borderWidth: 4
            }
          }
        }}
      />

      <TextField
        fullWidth
        placeholder='Phone number'
        variant='outlined'
        name='phone'
        value={formData.phone}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <Phone />
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            gap: 2,
            mb: 2,
            borderRadius: 2,
            '&:hover fieldset': {
              borderColor: '#96C9F4',
              borderWidth: 4
            },
            '&.Mui-focused fieldset': {
              borderColor: '#96C9F4',
              borderWidth: 4
            }
          }
        }}
      />

      <TextField
        fullWidth
        placeholder='Email'
        variant='outlined'
        name='email'
        value={formData.email}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <Mail />
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            gap: 2,
            mb: 2,
            borderRadius: 2,
            '&:hover fieldset': {
              borderColor: '#96C9F4',
              borderWidth: 4
            },
            '&.Mui-focused fieldset': {
              borderColor: '#96C9F4',
              borderWidth: 4
            }
          }
        }}
      />

      <TextField
        fullWidth
        placeholder='Quick description of your issue'
        variant='outlined'
        name='issue'
        value={formData.issue}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <Draw />
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            gap: 2,
            mb: 2,
            borderRadius: 2,
            '&:hover fieldset': {
              borderColor: '#96C9F4',
              borderWidth: 4
            },
            '&.Mui-focused fieldset': {
              borderColor: '#96C9F4',
              borderWidth: 4
            }
          }
        }}
      />

      <Typography sx={{ fontSize: '14px', color: '#4C585B', mb: 2 }}> * The consultation will take place on Zoom. We will schedule the appointment and send detailed information to your email. </Typography>

      <Button
        fullWidth
        sx={{
          mb: 1,
          alignItems: 'center',
          color: 'white',
          fontSize: '14px',
          backgroundColor: '#5272F2',
          textTransform: "none",
          "&:hover": {
            backgroundColor: '#4379F2'
          },
          transition: "all 0.3s ease",
        }}>
        SUBMIT
      </Button>
    </Box>
  )
}

export default ContactForm