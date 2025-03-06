'use client'

import { Photo } from '@mui/icons-material';
import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
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

const subcategoryMapping: Record<string, string[]> = {
  "Dụng cụ y tế": [
    "Máy đo đường huyết",
    "Nhiệt kế",
    "Máy đo huyết áp",
    "Khẩu trang",
    "Dụng cụ vệ sinh mũi",
    "Khác",
  ],
  "Chăm sóc cá nhân": [
    "Chăm sóc răng miệng",
    "Vệ sinh cá nhân",
  ],
  "Thực phẩm chức năng": [
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
  "Thuốc": [
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
}

const origins = ["Mĩ", "Anh", "Pháp", "New Zealand", "Nhật Bản", "Ý", "Việt Nam", "Thái Lan", "Hàn Quốc", "Thụy Sĩ", "Úc", "Singapore"]

function Update() {
  const [subCategories, setSubCategories] = useState<string[]>([])
  const [image, setImage] = useState<string>('')
  const [product, setProduct] = useState<Product | null>(null)

  const { id } = useParams()

  const router = useRouter()

  const [formData, setFormData] = useState({
    img: '',
    name: '',
    price: '',
    unit: '',
    category: '',
    sub_category: '',
    brand: '',
    origin: '',
    dosage: '',
    alert: '',
    preserve: '',
    ingredient: '',
    specifications: '',
    uses: ''
  })

  useEffect(() => {
    if (!id) return

    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((response) => {
        setProduct(response.data)
        setFormData(response.data)
      })
      .catch((error) => error.log("Error: ", error))
  }, [id])

  useEffect(() => {
    if (!product?.image) return

    setImage(product?.image)
  }, [product?.image])

  useEffect(() => {
    const subcates = subcategoryMapping[formData.category] || []
    setSubCategories(subcates)
  }, [formData.category])

  const handleUpdateImage = (url: string) => {
    if (!url || url == '') return

    else {
      setImage(url)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.replace(/\r?\n/g, '\n') })
  }

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Loại bỏ tất cả ký tự không phải số
    const rawValue = e.target.value.replace(/\D/g, '')

    // Nếu giá trị rỗng, giữ nguyên ''
    if (!rawValue) {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: ''
      }));
      return;
    }

    // Chuyển thành số và format theo 'de-DE'
    const formattedValue = parseInt(rawValue, 10).toLocaleString('de-DE');

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: formattedValue
    }));
  };


  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, unit: e.target.value })
  }

  const handleSelectOriginChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, origin: e.target.value })
  }

  const handleSelectCategoryChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, category: e.target.value })
  }

  const handleSelectSubCategoryChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, sub_category: e.target.value })
  }

  const handleSubmit = () => {
    axios
      .put(`http://localhost:3001/products/${id}`, {
        image: formData.img,
        name: formData.name,
        price: formData.price,
        unit: formData.unit,
        category: formData.category,
        sub_category: formData.sub_category,
        brand: formData.brand,
        origin: formData.origin,
        dosage: formData.dosage,
        alert: formData.alert,
        preserve: formData.preserve,
        ingredient: formData.ingredient,
        specifications: formData.specifications,
        uses: formData.uses
      })
      .then((response) => {
        console.log("Đã update: ", response.data)

        alert('Đã lưu thông tin cập nhật thành công!')
      })
      .catch((error) => console.error("Error: ", error))
  }

  const handleUndo = () => {
    router.back()
  }

  
  return (
    <Box sx={{ backgroundColor: "#F7F7F7", paddingX: { xs: 2, md: 12 }, py: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, color: '#2D336B' }}>
        <Typography sx={{ cursor: 'pointer' }}>Trang chủ / </Typography>
        <Typography sx={{ cursor: 'pointer' }}>Tạo sản phẩm mới </Typography>
      </Box>

      <Box sx={{ backgroundColor: 'white', padding: { xs: 4, md: 5 }, my: { xs: 2, md: 5 }, borderRadius: 4, display: 'flex', gap: 3, }}>
        <Box sx={{ display: 'flex', gap: 3, p: 0, m: 0, width: "100%" }}>
          <Box sx={{ width: '60%', gap: 2, }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ width: '25%' }}>Tên sản phẩm: </Typography>
              <TextField
                fullWidth
                placeholder='Tên sản phẩm'
                variant='outlined'
                name='name'
                value={formData.name}
                onChange={handleChange}
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
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ width: '43.75%' }}>Thương hiệu: </Typography>
              <TextField
                fullWidth
                placeholder='Tên thương hiệu'
                variant='outlined'
                name='brand'
                value={formData.brand}
                onChange={handleChange}
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
                }}
              />

              <Typography sx={{ width: '20%', ml: 2 }}>Xuất xứ: </Typography>
              <FormControl sx={{ minWidth: 120, mb: 1.75 }}>
                <Select
                  value={formData.origin || "Xuất xứ"}
                  onChange={handleSelectOriginChange}
                  displayEmpty
                  fullWidth
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    height: '56px', // Đảm bảo chiều cao giống TextField
                    '& .MuiOutlinedInput-root': {
                      height: '56px',
                      display: 'flex',
                      flex: 1,
                      alignItems: 'center',
                    },
                    '& .MuiSelect-select': {
                      display: 'flex',
                      alignItems: 'center',
                    }
                  }}
                >
                  <MenuItem disabled value="Xuất xứ">
                    <em>Xuất xứ</em>
                  </MenuItem>
                  {origins.map((origin, index) => (
                    <MenuItem key={index} value={origin}>{origin}</MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ width: '43.75%' }}>Giá: </Typography>
              <TextField
                fullWidth
                placeholder='Giá viết liền không dấu phân cách'
                variant='outlined'
                name='price'
                value={formData.price}
                onChange={handleChangePrice}
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
                }}
              />

              <Typography sx={{ width: '20%', ml: 2 }}>Đơn vị: </Typography>
              <FormControl sx={{ minWidth: 120, height: '56px', mb: 1.75 }}>
                <Select
                  value={formData.unit || 'Đơn vị'}
                  onChange={handleSelectChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    height: '56px', // Đảm bảo chiều cao giống TextField
                    '& .MuiOutlinedInput-root': {
                      height: '56px',
                      display: 'flex',
                      alignItems: 'center',
                    },
                    '& .MuiSelect-select': {
                      display: 'flex',
                      alignItems: 'center',
                    }
                  }}
                >
                  <MenuItem disabled value="Đơn vị">
                    <em>Đơn vị</em>
                  </MenuItem>
                  <MenuItem value={'Hộp'}>Hộp</MenuItem>
                  <MenuItem value={'Viên'}>Viên</MenuItem>
                  <MenuItem value={'Chai'}>Chai</MenuItem>
                  <MenuItem value={'Gói'}>Gói</MenuItem>
                  <MenuItem value={'Tuýp'}>Tuýp</MenuItem>
                </Select>
              </FormControl>

            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ width: '20%' }}>Phân loại: </Typography>
              <FormControl sx={{ width: '80%', height: '56px', mb: 1.75 }}>
                <Select
                  value={formData.category || "Phân loại"}
                  onChange={handleSelectCategoryChange}
                  displayEmpty
                  fullWidth
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    height: '56px', // Đảm bảo chiều cao giống TextField
                    '& .MuiOutlinedInput-root': {
                      height: '56px',
                      display: 'flex',
                      flex: 1,
                      alignItems: 'center',
                    },
                    '& .MuiSelect-select': {
                      display: 'flex',
                      alignItems: 'center',
                    }
                  }}
                >
                  <MenuItem disabled value="Phân loại">
                    <em>Phân loại</em>
                  </MenuItem>
                  <MenuItem value={'Thuốc'}>Thuốc</MenuItem>
                  <MenuItem value={'Thực phẩm chức năng'}>Thực phẩm chức năng</MenuItem>
                  <MenuItem value={'Dụng cụ y tế'}>Dụng cụ y tế</MenuItem>
                  <MenuItem value={'Chăm sóc cá nhân'}>Chăm sóc cá nhân</MenuItem>
                </Select>
              </FormControl>

            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ width: '20%' }}>Phân loại con: </Typography>
              <FormControl sx={{ width: '80%', height: '56px', mb: 1.75 }}>
                <Select
                  value={formData.sub_category || "Phân loại con"}
                  onChange={handleSelectSubCategoryChange}
                  displayEmpty
                  fullWidth
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    height: '56px', // Đảm bảo chiều cao giống TextField
                    '& .MuiOutlinedInput-root': {
                      height: '56px',
                      display: 'flex',
                      flex: 1,
                      alignItems: 'center',
                    },
                    '& .MuiSelect-select': {
                      display: 'flex',
                      alignItems: 'center',
                    }
                  }}
                >
                  <MenuItem disabled value="Phân loại con">
                    <em>Phân loại con</em>
                  </MenuItem>
                  {subCategories.map((sub, index) => (
                    <MenuItem key={index} value={sub}>{sub}</MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Box>


            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ width: '25%' }}>Qui cách: </Typography>
              <TextField
                fullWidth
                placeholder='Qui cách sản phẩm'
                variant='outlined'
                name='specifications'
                value={formData.specifications}
                onChange={handleChange}
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
                }}
              />
            </Box>


            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ width: '25%' }}>Liều lượng/ cách dùng: </Typography>

              <TextField
                placeholder="Liều lượng/ Cách dùng"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
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


            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <Typography sx={{ width: '25%' }}>Công dụng: </Typography>

              <TextField
                placeholder="Công dụng"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                name="uses"
                value={formData.uses}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
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


            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <Typography sx={{ width: '25%' }}>Thành phần: </Typography>

              <TextField
                placeholder="Thành phần (có thể nhập url ảnh thành phần)"
                variant="outlined"
                multiline
                rows={2}
                fullWidth
                name="ingredient"
                value={formData.ingredient}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
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


            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <Typography sx={{ width: '25%' }}>Lưu ý: </Typography>

              <TextField
                placeholder="Lưu ý"
                variant="outlined"
                multiline
                rows={2}
                fullWidth
                name="alert"
                value={formData.alert}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
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

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <Typography sx={{ width: '25%' }}>Bảo quản: </Typography>

              <TextField
                placeholder="Bảo quản"
                variant="outlined"
                multiline
                rows={2}
                fullWidth
                name="preserve"
                value={formData.preserve}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
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


          </Box>

          <Box sx={{ width: '40%' }}>
            <Box sx={{ p: 2, border: '1px solid #344CB7', borderRadius: 4 }}>
              <Typography sx={{ p: 1 }}> Ảnh sản phẩm: </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                <TextField
                  placeholder='Url hình ảnh'
                  variant='outlined'
                  name='img'
                  value={formData.img}
                  onChange={handleChange}
                  sx={{
                    flexGrow: 1,
                    '& .MuiOutlinedInput-root': {
                      gap: 2,
                      px: 1,
                      borderTopLeftRadius: '30px',
                      borderBottomLeftRadius: '30px',
                      '&:hover fieldset': {
                        borderColor: '#96C9F4',
                        borderWidth: 4
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#96C9F4',
                        borderWidth: 4
                      }
                    },
                  }}
                />
                <Box onClick={() => handleUpdateImage(formData.img)} sx={{ height: '56px', color: 'white', justifyContent: 'center', backgroundColor: '#4D55CC', borderTopRightRadius: '30px', borderBottomRightRadius: '30px', display: 'flex', alignItems: 'center', p: 2, cursor: 'pointer' }}>
                  Thêm
                </Box>
              </Box>

              <Typography sx={{ p: 1, fontSize: '14px', color: '#5E686D' }}> * Lưu ý: Nên chọn ảnh có tỉ lệ w : h ~ 3 : 2 hoặc gần với hình vuông. </Typography>

              <Box sx={{ mt: 2, width: '100%', minHeight: '250px', border: '2px dashed #344CB7', borderRadius: 4, padding: 2, justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {image === '' ? (
                  <Photo sx={{ fontSize: '56px', color: '#7886C7' }} />
                )
                  : (
                    <img style={{ borderRadius: 8 }} src={image} alt='Image' width='100%' />
                  )
                }

              </Box>

            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
        <Box sx={{ flex: 1 }} />
        <Button onClick={() => handleUndo()} sx={{ backgroundColor: '#FFCC70', color: 'black', px: 4, pt: 1, borderRadius: 2, display: 'flex', alignItems: 'center' }}> Hủy </Button>
        <Button onClick={() => handleSubmit()} sx={{ backgroundColor: '#4C3BCF', color: 'white', px: 4, pt: 1, borderRadius: 2, display: 'flex', alignItems: 'center' }}> Lưu </Button>
      </Box>



    </Box>
  )
}

export default Update