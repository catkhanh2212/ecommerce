'use client'

import { ArrowRight } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
}

interface BlogListProps {
  blogList: Blog[];
}

// Hàm trích xuất hình ảnh đầu tiên từ content (HTML)
const extractFirstImage = (htmlContent: string): string | null => {
  const match = htmlContent.match(/<img\s+src=["'](.*?)["']/);
  return match ? match[1] : null;
};

const BlogList: React.FC<BlogListProps> = ({ blogList }) => {
  const router = useRouter()

  const handleClick = (id: string) => {
    router.push(`/blog/${id}`)
  }
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        md: "repeat(4, 1fr)"
      }}
      gap= {{xs: '10px', md: "16px"}}
      sx={{ mt: 3, borderRadius: 2 }}>
      {blogList.map((blog) => {
        const image = extractFirstImage(blog.content) || "/default-image.jpg"; // Nếu không có ảnh, dùng ảnh mặc định
        return (
          <Card key={blog.id} onClick={() => handleClick(blog.id)} sx={{ cursor: "pointer", px: 2, paddingTop: 2 }}>
            <CardMedia component="img" width="250" image={image} sx={{ borderRadius: 2 }} />
            <CardContent>
              <Typography sx={{
                fontWeight: "bold", fontSize: "18px", display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>{blog.title}</Typography>
              <Typography
                sx={{
                  mt: 1,
                  color: "#4C585B",
                  display: "-webkit-box",
                  WebkitLineClamp: 2, // Giới hạn 2 dòng
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {blog.description}
              </Typography>
              <Typography sx={{ color: "#0A5EB0", fontWeight: "bold", display: "flex", gap: 2, mt: 1 }}>
                Read more
                <ArrowRight />
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default BlogList;
