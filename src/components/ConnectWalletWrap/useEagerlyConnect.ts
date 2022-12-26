import { useEffect } from 'react';
import { Connector } from '@web3-react/types';
import { Connection, ConnectionType } from './Connectors';
import { getConnection } from './utils';

async function connect(connector: Connector) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly();
    } else {
      await connector.activate();
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`);
  }
}

export default function useEagerlyConnect() {
  const selectedWallet = localStorage.getItem('wallet_current') as any;

  let selectedConnection: Connection | undefined;
  if (selectedWallet) {
    try {
      selectedConnection = getConnection(selectedWallet);
    } catch {
      localStorage.removeItem('wallet_current');
    }
  }
  useEffect(() => {
    if (selectedConnection) {
      connect(selectedConnection.connector);
    }
  }, []);
}
