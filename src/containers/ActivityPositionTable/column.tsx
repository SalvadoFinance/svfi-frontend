import dayjs from 'dayjs';
import { ethers } from 'ethers';
import { useSnapshot } from 'valtio';

import TokenName from '_components/TokenName';
import { PositionEvent } from '_src/services/tokens/types';
import JumpSVG from '_src/assets/icons/jump.svg';
import { ChainStore } from '_src/stores/ChainStore';
import Price from '_components/Price';
import { IconButton } from '@mui/material';

export interface Column {
  id: 'token' | 'chain' | 'spend' | 'receive' | 'average-price' | 'trading-fee' | 'date' | 'action';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  format?: (value: number) => string;
}

export const columns: readonly Column[] = [
  { id: 'token', label: 'Token', align: 'left' },
  { id: 'chain', label: 'Chain', align: 'left' },
  {
    id: 'spend',
    label: 'Spend',
    align: 'left',
  },
  { id: 'receive', label: 'Receive', align: 'left' },

  {
    id: 'average-price',
    label: 'Average Price',
    align: 'left',
  },
  {
    id: 'trading-fee',
    label: 'Trading Fee',
    align: 'left',
  },
  {
    id: 'date',
    label: 'Date',
    align: 'left',
  },
  {
    id: 'action',
    label: '',
    align: 'right',
  },
];

interface Data {
  token: React.ReactNode;
  chain: React.ReactNode;
  spend: React.ReactNode;
  receive: React.ReactNode;
  'average-price': React.ReactNode;
  'trading-fee': React.ReactNode;
  date: React.ReactNode;
  action: React.ReactNode;
  data: PositionEvent;
}

export function createData(data: PositionEvent, blockExplorer: string): Data {
  const { from, to, averagePrice, fee, eventTime, chainName, amountIn, amountOut } = data;
  const handleOnClickJump = () => {
    window.open(`${blockExplorer}/tx/${data.txHash}`);
  };

  return {
    data,
    token: <TokenName data={{ symbol: to.symbol, image: to.image }} />,
    chain: <Price>{chainName}</Price>,
    spend: (
      <Price>{`${Number(ethers.utils.formatUnits(String(amountIn), from.decimals)).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 8,
        currency: 'USD',
      })} ${from.symbol.toLocaleUpperCase()}`}</Price>
    ),
    receive: (
      <Price>{`${Number(ethers.utils.formatUnits(String(amountOut), to.decimals)).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 8,
        currency: 'USD',
      })} ${to.symbol.toLocaleUpperCase()}`}</Price>
    ),
    'average-price': (
      <Price>{`${averagePrice.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 8,
        currency: 'USD',
      })} ${from.symbol.toLocaleUpperCase()}`}</Price>
    ),
    'trading-fee': (
      <Price>{`${fee.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 8,
        currency: 'USD',
      })} ${from.symbol.toLocaleUpperCase()}`}</Price>
    ),
    date: <Price>{dayjs(eventTime).format('DD/MM/YYYY HH:mm')}</Price>,
    action: (
      <IconButton onClick={handleOnClickJump}>
        <JumpSVG />
      </IconButton>
    ),
  };
}
