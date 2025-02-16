import { Box, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

function TrendyProduct() {
  return (
    <Box
        sx={{
            backgroundColor: '#C4D9FF',
            borderRadius: 8,
            p: 3,
            alignItems: 'center',
            borderTopLeftRadius: '200px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}
    >
        <Typography
            sx={{
                textAlign: 'center',
                fontSize: '40px',
                fontWeight: 'bold',
                mt: 2,
                mb: 5,
                background: "linear-gradient(90deg, #118B50, #89F293)",
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            }}
        >
            Trendy
        </Typography>

        <CardMedia component="img" image='/products/trendy.png' />
        <CardContent>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>COLLAGEN GLOW LUSH PROTEIN</Typography>
        </CardContent>
    </Box>
  )
}

export default TrendyProduct