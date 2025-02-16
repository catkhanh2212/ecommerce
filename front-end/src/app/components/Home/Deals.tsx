import { Box } from '@mui/material'
import React from 'react'
import SectionTitle from './SectionTitle'
import TrendyProduct from './TrendyProduct'
import ProductList from './ProductList'
import { promotionProducts } from '@/app/api/data/promotions'

function Deals() {
    return (
        <Box sx={{ paddingX: 5, paddingTop: 5 }}>
            <SectionTitle title='WEEKLY PROMOTIONS' />

            <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 5, mt: 3 }}>
                <Box sx={{ width: '25%' }}>
                    <TrendyProduct />
                </Box>

                <Box sx={{ width: '75%'}}>
                    <ProductList products={promotionProducts} />
                </Box>
            </Box>


        </Box>
    )
}

export default Deals