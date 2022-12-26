import React from 'react';

import { walletConnect, walletConnectHooks } from '../Connectors/walletConnect';
import WalletConnectSVG from '_src/assets/icons/walletConnect.svg';
import MultipleWalletCard from './MultipleWalletCard';

type IWalletConnectCard = { onClose: () => void };

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = walletConnectHooks;

const WalletConnectCard: React.FC<IWalletConnectCard> = ({ onClose }) => {
  return (
    <MultipleWalletCard
      connector={walletConnect}
      isActive={useIsActive()}
      isActivating={useIsActivating()}
      onConnected={onClose}
      icon={WalletConnectSVG}
      name="WalletConnect"
    />
  );
};

export default WalletConnectCard;
