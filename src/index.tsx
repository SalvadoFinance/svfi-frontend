import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';

import Routes from './routes';
import customTheme from '_constants/theme';
import { Web3Provider } from '_components/ConnectWalletWrap';
import { initChainStore } from './stores/ChainStore';

import '_assets/less/index.less';

const Root = () => {
  useEffect(() => {
    initChainStore();
  }, []);
  return (
    <React.StrictMode>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Web3Provider>
          <div className="app">
            <Routes />
          </div>
        </Web3Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
