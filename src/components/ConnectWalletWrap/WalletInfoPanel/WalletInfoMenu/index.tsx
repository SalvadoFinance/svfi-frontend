import React from 'react';
import { useWeb3React } from '@web3-react/core';

const WalletInfoMenu = () => {
  const { isActive, chainId, account, connector, provider } = useWeb3React();

  return <div>Menu</div>;
};

export default WalletInfoMenu;
