import { Box } from '@mui/material'
import React from 'react'
import SectionTitle from './SectionTitle'
import TrendyProduct from './TrendyProduct'
import ProductList from './ProductList'
import { promotionProducts } from '@/app/api/data/promotions'

function Deals() {
    return (
        <Box sx={{ paddingX: {xs: 2, md: 5}, paddingTop: 5 }}>
            <SectionTitle title='KHUYẾN MÃI TRONG TUẦN' />

            <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 5, mt: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                <Box sx={{ width: { xs: '100%', md: '25%' } }}>
                    <TrendyProduct />
                </Box>

                <Box sx={{ width: { xs: '100%', md: '75%' } }}>
                    <ProductList products={promotionProducts} />
                </Box>
            </Box>


        </Box>
    )
}

export default Deals