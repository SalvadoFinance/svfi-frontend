import { useEffect } from 'react';
import { Select, Box, SelectChangeEvent, SelectProps, Pagination } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useImmer } from 'use-immer';
import { useSnapshot } from 'valtio';
import { SectionLayout } from '_src/Layout';
import Input from '_components/Input';
import MenuItem from '_components/MenuItem';
import ChainETH from '_assets/icons/chain_eth.svg';
import ChainPolygon from '_assets/icons/chain_polygon.svg';
import ArrowDownSVG from '_assets/icons/arrowDown.svg';

import TokenList from '_containers/TokenList';
import { IChainList, IMarkets, MarketsResuest } from '_src/services/tokens/types';
import services from '_src/services';

import './index.less';
import { ChainStore } from '_src/stores/ChainStore';

const selectSx: SelectProps['sx'] = {
  '&.MuiOutlinedInput-root': {
    fieldset: {
      borderColor: '#EAE8E5',
    },
    '&:hover fieldset': {
      borderColor: '#EAE8E5',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#EAE8E5',
      borderWidth: 1,
    },
  },
  '&.Mui-selected:hover': {
    backgroundColor: '#f6f6f4',
  },
};

const selectDayList = [
  {
    label: '1 Week',
    value: '7',
  },
  {
    label: '1 Month',
    value: '30',
  },
  {
    label: '3 Months',
    value: '90',
  },
  {
    label: '1 year',
    value: '365',
  },
  ,
  {
    label: '3 years',
    value: '1095',
  },
];

const Tokens = () => {
  const chainList = useSnapshot(ChainStore);
  const [markets, setMarkets] = useImmer<IMarkets>(null);
  const [search, setSearch] = useImmer<MarketsResuest>({
    chains: chainList.chain?.chainName,
    page: 1,
    coinQuery: '',
    days: selectDayList[1].value,
  });

  useEffect(() => {
    getMarketList(search);
  }, []);

  const getMarketList = async (params: MarketsResuest) => {
    const { response } = await services.tokens.getMarkets(params);
    if (response?.data?.coins) {
      setMarkets(response.data);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSearch((state) => {
      state.chains = event.target.value;
      state.coinQuery = '';
    });
    ChainStore.chain = chainList.data.find((item) => item.chainName == event.target.value);
    getMarketList({ ...search, chains: event.target.value });
    setMarkets(null);
  };

  const handleChangePage = async (event: unknown, page: number) => {
    setSearch((state) => {
      state.page = page;
    });
    getMarketList({ ...search, page });
  };

  const handleChangeDays = async (event: SelectChangeEvent<string>, days: number) => {
    setSearch((state) => {
      state.days = event.target.value;
      getMarketList(state);
    });
    getMarketList({ ...search, days: String(days) });
  };

  return (
    <div className="page-tokens">
      <SectionLayout
        style={{ marginBottom: '30px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}
      >
        <div className="title">Top Tokens</div>
        <Input
          style={{ width: '240px' }}
          startAdornment={<Search />}
          placeholder="Search Tokens"
          onChange={(event) => {
            const coinName = event.target.value.trim();
            setSearch((state) => {
              state.coinQuery = coinName;
              // if (coinName == '') {
              //   getMarketList(state);
              // }
              getMarketList(state);
            });
          }}
          // onKeyDown={(event) => {
          //   if (event.key === 'Enter') {
          //     getMarketList(search);
          //   }
          // }}
        />
      </SectionLayout>
      <SectionLayout isCard style={{ marginBottom: '180px' }}>
        <Box display="flex" alignItems="center" mb="24px">
          <div style={{ marginRight: '20px' }}>
            <div className="label">Chain Name</div>
            <Select
              value={search.chains}
              onChange={handleChange}
              displayEmpty
              sx={selectSx}
              IconComponent={ArrowDownSVG}
              style={{
                height: '34px',
              }}
            >
              {chainList.data.map((item) => {
                return (
                  <MenuItem key={item.chainId} value={item.chainName} style={{ height: '48px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {/* <img src={item.} style={{ marginRight: '12px' }} /> */}
                      <span>{item.chainName}</span>
                    </div>
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div>
            <div className="label">Historical Period</div>
            <Select
              value={search.days}
              onChange={handleChangeDays}
              displayEmpty
              style={{
                height: '34px',
              }}
              IconComponent={ArrowDownSVG}
              sx={selectSx}
            >
              {selectDayList.map((item) => {
                return (
                  <MenuItem key={item.value} value={item.value} style={{ height: '48px' }}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        </Box>
        <TokenList data={markets?.coins} />
        {Number(markets?.page?.total) > 20 && (
          <Box display="flex" justifyContent="center">
            <Pagination
              page={search.page}
              count={Math.ceil(Number(markets.page.total) / markets.page.size)}
              color="primary"
              onChange={handleChangePage}
            />
          </Box>
        )}
      </SectionLayout>
    </div>
  );
};

export default Tokens;
