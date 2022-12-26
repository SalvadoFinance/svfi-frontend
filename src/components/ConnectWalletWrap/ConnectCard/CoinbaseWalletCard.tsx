import React from 'react';

import { coinbaseWallet, coinbaseWalletHooks } from '../Connectors/coinbaseWallet';
import CoinbaseWalletSVG from '_src/assets/icons/walletCoinbase.svg';
import MultipleWalletCard from './MultipleWalletCard';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = coinbaseWalletHooks;

type ICoinbaseWalletCard = { onClose: () => void };

const CoinbaseWalletCard: React.FC<ICoinbaseWalletCard> = ({ onClose }) => {
  return (
    <MultipleWalletCard
      connector={coinbaseWallet}
      isActive={useIsActive()}
      isActivating={useIsActivating()}
      onConnected={onClose}
      icon={CoinbaseWalletSVG}
      name="Coinbase"
    />
  );
};

export default CoinbaseWalletCard;
