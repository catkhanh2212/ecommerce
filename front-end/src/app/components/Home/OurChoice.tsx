import { Box } from '@mui/material'
import React from 'react'
import SectionTitle from './SectionTitle'
import ProductCard from '../ProductCards'
import { ourChoicesProducts } from '@/app/api/data/ourchoices'

function OurChoice() {
  return (
    <Box sx={{ paddingX: 5, paddingTop: 5 }}>
        <SectionTitle title='OUR CHOICES' />
        <ProductCard productCards={ourChoicesProducts} />
    </Box>
  )
}

export default OurChoice