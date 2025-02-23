'use client'

import { ExpandMore, FilterList } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, CardMedia, Checkbox, CircularProgress, FormControlLabel, FormGroup, Pagination, Typography } from '@mui/material';
import axios from 'axios';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Interface sản phẩm
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

const subcategoryMapping: Record<string, string[]> = {
  "dung-cu-y-te": [
    "Máy đo đường huyết",
    "Nhiệt kế",
    "Máy đo huyết áp",
    "Khẩu trang",
    "Dụng cụ vệ sinh mũi",
    "Khác",
  ],
  "cham-soc-ca-nhan": [
    "Chăm sóc răng miệng",
    "Vệ sinh cá nhân",
  ],
  "thuc-pham-chuc-nang": [
    "Dành cho trẻ em",
    "Chăm sóc sắc đẹp",
    "Hỗ trợ tim mạch",
    "Hỗ trợ tiêu hóa",
    "Nhóm mắt - tai - mũi",
    "Vitamin và khoáng chất",
    "Hỗ trợ sinh lý",
    "Nhóm thần kinh",
    "Giảm cân",
  ],
  "thuoc": [
    "Kháng sinh",
    "Hạ sốt - giảm đau - chống viêm",
    "Dị ứng",
    "Trị ho",
    "Tiêu hóa",
    "Huyết áp tim mạch",
    "Gan",
    "Xương khớp",
    "Tránh thai, rối loạn kinh nguyệt",
  ],
};

const ITEMS_PER_PAGE = 12

function Category() {
  const params = useParams(); // ⚠️ useParams() có thể trả về string | string[]
  const category_name = Array.isArray(params.category_name) ? params.category_name[0] : params.category_name;
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number] | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string[]>([])
  const [selectedOrigin, setSelectedOrigin] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<"asc" | "des" | null>(null)
  const searchParams = useSearchParams()
  const subCategoryParam = searchParams.get("sub_category")
  const [user, setUser] = useState<User | null>(null)

  const auth = getAuth()

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubcribe()
  }, [auth])

  const router = useRouter()

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
      })
      .catch((error) => error.log('Error: ', error))
    
  }


  const handleProductClick = (product: Product) => {
    router.push(`/product/${product.id}`)
  }

  const handleOriginFilter = (origin: string) => {
    setSelectedOrigin((prev) =>
      prev.includes(origin)
        ? prev.filter((item) => item != origin)
        : [...prev, origin]
    )
  }

  const handleSubCategoryFilter = (subcategory: string) => {
    setSelectedSubCategory((prev) =>
      prev.includes(subcategory)
        ? prev.filter((item) => item != subcategory)
        : [...prev, subcategory]
    )
  }

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
    });
  };

  const filterProducts = products?.filter((product) => {
    // 1. Lọc theo giá
    if (selectedPriceRange) {
      const price = Number(product.price.replace(/[.,]/g, ""));
      if (price < selectedPriceRange[0] || price > selectedPriceRange[1]) {
        return false
      }
    }

    // 2. Lọc theo subcategory (nếu có lựa chọn)
    if (selectedSubCategory.length > 0 && !selectedSubCategory.includes(product.sub_category)) {
      return false
    }

    if (selectedOrigin.length > 0 && !selectedOrigin.includes(product.origin)) {
      return false
    }

    return true;
  });

  const sortedProducts = filterProducts?.slice().sort((a, b) => {
    const priceA = Number(a.price.replace(/[,.]/g, ''))
    const priceB = Number(b.price.replace(/[,.]/g, ''))

    if (sortOrder === 'asc') return priceA - priceB
    if (sortOrder === 'des') return priceB - priceA

    return 0
  })


  const totalPages = filterProducts ? Math.ceil(filterProducts.length / ITEMS_PER_PAGE) : 0;


  const subcategories = subcategoryMapping[category_name as string] || [];

  const displayedProducts = sortedProducts?.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);


  useEffect(() => {
    if (!category_name) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fullCategoryName = categoryMapping[category_name] || category_name;

        const res = await axios.get(`http://localhost:3001/products`, {
          params: { category: fullCategoryName }
        });

        setProducts(res.data);
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category_name]);

  useEffect(() => {
    if (displayedProducts) {
      console.log('Displayed products: ', displayedProducts.map(p => p.id))
    }
  }, [displayedProducts])

  useEffect(() => {
    if (products) {
      console.log('Sản phẩm hiện tại:', products.map(p => p.id));
    }
  }, [products]);

  useEffect(() => {
    if (subCategoryParam) {
      setSelectedSubCategory([subCategoryParam]); // Tự động tick checkbox
    }
  }, [subCategoryParam]);


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#F5F5F5', minHeight: '100vh', padding: 4, px: 8 }}>
      <Box sx={{ display: 'flex', gap: 2, color: '#2D336B' }}>
        <Typography sx={{ cursor: 'pointer' }}>Trang chủ / </Typography>
        <Typography sx={{ cursor: 'pointer' }}> {category_name ? categoryMapping[category_name] || category_name : 'Danh mục'}</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
        <Box sx={{ backgroundColor: 'white', width: '25%', borderRadius: 4 }}>
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


            {/* Phân loại */}
            <Accordion defaultExpanded disableGutters sx={{ py: 1, boxShadow: "none", borderBottom: "1px solid #ddd" }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  fontSize: "18px",
                }}
              >
                Phân loại
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
                  {subcategories.map((sub, index) => (
                    <FormControlLabel key={index} control={
                      <Checkbox
                        checked={selectedSubCategory.includes(sub)}
                        onChange={() => handleSubCategoryFilter(sub)}
                      />
                    } label={sub} />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>

            {/* Xuất xứ */}
            <Accordion disableGutters sx={{ py: 1, boxShadow: "none", borderBottom: "1px solid #ddd" }}>
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
                  {["Mĩ", "Anh", "Pháp", "New Zealand", "Nhật Bản", "Ý", "Việt Nam", "Thái Lan", "Hàn Quốc", "Thụy Sĩ", "Úc"].map((origin) => (
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

        <Box sx={{ width: '75%' }}>
          <Box sx={{ display: 'flex', py: 1, mb: 1, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>Danh sách sản phẩm</Typography>
            <Box sx={{ flex: 1 }} />
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography sx={{ fontSize: '18px' }}> Sắp xếp theo: </Typography>
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
                  fontSize: '14px',
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
                  fontSize: '14px',
                  fontWeight: '600',
                  color: sortOrder === 'des' ? '#0A5EB0' : '#3D3D3D',
                  backgroundColor: 'white',
                  border: sortOrder === 'des' ? '2px solid #0A5EB0' : '1px solid #3D3D3D',
                }}
              >
                Giá cao
              </Button>

            </Box>
          </Box>
          <Box display='grid' gridTemplateColumns='repeat(4, 1fr)' gap='16px'>
            {displayedProducts?.map((product) => ((
              <Card key={product.id} sx={{ cursor: 'pointer', position: 'relative', borderRadius: 4, height: '100%' }}>
                <CardMedia onClick={() => handleProductClick(product)} sx={{ p: 2 }} component='img' height='250' image={product.image} />
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
                    <Typography sx={{ color: '#E195AB', fontWeight: '600', fontSize: '18px' }}>
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
                    Thêm vào giỏ hàng
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
  );
}

export default Category;
