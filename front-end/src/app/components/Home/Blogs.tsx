'use client'

import { ArrowRight } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BlogList from '../BlogList'
import axios from 'axios';

interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
}


function Blogs() {
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/blog")
      .then((response) => {
        const sortedBlogs = response.data
          .sort((a: Blog, b: Blog) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 4)
        setLatestBlogs(sortedBlogs)
      })
      .catch((error) => console.error("Lỗi fetch blog:", error))
  }, [])

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
        <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}> GÓC KIẾN THỨC </Typography>
        <Box sx={{ flex: 1 }} />
        <Typography sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          Xem thêm
          <ArrowRight />
        </Typography>
      </Box>
      <BlogList blogList={latestBlogs} />
    </Box>
  )
}

export default Blogs