import { Fragment, useEffect, useState } from 'react';
import { Box, IconButton, Popover, SvgIcon, Typography } from '@mui/material';

import SwitchButton from '_components/switchButton';
import SettingSVG from '_assets/icons/setting.svg';
import CloseSVG from '_src/assets/icons/close.svg';
import InputAmount from '_components/InputAmount';
import { useImmer } from 'use-immer';

export type AutoSettingType = {
  firstTime: number;
  buyNow: boolean;
};
interface IAutoSetting {
  value: AutoSettingType;
  onChange: (val: AutoSettingType) => void;
}

const AutoSetting: React.FC<IAutoSetting> = ({ value, onChange }) => {
  const [_value, setValue] = useImmer<AutoSettingType>(value);

  const [settingAnchorEl, setSettingAnchorEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    onChange(_value);
  }, [_value]);

  const handleOpenSettingClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettingAnchorEl(event.currentTarget);
  };

  const handleOpenSttingClose = () => {
    setSettingAnchorEl(null);
  };

  const handleOnChangeTime = (flag: 'add' | 'minus') => {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      if (flag == 'add') {
        setValue((state) => {
          state.firstTime = state.firstTime < 24 ? state.firstTime + 1 : 0;
        });
      }
      if (flag == 'minus') {
        setValue((state) => {
          state.firstTime = state.firstTime > 0 ? state.firstTime - 1 : 24;
        });
      }
    };
  };

  return (
    <Fragment>
      <IconButton onClick={handleOpenSettingClick}>
        <SettingSVG />
      </IconButton>
      <Popover
        open={Boolean(settingAnchorEl)}
        anchorEl={settingAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleOpenSttingClose}
        PaperProps={{
          sx: {
            width: '260px',
            padding: '20px',
            backgroundColor: '#FEFEFE',
            boxShadow: '0px 1px 25px rgba(19, 33, 82, 0.1), 0px 0px 4px rgba(19, 33, 82, 0.06)',
          },
        }}
      >
        <Typography mb="24px" sx={{ color: '#000', fontSize: '14px', fontFamily: 'Inter' }}>
          Setting
        </Typography>
        <Box mb="26px" display="flex" alignItems="center" justifyContent="space-between">
          <Typography sx={{ color: '#333', fontWeight: 500, fontSize: '14px', fontFamily: 'Inter' }}>
            Execution time
          </Typography>
          <InputAmount
            value={`${value.firstTime.toString().padStart(2, '0')}:00`}
            disabled
            sx={{
              height: '40px',
              width: '110px',
              padding: '0 5px',
              '& .MuiInputBase-input': { fontSize: '14px', textAlign: 'center', padding: 0 },
            }}
            startAdornment={
              <IconButton sx={{ height: '24px', width: '24px' }} onClick={handleOnChangeTime('minus')}>
                -
              </IconButton>
            }
            endAdornment={
              <IconButton sx={{ height: '24px', width: '24px' }} onClick={handleOnChangeTime('add')}>
                +
              </IconButton>
            }
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            sx={{ color: '#333', fontWeight: 500, fontSize: '14px', fontFamily: 'Inter', paddingRight: '10px' }}
          >
            Make an investment after creation
          </Typography>
          <SwitchButton
            checked={_value.buyNow}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setValue((state) => {
                state.buyNow = event.target.checked;
              });
            }}
          />
        </Box>
        <Box position="absolute" top={16} right={14}>
          <IconButton onClick={handleOpenSttingClose}>
            <SvgIcon sx={{ fontSize: 12 }} component={CloseSVG} inheritViewBox />
          </IconButton>
        </Box>
      </Popover>
    </Fragment>
  );
};

export default AutoSetting;
