'use client'

import { Box, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowBackIos } from "@mui/icons-material";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  createdAt: string;
}

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios.get(`http://localhost:3001/blog/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error("Lỗi khi lấy bài viết:", error));
  }, [id]);

  if (!post) return <Typography>Đang tải...</Typography>;

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", my: 4 }}>
      <Box onClick={() => router.push("/")} sx={{ mb: 2, display: 'flex',  alignItems: 'center', cursor: 'pointer', color: '#344CB7' }}>
        <ArrowBackIos sx={{ fontSize: '14px' }}/>
        <Typography> Quay lại </Typography>
      </Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          {post.title}
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", mb: 2 }}>
          {post.description}
        </Typography>

        <Box
          sx={{
            "& p": {
              lineHeight: 1.6,
            },
            "& p span": {
              display: "block",
            },
            "& p span[style*='font-size: 18px']": {
              my: 2,
            },
            "& p span[style*='font-size: 20px']": {
              my: 2,
            },
            "& p span[style*='font-size: 24px']": {
              my: 2,
            },
            "& p span[style*='font-size: 28px']": {
              my: 2,
            },
            "& img": {
              width: "100%",
              maxWidth: "600px",
              height: "auto",
              display: "flex",
              marginTop: '20px',
              marginBottom: "20px",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "8px",
              justifyContent: "center",
            },
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <Typography variant="caption" sx={{ display: "block", mt: 2 }}>
          Ngày tạo: {new Date(post.createdAt).toLocaleDateString()}
        </Typography>
      </Paper>
    </Box>
  );
}
