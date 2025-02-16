import { ArrowRight } from '@mui/icons-material'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

interface Blog {
    id: number,
    image: string,
    name: string,
    date: string,
    intro: string,
    title1: string,
    para1: string,
    para1subpara1: string,
    para1subpara2: string,
    para1subtitle3: string,
    para1subpara3: string,
    title2: string,
    para2: string,
    title3: string,
    para3: string,
}

interface BlogListProps {
    blogList: Blog[]
}


const BlogList: React.FC<BlogListProps> = ({ blogList }) => {
    return (
        <Box display='grid' gridTemplateColumns='repeat(4, 1fr)' gap='16px' sx={{ mt: 3, borderRadius: 2 }}>
            {blogList.map((blog) => (
                <Card key={blog.id} sx={{ cursor: 'pointer', px: 2, paddingTop: 2 }}>
                    <CardMedia component='img' height='250' image={blog.image} sx={{ borderRadius: 2 }} />
                    <CardContent>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{blog.name}</Typography>
                        <Typography
                            sx={{
                                mt: 2,
                                color: '#4C585B',
                                display: '-webkit-box',
                                WebkitLineClamp: 2, // Giới hạn 2 dòng
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                            {blog.intro}
                        </Typography>
                        <Typography sx={{color: '#0A5EB0', fontWeight: 'bold', display: 'flex', gap: 2, mt: 2}}>
                            Read more
                            <ArrowRight />
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}

export default BlogList