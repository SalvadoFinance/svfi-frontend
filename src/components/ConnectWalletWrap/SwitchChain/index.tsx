import { Select, SelectProps, SelectChangeEvent } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { Fragment, useEffect, useState } from 'react';

import WaringSVG from '_assets/icons/waring.svg';
import MenuItem from '_components/MenuItem';
import { CHAIN_STATUS_NETWORK_LIST, NETWORK } from '_constants/chainInfo';
import { switchNetwork } from '../switchNetwork';

const SwitchChain: React.FC<SelectProps> = ({ style, ...props }) => {
  const { connector, chainId } = useWeb3React();
  const [currentChain, setCurrentChain] = useState(String(chainId) ?? CHAIN_STATUS_NETWORK_LIST[0].chainId);

  const handleChange = async (val) => {
    await switchNetwork(connector.provider, Number(val));
    setCurrentChain(val);
  };

  useEffect(() => {
    if (NETWORK[chainId]?.chainId) {
      setCurrentChain(String(chainId));
    } else {
      setCurrentChain(CHAIN_STATUS_NETWORK_LIST[0].chainId);
    }
  }, [chainId]);

  return (
    <Select
      value={currentChain}
      displayEmpty
      IconComponent={WaringSVG}
      sx={{
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
          display: currentChain == String(chainId) ? 'none' : 'block',
          // CHAIN_STATUS_NETWORK_LIST.filter((item) => item.chainId != String(chainId)).length > 0 ? 'block' : 'none',
        },
        '.MuiSelect-iconOpen': {
          transform: 'rotate(0deg)',
        },
      }}
      style={{
        height: '34px',
        background: 'rgba(250, 196, 6, 0.1)',
        borderRadius: '40px',
        ...style,
      }}
      {...props}
    >
      {CHAIN_STATUS_NETWORK_LIST.map((item) => {
        return (
          <MenuItem
            onClick={() => {
              handleChange(item.chainId);
            }}
            disabled={item.disabled}
            value={item.chainId}
            key={item.chainId}
            style={{ height: '48px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <item.icon style={{ width: '24px', height: '24px' }} />
              <span style={{ marginLeft: '12px', marginRight: currentChain == String(chainId) ? 0 : '14px' }}>
                {item.chainName}
              </span>
            </div>
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default SwitchChain;
