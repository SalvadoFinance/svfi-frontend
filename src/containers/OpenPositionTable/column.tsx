import { Position } from '_src/services/tokens/types';
import Price from '_components/Price';
import { ethers } from 'ethers';
import dayjs from 'dayjs';
import OpenPositionAction from '_containers/OpenPositionAction';
import TokenName from '_components/TokenName';

export interface Column {
  id:
    | 'token'
    | 'chain'
    | 'invest-schedule'
    | 'invest-amount'
    | 'start-date'
    | 'next-invest-date'
    | 'roi'
    | 'status'
    | 'action';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  format?: (value: number) => string;
}

export const columns: readonly Column[] = [
  { id: 'token', label: 'Token', align: 'left' },
  { id: 'chain', label: 'Chain', align: 'left' },
  { id: 'invest-schedule', label: 'Invest Schedule', align: 'left' },
  {
    id: 'invest-amount',
    label: 'Invest Amount',
    align: 'left',
  },
  {
    id: 'start-date',
    label: 'Start Date',
    align: 'left',
  },
  {
    id: 'next-invest-date',
    label: 'Next Invest Date',
    align: 'right',
  },
  {
    id: 'roi',
    label: 'ROI',
    align: 'right',
  },
  {
    id: 'status',
    label: 'Status',
    align: 'right',
  },
  {
    id: 'action',
    label: 'Actions',
    align: 'right',
  },
];

interface Data {
  token: React.ReactNode;
  chain: React.ReactNode;
  'invest-schedule': React.ReactNode;
  'invest-amount': React.ReactNode;
  'start-date': React.ReactNode;
  'next-invest-date': React.ReactNode;
  roi: React.ReactNode;
  status: React.ReactNode;
  action: React.ReactNode;
  data: Position;
}

export function createData(data: Position): Data {
  const { from, to, chainName, roi, status, createTime, interval, nextTime, amount } = data;
  const colorROI = roi < 0 ? '#32CA8A' : '#EC4865';

  return {
    data,
    token: <TokenName data={{ symbol: to.symbol, image: to.image }} />,
    chain: <Price>{chainName}</Price>,
    'invest-schedule': <Price>{interval}</Price>,
    'invest-amount': (
      <Price>{`${ethers.utils.formatUnits(String(amount), from.decimals)} ${from.symbol.toLocaleUpperCase()}`}</Price>
    ),
    'start-date': <Price>{dayjs(createTime).format('DD/MM/YYYY HH:mm')}</Price>,
    'next-invest-date': <Price>{dayjs(nextTime).format('DD/MM/YYYY HH:mm')}</Price>,
    roi: <Price style={{ color: colorROI }}>{`${roi.toFixed(1)}%`}</Price>,
    status: <Price>{status}</Price>,
    action: <OpenPositionAction data={data} />,
  };
}
