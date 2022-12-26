import ApiClient from '_src/services/network/ApiClient';
import { DataResult } from '_src/services/types';

import {
  CoinInfoResponse,
  MarketChartResponse,
  MarketsResponse,
  MarketsResuest,
  InvestResuest,
  InvestResponse,
  PositionListResuest,
  PositionListResponse,
  PositionEventListResponse,
  ChainListResponse,
} from './types';
import { getQueryParams } from '../getQueryParams';

export default class TokensService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }
  async getMarkets(data: MarketsResuest): Promise<DataResult<MarketsResponse>> {
    const { page, chains, days, coinQuery } = data;
    const params = getQueryParams({
      chains,
      'page.size': 20,
      'page.index': page,
      days,
      coinQuery,
    });
    return await this.apiClient.get<MarketsResponse>(`/coins/markets?${params}`);
  }

  async getInvest(data: InvestResuest): Promise<DataResult<InvestResponse>> {
    const { chain, direction } = data;
    const params = getQueryParams({
      chain,
      direction,
    });
    return await this.apiClient.get<InvestResponse>(`/coins/invest?${params}`);
  }

  async getPositionList(data: PositionListResuest): Promise<DataResult<PositionListResponse>> {
    const { owner, status } = data;
    const params = getQueryParams({
      owner,
      status,
    });
    return await this.apiClient.get<PositionListResponse>(`/positions/list?${params}`);
  }

  async getPositionEventList(address: string): Promise<DataResult<PositionEventListResponse>> {
    return await this.apiClient.get<PositionEventListResponse>(`/positions/${address}/events`);
  }

  async getPositionEvent(id: string): Promise<DataResult<PositionEventListResponse>> {
    return await this.apiClient.get<PositionEventListResponse>(`/positions/events/${id}`);
  }

  async getChainList(): Promise<DataResult<ChainListResponse>> {
    return await this.apiClient.get<ChainListResponse>('/chains/list');
  }

  async getMarketChart(data: { coinId: string; period: string }): Promise<DataResult<MarketChartResponse>> {
    const { coinId, period } = data;
    const params = getQueryParams({
      period,
    });
    return await this.apiClient.get<MarketChartResponse>(`/coins/${coinId}/market_chart?${params}`);
  }

  async getCoinInfo(data: { coinId: string; days: number }): Promise<DataResult<CoinInfoResponse>> {
    const { coinId, days } = data;
    const params = getQueryParams({
      days,
    });
    return await this.apiClient.get<CoinInfoResponse>(`/coins/${coinId}/market?${params}`);
  }
}
