import { Box } from '@mui/material'
import React from 'react'
import SectionTitle from './SectionTitle'
import ProductCard from '../ProductCards'
import { ourChoicesProducts } from '@/app/api/data/ourchoices'

function OurChoice() {
  return (
    <Box sx={{ paddingX: {xs: 2, md: 5}, paddingTop: 5 }}>
        <SectionTitle title='LỰA CHỌN CỦA NHÀ THUỐC' />
        <ProductCard productCards={ourChoicesProducts} />
    </Box>
  )
}

export default OurChoice