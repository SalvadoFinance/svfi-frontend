import { proxy } from 'valtio';
import services from '_src/services';
import { Chain, IChainList } from '_src/services/tokens/types';

interface IChainStore {
  data: IChainList['chains'];
  chain: Chain;
}

export const ChainStore = proxy<IChainStore>({
  data: [],
  chain: {
    blockExplorer: 'https://goerli.etherscan.io/',
    chainId: '5',
    chainName: 'Goerli',
    currencySymbol: 'GoerliETH',
    id: 'goerli-testnet',
  },
});

export const initChainStore = async () => {
  const { response } = await services.tokens.getChainList();
  ChainStore.data = response.data.chains;
  // ChainStore.chain = response.data.chains.find((item) => item.chainName == 'Goerli');
};
