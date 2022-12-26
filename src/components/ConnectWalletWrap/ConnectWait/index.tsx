import React from 'react';
import { Box, SvgIcon, Typography } from '@mui/material';

import MetamaskSVG from '_src/assets/icons/walletMetamask.svg';
import OkxSVG from '_src/assets/icons/walletOKX.svg';

type IConnectWait = { walletName: string };

const ConnectWait: React.FC<IConnectWait> = ({ walletName }) => {
  return (
    <Box textAlign="center">
      {walletName === 'MetaMask' && <SvgIcon sx={{ width: 41, height: 38 }} component={MetamaskSVG} inheritViewBox />}
      {walletName === 'OkxWallet' && <SvgIcon sx={{ width: 41, height: 38 }} component={OkxSVG} inheritViewBox />}
      <Typography mt={3} mb={5}>
        Connecting ...
      </Typography>
      <Typography fontSize={16} fontWeight={600}>
        {`Wating for confirmation from ${walletName}`}
      </Typography>
    </Box>
  );
};

export default ConnectWait;
