import React, { useMemo } from 'react';
import { Connector } from '@web3-react/types';
import { Web3ReactProvider, Web3ReactHooks } from '@web3-react/core';

import { Connection } from './Connectors';
import useEagerlyConnect from './useEagerlyConnect';
import { CONNECTIONS, getConnectionName } from './utils';

const Web3Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  useEagerlyConnect();
  const connectors: [Connector, Web3ReactHooks][] = CONNECTIONS.map(({ hooks, connector }) => [connector, hooks]);

  const key = useMemo(
    () => CONNECTIONS.map(({ type }: Connection) => getConnectionName(type)).join('-'),
    [CONNECTIONS],
  );

  return (
    <Web3ReactProvider connectors={connectors} key={key}>
      {children}
    </Web3ReactProvider>
  );
};

export default Web3Provider;
