import React, { useEffect, useMemo, useState } from 'react';
import { Drawer } from '@mui/material';

import { useImmerModal } from '_src/hooks/useImmerModal';
import WalletInfoTitle from './WalletInfoTitle';
import WalletInfoMenu from './WalletInfoMenu';

const WalletInfoPanel = () => {
  const [modalState, handleToggleModalQrcode] = useImmerModal({ drawer: false });

  const toggleInfoDrawer = () => {
    handleToggleModalQrcode('drawer', !modalState.drawer);
  };
  const handleClose = () => {
    handleToggleModalQrcode('drawer', false);
  };

  const [profileOpen, setProfileOpen] = useState(false);
  const toggleProfileOpen = () => setProfileOpen((oldVal) => !oldVal);

  return <WalletInfoTitle />;
  // return (
  //   <>
  //     <WalletInfoTitle toggleInfoDrawer={toggleInfoDrawer} />
  //     <Drawer
  //       anchor="right"
  //       open={modalState.drawer}
  //       onClose={toggleInfoDrawer}
  //       sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}
  //     >
  //       <WalletInfoMenu onClose={handleClose} />
  //     </Drawer>
  //   </>
  // );
};

export default WalletInfoPanel;
