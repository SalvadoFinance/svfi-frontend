import React from 'react';
import { Box, Typography } from '@mui/material';

interface ITokenName {
  data: { image: string; name?: string; symbol: string };
}

const TokenName: React.FC<ITokenName> = ({ data }) => {
  return (
    <Box display="flex" alignItems="center">
      <img
        src={data.image}
        style={{ width: '24px', height: '24px', objectFit: 'cover', borderRadius: '24px', marginRight: '8px' }}
      />
      <Box>
        <Typography
          sx={{ fontSize: '18px', fontWeight: '500', lineHeight: 0, fontFamily: 'HarmonyOS Sans', color: '#333' }}
          style={{ textTransform: 'uppercase' }}
        >
          {data.symbol}
        </Typography>
        {data?.name && (
          <Typography
            mb="4px"
            sx={{
              fontSize: '14px',
              marginTop: '24px',
              fontWeight: '400',
              lineHeight: 0,
              fontFamily: 'HarmonyOS Sans',
              color: '#999',
            }}
          >
            {data.name}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default TokenName;
