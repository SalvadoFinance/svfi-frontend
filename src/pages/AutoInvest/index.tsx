import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { SectionLayout } from '_src/Layout';
import InvestInfo from '_components/InvestInfo';
import { TokenType } from '_components/SelectToken';
import LineStats from '_components/LineStats';
import LineChart from '_components/LineChart';
import AutoOrder from '_containers/AutoOrder';

import MarketDownSVG from '_assets/icons/marketDown.svg';
import MarketUpSVG from '_assets/icons/marketUp.svg';

import services from '_src/services';
import { ICoinInfo } from '_src/services/tokens/types';

import './index.less';
import MenuItem from '_components/MenuItem';
import { useSnapshot } from 'valtio';
import { ChainStore } from '_src/stores/ChainStore';
import { useWeb3React } from '@web3-react/core';
import { numberFormatUnit } from '_src/utils';
import ShareInvest from '_containers/ShareInvest';

function AutoInvest() {
  const chainList = useSnapshot(ChainStore);
  const { chainId } = useWeb3React();
  const routerParams = useParams<{ chainName: string; coinId: string; coinAddress: string }>();
  const [lineData, setLineData] = useState<Record<string, any>[]>([]);
  const [coinData, setCoinData] = useState<ICoinInfo>();
  const [tokenList, setTokenList] = useState<TokenType[]>([]);
  const [coinList, setCoinList] = useState<TokenType[]>([]);

  const { value: totalSupplyValue, unit: totalSupplyUnit } = numberFormatUnit(coinData?.totalVolume);
  const { value: low24hValue, unit: low24hUnit } = numberFormatUnit(coinData?.low24h);
  const { value: high24hValue, unit: high24hUnit } = numberFormatUnit(coinData?.high24h);

  async function getMarketChart(days: string) {
    const { response: marketChart } = await services.tokens.getMarketChart({
      coinId: routerParams.coinId,
      period: days,
    });
    const newMarketChart = marketChart.data.prices.map(({ item }) => {
      return { num: item[0], price: item[1] };
    });

    setLineData(newMarketChart);
  }

  async function getCoinInfo(days: number) {
    const { response: coinInfo } = await services.tokens.getCoinInfo({ coinId: routerParams.coinId, days });
    setCoinData(coinInfo.data);
  }

  useEffect(() => {
    if (routerParams.chainName && routerParams.coinId && routerParams.coinAddress) {
      getMarketChart('1d');
      getCoinInfo(1);
    }
  }, [routerParams]);

  useEffect(() => {
    if (chainList?.data.length > 0) {
      getTokenOrCoinList();
    }
  }, [chainId, routerParams.chainName, chainList?.data]);

  async function getTokenOrCoinList() {
    const [tokenListOrigin, coinListOrigin] = await Promise.all([
      services.tokens.getInvest({ chain: routerParams.chainName, direction: 1 }),
      services.tokens.getInvest({ chain: routerParams.chainName, direction: 0 }),
    ]);

    const tokenListElement = tokenListOrigin.response.data.coinBases.map((item) => {
      return {
        address: item.contractAddress,
        name: item.symbol,
        data: item,
        option: (
          <MenuItem value={item.contractAddress} key={item.contractAddress} style={{ height: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={item.image} style={{ width: '24px', height: '24px', marginRight: '4px' }} />
              <Typography
                color="#000"
                sx={{ fontSize: '20px', textTransform: 'uppercase', fontWeight: 500, fontFamily: 'Inter' }}
              >
                {item.symbol}
              </Typography>
            </div>
          </MenuItem>
        ),
      };
    });

    const coinListElement = coinListOrigin.response.data.coinBases.map((item) => {
      return {
        address: item.contractAddress,
        name: item.symbol,
        data: item,
        option: (
          <MenuItem value={item.contractAddress} key={item.contractAddress} style={{ height: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={item.image} style={{ width: '24px', height: '24px', marginRight: '4px' }} />
              <Typography
                color="#000"
                sx={{ fontSize: '20px', textTransform: 'uppercase', fontWeight: 500, fontFamily: 'Inter' }}
              >
                {item.symbol}
              </Typography>
            </div>
          </MenuItem>
        ),
      };
    });

    setCoinList(coinListElement);

    // setToken(tokenListElement[0]);
    setTokenList(tokenListElement);
  }

  return (
    <div className="page-auto-invest">
      <SectionLayout style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ width: '530px' }}>
          <Box mb="12px" display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <img src={coinData?.coinBase.image} style={{ width: '28px', height: '28px' }} />
              <Typography
                color="#000"
                sx={{ fontSize: '28px', fontFamily: 'Inter', fontWeight: '700', margin: '0 8px' }}
                style={{ textTransform: 'uppercase' }}
              >
                {coinData?.coinBase.symbol ?? '--'}
              </Typography>
              <Typography color="#999" sx={{ fontSize: '16px', fontWeight: '400', fontFamily: 'HarmonyOS Sans' }}>
                {coinData?.coinBase.name ?? '--'}
              </Typography>
            </Box>
            <ShareInvest />
          </Box>
          <Box display="flex" alignItems="center" mb="34px">
            <Typography color="#000" sx={{ fontSize: '20px', fontWeight: '700', marginRight: '13px' }}>
              {coinData?.currentPrice.toLocaleString('en-US', {
                style: 'currency',
                minimumFractionDigits: 0,
                maximumFractionDigits: 4,
                currency: 'USD',
              })}
            </Typography>
            <Typography color="#333" sx={{ fontSize: '16px', fontWeight: '500' }}>
              {`${coinData?.priceChangePercentage24h.toFixed(1)}%`}
            </Typography>
            <Box
              color={coinData?.priceChangePercentage24h < 0 ? '#32CA8A' : '#EC4865'}
              display="flex"
              alignItems="center"
              justifyContent="center"
              style={{ marginLeft: '2px' }}
            >
              {coinData?.priceChangePercentage24h < 0 ? <MarketDownSVG /> : <MarketUpSVG />}
            </Box>
          </Box>
          <LineChart
            data={lineData}
            color="#32CA8A"
            isToolip
            isXAxis
            style={{ height: '260px', width: '100%', paddingBottom: '48px' }}
          />
          <LineStats
            onSelect={(val) => {
              getMarketChart(val);

              let coinDays = 1;
              if (val == '1w') {
                coinDays = 7;
              } else if (val == '1m') {
                coinDays = 30;
              } else if (val == '1y') {
                coinDays = 365;
              }

              getCoinInfo(coinDays);
            }}
          />

          <InvestInfo
            data={[
              {
                label: 'Volume',
                value: `${totalSupplyValue.toLocaleString('en-US', {
                  style: 'currency',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 4,
                  currency: 'USD',
                })} ${totalSupplyUnit}`,
              },
              {
                label: 'ROI',
                value: `${coinData?.historicalRoi.toFixed(1)}%`,
              },
              {
                label: '24h low',
                value: `${low24hValue.toLocaleString('en-US', {
                  style: 'currency',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 4,
                  currency: 'USD',
                })} ${low24hUnit}`,
              },
              {
                label: '24h high',
                value: `${high24hValue.toLocaleString('en-US', {
                  style: 'currency',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 4,
                  currency: 'USD',
                })} ${high24hUnit}`,
              },
            ]}
          />
        </div>
        <AutoOrder
          defaultToken={tokenList.find((item) => item.name == coinData?.coinBase.symbol)}
          chainName={routerParams.chainName}
          tokenList={tokenList}
          coinList={coinList}
        />
      </SectionLayout>
    </div>
  );
}
export default AutoInvest;
