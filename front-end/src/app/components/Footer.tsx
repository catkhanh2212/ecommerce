import { LocalHospital, MailOutline, PhoneOutlined } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

function Footer() {
    return (
        <Box sx={{ py: 3, px: 16 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#5272F2', gap: 1 }}>
                <LocalHospital sx={{ fontSize: '32px' }} />
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}> giakhanh.vn </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mt: 1, mb: 3 }}>
                <Typography sx={{ color: '#5272F2' }}>giakhanh.vn </Typography>
                <Typography sx={{ color: '#4C585B' }}>là website thuộc sở hữu của Nhà thuốc Gia Khánh.</Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
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

                <Box sx={{ display: 'flex', flexDirection: 'column', color: '#5272F2', width: '50%' }}>
                    <Typography sx={{ color: '#4C585B', fontWeight: 'bold', mb: 1 }}>DANH MỤC</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2,  }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Thuốc:</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Kháng sinh</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Hạ sốt - giảm đau - chống viêm</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Chống dị ứng - Kháng histamin</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Kháng virus</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Thuốc ho</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Tiêu hóa</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Huyết áp tim mạch</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Gan</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Tránh thai, rối loạn kinh nguyệt</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Thực phẩm chức năng:</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Dành cho trẻ em</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Chăm sóc sắc đẹp</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Nhóm dạ dày</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Nhóm hô hấp</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Nhóm mắt - tai - mũi</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Vitamin và khoáng chất</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Hỗ trợ sinh lý</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Nhóm thần kinh</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Giảm cân</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Dụng cụ y tế:</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Máy đo đường huyết</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Nhiệt kế</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Máy xông khí dung</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Máy đo đường huyết</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Khẩu trang</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Khác</Typography>

                            <Typography sx={{ fontWeight: 'bold', mt: 1 }}>Chăm sóc cá nhân:</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Chăm sóc răng miệng</Typography>
                            <Typography sx={{ cursor: 'pointer' }}>Vệ sinh phụ nữ</Typography>
                        </Box>

                    </Box>

                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
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
            </Box>
        </Box>

    )
}

export default Footer