import React from 'react';

import { metaMask, web3NetworkHooks } from '../Connectors/metaMask';
import MetamaskSVG from '_src/assets/icons/walletMetamask.svg';
import MultipleWalletCard from './MultipleWalletCard';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = web3NetworkHooks;

type IMetaMaskCard = { onClose: () => void };

const MetaMaskCard: React.FC<IMetaMaskCard> = ({ onClose }) => {
  return (
    <MultipleWalletCard
      connector={metaMask}
      isActive={useIsActive()}
      isActivating={useIsActivating()}
      onConnected={async () => {
        onClose();
      }}
      icon={MetamaskSVG}
      name="Metamask"
    />
  );
};

export default MetaMaskCard;
