import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { Box, Chip, SelectProps, OutlinedInput, Select, Typography } from '@mui/material';

import GouSVG from '_assets/icons/gou.svg';

interface ISubMenuItem {
  label: string;
  value: string;
}

interface IMenuItem {
  [key: string]: {
    label: string;
    value: string;
    subMenuList?: ISubMenuItem[];
  };
}

const menuList: IMenuItem = {
  daily: {
    label: 'Daily',
    value: 'daily',
    subMenuList: [],
  },
  weekly: {
    label: 'Weekly',
    value: 'weekly',
    subMenuList: [
      { label: 'MON', value: '1' },
      { label: 'TUE', value: '2' },
      { label: 'WED', value: '3' },
      { label: 'THU', value: '4' },
      { label: 'FRI', value: '5' },
      { label: 'SAT', value: '6' },
      { label: 'SUN', value: '7' },
    ],
  },
  'bi-weekly': {
    label: 'Bi-weekly',
    value: 'bi-weekly',
    subMenuList: [
      { label: 'MON', value: '1' },
      { label: 'TUE', value: '2' },
      { label: 'WED', value: '3' },
      { label: 'THU', value: '4' },
      { label: 'FRI', value: '5' },
      { label: 'SAT', value: '6' },
      { label: 'SUN', value: '7' },
    ],
  },
  monthly: {
    label: 'Monthly',
    value: 'monthly',
    subMenuList: new Array(28).fill('1').map((item, index) => {
      return { label: String(index + 1), value: String(index + 1) };
    }),
  },
};

const AutoCycle: React.FC<SelectProps & { onChangeV2: (val: string[]) => void }> = ({ sx, onChangeV2, ...props }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useImmer<string[]>([menuList.daily.value, '']);
  const [subMenuList, setSubMenuList] = useState<ISubMenuItem[]>(menuList.daily.subMenuList);

  useEffect(() => {
    onChangeV2(value);
  }, [value]);

  const handleOnSelectMenuList = (item: typeof menuList.daily) => {
    return (event: React.MouseEvent<HTMLDivElement>) => {
      if (value[0] === item.value) return;
      setValue((state) => {
        state[0] = item.value;
        if (item.subMenuList.length > 0) {
          state[1] = item.subMenuList[0].value;
        } else {
          state[1] = '';
        }
      });
      setSubMenuList(item.subMenuList);
      if (item.subMenuList.length == 0) {
        setOpen(false);
      }
    };
  };

  const handleOnSelectSubMenuList = (item: typeof menuList.daily) => {
    return (event: React.MouseEvent<HTMLDivElement>) => {
      if (value[1] === item.value) return;
      setValue((state) => {
        state[1] = item.value;
      });
      setOpen(false);
    };
  };

  return (
    <div>
      <Select
        multiple
        value={value}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {
          setOpen(true);
        }}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected: string[]) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, borderRadius: '4px' }}>
            <Typography sx={{ color: '#000', fontWeight: 700, fontSize: '18px', fontFamily: 'HarmonyOS Sans' }}>
              {selected
                .filter((item) => item)
                .map((value, index) => {
                  if (index === 0) {
                    return menuList[value].label;
                  }
                  return subMenuList.find((item) => item.value == value)?.label;
                })
                .join(' , ')}
            </Typography>
          </Box>
        )}
        open={open}
        onClick={() => {}}
        sx={{
          width: '100%',
          background: '#F7F6F4',
          borderRadius: '4px',
          '&.MuiOutlinedInput-root': {
            fieldset: {
              borderWidth: 0,
            },
            '&:hover fieldset': {
              borderWidth: 0,
            },
            '&.Mui-focused fieldset': {
              borderWidth: 0,
            },
          },
          '.MuiSelect-icon': {
            right: '14px',
          },
          '.MuiSelect-iconOpen': {
            transform: 'rotate(0deg)',
          },
          ...sx,
        }}
        {...props}
      >
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" sx={{ height: '303px' }}>
          <Box
            sx={{
              flex: 1,

              height: '100%',
              overflowY: 'auto',
            }}
          >
            {Object.values(menuList).map((item) => (
              <Box
                key={item.label}
                onClick={handleOnSelectMenuList(item)}
                sx={{
                  background: item.value == value[0] ? '#F6F6F4' : 'transparent',
                  fontSize: '14px',
                  padding: '12px 16px',
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                }}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                {item.label}
                {item.value == value[0] && <GouSVG />}
              </Box>
            ))}
          </Box>
          {subMenuList.length > 0 && (
            <Box sx={{ width: '50%', height: '100%', overflowY: 'auto', borderLeft: '1px solid #EAE8E5' }}>
              {subMenuList.map((item) => (
                <Box
                  key={item.label}
                  onClick={handleOnSelectSubMenuList(item)}
                  sx={{
                    background: item.value == value[1] ? '#F6F6F4' : 'transparent',
                    fontSize: '14px',
                    padding: '12px 16px',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                  }}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  {item.label}
                  {item.value == value[1] && <GouSVG />}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Select>
    </div>
  );
};

export default AutoCycle;
