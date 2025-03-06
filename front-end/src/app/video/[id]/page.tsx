'use client'

import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
const CHANNEL_ID = 'UCsooa4yRKGN_zEE8iknghZA'

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { medium: { url: string } };
  }
}

function Video() {
  const params = useParams()
  const [videoId, setVideoId] = useState<string | null>(null)
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [displayItems, setDisplayItems] = useState<Video[]>([])
  const [expanded, setExpanded] = useState(false)

  const router = useRouter()


  useEffect(() => {
    if (params.id) {
      const id = params.id as string
      setVideoId(id)

      axios
        .get("https://www.googleapis.com/youtube/v3/videos", {
          params: {
            key: API_KEY,
            id: id,
            part: 'snippet'
          }
        })
        .then((response) => {
          if (response.data.items.length > 0) {
            setTitle(response.data.items[0].snippet.title)
            setDescription(response.data.items[0].snippet.description)
          }
        })
        .catch((error) => {
          console.error("Lỗi khi lấy tiêu đề video:", error)
        })

      axios
        .get("https://www.googleapis.com/youtube/v3/search", {
          params: {
            key: API_KEY,
            channelId: CHANNEL_ID,
            part: "snippet",
            order: "date",
            maxResults: 20,
          },
        })
        .then((response) => {
          const allVideos = response.data.items as Video[]

          const filteredVideos = allVideos.filter((video) => video.id.videoId !== id)
          const shuffledVideos = filteredVideos.sort(() => 0.5 - Math.random()).slice(0, 3)

          setDisplayItems(shuffledVideos)
        })
    }
  }, [params])


  if (!videoId) {
    return (
      <Box sx={{ color: 'black', p: 4, textAlign: 'center' }}>
        <Typography variant="h5">Video không tồn tại hoặc không hợp lệ!</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ backgroundColor: '#212121', p: 4, px: {xs: 3, md: 8} }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexDirection: {xs: 'column', md: 'row'} }}>
        <Box sx={{ width: {xs: '100%', md: '70%'} }}>
          <Box
            component='iframe'
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: '8px', maxWidth: '100%' }}
            sx={{
              maxWidth: '100%',
              borderRadius: '8px',
              width: { xs: 480, md: 960 },
              height: { xs: 270, md: 540 },
            }}
          />

          <Typography sx={{ fontSize: {xs: '20px', md: '24px'}, color: 'white', my: 3 }}> {title} </Typography>

          <Box sx={{ backgroundColor: '#F5F5F7', borderRadius: 2, p: 2 }}>
            <Typography sx={{
              whiteSpace: 'pre-line',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: expanded ? 'unset' : 4,
            }}>
              {description}
            </Typography>

            {description.length > 150 && (
              <Box
                onClick={() => setExpanded(!expanded)}
                sx={{ mt: 1, textTransform: 'none', color: '#344CB7', cursor: 'pointer' }}
              >
                {expanded ?
                  (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography> Thu gọn </Typography>
                      <ArrowDropUp />
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography> Xem thêm </Typography>
                      <ArrowDropDown />
                    </Box>
                  )
                }
              </Box>
            )}
          </Box>



        </Box>

        <Box sx={{ width: {xs: '100%', md: '30%'} }}>
          {displayItems.map((video) => (
            <Card key={video.id.videoId} onClick={() => router.push(`/video/${video.id.videoId}`)} sx={{ backgroundColor: '#1A1A1D', cursor: "pointer", p: 1.5, mb: 2, borderRadius: 2 }}>
              <CardMedia
                component="img"
                width='360'
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
                {/* <Typography
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
                </Typography> */}
              </CardContent>
            </Card>
          ))}
        </Box>

      </Box>
    </Box>
  )
}

export default Video
