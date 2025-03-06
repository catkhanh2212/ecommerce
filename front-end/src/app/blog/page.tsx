'use client'

import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import VideoList from '../components/VideoList'
import BlogList from '../components/BlogList'
import axios from 'axios';
import { ArrowRight, YouTube } from '@mui/icons-material'

interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
}

function Blog() {
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/blog")
      .then((response) => {
        const sortedBlogs = response.data
          .sort((a: Blog, b: Blog) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setLatestBlogs(sortedBlogs)
      })
      .catch((error) => console.error("Lỗi fetch blog:", error))
  }, [])

  return (
    <Box sx={{ backgroundColor: "#F7F7F7", padding: {xs: 2, md: 4}, px: 8 }}>
      <Box sx={{ display: 'flex', gap: 2, color: '#2D336B' }}>
        <Typography sx={{ cursor: 'pointer' }}>Trang chủ / </Typography>
        <Typography sx={{ cursor: 'pointer' }}>Góc sức khỏe</Typography>
      </Box>

      <Box sx={{ backgroundColor: '#1D1616', borderRadius: 4, mt: 2, padding: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', p: 1, gap: 1, verticalAlign: 'middle' }}>
            <YouTube sx={{ color: '#E52020', fontSize: '28px', display: 'flex', alignItems: 'center' }} />
            <Typography sx={{ color: 'white', fontSize: {xs: '16px', md: '18px'}, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}> Kênh Youtube của nhà thuốc </Typography>
          </Box>
          <Box
            onClick={() => window.open('https://youtube.com/channel/UCsooa4yRKGN_zEE8iknghZA', '_blank')}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Typography sx={{ color: 'white', display: {xs: 'none', md: 'block'} }}>Xem thêm</Typography>
            <ArrowRight sx={{ color: 'white' }} />
          </Box>
        </Box>

        <VideoList />
      </Box>

      <Box sx={{ backgroundColor: 'white', borderRadius: 4, mt: 2, padding: 4 }}>
        <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}> Blog sức khỏe - y học </Typography>
        <BlogList blogList={latestBlogs} />
      </Box>
    </Box>
  )
}

export default Blog