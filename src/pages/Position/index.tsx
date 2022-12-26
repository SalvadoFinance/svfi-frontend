import { Tab, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { TabContext, TabPanel, TabList } from '@mui/lab';

import { SectionLayout } from '_src/Layout';

import './index.less';
import OpenPositionTable from '_containers/OpenPositionTable';
import ClosePositionTable from '_containers/ClosePositionTable';
import ActivityPositionTable from '_containers/ActivityPositionTable';
import services from '_src/services';
import { useWeb3React } from '@web3-react/core';
import { useImmer } from 'use-immer';
import { IPositionEventList, IPositionList } from '_src/services/tokens/types';

const Position = () => {
  const [value, setValue] = useState('1');
  const { account } = useWeb3React();
  const [openPosition, setOpenPosition] = useImmer<IPositionList>(null);
  const [closePosition, setClosePosition] = useImmer<IPositionList>(null);
  const [activityPosition, setActivityPosition] = useImmer<IPositionEventList>(null);

  useEffect(() => {
    if (account) {
      getOpenPositionList();
      getClosePositionList();
      getActivityPositionList();
    }
  }, [account]);

  async function handleChange(event: React.SyntheticEvent, newValue: string) {
    setValue(newValue);
    if (account) {
      if (newValue === '1') {
        setOpenPosition((state) => {
          state.positions = [];
        });
        await getOpenPositionList();
      }
      if (newValue === '2') {
        setClosePosition((state) => {
          state.positions = [];
        });
        await getClosePositionList();
      }
      if (newValue === '3') {
        setActivityPosition((state) => {
          state.events = [];
        });
        await getActivityPositionList();
      }
    }
  }

  const getOpenPositionList = async () => {
    const { response } = await services.tokens.getPositionList({ owner: account, status: [1, 2] });
    setOpenPosition(response.data);
  };
  const getClosePositionList = async () => {
    const { response } = await services.tokens.getPositionList({ owner: account, status: [3] });
    setClosePosition(response.data);
  };
  const getActivityPositionList = async () => {
    const { response } = await services.tokens.getPositionEventList(account);
    setActivityPosition(response.data);
  };

  return (
    <div className="page-position">
      <SectionLayout
        style={{ marginBottom: '30px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}
      >
        <div className="title">Your positions</div>
      </SectionLayout>
      <SectionLayout
        isCard
        sx={{
          '& .MuiTabPanel-root': {
            padding: '24px 0 0',
          },
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: '#efefef' }}>
            <TabList
              onChange={handleChange}
              sx={{
                '& .MuiTab-root': {
                  color: '#666',
                  '.Mui-selected': {
                    color: '#000',
                  },
                },
              }}
            >
              <Tab label={`Open positions (${openPosition?.positions.length ?? '--'})`} value="1" />
              <Tab label={`Closed positions (${closePosition?.positions.length ?? '--'})`} value="2" />
              <Tab label={`Activity (${activityPosition?.events.length ?? '--'})`} value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <OpenPositionTable data={openPosition?.positions} />
          </TabPanel>
          <TabPanel value="2">
            <ClosePositionTable data={closePosition?.positions} />
          </TabPanel>
          <TabPanel value="3">
            <ActivityPositionTable data={activityPosition?.events} />
          </TabPanel>
        </TabContext>
      </SectionLayout>
    </div>
  );
};

export default Position;
