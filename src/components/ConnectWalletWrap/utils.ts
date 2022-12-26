import { Connector } from '@web3-react/types';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import {
  coinbaseWalletConnection,
  ConnectionType,
  metaMaskConnection,
  okxConnection,
  walletConnectConnection,
} from './Connectors';
import { OKX } from './OtherWallet/OkProvider';

export const CONNECTIONS = [metaMaskConnection, okxConnection, coinbaseWalletConnection, walletConnectConnection];

export const getConnectorName = (connector: Connector) => {
  if (connector instanceof MetaMask) return 'MetaMask';
  if (connector instanceof WalletConnect) return 'WalletConnect';
  if (connector instanceof CoinbaseWallet) return 'CoinbaseWallet';
  if (connector instanceof OKX) return 'OkxWallet';

  return 'Unknown';
};

export function getConnectionName(connectionType: ConnectionType, isMetaMask?: boolean) {
  switch (connectionType) {
    case ConnectionType.METAMASK:
      return 'MetaMask';
    case ConnectionType.COINBASE_WALLET:
      return 'Coinbase Wallet';
    case ConnectionType.WALLET_CONNECT:
      return 'WalletConnect';
  }
}

export function getConnection(c: Connector | ConnectionType) {
  if (c instanceof Connector) {
    const connection = CONNECTIONS.find((connection) => connection.connector === c);
    if (!connection) {
      throw Error('unsupported connector');
    }
    return connection;
  } else {
    switch (c) {
      case ConnectionType.METAMASK:
        return metaMaskConnection;
      case ConnectionType.COINBASE_WALLET:
        return coinbaseWalletConnection;
      case ConnectionType.WALLET_CONNECT:
        return walletConnectConnection;
      case ConnectionType.OKX:
        return okxConnection;
    }
  }
}
