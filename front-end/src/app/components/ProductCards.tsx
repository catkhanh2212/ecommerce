import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

interface ProductCard {
	id: number,
	name: string,
	price: string,
	image: string,
}

interface ProductCardProps {
	productCards: ProductCard[]
}

const ProductCard: React.FC<ProductCardProps> = ({ productCards }) => {
	return (
		<Box display='grid' gridTemplateColumns='repeat(5, 1fr)' gap='16px' sx={{mt: 3}}>
			{productCards.map((product) => (
				<Card key={product.id} sx={{ cursor: 'pointer', position: 'relative' }}>
					<CardMedia component='img' height='350' image={product.image} />
					<CardContent>
						<Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>{product.name}</Typography>
                        <Typography sx={{ color: '#E195AB',  fontWeight: 'bold' }}>{product.price}</Typography>
					</CardContent>
				</Card>
			))}
		</Box>
	)
}

export default ProductCard