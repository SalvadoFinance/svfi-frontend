import Price from '_components/Price';
import LineChart from '_components/LineChart';
import { Coin, IMarkets } from '_src/services/tokens/types';
import TokenName from '_components/TokenName';
import { numberFormatUnit } from '_src/utils';
import MarketDownSVG from '_assets/icons/marketDown.svg';
import MarketUpSVG from '_assets/icons/marketUp.svg';
import { Box } from '@mui/material';

export interface Column {
  id: 'tokenName' | 'price' | 'change' | 'historicalROI' | 'marketCap' | 'last';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  format?: (value: number) => string;
}

export const columns: readonly Column[] = [
  { id: 'tokenName', label: 'Token Name', minWidth: 200, align: 'left' },
  { id: 'price', label: 'Price', minWidth: 200, align: 'left' },
  { id: 'change', label: '24h Change', minWidth: 180, align: 'left' },
  {
    id: 'historicalROI',
    label: 'Historical ROI',
    minWidth: 200,
    align: 'left',
  },
  {
    id: 'marketCap',
    label: 'Market Cap',
    minWidth: 190,
    align: 'left',
  },
  {
    id: 'last',
    label: 'Last 7 Days',
    minWidth: 135,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  tokenName: React.ReactNode;
  price: React.ReactNode;
  change: React.ReactNode;
  historicalROI: React.ReactNode;
  marketCap: React.ReactNode;
  last: React.ReactNode;
  data: Coin;
}

export function createData(data: Coin): Data {
  const { coinBase, priceChangePercentage24h, marketCap, currentPrice, sparklineIn7d, historicalRoi } = data;
  const { name, symbol, image } = coinBase;
  const { value: market_cap_value, unit: market_cap_unit } = numberFormatUnit(marketCap);
  const colorChange = priceChangePercentage24h < 0 ? '#32CA8A' : '#EC4865';
  const colorROI = historicalRoi < 0 ? '#32CA8A' : '#EC4865';

  const lineData = sparklineIn7d.price.map((price, index) => ({ price, num: index }));
  return {
    data,
    tokenName: <TokenName data={{ name, symbol, image }} />,
    price: (
      <Price>
        {currentPrice.toLocaleString('en-US', {
          style: 'currency',
          minimumFractionDigits: 0,
          maximumFractionDigits: 4,
          currency: 'USD',
        })}
      </Price>
    ),
    change: (
      <Box display="flex" alignItems="center">
        <Price style={{ margin: '0 2px 0 0' }}>{`${priceChangePercentage24h.toFixed(1)}%`}</Price>
        <Box
          color={colorChange}
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ marginLeft: '2px' }}
        >
          {priceChangePercentage24h < 0 ? <MarketDownSVG /> : <MarketUpSVG />}
        </Box>
      </Box>
    ),
    historicalROI: <Price style={{ color: colorROI }}>{`${historicalRoi.toFixed(1)}%`}</Price>,
    marketCap: (
      <Price>{`${market_cap_value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })} ${market_cap_unit}`}</Price>
    ),
    last: <LineChart color={colorChange} data={lineData} style={{ height: '45px', width: '100%' }} />,
  };
}
