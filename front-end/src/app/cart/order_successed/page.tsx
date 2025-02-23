import { DoneOutline } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

function page() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', backgroundColor: '#F4F6FF' }}>
      <Box sx={{display: 'flex', backgroundColor: '#344CB7', borderRadius: 50, color: 'white', p: 2.5, alignItems: 'center'}}>
        <DoneOutline sx={{ fontSize: '48px', textAlign: 'center' }}/>
      </Box>

      <Typography sx={{ fontSize: '28px', fontWeight: 'bold', color: '#344CB7', mt: 4}}>Cảm ơn bạn đã mua hàng!</Typography>

      <Typography sx={{ fontSize: '16px', color: '#5E686D', mt: 2}}> Chúng tôi đã nhận được đơn đặt hàng của bạn và sẽ xử lý trong 24h tới. </Typography>
      <Typography sx={{ fontSize: '16px', color: '#5E686D', mt: 1}}> Vui lòng theo dõi email hoặc số điện thoại bạn dùng để đặt hàng. </Typography>
    </Box>
  )
}

export default page