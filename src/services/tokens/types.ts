import { IResponse } from '../types';

export interface IMarkets {
  coins: Coin[];
  page: Page;
}

export interface Coin {
  coinBase: CoinBase;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  totalVolume: number;
  high24h: number;
  low24h: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  marketCapChange24h: number;
  marketCapChangePercentage24h: number;
  circulatingSupply: number;
  totalSupply: number;
  historicalRoi: number;
  lastUpdated: string;
  sparklineIn7d: SparklineIn7D;
}

export interface CoinBase {
  id: string;
  symbol: string;
  name: string;
  image: string;
  chainName: string;
  chainId: number;
  contractAddress: string;
  decimals: number;
}

export interface SparklineIn7D {
  price: number[];
}

export interface Page {
  size: number;
  index: number;
  total: number;
}

export type MarketsResponse = Awaited<Readonly<IResponse<IMarkets>>>;
export type MarketsResuest = {
  page: number;
  days: string;
  chains: string;
  coinQuery?: string;
};

export type InvestResuest = {
  chain: string;
  direction: 0 | 1;
};

export type InvestResponse = Awaited<Readonly<IResponse<{ coinBases: CoinBase[] }>>>;

export interface From {
  id: string;
  symbol: string;
  name: string;
  image: string;
  chainName: string;
  chainId: string;
  contractAddress: string;
  decimals: number;
}

export interface To {
  id: string;
  symbol: string;
  name: string;
  image: string;
  chainName: string;
  chainId: string;
  contractAddress: string;
  decimals: number;
}

export interface Position {
  chainName: string;
  chainId: string;
  positionId: string;
  tokenId: string;
  owner: string;
  strategy: string;
  from: From;
  to: To;
  amount: number;
  executed: string;
  cumulativeAmountIn: number;
  cumulativeAmountOut: number;
  averageBuyPrice: number;
  endPrice: number;
  gainLoss: number;
  roi: number;
  interval: string;
  slippage: string;
  priceLimit: number;
  status: string;
  createTime: string;
  nextTime: string;
  endTime: string;
}

export type PositionListResuest = {
  owner: string;
  status: (1 | 2 | 3)[];
};
export interface IPositionList {
  positions: Position[];
}
export type PositionListResponse = Awaited<Readonly<IResponse<IPositionList>>>;

export interface PositionEvent {
  chainName: string;
  chainId: string;
  eventName: string;
  positionId: string;
  owner: string;
  from: From;
  to: To;
  exchange: string;
  amountIn: number;
  amountOut: number;
  averagePrice: number;
  fee: number;
  eventTime: string;
  txHash: string;
}

export interface IPositionEventList {
  events: PositionEvent[];
}

export type PositionEventListResponse = Awaited<Readonly<IResponse<IPositionEventList>>>;

export interface Chain {
  id: string;
  chainName: string;
  chainId: string;
  currencySymbol: string;
  blockExplorer: string;
}

export interface IChainList {
  chains: Chain[];
}
export type ChainListResponse = Awaited<Readonly<IResponse<IChainList>>>;

export interface Price {
  item: number[];
}
export interface MarketCap {
  item: number[];
}
export interface TotalVolume {
  item: number[];
}
export interface IMarketChart {
  prices: Price[];
  marketCaps: MarketCap[];
  totalVolumes: TotalVolume[];
}

export type MarketChartResponse = Awaited<Readonly<IResponse<IMarketChart>>>;

export interface ICoinInfo {
  coinBase: CoinBase;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  totalVolume: number;
  high24h: number;
  low24h: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  marketCapChange24h: number;
  marketCapChangePercentage24h: number;
  circulatingSupply: number;
  totalSupply: number;
  historicalRoi: number;
}

export type CoinInfoResponse = Awaited<Readonly<IResponse<ICoinInfo>>>;
