import ChainBscSVG from '_src/assets/icons/chain_bsc.svg';
import ChainEthSVG from '_src/assets/icons/chain_eth.svg';

export interface IContracts {
  POSITION_CONTROLLER_ADDRESS?: string;
  POSITION_REGISTRY_ADDRESS?: string;
  DCA_STRATEGY_ADDRESS?: string;
}

export interface INetworkItem {
  chainId: string;
  disabled: boolean;
  icon: SvgrComponent;
  blockExplorerUrls?: string[];
  chainName?: string;
  iconUrls?: string[];
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls?: string[];
  contracts?: IContracts;
}

export const isDev = process.env.NODE_ENV === 'development';

// 支持的网络
export const NETWORK: { [key: number]: INetworkItem } = {
  5: {
    chainId: '5',
    disabled: false,
    icon: ChainEthSVG,
    blockExplorerUrls: ['https://goerli.etherscan.io'],
    rpcUrls: ['https://goerli.infura.io/v3/'],
    chainName: 'Goerli Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    contracts: {
      POSITION_CONTROLLER_ADDRESS: '0xAc9e4DB131DF8CBed7461125B21de6e2E192928A',
      POSITION_REGISTRY_ADDRESS: '0xa100913ae060aA0B29850c22f5a66705e4F8DF9b',
      DCA_STRATEGY_ADDRESS: '0x9FaeF88b3ef1C46212c60aCEA5F59620900AA780',
    },
  },
  56: {
    chainId: '56',
    disabled: true,
    icon: ChainBscSVG,
    blockExplorerUrls: ['https://bscscan.com'],
    rpcUrls: ['https://bsc-dataseed1.binance.org'],
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    contracts: {
      POSITION_CONTROLLER_ADDRESS: '0xAc9e4DB131DF8CBed7461125B21de6e2E192928A',
      POSITION_REGISTRY_ADDRESS: '0xa100913ae060aA0B29850c22f5a66705e4F8DF9b',
      DCA_STRATEGY_ADDRESS: '0x9FaeF88b3ef1C46212c60aCEA5F59620900AA780',
    },
  },
};

// 当前环境下，可选择的链信息
export const CHAIN_STATUS_NETWORK_LIST = Object.values(NETWORK);
// isDev
//   ? Object.values(NETWORK).filter((item) => item.isDev == true)
//   : Object.values(NETWORK).filter((item) => item.isDev == false);

export const SUPPORT_CHAINIDS = Object.values(NETWORK).map((item) => item.chainId);
