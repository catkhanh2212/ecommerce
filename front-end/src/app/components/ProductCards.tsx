'use client'

import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
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
	const router = useRouter()

	const handleClickProduct = (id: number) => {
		router.push(`/product/${id}`)
	}

	return (
		<Box
			display='grid'
			gridTemplateColumns={{
				xs: "repeat(2, 1fr)",
				sm: "repeat(3, 1fr)",
				md: "repeat(5, 1fr)"  
			}}
			gap='16px'
			sx={{ mt: 3 }}>
			{productCards.map((product) => (
				<Card key={product.id} onClick={() => handleClickProduct(product.id)} sx={{ cursor: 'pointer', position: 'relative' }}>
					<CardMedia component='img' width='350' image={product.image} />
					<CardContent>
						<Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>{product.name}</Typography>
						<Typography sx={{ color: '#E195AB', fontWeight: 'bold' }}>{product.price}</Typography>
					</CardContent>
				</Card>
			))}
		</Box>
	)
}

export default ProductCard