import dayjs from 'dayjs';
import { ethers } from 'ethers';
import Price from '_components/Price';
import TokenName from '_components/TokenName';
import { Position } from '_src/services/tokens/types';

export interface Column {
  id:
    | 'token'
    | 'chain'
    | 'invest-schedule'
    | 'cumulative-amount'
    | 'holding-amount'
    | 'gain-Loss'
    | 'roi'
    | 'start-date'
    | 'end-date';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

export const columns: readonly Column[] = [
  { id: 'token', label: 'Token', align: 'left' },
  { id: 'chain', label: 'Chain', align: 'left' },
  { id: 'invest-schedule', label: 'Invest Schedule', align: 'center' },
  {
    id: 'cumulative-amount',
    label: 'Cumulative Amount',
    align: 'left',
  },
  {
    id: 'holding-amount',
    label: 'Holding amount',
    align: 'left',
  },
  {
    id: 'gain-Loss',
    label: 'Gain & Loss',
    align: 'left',
  },
  {
    id: 'roi',
    label: 'ROI',
    align: 'left',
  },
  // {
  //   id: 'start-date',
  //   label: 'Start Date',
  //   align: 'left',
  // },
  {
    id: 'end-date',
    label: 'End Date',
    align: 'right',
  },
];

interface Data {
  token: React.ReactNode;
  chain: React.ReactNode;
  'invest-schedule': React.ReactNode;
  'cumulative-amount': React.ReactNode;
  'holding-amount': React.ReactNode;
  'gain-Loss': React.ReactNode;
  roi: React.ReactNode;
  // 'start-date': React.ReactNode;
  'end-date': React.ReactNode;
  data: Position;
}

export function createData(data: Position): Data {
  const { from, to, chainName, roi, gainLoss, createTime, interval, endTime, cumulativeAmountOut, cumulativeAmountIn } =
    data;
  const colorROI = roi < 0 ? '#32CA8A' : '#EC4865';

  return {
    data,
    token: <TokenName data={{ symbol: to.symbol, image: to.image }} />,
    chain: <Price>{chainName}</Price>,
    'invest-schedule': <Price>{interval}</Price>,
    'cumulative-amount': (
      <Price>{`${ethers.utils.formatUnits(
        String(cumulativeAmountIn),
        from.decimals,
      )} ${from.symbol.toLocaleUpperCase()}`}</Price>
    ),
    'holding-amount': (
      <Price>{`${Number(ethers.utils.formatUnits(String(cumulativeAmountOut), from.decimals)).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 8,
        currency: 'USD',
      })} ${from.symbol.toLocaleUpperCase()}`}</Price>
    ),
    'gain-Loss': (
      <Price>{`${Number(ethers.utils.formatUnits(String(gainLoss), from.decimals)).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 8,
        currency: 'USD',
      })} ${from.symbol.toLocaleUpperCase()}`}</Price>
    ),
    roi: <Price style={{ color: colorROI }}>{`${roi.toFixed(1)}%`}</Price>,
    // 'start-date': <Price>{dayjs(createTime).format('DD/MM/YYYY HH:mm')}</Price>,
    'end-date': <Price>{dayjs(endTime).format('DD/MM/YYYY HH:mm')}</Price>,
  };
}
