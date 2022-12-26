import { Web3ReactHooks } from '@web3-react/core';
import { Connector } from '@web3-react/types';

import { metaMask, web3NetworkHooks } from './metaMask';
import { coinbaseWallet, coinbaseWalletHooks } from './coinbaseWallet';
import { walletConnect, walletConnectHooks } from './walletConnect';
import { okx, okxkHooks } from './okx';

export enum ConnectionType {
  METAMASK = 'METAMASK',
  COINBASE_WALLET = 'COINBASE_WALLET',
  WALLET_CONNECT = 'WALLET_CONNECT',
  OKX = 'OKX_WALLET',
}

export interface Connection {
  connector: Connector;
  hooks: Web3ReactHooks;
  type: ConnectionType;
}

export const metaMaskConnection: Connection = {
  connector: metaMask,
  hooks: web3NetworkHooks,
  type: ConnectionType.METAMASK,
};

export const coinbaseWalletConnection: Connection = {
  connector: coinbaseWallet,
  hooks: coinbaseWalletHooks,
  type: ConnectionType.COINBASE_WALLET,
};

export const walletConnectConnection: Connection = {
  connector: walletConnect,
  hooks: walletConnectHooks,
  type: ConnectionType.WALLET_CONNECT,
};

export const okxConnection: Connection = {
  connector: okx,
  hooks: okxkHooks,
  type: ConnectionType.OKX,
};
