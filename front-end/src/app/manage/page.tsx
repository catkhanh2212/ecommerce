'use client'

import { AddBox, Search } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Pagination, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Product {
  id: string;
  image: string;
  name: string;
  price: string;
  unit: string;
  category: string;
  sub_category: string;
  brand: string;
  origin: string;
  dosage: string;
  alert: string;
  preserve: string;
  ingredient: string;
  specifications: string;
  uses: string;
}

const ITEMS_PER_PAGE = 20

function Manage() {
  const [products, setProducts] = useState<Product[]>([])
  const [keyword, setKeyword] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([])

  const router = useRouter()

  useEffect(() => {
    axios
      .get('http://localhost:3001/products')
      .then((response) => {
        setProducts(response.data)
        setSearchedProducts(response.data)
      })
      .catch((error) => console.error('Error: ', error))
  }, [])

  useEffect(() => {
    if (keyword) {
      const results = products?.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      );
      if (results) {
        setSearchedProducts(results)
      }
    }
  }, [keyword, products])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleClickProduct = (id: string) => {
    router.push(`/manage/update/${id}`)
  }

  const handleAdd = () => {
    router.push('/manage/add')
  }


  const totalPages = searchedProducts ? Math.ceil(products.length / ITEMS_PER_PAGE) : 0
  const displayedProducts = searchedProducts?.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <Box sx={{ backgroundColor: "#F7F7F7", paddingX: { xs: 2, md: 12 }, py: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, color: '#2D336B' }}>
        <Typography sx={{ cursor: 'pointer' }}>Trang chủ / </Typography>
        <Typography sx={{ cursor: 'pointer' }}>Quản lí sản phẩm </Typography>
      </Box>

      <Box sx={{ backgroundColor: 'white', padding: { xs: 4, md: 5 }, my: { xs: 2, md: 5 }, borderRadius: 4, gap: 3, }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 1, width: '100%', px: 8 }}>
          <TextField
            placeholder='Nhập tên sản phẩm'
            variant='outlined'
            name='keyword'
            value={keyword}
            onChange={handleChange}
            size='small'
            sx={{
              flexGrow: 1,
              '& .MuiOutlinedInput-root': {
                gap: 2,
                px: 1,
                borderTopLeftRadius: '30px',
                borderBottomLeftRadius: '30px',
                '&:hover fieldset': {
                  borderColor: '#96C9F4',
                  borderWidth: 1
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#96C9F4',
                  borderWidth: 1
                }
              },
            }}
          />
          <Box sx={{ height: '40px', color: 'white', justifyContent: 'center', backgroundColor: '#4D55CC', borderTopRightRadius: '30px', borderBottomRightRadius: '30px', display: 'flex', alignItems: 'center', py: 2, px: 1, cursor: 'pointer' }}>
            <Search sx={{ textAlign: 'center', mr: 0.5 }} />
          </Box>

          <Button onClick={() => handleAdd()} sx={{ px: 2, py: 1, gap: 1, textTransform: "none", borderRadius: 4, backgroundColor: '#4D55CC', color: 'white', ml: 4, display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
            <AddBox />
            <Typography sx={{ fontSize: '16px'}}> Thêm sản phẩm </Typography>
          </Button>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Box
            display='grid'
            gridTemplateColumns={{
              xs: "repeat(2, 1fr)",
              md: "repeat(5, 1fr)"
            }}
            gap='16px'>
            {displayedProducts?.map((product) => ((
              <Card onClick={() => handleClickProduct(product.id)} key={product.id} sx={{ cursor: 'pointer', position: 'relative', borderRadius: 4, height: '100%' }}>
                <CardMedia sx={{ p: 2 }} component='img' height='250' image={product.image} />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100px' }}>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: '600',
                        fontSize: '16px',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden'
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography sx={{ color: '#E195AB', fontWeight: '600', fontSize: { xs: '16px', md: '18px' } }}>
                      {product.price} ₫ / {product.unit}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            )
            ))}

          </Box>
        </Box>

      </Box>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}

    </Box>
  )
}

export default Manage