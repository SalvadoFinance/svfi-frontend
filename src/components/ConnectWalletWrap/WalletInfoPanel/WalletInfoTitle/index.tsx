import React, { useMemo } from 'react';
import { Avatar, Box } from '@mui/material';
import { useWeb3React } from '@web3-react/core';

const WalletInfoTitle = () => {
  const { account } = useWeb3React();

  return (
    <Box
      display="flex"
      alignItems="center"
      style={{
        userSelect: 'none',
        background: 'rgba(250, 196, 6, 0.1)',
        borderRadius: '40px',
        padding: '0 16px',
        height: '32px',
      }}
    >
      <Avatar sx={{ width: '24px', height: '24px', marginRight: '8px' }} />
      <span style={{ fontSize: '16px' }}>{`${String(account).slice(0, 5)}...${String(account).slice(-4)}`}</span>
    </Box>
  );
};

export default WalletInfoTitle;
