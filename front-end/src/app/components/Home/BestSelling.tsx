import { Box } from '@mui/material'
import React from 'react'
import SectionTitle from './SectionTitle'
import ProductCard from '../ProductCards'
import { bestSellings } from '@/app/api/data/bestsellings'

function BestSelling() {
  return (
    <Box sx={{ paddingX: 5, paddingTop: 5 }}>
        <SectionTitle title='BEST SELLINGS' />
        <ProductCard productCards={bestSellings} />
    </Box>
  )
}

export default BestSelling