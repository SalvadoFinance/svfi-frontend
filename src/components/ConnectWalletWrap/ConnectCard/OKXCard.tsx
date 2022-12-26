import React from 'react';

import { okx, okxkHooks } from '../Connectors/okx';
import OKXSVG from '_src/assets/icons/walletOKX.svg';
import MultipleWalletCard from './MultipleWalletCard';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = okxkHooks;

type IMetaMaskCard = { onClose: () => void };

const OKXCard: React.FC<IMetaMaskCard> = ({ onClose }) => {
  return (
    <MultipleWalletCard
      connector={okx}
      isActive={useIsActive()}
      isActivating={useIsActivating()}
      onConnected={async () => {
        onClose();
      }}
      icon={OKXSVG}
      name="OKXWallet"
    />
  );
};

export default OKXCard;
