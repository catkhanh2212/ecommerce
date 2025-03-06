'use client'

import { Add, Remove } from '@mui/icons-material';
import { Box, Button, CircularProgress, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

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

const descriptions = [
  { title: "Thông tin" },
  { title: "Thành phần" },
  { title: "Công dụng" },
  { title: "Liều lượng" },
  { title: "Lưu ý" },
  { title: "Bảo quản" },
];

function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [amount, setAmount] = useState(1)
  const [user, setUser] = useState<User | null> (null)

  const auth = getAuth()

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubcribe()
  }, [auth])

  const handleAddToCart = () => {
    if (!product) return

    if (!user || !user.uid) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!")
      return
    }

    axios
      .post('http://localhost:3001/cart', {
        user_id: user.uid,
        product: product,
        quantity: amount
      })
      .then((response) => {
        if (response.status === 201) {
          alert("Đã thêm vào giỏ hàng!")
          window.dispatchEvent(new Event('update-cart-amount'))
        }
        else {
          alert("Có lỗi xảy ra. Vui lòng thử lại sau!")
        }
      })
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const sectionRef = descriptions.map(() => useRef<HTMLElement>(null))

  const handleTitleClick = (index: number) => {
    setActiveIndex(index)
    sectionRef[index].current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    if (amount < 0) {
      setAmount(0)
    }
  }, [amount])


  useEffect(() => {
    if (!id) return

    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((response) => {
        setProduct(response.data)
        setLoading(false)
      })

      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          Không tìm thấy sản phẩm
        </Typography>
      </Box>
    );
  }


  return (
    <Box sx={{ backgroundColor: "#F7F7F7", padding: {xs: 2, md: 4}, px: 8 }}>
      <Box sx={{ display: 'flex', gap: 2, color: '#2D336B' }}>
        <Typography sx={{ cursor: 'pointer' }}>Trang chủ / </Typography>
        <Typography sx={{ cursor: 'pointer' }}>{product.category} / </Typography>
        <Typography sx={{ cursor: 'pointer' }}>{product.sub_category} </Typography>
      </Box>

      <Box sx={{ backgroundColor: 'white', padding: {xs: 4, md: 5}, my: {xs: 2, md: 5}, borderRadius: 4, display: 'flex', gap: 3, }}>
        <Box sx={{ width: '20.5%', color: '#9AA6B2', display: {xs: 'none', md: 'block'} }}>
          <List>
            {descriptions.map((item, index) => (
              <ListItem
                onClick={() => handleTitleClick(index)}
                key={index}
                component="li"
                sx={{
                  cursor: 'pointer',
                  py: 0.5,
                  bgcolor: activeIndex === index ? "grey.200" : "transparent",
                  borderRadius: 2,
                  color: activeIndex === index ? '#1A1A1D' : '#9AA6B2',
                  fontWeight: activeIndex == index ? 'bold' : 'normal',
                  "&:hover": { bgcolor: "grey.50", borderRadius: 2, color: '#373A40' },
                  borderBottom: "1px solid #ddd",
                  "&:last-child": { borderBottom: "none" }
                }}>
                <ListItemText primaryTypographyProps={{ fontSize: "18px", mt: 0.5 }} primary={item.title} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ width: {xs: '100%', md: '79.5%'} }}>
          <Box ref={sectionRef[0]} sx={{ display: 'flex', gap: 2, p: 0, m: 0, flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ width: {xs: '100%', md: '47.5%'}, alignItems: 'center', m: 'auto', justifyContent: 'center', textAlign: 'center' }}>
              <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
            </Box>

            <Box sx={{ width: {xs: '100%', md: '52.5%'}}}>
              <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
                <Typography sx={{ fontWeight: '600', fontSize: '18px' }} >Thương hiệu: </Typography>
                <Typography sx={{ color: '#5272F2', fontWeight: 'bold', fontSize: '18px' }} > {product.brand} </Typography>
              </Box>

              <Typography sx={{ color: '#2A3335', fontSize: {xs: '28px', md: '32px'} }}>{product.name}</Typography>

              <Typography sx={{ color: '#4C585B', mt: 0.5, mb: 0.5 }}>{product.id}</Typography>

              <Typography sx={{ color: '#344CB7', mt: 1, mb: 1.5, fontSize: '36px', fontWeight: '600' }}>{product.price} ₫ / {product.unit} </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
                <Typography sx={{ color: '#686D76', fontSize: '18px' }} >Danh mục: </Typography>
                <Typography sx={{ color: '#222831', fontSize: '18px' }} > {product.sub_category} </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
                <Typography sx={{ color: '#686D76', fontSize: '18px' }} >Xuất xứ: </Typography>
                <Typography sx={{ color: '#222831', fontSize: '18px' }} > {product.origin} </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
                <Typography sx={{ color: '#686D76', fontSize: '18px' }} >Qui cách: </Typography>
                <Typography sx={{ color: '#222831', fontSize: '18px' }} > {product.specifications} </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 1.5, alignItems: 'center' }}>
                <Typography sx={{ color: '#686D76', fontSize: '18px' }} >Chọn số lượng: </Typography>
                <Box sx={{ display: 'flex', gap: 0, alignItems: 'center' }}>
                  <Box onClick={() => setAmount(amount - 1)} sx={{ width: '35px', height: '30px', border: '1px solid #9AA6B2', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', cursor: 'pointer' }}>
                    <Remove sx={{ fontSize: '16px' }} />
                  </Box>
                  <Box sx={{ width: '35px', height: '30px', border: '1px solid #9AA6B2', display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Typography sx={{ fontSize: '16px', p: 0, m: 0, textAlign: 'center', lineHeight: '1' }}>{amount}</Typography>
                  </Box>
                  <Box onClick={() => setAmount(amount + 1)} sx={{ width: '35px', height: '30px', border: '1px solid #9AA6B2', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopRightRadius: '20px', borderBottomRightRadius: '20px', cursor: 'pointer' }}>
                    <Add sx={{ fontSize: '16px' }} />
                  </Box>

                </Box>
              </Box>

              <Button onClick={() => handleAddToCart()} variant="contained" sx={{ px: 3, py: 2, mt: 3, fontSize: '16px', width: '250px', backgroundColor: '#344CB7', color: 'white', borderRadius: 8, display: 'flex', lineHeight: '1', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                Thêm vào giỏ hàng
              </Button>

            </Box>
          </Box>

          {/* Thành phần */}
          <Typography ref={sectionRef[1]} sx={{ mt: 5, fontSize: '24px', fontWeight: 'bold' }}>Thành phần</Typography>
          {product.ingredient.includes('\n') ? (
            <Typography component='ul' sx={{ mt: 2, fontSize: '16px' }}>
              {product.ingredient.split('\n').map((item, index) => (
                <Typography component='li' key={index} sx={{ mb: 1 }}>
                  {item}
                </Typography>
              ))}
            </Typography>
          ) : (
            product.ingredient.includes('http') ? (
              <Box sx={{ width: '100%' }}>
                <img src={product.ingredient} alt={product.name} width={500} />
              </Box>
            ) : (
              < Typography sx={{ mt: 2, fontSize: '16px' }}>{product.ingredient}</Typography>
            )
          )}

          {/* Công dụng */}
          <Typography ref={sectionRef[2]} sx={{ mt: 5, fontSize: '24px', fontWeight: 'bold' }}>Công dụng</Typography>
          {product.uses.includes('\n') ? (
            <Typography component='ul' sx={{ mt: 2, fontSize: '16px' }}>
              {product.uses.split('\n').map((item, index) => (
                <Typography component='li' key={index} sx={{ mb: 1 }}>
                  {item}
                </Typography>
              ))}
            </Typography>
          ) : (
            <Typography sx={{ mt: 2, fontSize: '16px' }}>{product.uses}</Typography>
          )}

          {/* Liều lượng */}
          <Typography ref={sectionRef[3]} sx={{ mt: 5, fontSize: '24px', fontWeight: 'bold' }}>Liều lượng</Typography>
          {product.dosage.includes('\n') ? (
            <Typography component='ul' sx={{ mt: 2, fontSize: '16px' }}>
              {product.dosage.split('\n').map((item, index) => (
                <Typography component='li' key={index} sx={{ mb: 1 }}>
                  {item}
                </Typography>
              ))}
            </Typography>
          ) : (
            <Typography sx={{ mt: 2, fontSize: '16px' }}>{product.dosage}</Typography>
          )}

          {/* Lưu ý */}
          <Typography ref={sectionRef[4]} sx={{ mt: 5, fontSize: '24px', fontWeight: 'bold' }}>Lưu ý</Typography>
          {product.alert.includes('\n') ? (
            <Typography component='ul' sx={{ mt: 2, fontSize: '16px' }}>
              {product.alert.split('\n').map((item, index) => (
                <Typography component='li' key={index} sx={{ mb: 1 }}>
                  {item}
                </Typography>
              ))}
            </Typography>
          ) : (
            <Typography sx={{ mt: 2, fontSize: '16px' }}>{product.alert}</Typography>
          )}

          {/* Bảo quản */}
          <Typography ref={sectionRef[5]} sx={{ mt: 5, fontSize: '24px', fontWeight: 'bold' }}>Bảo quản</Typography>
          {product.preserve.includes('\n') ? (
            <Typography component='ul' sx={{ mt: 2, fontSize: '16px' }}>
              {product.preserve.split('\n').map((item, index) => (
                <Typography component='li' key={index} sx={{ mb: 1 }}>
                  {item}
                </Typography>
              ))}
            </Typography>
          ) : (
            <Typography sx={{ mt: 2, fontSize: '16px' }}>{product.preserve}</Typography>
          )}
        </Box>
      </Box>

    </Box >
  )
}

export default Product