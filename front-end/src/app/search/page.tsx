'use client'

import { ExpandMore, FilterList } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, CardMedia, Checkbox, Drawer, FormControlLabel, FormGroup, Pagination, Typography } from '@mui/material'
import axios from 'axios';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Product {
  id: number;
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

interface Cart {
  id: number,
  user_id: string,
  product: Product,
  quantity: number
}

const ITEMS_PER_PAGE = 12

function Search() {
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number] | null>(null)
  const [selectedOrigin, setSelectedOrigin] = useState<string[]>([])
  const [page, setPage] = useState<number>(1)
  const [products, setProducts] = useState<Product[] | null>(null)
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([])
  const [sortOrder, setSortOrder] = useState<"asc" | "des" | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [openDrawer, setOpenDrawer] = useState(false)


  const auth = getAuth()

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubcribe()
  }, [auth])


  const router = useRouter()

  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword")

  console.log('keyword', keyword)

  useEffect(() => {
    axios.get("http://localhost:3001/products")
      .then((response) => {
        setProducts(response.data);
        console.log("keyword: ", keyword)
      })
      .catch((error) => {
        console.error("Lỗi khi lấy sản phẩm:", error);
      });
  }, [])

  useEffect(() => {
    // Lọc sản phẩm trên frontend
    if (keyword) {
      const results = products?.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      );
      if (results) {
        setSearchedProducts(results)
      }
    }
  }, [keyword, products])


  const filterProducts = searchedProducts?.filter((product) => {
    if (selectedPriceRange) {
      const price = Number(product.price.replace(/[.,]/g, ""));
      if (price < selectedPriceRange[0] || price > selectedPriceRange[1]) {
        return false
      }
    }

    if (selectedOrigin.length > 0 && !selectedOrigin.includes(product.origin)) {
      return false
    }

    return true;
  })

  const sortedProducts = filterProducts?.slice().sort((a, b) => {
    const priceA = Number(a.price.replace(/[,.]/g, ''))
    const priceB = Number(b.price.replace(/[,.]/g, ''))

    if (sortOrder === 'asc') return priceA - priceB
    if (sortOrder === 'des') return priceB - priceA

    return 0
  })

  const totalPages = filterProducts ? Math.ceil(filterProducts.length / ITEMS_PER_PAGE) : 0

  const displayedProducts = sortedProducts?.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handlePriceFilter = (min: number, max: number | null) => {
    setSelectedPriceRange((prevRange) => {
      const newRange: [number, number] = max !== null ? [min, max] : [min, Infinity];

      // Nếu nhấn lại cùng một khoảng giá thì bỏ filter (trở về null)
      if (prevRange && prevRange[0] === newRange[0] && prevRange[1] === newRange[1]) {
        setPage(1);
        return null;
      }

      setPage(1);
      return newRange;
    })
  }

  const handleOriginFilter = (origin: string) => {
    setSelectedOrigin((prev) =>
      prev.includes(origin)
        ? prev.filter((item) => item != origin)
        : [...prev, origin]
    )
  }

  const handleProductClick = (product: Product) => {
    router.push(`/product/${product.id}`)
  }

  const addToCart = (product: Product) => {
    axios.get(`http://localhost:3001/cart?user_id=${user?.uid}`)
      .then((response) => {
        const cartItems: Cart[] = response.data

        const existingCartItem = cartItems.find((item) => item.product.id === product.id)

        if (!existingCartItem) {
          axios.post(`http://localhost:3001/cart/`, {
            user_id: user?.uid,
            product: product,
            quantity: 1
          })
        }
        else {
          axios.put(`http://localhost:3001/cart/${existingCartItem.id}`, {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1
          })
        }

        window.dispatchEvent(new Event('update-cart-amount'))
      })
      .catch((error) => error.log('Error: ', error))

  }



  return (
    <Box sx={{ backgroundColor: '#F5F5F5', minHeight: '100vh', padding: { xs: 2, md: 4 }, px: { xs: 2, md: 8 } }}>
      <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
        <Box sx={{ backgroundColor: 'white', width: '25%', borderRadius: 4, display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ p: 1, px: 3, borderBottom: "1px solid #ddd", display: 'flex', alignItems: 'center', gap: 2 }}>
            <FilterList sx={{ fontWeight: 'bold', fontSize: '24px' }} />
            <Typography sx={{ fontWeight: '600', fontSize: '18px' }}>Bộ lọc</Typography>
          </Box>

          <Box sx={{ px: 1 }}>
            {/* Giá bán */}
            <Accordion defaultExpanded disableGutters sx={{ py: 0.5, boxShadow: "none", borderBottom: "1px solid #ddd" }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  fontSize: "18px",
                }}
              >
                Giá bán
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  padding: "8px 16px",
                  overflow: "hidden",
                }}
              >
                {[
                  { label: "Dưới 100.000đ", range: [0, 100000] },
                  { label: "100.000đ - 300.000đ", range: [100000, 300000] },
                  { label: "300.000đ - 500.000đ", range: [300000, 500000] },
                  { label: "Trên 500.000đ", range: [500000, Infinity] },
                ].map(({ label, range }) => (
                  <Button
                    key={label}
                    onClick={() => handlePriceFilter(range[0], range[1] === Infinity ? null : range[1])}
                    sx={{
                      border: "1px solid #ddd",
                      textTransform: "none",
                      fontSize: "16px",
                      color: selectedPriceRange?.[0] === range[0] && selectedPriceRange?.[1] === range[1] ? "white" : "black",
                      fontWeight: "normal",
                      backgroundColor: selectedPriceRange?.[0] === range[0] && selectedPriceRange?.[1] === range[1] ? "#344CB7" : "transparent",
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </AccordionDetails>
            </Accordion>

            {/* Xuất xứ */}
            <Accordion defaultExpanded disableGutters sx={{ py: 1, boxShadow: "none", borderBottom: "1px solid #ddd" }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  fontSize: "18px",
                }}
              >
                Xuất xứ
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  padding: "8px 16px",
                  overflow: "hidden",
                }}
              >
                <FormGroup>
                  {["Mĩ", "Anh", "Pháp", "New Zealand", "Nhật Bản", "Ý", "Việt Nam", "Thái Lan", "Hàn Quốc", "Thụy Sĩ", "Úc", "Singapore"].map((origin) => (
                    <FormControlLabel
                      key={origin}
                      control={
                        <Checkbox
                          checked={selectedOrigin.includes(origin)}
                          onChange={() => handleOriginFilter(origin)}
                        />
                      }
                      label={origin} />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>



        {/* Products */}

        <Box sx={{ width: { xs: '100%', md: '75%' } }}>
          <Box sx={{ display: 'flex', py: 1, mb: 1, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: '600', display: { xs: 'none', md: 'block' } }}>Danh sách sản phẩm</Typography>
            <Box sx={{ flex: 1 }} />
            <Box sx={{ display: 'flex', gap: { xs: 1, md: 2 }, alignItems: 'center' }}>
              <Typography sx={{ fontSize: '18px', display: { xs: 'none', md: 'block' } }}> Sắp xếp theo: </Typography>
              <Typography sx={{ fontSize: '18px', display: { xs: 'block', md: 'none' } }}> Sắp xếp: </Typography>
              <Button
                onClick={() => setSortOrder(prev => prev === 'asc' ? null : 'asc')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  px: 3,
                  py: 0.5,
                  pt: 1,
                  fontSize: { xs: '12px', md: '14px' },
                  fontWeight: '600',
                  color: sortOrder === 'asc' ? '#0A5EB0' : '#3D3D3D',
                  backgroundColor: 'white',
                  border: sortOrder === 'asc' ? '2px solid #0A5EB0' : '1px solid #3D3D3D',
                }}
              >
                Giá thấp
              </Button>

              <Button
                onClick={() => setSortOrder(prev => prev === 'des' ? null : 'des')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  px: 3,
                  py: 0.5,
                  pt: 1,
                  fontSize: { xs: '12px', md: '14px' },
                  fontWeight: '600',
                  color: sortOrder === 'des' ? '#0A5EB0' : '#3D3D3D',
                  backgroundColor: 'white',
                  border: sortOrder === 'des' ? '2px solid #0A5EB0' : '1px solid #3D3D3D',
                }}
              >
                Giá cao
              </Button>

              <Box onClick={() => setOpenDrawer(true)} sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}>
                <FilterList sx={{ fontWeight: 'bold', fontSize: '24px' }} />
              </Box>

              <Drawer anchor="bottom" open={openDrawer} onClose={() => setOpenDrawer(false)} sx={{
                "& .MuiDrawer-paper": {
                  maxHeight: "80vh",
                  height: "auto",
                  borderRadius: "12px 12px 0 0",
                }
              }}>
                <Box sx={{ px: 1 }}>
                  {/* Giá bán */}
                  <Accordion defaultExpanded disableGutters sx={{ py: 0.5, boxShadow: "none", borderBottom: "1px solid #ddd" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      sx={{
                        fontSize: "18px",
                      }}
                    >
                      Giá bán
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        padding: "8px 16px",
                        overflow: "hidden",
                      }}
                    >
                      {[
                        { label: "Dưới 100.000đ", range: [0, 100000] },
                        { label: "100.000đ - 300.000đ", range: [100000, 300000] },
                        { label: "300.000đ - 500.000đ", range: [300000, 500000] },
                        { label: "Trên 500.000đ", range: [500000, Infinity] },
                      ].map(({ label, range }) => (
                        <Button
                          key={label}
                          onClick={() => handlePriceFilter(range[0], range[1] === Infinity ? null : range[1])}
                          sx={{
                            border: "1px solid #ddd",
                            textTransform: "none",
                            fontSize: "16px",
                            color: selectedPriceRange?.[0] === range[0] && selectedPriceRange?.[1] === range[1] ? "white" : "black",
                            fontWeight: "normal",
                            backgroundColor: selectedPriceRange?.[0] === range[0] && selectedPriceRange?.[1] === range[1] ? "#344CB7" : "transparent",
                          }}
                        >
                          {label}
                        </Button>
                      ))}
                    </AccordionDetails>
                  </Accordion>

                  {/* Xuất xứ */}
                  <Accordion defaultExpanded disableGutters sx={{ py: 1, boxShadow: "none", borderBottom: "1px solid #ddd" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      sx={{
                        fontSize: "18px",
                      }}
                    >
                      Xuất xứ
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        padding: "8px 16px",
                        overflow: "hidden",
                      }}
                    >
                      <FormGroup>
                        {["Mĩ", "Anh", "Pháp", "New Zealand", "Nhật Bản", "Ý", "Việt Nam", "Thái Lan", "Hàn Quốc", "Thụy Sĩ", "Úc", "Singapore"].map((origin) => (
                          <FormControlLabel
                            key={origin}
                            control={
                              <Checkbox
                                checked={selectedOrigin.includes(origin)}
                                onChange={() => handleOriginFilter(origin)}
                              />
                            }
                            label={origin} />
                        ))}
                      </FormGroup>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Drawer>

            </Box>
          </Box>
          <Box display='grid' gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)"
          }}
            gap='16px'>
            {displayedProducts?.map((product) => ((
              <Card key={product.id} sx={{ cursor: 'pointer', position: 'relative', borderRadius: 4, height: '100%' }}>
                <CardMedia onClick={() => handleProductClick(product)} sx={{ p: 2 }} component='img' width='250' image={product.image} />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '160px' }}>
                  <Box onClick={() => handleProductClick(product)}>
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

                  {/* Nút luôn cố định ở dưới */}
                  <Button
                    onClick={() => addToCart(product)}
                    fullWidth
                    variant="contained"
                    sx={{
                      px: 3,
                      py: 1,
                      fontSize: '12px',
                      backgroundColor: '#344CB7',
                      color: 'white',
                      borderRadius: 8
                    }}
                  >
                    <Typography sx={{ display: { xs: 'block', md: 'none', fontSize: '12px' } }}>
                      Chọn mua
                    </Typography>
                    <Typography sx={{ display: { xs: 'none', md: 'block', fontSize: '14px' } }}>
                      Thêm vào giỏ hàng
                    </Typography>
                  </Button>
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

export default Search