import { initializeConnector } from '@web3-react/core';
import { OKX } from '../OtherWallet/OkProvider';

export const [okx, okxkHooks] = initializeConnector<OKX>((actions) => new OKX({ actions }));
