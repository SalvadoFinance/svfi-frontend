import React from 'react';
import { Box, Typography } from '@mui/material';

interface IInvestInfo {
  data?: { label: string; value: string }[];
}

const InvestInfo: React.FC<IInvestInfo> = ({ data }) => {
  return (
    data.length > 0 && (
      <Box display="flex" alignItems="center" justifyContent="space-between">
        {data.map((item, index) => (
          <Box key={index}>
            <Typography
              mb="4px"
              sx={{ fontSize: '14px', fontWeight: '500', fontFamily: 'HarmonyOS Sans', color: '#999' }}
            >
              {item.label}
            </Typography>
            <Typography sx={{ fontSize: '20px', fontWeight: '500', fontFamily: 'Inter', color: '#000' }}>
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    )
  );
};

export default InvestInfo;
