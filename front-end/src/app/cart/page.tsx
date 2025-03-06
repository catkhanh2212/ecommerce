/* eslint-disable */


'use client'

import { AccountCircle, Add, ArrowBackIos, Delete, Mail, Phone, Remove } from '@mui/icons-material'
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import { useRouter } from 'next/navigation';

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

function Cart() {
  const [selectedItems, SetSelectedItems] = useState<Cart[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState<Cart[]>([])

  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  })

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: user?.displayName || "",
      email: user?.email || "",
    }));
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const sendOrderEmail = () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất 1 sản phẩm để đặt hàng!')
    }

    const orderDetails = selectedItems.map(item =>
      `- ${item.product.name}: ${item.quantity} ${item.product.unit} x ${item.product.price}`
    ).join('\n')

    const emailParams = {
      user_email: formData.email || user?.email,
      user_name: formData.name || user?.displayName,
      user_phone: formData.phone,
      total_price: calculateFinalPrice(),
      order_details: orderDetails,
      owner_email: "hrin2211@gmail.com"
    }

    console.log("Chi tiết đơn hàng:", orderDetails)

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_TEMPLATE_ID!,
      emailParams,
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
    )
      .then((response) => {
        console.log("Email gửi thành công!", response.status, response.text)

        selectedItems.map(item =>
          axios.delete(`http://localhost:3001/cart/${item.id}`)
            .then((response) => {
              console.log("Đã remove khỏi giỏ hàng: ", response.data)
            })
            .catch((error) => {
              console.error("Lỗi khi remove cart: ", error)
            })
        )

        fetchCartItems(user?.uid)

        window.dispatchEvent(new Event('update-cart-amount'))

        router.push('/cart/order_successed')
      })
      .catch((error) => {
        console.error("Lỗi khi gửi email:", error)
      })
  }

  const calculateFinalPrice = () => {
    return (selectedItems.reduce((acc, item) => acc + Number(item.product.price.replace(/[.,]/g, '')) * item.quantity, 0)).toLocaleString('de-DE')
  }


  const calculatePrice = (price: string, quantity: number) => {
    const convertPrice = Number(price.replace(/[.,]/g, '')) * quantity
    const calculatedPrice = convertPrice.toLocaleString('de-DE')
    return calculatedPrice
  }

  const getCartByUser = (id: number) => {
    return axios.get(`http://localhost:3001/cart/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error("Lỗi khi lấy giỏ hàng:", error);
        return null;
      });
  };


  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1 || !user) return;

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );

    getCartByUser(id).then(cartItem => {
      if (!cartItem) return;

      console.log(cartItem)

      axios.put(`http://localhost:3001/cart/${id}`, {
        user_id: user.uid,
        product: cartItem.product,
        quantity: newQuantity
      })
        .then(() => {
          console.log("Cập nhật sản phẩm thành công!")
        })
        .catch(error => {
          console.error("Lỗi khi cập nhật sản phẩm:", error);
        });
    });
  };



  const deleteItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));

    axios
      .delete(`http://localhost:3001/cart/${id}`)
      .then(() => {
        console.log("Xóa sản phẩm thành công!");
        window.dispatchEvent(new Event('update-cart-amount'))
      })
      .catch((error) => {
        console.error("Lỗi khi xóa sản phẩm:", error);
      });
  };


  const auth = getAuth()

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        fetchCartItems(currentUser?.uid)
      }
      else {
        setUser(null)
        setCartItems([])
      }
    })

    return () => unsubcribe()
  }, [auth])

  const fetchCartItems = (uid: string | undefined) => {
    if (!uid) return
    axios
      .get(`http://localhost:3001/cart?user_id=${uid}`)
      .then((response) => {
        setCartItems(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Lỗi khi lấy giỏ hàng:', error)
        setLoading(false)
      })
  }


  if (loading) {
    return <CircularProgress />;
  }

  const handleSelectItem = (item: Cart) => {
    SetSelectedItems((prev) =>
      prev.some((i) => i.id === item.id) ? prev.filter((i) => i.id !== item.id) : [...prev, item]
    )
  }

  const isAllSelected = selectedItems.length === cartItems.length

  return (
    <Box sx={{ backgroundColor: "#F7F7F7", padding: 4, px: { xs: 2, md: 16 } }}>
      <Box sx={{ display: 'flex', gap: 0.5, color: '#003092', alignItems: 'center' }}>
        <ArrowBackIos sx={{ fontSize: '16px' }} />
        <Typography sx={{ cursor: 'pointer', fontWeight: '600' }}>Quay về trang chủ </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '70%' }, my: 2 }}>
          <Box sx={{ backgroundColor: 'white', px: 2, borderTopLeftRadius: '20px', borderTopRightRadius: '20px', borderBottom: "3px solid #F7F7F7", display: 'flex', alignItems: 'center', gap: 4 }}>
            <FormControlLabel
              control={<Checkbox checked={isAllSelected} />}
              label={`Chọn tất cả (${cartItems.length})`}
              onChange={() => {
                if (isAllSelected) {
                  SetSelectedItems([])
                } else {
                  SetSelectedItems([...cartItems])
                }
              }}
              sx={{ width: { xs: '100%', md: '50%' } }}
            />

            <Box sx={{ width: '50%', display: 'flex' }}>
              <Typography sx={{ textAlign: 'center', width: '30%', display: { xs: 'none', md: 'block' } }}> Giá thành </Typography>
              <Typography sx={{ textAlign: 'center', width: '30%', display: { xs: 'none', md: 'block' } }}> Số lượng </Typography>
              <Typography sx={{ textAlign: 'center', width: '25%', display: { xs: 'none', md: 'block' } }}> Đơn vị </Typography>
              <Box sx={{ width: '15%' }} />
            </Box>
          </Box>


          <Box sx={{ backgroundColor: 'white', px: 2, borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', borderBottom: "3px solid #F7F7F7" }}>
            {cartItems.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, md: 4 }, py: 2 }}>
                <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', alignItems: 'center', gap: { xs: 0, md: 1 } }}>
                  <Checkbox checked={selectedItems.some((i) => i.id === item.id)} onChange={() => handleSelectItem(item)} />
                  <img src={item.product.image} alt={item.product.name} width={80} height={80} />
                  <Box>
                    <Typography> {item.product.name} </Typography>
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                      <Typography sx={{ color: '#003092' }}>
                        {calculatePrice(item.product.price, item.quantity)} đ
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
                          <Box
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            sx={{
                              width: "35px",
                              height: "35px",
                              border: "1px solid #9AA6B2",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderTopLeftRadius: '20px',
                              borderBottomLeftRadius: '20px',
                              cursor: "pointer",
                            }}
                          >
                            <Remove sx={{ fontSize: "16px" }} />
                          </Box>

                          {/* Ô nhập số */}
                          <TextField
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                            inputProps={{
                              min: 1,
                              style: { textAlign: "center", padding: "0px" },
                            }}
                            sx={{
                              width: "40px",
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "0px",
                                padding: "0px",
                                height: "35px",
                                border: "1px solid #9AA6B2",
                                "&:hover": { border: "1px solid #9AA6B2" },
                                "&.Mui-focused": { border: "1px solid #9AA6B2" },
                              },
                              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                              "& .MuiInputBase-input": { padding: "0px", textAlign: "center" },
                            }}
                            size="small"
                          />

                          <Box
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            sx={{
                              width: "35px",
                              height: "35px",
                              border: "1px solid #9AA6B2",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderTopRightRadius: '20px',
                              borderBottomRightRadius: '20px',
                              cursor: "pointer",
                            }}
                          >
                            <Add sx={{ fontSize: "16px" }} />
                          </Box>
                        </Box>

                        <Typography sx={{ textAlign: 'center', width: '25%' }}>
                          {item.product.unit}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ width: '15%', textAlign: 'right', pr: 1, cursor: 'pointer', display: {xs: 'block', md: 'none'} }}>
                    <Delete onClick={() => deleteItem(item.id)} sx={{ color: '#B7B7B7' }} />
                  </Box>

                </Box>

                <Box sx={{ width: '50%', display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                  <Typography sx={{ textAlign: 'center', color: '#003092', width: '30%' }}>
                    {calculatePrice(item.product.price, item.quantity)} đ
                  </Typography>

                  <Box sx={{ width: '30%', display: "flex", alignItems: "center", justifyContent: 'center' }}>
                    <Box
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      sx={{
                        width: "35px",
                        height: "35px",
                        border: "1px solid #9AA6B2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopLeftRadius: '20px',
                        borderBottomLeftRadius: '20px',
                        cursor: "pointer",
                      }}
                    >
                      <Remove sx={{ fontSize: "16px" }} />
                    </Box>

                    {/* Ô nhập số */}
                    <TextField
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      inputProps={{
                        min: 1,
                        style: { textAlign: "center", padding: "0px" },
                      }}
                      sx={{
                        width: "40px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "0px",
                          padding: "0px",
                          height: "35px",
                          border: "1px solid #9AA6B2",
                          "&:hover": { border: "1px solid #9AA6B2" },
                          "&.Mui-focused": { border: "1px solid #9AA6B2" },
                        },
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        "& .MuiInputBase-input": { padding: "0px", textAlign: "center" },
                      }}
                      size="small"
                    />

                    <Box
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      sx={{
                        width: "35px",
                        height: "35px",
                        border: "1px solid #9AA6B2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopRightRadius: '20px',
                        borderBottomRightRadius: '20px',
                        cursor: "pointer",
                      }}
                    >
                      <Add sx={{ fontSize: "16px" }} />
                    </Box>
                  </Box>

                  <Typography sx={{ textAlign: 'center', width: '25%' }}>
                    {item.product.unit}
                  </Typography>
                  <Box sx={{ width: '15%', textAlign: 'right', pr: 1, cursor: 'pointer' }}>
                    <Delete onClick={() => deleteItem(item.id)} sx={{ color: '#B7B7B7' }} />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>


        </Box>

        <Box sx={{ width: { xs: '100%', md: '30%' }, my: 2 }}>
          <Box sx={{ backgroundColor: 'white', px: 2, py: 2, borderRadius: 4, }}>
            <Box sx={{ borderBottom: '1px solid #C7C8CC', pb: 2 }}>
              <Typography sx={{ fontSize: '18px', fontWeight: '700', mb: 1 }}>Thông tin liên hệ</Typography>

              <TextField
                fullWidth
                placeholder='Tên'
                variant='outlined'
                name='name'
                value={formData.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <AccountCircle />
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    gap: 2,
                    mb: 2,
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#96C9F4',
                      borderWidth: 4
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#96C9F4',
                      borderWidth: 4
                    }
                  },
                  size: 'small'
                }}
              />

              <TextField
                fullWidth
                placeholder='Phone number'
                variant='outlined'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <Phone />
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    gap: 2,
                    mb: 2,
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#96C9F4',
                      borderWidth: 4
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#96C9F4',
                      borderWidth: 4
                    }
                  }
                }}
              />

              <TextField
                fullWidth
                placeholder='Email'
                variant='outlined'
                name='email'
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <Mail />
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    gap: 2,
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#96C9F4',
                      borderWidth: 4
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#96C9F4',
                      borderWidth: 4
                    }
                  }
                }}
              />
            </Box>


            <Box sx={{ py: 2, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '18px', fontWeight: '700', flex: 1 }}> Thành tiền </Typography>
              <Typography sx={{ fontSize: '24px', fontWeight: '600', color: '#003092' }}> {calculateFinalPrice()} đ </Typography>
            </Box>

            <Typography sx={{ fontSize: '12px', color: '#9AA6B2' }}> * Sau khi xác nhận đặt hàng, chúng tôi sẽ thông báo kết quả cho bạn qua email. </Typography>
            <Typography sx={{ fontSize: '12px', color: '#9AA6B2' }}> * Quá trình đặt hàng này là để nhà thuốc kiểm tra tình trạng thuốc và chuẩn bị trước đơn thuốc. Bạn sẽ phải tự đến lấy sau khi nhận được thông báo. </Typography>

            <Button onClick={sendOrderEmail} fullWidth sx={{ backgroundColor: '#344CB7', color: 'white', my: 1, borderRadius: 4, justifyContent: 'center', fontSize: '16px' }}>ĐẶT HÀNG</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Cart