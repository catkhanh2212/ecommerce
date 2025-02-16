import { Box, Typography } from '@mui/material'
import React from 'react'

interface SectionTitleProps {
    title: string
}

const SectionTitle: React.FC<SectionTitleProps> = ({title}) => {
  return (
    <Box>
        <Typography sx={{fontWeight: 'bold', color: '#0A5EB0', fontSize: '16px'}}>{title}</Typography>

        <Box sx={{ flexGrow: 1, height: '2px', backgroundColor: '#F5F5F5', position: 'relative'}}>
            <Box
                sx={{
                    position: 'absolute',
                    left: 0,
                    width: '190px',
                    height: '2px',
                    backgroundColor: '#0A5EB0'
                }}
            />
        </Box>
    </Box>
  )
}

export default SectionTitle