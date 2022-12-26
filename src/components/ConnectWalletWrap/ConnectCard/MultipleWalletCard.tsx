import React, { Fragment, useCallback } from 'react';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, SvgIcon, Typography } from '@mui/material';
import { Web3ReactHooks } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import { MetaMask } from '@web3-react/metamask';
import { OKX } from '../OtherWallet/OkProvider';

import { WalletConnect } from '@web3-react/walletconnect';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';

import { useImmerModal } from '_src/hooks';
import ConnectWait from '../ConnectWait';
import CloseSVG from '_src/assets/icons/close.svg';
import { getConnection, getConnectorName } from '../utils';

type TypeConnector = MetaMask | WalletConnect | CoinbaseWallet | OKX;

type IMultipleWalletCard = {
  onConnected: () => void;
  icon: any;
  name: string;
  connector: TypeConnector;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
};

const MultipleWalletCard: React.FC<IMultipleWalletCard> = ({
  onConnected,
  isActive,
  isActivating,
  icon,
  name,
  connector,
}) => {
  const [modalState, handleToggleModalQrcode] = useImmerModal({ wait: false });

  const handleOnClickConnector = useCallback(async (connector: Connector) => {
    const connectionType = getConnection(connector).type;

    if (
      connector instanceof MetaMask ||
      connector instanceof OKX ||
      connector instanceof CoinbaseWallet ||
      connector instanceof WalletConnect
    ) {
      try {
        handleToggleModalQrcode('wait', true);
        await connector.activate();
        localStorage.setItem('wallet_current', connectionType);
        onConnected();
      } catch (error: any) {
        handleToggleModalQrcode('wait', false);
      }
      return;
    }
  }, []);

  return (
    <Fragment>
      <Box
        id="wallet-connect-Metamask"
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: 3,
          height: 72,
          px: 4,
          borderRadius: 2.5,
          backgroundColor: '#F7F7F8',
          cursor: 'pointer',
          ':hover': { backgroundColor: '#F7F4FD' },
        }}
        onClick={() => {
          handleOnClickConnector(connector);
        }}
      >
        <SvgIcon sx={{ width: 41, height: 38 }} component={icon} inheritViewBox />
        <Typography fontSize={16} fontWeight={600}>
          {name}
        </Typography>
      </Box>
      <Dialog
        PaperProps={{ sx: { borderRadius: 3 } }}
        open={modalState.wait}
        onClose={() => handleToggleModalQrcode('wait', false)}
      >
        <DialogTitle sx={{ py: 5, fontSize: 24, fontWeight: 700, textAlign: 'center' }}>Connect Wallet</DialogTitle>
        <DialogContent sx={{ width: 512, pb: 7 }}>
          <ConnectWait walletName={getConnectorName(connector)} />
          <Box position="absolute" top={16} right={16}>
            <IconButton onClick={() => handleToggleModalQrcode('wait', false)}>
              <SvgIcon sx={{ fontSize: 18 }} component={CloseSVG} inheritViewBox />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

MultipleWalletCard.defaultProps = {
  onConnected: () => {},
};

export default MultipleWalletCard;
