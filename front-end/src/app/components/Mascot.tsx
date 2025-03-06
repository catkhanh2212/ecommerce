'use client'

import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

function Mascot() {
  const router = useRouter()

  const handleClickMascot = () => router.push('/blog')
  return (
    <Box
      onClick={() => handleClickMascot()}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20, 
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
    >
      <img src="/mascot.png" alt="mascot" width={100} height={100} />

    </Box>
  );
}

export default Mascot;
