'use client'

import { AccountCircle, ArrowDropDown, Book, Menu, LocalHospital, ShoppingCart, AppRegistration } from '@mui/icons-material'
import { Avatar, Box, Button, Drawer, IconButton, List, ListItem, ListItemText, Modal, Popover, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

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

const categoryMapping: Record<string, string> = {
  'thuc-pham-chuc-nang': 'Thực phẩm chức năng',
  'thuoc': 'Thuốc',
  'dung-cu-y-te': 'Dụng cụ y tế',
  'cham-soc-ca-nhan': 'Chăm sóc cá nhân'
};

function Header() {
  const [anchorE1, setAnchorE1] = useState<HTMLElement | null>(null);
  const [anchorLogout, setAnchorLogout] = useState<HTMLElement | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [amountItems, setAmountItems] = useState<number>(0)
  const [keyword, setKeyword] = useState<string>('')
  const [openDrawer, setOpenDrawer] = useState(false)
  const [owner, setOwner] = useState(false)

  useEffect(() => {
    const updateCart = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cart?user_id=${user?.uid}`, {
          headers: { 'Cache-Control': 'no-cache' }, // Tránh lấy cache cũ
        });

        const cartItems: Cart[] = response.data;
        setAmountItems(cartItems.length); // Cập nhật ngay lập tức
      } catch (error) {
        console.error("error: ", error);
      }
    };

    updateCart();

    window.addEventListener('update-cart-amount', updateCart);

    return () => window.removeEventListener('update-cart-amount', updateCart);
  }, [user?.uid]); // Theo dõi user ID, mỗi khi user thay đổi thì gọi lại API


  const handleSearch = () => {
    if (keyword.trim()) {
      const queryParams = new URLSearchParams()
      queryParams.append("keyword", keyword)

      const queryString = queryParams.toString()

      console.log("query string: ", queryString)
      const path = `/search?${queryString}`

      router.push(path)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }


  const router = useRouter()

  const handleHomeClick = () => {
    router.push('/')
  }

  const handleCartClick = () => {
    router.push('/cart')
  }

  const handleBlogClick = () => {
    router.push('/blog')
  }

  const handleManageClick = () => {
    router.push('/manage')
  }

  const handleCategoryClick = (categoryLabel: string) => {
    const categoryKey = Object.keys(categoryMapping).find(
      (key) => categoryMapping[key] === categoryLabel
    )

    if (categoryKey) {
      router.push(`/product/category/${categoryKey}`)
    }
  }

  const handleSubCategoryClick = (category: string, subCategory: string) => {
    const categoryKey = Object.keys(categoryMapping).find(
      (key) => categoryMapping[key] === category
    )

    if (categoryKey) {
      const queryParams = new URLSearchParams()
      if (subCategory) queryParams.append("sub_category", subCategory)



      const queryString = queryParams.toString()

      console.log("query string: ", queryString)
      const path = queryString
        ? `/product/category/${categoryKey}?${queryString}`
        : `/product/category/${categoryKey}`

      router.push(path)
    }
  }

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorE1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      console.log("User từ Firebase:", currentUser)

      if (currentUser?.email === 'hrin2211@gmail.com') {
        setOwner(true)
      }
    })

    return () => unsubscribe(); // Cleanup listener khi unmount
  }, [])


  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        setModalOpen(false); // Đóng modal sau khi đăng nhập
      })
      .catch((error) => {
        console.error("Lỗi đăng nhập: ", error);
      });
  };


  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setAnchorLogout(null);
      alert("Đã đăng xuất!");
    });
  };


  const handleAccountClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (user) {
      setAnchorLogout(event.currentTarget); // Mở Popover khi có user
    } else {
      setModalOpen(true); // Mở Modal khi chưa đăng nhập
    }
  }


  return (
    <Box
      sx={{
        paddingX: { xs: 2, md: 16 },
        paddingY: 2,
        backgroundColor: '#5272F2',
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }}>

      {/* Logo */}
      <Typography onClick={() => handleHomeClick()} sx={{ fontFamily: "'Philosopher', Arial, Helvetica, sans-serif", fontSize: '28px', fontWeight: 'bold', color: 'white', cursor: 'pointer', display: { xs: 'none', md: 'block' } }}>
        GiaKhanh
      </Typography>

      {/* Hamburger Menu - Chỉ hiển thị trên màn hình nhỏ */}
      <IconButton
        sx={{
          display: { xs: 'block', md: 'none' }, // Chỉ hiển thị trên mobile
          color: 'white'
        }}
        onClick={() => setOpenDrawer(true)}
      >
        <Menu />
      </IconButton>

      {/* Search Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 2,
          padding: 1.5,
          gap: 2,
          flex: 1
        }}>

        {/* Box "Categories" */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            gap: 1,
          }}
          onClick={handleOpen}
        >
          <Typography sx={{ color: '#4C585B', fontSize: '16px' }}>
            Phân loại
          </Typography>
          <ArrowDropDown sx={{ color: '#5272F2' }} />
        </Box>

        {/* Searchbox */}
        <TextField
          placeholder='Search for medicine...'
          variant='standard'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyPress}
          InputProps={{ disableUnderline: true }}
          sx={{
            flex: 1
          }}
        />

        {/* Popover */}
        <Popover
          open={Boolean(anchorE1)}
          anchorEl={anchorE1}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          sx={{ mt: 1 }}
          disableScrollLock
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, color: '#2D336B', p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography onClick={() => handleCategoryClick("Thuốc")} sx={{ fontWeight: 'bold', mb: 1, cursor: 'pointer' }}>THUỐC:</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thuốc", "Kháng sinh")} sx={{ cursor: 'pointer' }}>Kháng sinh</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thuốc", "Hạ sốt - giảm đau - chống viêm")} sx={{ cursor: 'pointer' }}>Hạ sốt - giảm đau - chống viêm</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thuốc", "Dị ứng")} sx={{ cursor: 'pointer' }}>Dị ứng</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thuốc", "Trị ho")} sx={{ cursor: 'pointer' }}>Trị ho</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thuốc", "Tiêu hóa")} sx={{ cursor: 'pointer' }}>Tiêu hóa</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thuốc", "Huyết áp tim mạch")} sx={{ cursor: 'pointer' }}>Huyết áp tim mạch</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thuốc", "Gan")} sx={{ cursor: 'pointer' }}>Gan</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thuốc", "Xương khớp")} sx={{ cursor: 'pointer' }}>Xương khớp</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thuốc", "Thuốc nhỏ mắt")} sx={{ cursor: 'pointer' }}>Thuốc nhỏ mắt</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography onClick={() => handleCategoryClick("Thực phẩm chức năng")} sx={{ fontWeight: 'bold', mb: 1, cursor: 'pointer' }}>THỰC PHẨM CHỨC NĂNG:</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thực phẩm chức năng", "Dành cho trẻ em")} sx={{ cursor: 'pointer' }}>Dành cho trẻ em</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thực phẩm chức năng", "Chăm sóc sắc đẹp")} sx={{ cursor: 'pointer' }}>Chăm sóc sắc đẹp</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thực phẩm chức năng", "Hỗ trợ tim mạch")} sx={{ cursor: 'pointer' }}>Hỗ trợ tim mạch</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thực phẩm chức năng", "Hỗ trợ tiêu hóa")} sx={{ cursor: 'pointer' }}>Hỗ trợ tiêu hóa</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thực phẩm chức năng", "Nhóm mắt - tai - mũi")} sx={{ cursor: 'pointer' }}>Nhóm mắt - tai - mũi</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thực phẩm chức năng", "Vitamin và khoáng chất")} sx={{ cursor: 'pointer' }}>Vitamin và khoáng chất</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thực phẩm chức năng", "Hỗ trợ sinh lý")} sx={{ cursor: 'pointer' }}>Hỗ trợ sinh lý</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thực phẩm chức năng", "Nhóm thần kinh")} sx={{ cursor: 'pointer' }}>Nhóm thần kinh</Typography>
              <Typography onClick={() => handleSubCategoryClick("Thực phẩm chức năng", "Giảm cân")} sx={{ cursor: 'pointer' }}>Giảm cân</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography onClick={() => handleCategoryClick("Dụng cụ y tế")} sx={{ fontWeight: 'bold', mb: 1, cursor: 'pointer' }}>DỤNG CỤ Y TẾ:</Typography>
              <Typography onClick={() => handleSubCategoryClick("Dụng cụ y tế", "Máy đo đường huyết")} sx={{ cursor: 'pointer' }}>Máy đo đường huyết</Typography>
              <Typography onClick={() => handleSubCategoryClick("Dụng cụ y tế", "Nhiệt kế")} sx={{ cursor: 'pointer' }}>Nhiệt kế</Typography>
              <Typography onClick={() => handleSubCategoryClick("Dụng cụ y tế", "Máy đo huyết áp")} sx={{ cursor: 'pointer' }}>Máy đo huyết áp</Typography>
              <Typography onClick={() => handleSubCategoryClick("Dụng cụ y tế", "Khẩu trang")} sx={{ cursor: 'pointer' }}>Khẩu trang</Typography>
              <Typography onClick={() => handleSubCategoryClick("Dụng cụ y tế", "Dụng cụ vệ sinh mũi")} sx={{ cursor: 'pointer' }}>Dụng cụ vệ sinh mũi</Typography>
              <Typography onClick={() => handleSubCategoryClick("Dụng cụ y tế", "Khác")} sx={{ cursor: 'pointer' }}>Khác</Typography>

              <Typography onClick={() => handleCategoryClick("Chăm sóc cá nhân")} sx={{ fontWeight: 'bold', mt: 1, mb: 1, cursor: 'pointer' }}>CHĂM SÓC CÁ NHÂN:</Typography>
              <Typography onClick={() => handleSubCategoryClick("Chăm sóc cá nhân", "Chăm sóc răng miệng")} sx={{ cursor: 'pointer' }}>Chăm sóc răng miệng</Typography>
              <Typography onClick={() => handleSubCategoryClick("Chăm sóc cá nhân", "Vệ sinh cá nân")} sx={{ cursor: 'pointer' }}>Vệ sinh cá nhân</Typography>
            </Box>

          </Box>
        </Popover>
      </Box>

      {/* Cart */}
      {owner === false ? (
        <Box
          onClick={() => handleCartClick()}
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            gap: 1,
            cursor: 'pointer',
          }}>
          <Box sx={{ position: 'relative' }}>
            <ShoppingCart />
            <Box sx={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -70%)', p: 0.5, px: 0.8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', borderRadius: 50, backgroundColor: '#E195AB' }}>
              {amountItems}
            </Box>
          </Box>

          <Typography sx={{ fontSize: '16px', display: { xs: 'none', md: 'block' } }}>Giỏ hàng</Typography>
        </Box>
      ) :
        (
          <Box
            onClick={() => handleManageClick()}
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              gap: 1,
              cursor: 'pointer',
            }}>
            <Box sx={{ position: 'relative' }}>
              <AppRegistration />
            </Box>

            <Typography sx={{ fontSize: '16px', display: { xs: 'none', md: 'block' } }}>Quản lí</Typography>
          </Box>
        )}


      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: 3
        }}
      >

        {/* Blog */}
        <Box
          onClick={() => handleBlogClick()}
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            gap: 1,
            cursor: 'pointer'
          }}>
          <Book />
          <Typography sx={{ fontSize: '16px', display: { xs: 'none', md: 'block' } }}>Blogs</Typography>
        </Box>

        {/* Account */}
        <Box
          onClick={handleAccountClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            gap: 1,
            cursor: 'pointer'
          }}>
          {user ? (
            <>
              <Avatar src={user.photoURL || ''} sx={{ width: '32px', height: '32px' }} />
              <Typography sx={{ fontSize: '16px', display: { xs: 'none', md: 'block' } }}>{user.displayName}</Typography>
            </>
          ) : (
            <>
              <AccountCircle />
              <Typography sx={{ fontSize: '16px', display: { xs: 'none', md: 'block' } }}>Xin chào, Đăng nhập</Typography>
            </>
          )}
        </Box>

      </Box>



      {/* Drawer (Menu Trượt) */}
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List sx={{ width: 250 }}>
          {/* Blog */}
          <ListItem
            component="button"
            onClick={handleHomeClick}
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
              '&:hover': { backgroundColor: 'transparent' },
              '&:focus': { backgroundColor: 'transparent' },
            }}
          >
            <Typography sx={{ fontFamily: "'Philosopher', Arial, Helvetica, sans-serif", fontSize: '28px', fontWeight: 'bold', color: '#344CB7', cursor: 'pointer' }}>
              GiaKhanh
            </Typography>
          </ListItem>

          <ListItem
            onClick={handleBlogClick}
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
              '&:hover': { backgroundColor: 'transparent' },
              '&:focus': { backgroundColor: 'transparent' },
            }}
          >
            <Book sx={{ marginRight: 2 }} />
            <ListItemText primary="Blogs" />
          </ListItem>

          {/* Account */}
          <ListItem onClick={() => handleAccountClick}>
            <Box
              onClick={handleAccountClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'black',
                gap: 1,
                cursor: 'pointer'
              }}>
              {user ? (
                <>
                  <Avatar src={user.photoURL || ''} sx={{ width: '32px', height: '32px' }} />
                  <Typography sx={{ fontSize: '16px', display: { xs: 'none', md: 'block', color: 'black' } }}>{user.displayName}</Typography>
                </>
              ) : (
                <>
                  <AccountCircle />
                  <Typography sx={{ fontSize: '16px', color: 'black', ml: 1 }}>Xin chào, Đăng nhập</Typography>
                </>
              )}
            </Box>
          </ListItem>
        </List>
      </Drawer>


      {/* Modal Login */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
        disableScrollLock
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 480,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 6,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#5272F2', gap: 1, justifyContent: 'center', mb: 3 }}>
            <LocalHospital sx={{ fontSize: '40px', textAlign: 'center' }} />
            <Typography sx={{ fontWeight: 'bold', fontSize: '28px' }}> giakhanh.vn </Typography>
          </Box>
          <Typography id="login-modal-title" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
            Đăng nhập
          </Typography>
          <Typography id="login-modal-title" sx={{ mb: 4, textAlign: 'center', fontSize: '18px', color: '#4C585B' }}>
            Vui lòng đăng nhập nếu bạn cần gửi yêu cầu đặt trước thuốc.
          </Typography>
          <Button
            onClick={handleLogin}
            variant="contained"
            sx={{ backgroundColor: '#F7F7F7', color: '#1A1A1D', display: 'flex', p: 2, borderRadius: 8 }}
            fullWidth
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              <Box
                sx={{
                  backgroundImage: 'url(/google.png)',
                  height: '20px',
                  width: '20px',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <Typography sx={{ p: 0, m: 0, fontSize: '18px', justifyContent: 'center', alignItems: 'center', mt: 0.5 }}>Đăng nhập bằng Google</Typography>
            </Box>
          </Button>
        </Box>
      </Modal>

      {/* Popover Logout */}
      <Popover
        open={Boolean(anchorLogout)}
        anchorEl={anchorLogout}
        onClose={() => setAnchorLogout(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 1, alignItems: 'center', justifyContent: 'center' }}
        disableScrollLock
      >
        <Button onClick={handleLogout} sx={{ px: 3, alignItems: 'center', justifyContent: 'center', pt: 1 }} variant="contained" color="error" fullWidth>
          Đăng xuất
        </Button>
      </Popover>

    </Box>
  );
}

export default Header;
