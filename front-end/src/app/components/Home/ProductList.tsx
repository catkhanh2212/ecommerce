import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

interface Product {
	id: number,
	name: string,
	oldPrice: string,
	newPrice: string,
	discount: string,
	image: string,
}

interface ProductListProps {
	products: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
	return (
		<Box display='grid' gridTemplateColumns='repeat(4, 1fr)' gap='16px'>
			{products.map((product) => (
				<Card key={product.id} sx={{ cursor: 'pointer', position: 'relative' }}>
					<Box sx={{position: 'absolute', right: 0, top: 0, p: 1, backgroundColor: '#F93827', color: 'white', borderBottomLeftRadius: '8px'}}>{product.discount}</Box>
					<CardMedia component='img' height='250' image={product.image} />
					<CardContent>
						<Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>{product.name}</Typography>
						<Box sx={{ display: 'flex', gap: 2 }}>
							<Typography sx={{ textDecoration: 'line-through', color: '#A6AEBF' }}>{product.oldPrice}</Typography>
							<Typography sx={{ color: '#E195AB'}}>{product.newPrice}</Typography>
						</Box>
					</CardContent>
				</Card>
			))}
		</Box>
	)
}

export default ProductList