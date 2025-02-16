import { ArrowRight } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'
import BlogList from '../BlogList'
import { blogs } from '@/app/api/data/blogs'

function Blogs() {
    return (
        <Box
            sx={{
                backgroundImage: 'url(/banners/blogs.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#FFFFFF',
                minHeight: '500px',
                position: 'relative',
                mt: 3,
                p: 3
            }}
        >
            <Box sx={{ display: 'flex' }}>
                <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}> MEDICAL BLOGS CORNER </Typography>
                <Box sx={{ flex: 1 }} />
                <Typography sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    Xem thêm
                    <ArrowRight />
                </Typography>
            </Box>
            <BlogList blogList={blogs} />
        </Box>
    )
}

export default Blogs