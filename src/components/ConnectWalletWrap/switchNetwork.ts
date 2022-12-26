import { ethers } from 'ethers';
import { NETWORK } from '_src/constants/chainInfo';

export const switchNetwork = async (provider: any, _chainId: number) => {
  if (!provider) return;
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ethers.utils.hexValue(Number(_chainId)) }],
    });
  } catch (error) {
    if (error.code === 4902) {
      const { chainId, blockExplorerUrls, rpcUrls, chainName, nativeCurrency } = NETWORK[_chainId];
      return provider.request({
        method: 'wallet_addEthereumChain',
        params: [{ chainId, blockExplorerUrls, rpcUrls, chainName, nativeCurrency }],
      });
    }
  }
};
