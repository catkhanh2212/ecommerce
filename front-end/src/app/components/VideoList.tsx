'use client'

import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { medium: { url: string } };
  };
}

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
const CHANNEL_ID = 'UCsooa4yRKGN_zEE8iknghZA'

function VideoList() {
  const [videos, setVideos] = useState<Video[]>([])

  const router = useRouter()

  useEffect(() => {
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: API_KEY,
          channelId: CHANNEL_ID,
          part: "snippet",
          order: "date",
          maxResults: 4,
        },
      })
      .then((response) => {
        setVideos(response.data.items)
      })
      .catch((error) => {
        console.error("Lỗi khi lấy video:", error)
      })
  }, [])

  return (
    <Box
      display="grid" gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        md: "repeat(4, 1fr)"
      }}
      gap="16px"
      sx={{ p: 1 }} >
      {videos.map((video) => (
        <Card key={video.id.videoId} onClick={() => router.push(`/video/${video.id.videoId}`)} sx={{ backgroundColor: '#322C2B', cursor: "pointer", p: 1.5 }}>
          <CardMedia
            component="img"
            height="180"
            image={video.snippet.thumbnails.medium.url}
            sx={{ borderRadius: 2 }}
          />
          <CardContent>
            <Typography sx={{
              fontWeight: "bold",
              fontSize: "16px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: 'white'
            }}>
              {video.snippet.title}
            </Typography>
            <Typography
              sx={{
                mt: 1,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: '#EEEEEE'
              }}
            >
              {video.snippet.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

export default VideoList