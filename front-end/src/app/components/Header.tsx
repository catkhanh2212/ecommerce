'use client'

import { AccountCircle, ArrowDropDown, Discount, ShoppingCart } from '@mui/icons-material'
import { Box, Button, Popover, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function Header() {
  const [anchorE1, setAnchorE1] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorE1(event.currentTarget); // Đặt anchorEl là Box "Deliver to"
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  return (
    <Box
      sx={{
        paddingX: 16,
        paddingY: 2,
        backgroundColor: '#5272F2',
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }}>
      {/* Logo */}
      <Typography sx={{ fontFamily: "'Philosopher', Arial, Helvetica, sans-serif", fontSize: '28px', fontWeight: 'bold', color: 'white' }}>
        GiaKhanh
      </Typography>

      {/* Search Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 2,
          padding: 1.5,
          gap: 2,
          flex: 1
        }}>

        {/* Box "Deliver to" */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            gap: 1,
          }}
          onClick={handleOpen}
        >
          <Typography sx={{ color: '#4C585B', fontSize: '16px' }}>
            Categories
          </Typography>
          <ArrowDropDown sx={{ color: '#5272F2' }} />
        </Box>

        {/* Searchbox */}
        <TextField
          placeholder='Search for medicine...'
          variant='standard'
          InputProps={{ disableUnderline: true }}
          sx={{
            flex: 1
          }}
        />

        {/* Popover */}
        <Popover
          open={Boolean(anchorE1)}
          anchorEl={anchorE1} // ✅ Bám theo "Deliver to"
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          sx={{ mt: 1 }} // Tạo khoảng cách nhẹ
        >
          <Box sx={{ paddingX: 2 }}>
            <Typography fontWeight='bold' sx={{ paddingTop: 1.5, paddingBottom: 1, fontSize: '16px' }}>
              Where do you want the delivery?
            </Typography>

            <Button
              fullWidth
              sx={{
                mb: 2,
                color: 'white',
                fontSize: '14px',
                backgroundColor: '#5272F2',
                textTransform: "none",
                "&:hover": {
                  backgroundColor: '#0A3981'
                },
                transition: "all 0.3s ease",
              }}>
              Sign in to see your location
            </Button>
          </Box>
        </Popover>
      </Box>

      {/* Offer */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          gap: 1,
          cursor: 'pointer'
        }}>
        <Discount />
        <Typography sx={{ fontSize: '16px' }}>Offers</Typography>
      </Box>

      {/* Cart */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          gap: 1,
          cursor: 'pointer'
        }}>
        <ShoppingCart />
        <Typography sx={{ fontSize: '16px' }}>Cart</Typography>
      </Box>

      {/* Account */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          gap: 1,
          cursor: 'pointer'
        }}>
        <AccountCircle />
        <Typography sx={{ fontSize: '16px' }}>Hello, Log in</Typography>
      </Box>
    </Box>

  )
}

export default Header;
