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
      <Typography variant='h5' sx={{ color: '#0A5EB0', fontWeight: 'bold', textAlign: 'center', mb: 3 }}>Đặt lịch khám bệnh online</Typography>

      <TextField
        fullWidth
        placeholder='Họ và tên'
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
        placeholder='Số điện thoại'
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
        placeholder='Mô tả ngắn về vấn đề cần tư vấn'
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

      <Typography sx={{ fontSize: '14px', color: '#4C585B', mb: 2 }}> * Bác sĩ sẽ trao đổi khám bệnh thông qua Zoom. Chúng tôi sẽ lên lịch hẹn khám và gửi thông tin chi tiết qua email của bạn. </Typography>

      <Button
        fullWidth
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          fontSize: '16px',
          backgroundColor: '#5272F2',
          textTransform: "none",
          "&:hover": {
            backgroundColor: '#4379F2'
          },
          transition: "all 0.3s ease",
        }}>
        GỬI THÔNG TIN
      </Button>
    </Box>
  )
}

export default ContactForm