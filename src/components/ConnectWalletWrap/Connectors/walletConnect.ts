import { initializeConnector } from '@web3-react/core';
import { WalletConnect } from '@web3-react/walletconnect';

import { URLS } from '_components/ConnectWalletWrap/chains';

export const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
  (actions) => new WalletConnect({ actions, options: { rpc: URLS } }),
);
