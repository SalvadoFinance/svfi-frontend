import React, { Fragment, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, SvgIcon } from '@mui/material';

import WalletInfoPanel from '_components/ConnectWalletWrap/WalletInfoPanel';
import ConnectCard from '../ConnectCard';
import { useImmerModal } from '_src/hooks';
import CloseSVG from '_src/assets/icons/close.svg';
import { SUPPORT_CHAINIDS } from '_src/constants/chainInfo';
import { switchNetwork } from '../switchNetwork';

type ConnectWalletProps = { isMobile: boolean };
const ConnectWallet: React.FC<ConnectWalletProps> = ({ isMobile }) => {
  const { isActive, connector, chainId } = useWeb3React();

  const [modalState, handleToggleModalQrcode] = useImmerModal({ list: false });
  const isSupport = useMemo(() => {
    if (!chainId) return true;
    return SUPPORT_CHAINIDS.includes(String(chainId));
  }, [chainId]);

  const _switchNetwork = (chainId: number) => {
    if (connector.provider) {
      switchNetwork(connector.provider, chainId);
    }
  };

  const handleClick = () => {
    if (isActive && !isSupport) {
      _switchNetwork(Number(SUPPORT_CHAINIDS[0]));
    } else {
      handleToggleModalQrcode('list', true);
    }
  };

  return (
    <>
      {isActive && isSupport ? (
        <WalletInfoPanel />
      ) : (
        <Button
          size={isMobile ? 'small' : 'medium'}
          disableElevation
          variant="contained"
          sx={{
            fontWeight: 500,
            color: '#000',
            borderRadius: 6,
          }}
          onClick={handleClick}
        >
          {isMobile ? 'Connect' : 'Connect Wallet'}
        </Button>
      )}
      <Dialog
        PaperProps={{ sx: { borderRadius: 3 } }}
        open={modalState.list}
        onClose={() => handleToggleModalQrcode('list', false)}
      >
        <DialogTitle sx={{ py: 5, fontSize: 24, fontWeight: 700, textAlign: 'center' }}>Connect Wallet</DialogTitle>
        <DialogContent sx={{ width: 512, pb: 7 }}>
          <Box display="flex" flexDirection="column" rowGap={2}>
            {ConnectCard.map((walletCard, index) => {
              return (
                <Fragment key={index}>
                  {walletCard({
                    onClose: () => {
                      handleToggleModalQrcode('list', false);
                    },
                  })}
                </Fragment>
              );
            })}
          </Box>
          <Box position="absolute" top={16} right={16}>
            <IconButton onClick={() => handleToggleModalQrcode('list', false)}>
              <SvgIcon sx={{ fontSize: 18 }} component={CloseSVG} inheritViewBox />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConnectWallet;
