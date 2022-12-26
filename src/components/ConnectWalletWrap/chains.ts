import type { AddEthereumChainParameter } from '@web3-react/types';

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
};

const BSC: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'BSC',
  symbol: 'BNB',
  decimals: 18,
};

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency'];
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls'];
}

const isExtendedChainInformation = (chainInformation: BasicChainInformation | ExtendedChainInformation) => {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
};

export const getAddChainParameters = (chainId: number): AddEthereumChainParameter | number => {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: (chainInformation as ExtendedChainInformation).nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: (chainInformation as ExtendedChainInformation).blockExplorerUrls,
    };
  } else {
    return chainId;
  }
};

export const CHAINS: { [chainId: number]: BasicChainInformation | ExtendedChainInformation } = {
  97: {
    urls: ['https://data-seed-prebsc-2-s1.binance.org:8545'],
    name: 'Binance Smart Chain Testnet',
    nativeCurrency: BSC,
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
};

export const URLS = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs = CHAINS[Number(chainId)].urls;
  if (validURLs && validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }
  return accumulator;
}, {});
