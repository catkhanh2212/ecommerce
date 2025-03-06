'use client'

import { ExpandMore, LocalHospital, MailOutline, PhoneOutlined } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

const categoryMapping: Record<string, string> = {
    'thuc-pham-chuc-nang': 'Thực phẩm chức năng',
    'thuoc': 'Thuốc',
    'dung-cu-y-te': 'Dụng cụ y tế',
    'cham-soc-ca-nhan': 'Chăm sóc cá nhân'
}

const categoryData: Record<string, string[]> = {
    'Thuốc': ['Kháng sinh', 'Hạ sốt - giảm đau - chống viêm', 'Dị ứng', 'Trị ho', 'Tiêu hóa', 'Huyết áp tim mạch', 'Gan', 'Xương khớp', 'Thuốc nhỏ mắt'],
    'Thực phẩm chức năng': ['Dành cho trẻ em', 'Chăm sóc sắc đẹp', 'Hỗ trợ tim mạch', 'Hỗ trợ tiêu hóa', 'Nhóm mắt - tai - mũi', 'Vitamin và khoáng chất', 'Hỗ trợ sinh lý', 'Nhóm thần kinh', 'Giảm cân'],
    'Dụng cụ y tế': ['Máy đo đường huyết', 'Nhiệt kế', 'Máy đo huyết áp', 'Khẩu trang', 'Dụng cụ vệ sinh mũi', 'Khác'],
    'Chăm sóc cá nhân': ['Chăm sóc răng miệng', 'Vệ sinh cá nhân']
}

function Footer() {
    const router = useRouter()

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
    return (
        <Box sx={{ py: 3, px: { xs: 2, md: 16 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#5272F2', gap: 1 }}>
                <LocalHospital sx={{ fontSize: '32px' }} />
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}> giakhanh.vn </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, mt: 1, mb: 3 }}>
                <Typography sx={{ color: '#5272F2' }}>giakhanh.vn </Typography>
                <Typography sx={{ color: '#4C585B' }}>là website thuộc sở hữu của Nhà thuốc Gia Khánh.</Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' }, mt: { xs: 2, md: 0 } }}>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', width: '30%' }}>
                    <Typography sx={{ color: '#4C585B', fontWeight: 'bold', mb: 1 }}>NHÀ THUỐC TÂY GIA KHÁNH</Typography>
                    <Typography sx={{ color: '#61677A', fontWeight: 'bold' }}>Địa chỉ:</Typography>
                    <Typography sx={{ color: '#61677A' }}>356, Lạc Long Quân, phường 4, thành phố Tây Ninh, tỉnh Tây Ninh.</Typography>

                    <Typography sx={{ color: '#61677A', fontWeight: 'bold' }}>Số Chứng Nhận ĐKKD:</Typography>
                    <Typography sx={{ color: '#61677A' }}>0314758651, Cấp Ngày 29/11/2017, Tại Sở Kế Hoạch Và Đầu Tư Thành Phố Hồ Chí Minh.</Typography>

                    <Typography sx={{ color: '#61677A', fontWeight: 'bold' }}>Số Giấy Phép Sàn Thương Mại Điện Tử:</Typography>
                    <Typography sx={{ color: '#61677A' }}>0314758651/KD-1016</Typography>

                    <Typography sx={{ color: '#4C585B', fontWeight: 'bold', mt: 3 }}>LIÊN HỆ</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1, color: '#5272F2' }}>
                        <MailOutline />
                        <Typography> bsnguyenthinh@gmail.com </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1, color: '#5272F2' }}>
                        <PhoneOutlined />
                        <Typography> 0944 226 993 </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', color: '#5272F2', width: { xs: '100%', md: '50%' } }}>
                    <Typography sx={{ color: '#4C585B', fontWeight: 'bold', mb: 1 }}>DANH MỤC</Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'flex-start', gap: 2, }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography onClick={() => handleCategoryClick("Thuốc")} sx={{ fontWeight: 'bold', cursor: 'pointer' }}>Thuốc:</Typography>
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
                            <Typography onClick={() => handleCategoryClick("Thực phẩm chức năng")} sx={{ fontWeight: 'bold', cursor: 'pointer' }}>Thực phẩm chức năng:</Typography>
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
                            <Typography onClick={() => handleCategoryClick("Dụng cụ y tế")} sx={{ fontWeight: 'bold', cursor: 'pointer' }}>Dụng cụ y tế:</Typography>
                            <Typography onClick={() => handleSubCategoryClick("Dụng cụ y tế", "Máy đo đường huyết")} sx={{ cursor: 'pointer' }}>Máy đo đường huyết</Typography>
                            <Typography onClick={() => handleSubCategoryClick("Dụng cụ y tế", "Nhiệt kế")} sx={{ cursor: 'pointer' }}>Nhiệt kế</Typography>
                            <Typography onClick={() => handleSubCategoryClick("Dụng cụ y tế", "Máy đo huyết áp")} sx={{ cursor: 'pointer' }}>Máy đo huyết áp</Typography>
                            <Typography onClick={() => handleSubCategoryClick("Dụng cụ y tế", "Khẩu trang")} sx={{ cursor: 'pointer' }}>Khẩu trang</Typography>
                            <Typography onClick={() => handleSubCategoryClick("Dụng cụ y tế", "Dụng cụ vệ sinh mũi")} sx={{ cursor: 'pointer' }}>Dụng cụ vệ sinh mũi</Typography>
                            <Typography onClick={() => handleSubCategoryClick("Dụng cụ y tế", "Khác")} sx={{ cursor: 'pointer' }}>Khác</Typography>

                            <Typography onClick={() => handleCategoryClick("Chăm sóc cá nhân")} sx={{ fontWeight: 'bold', mt: 1 }}>Chăm sóc cá nhân:</Typography>
                            <Typography onClick={() => handleSubCategoryClick("Chăm sóc cá nhân", "Chăm sóc răng miệng")} sx={{ cursor: 'pointer' }}>Chăm sóc răng miệng</Typography>
                            <Typography onClick={() => handleSubCategoryClick("Chăm sóc cá nhân", "Vệ sinh cá nân")} sx={{ cursor: 'pointer' }}>Vệ sinh cá nhân</Typography>
                        </Box>

                    </Box>

                    {Object.entries(categoryData).map(([category, subCategories]) => (
                        <Accordion disableGutters key={category} sx={{ display: {xs: 'block', md: 'none'},  boxShadow: 'none' }}>
                            <AccordionSummary expandIcon={<ExpandMore />} sx={{ fontWeight: 'bold', cursor: 'pointer', borderRadius: 4, }}>
                                <Typography onClick={() => handleCategoryClick(category)} sx={{ color: '#5272F2', fontWeight: '600' }}> {category} </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {subCategories.map((subCategory) => (
                                    <Typography key={subCategory} sx={{ cursor: 'pointer', pl: 2, py: 0.5, color: '#5272F2' }} onClick={() => handleSubCategoryClick(category, subCategory)}>
                                        {subCategory}
                                    </Typography>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}

                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', md: '20%' } }}>
                    <Typography sx={{ color: '#4C585B', fontWeight: 'bold', mb: 1 }}>TÌM HIỂU THÊM</Typography>
                    <Typography sx={{ fontWeight: 'bold', color: '#5272F2' }}>Góc sức khỏe</Typography>

                    <Typography sx={{ color: '#4C585B', fontWeight: 'bold', mt: 3 }}>KẾT NỐI VỚI CHÚNG TÔI</Typography>
                    <Box
                        sx={{
                            backgroundImage: 'url(/zalo.png)',
                            height: '20px',
                            width: 'auto',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            mt: 1
                        }}
                    />


                </Box>


                <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', width: '100%' }}>
                    <Typography sx={{ color: '#4C585B', fontWeight: 'bold', mb: 1 }}>NHÀ THUỐC TÂY GIA KHÁNH</Typography>
                    <Typography sx={{ color: '#61677A', fontWeight: 'bold' }}>Địa chỉ:</Typography>
                    <Typography sx={{ color: '#61677A' }}>356, Lạc Long Quân, phường 4, thành phố Tây Ninh, tỉnh Tây Ninh.</Typography>

                    <Typography sx={{ color: '#61677A', fontWeight: 'bold' }}>Số Chứng Nhận ĐKKD:</Typography>
                    <Typography sx={{ color: '#61677A' }}>0314758651, Cấp Ngày 29/11/2017, Tại Sở Kế Hoạch Và Đầu Tư Thành Phố Hồ Chí Minh.</Typography>

                    <Typography sx={{ color: '#61677A', fontWeight: 'bold' }}>Số Giấy Phép Sàn Thương Mại Điện Tử:</Typography>
                    <Typography sx={{ color: '#61677A' }}>0314758651/KD-1016</Typography>

                    <Typography sx={{ color: '#4C585B', fontWeight: 'bold', mt: 3 }}>LIÊN HỆ</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1, color: '#5272F2' }}>
                        <MailOutline />
                        <Typography> bsnguyenthinh@gmail.com </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1, color: '#5272F2' }}>
                        <PhoneOutlined />
                        <Typography> 0944 226 993 </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}

export default Footer