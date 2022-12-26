import { Select, SelectProps, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';

import { CoinBase } from '_src/services/tokens/types';

export type TokenType = {
  option: React.ReactNode;
  address: string;
  name: string;
  data?: CoinBase;
};

interface ISelectToken {
  data: TokenType[];
  value?: TokenType;
  onChangeV2?: (val: TokenType) => void;
}

const SelectToken: React.FC<ISelectToken & SelectProps> = ({ style, sx, data, value, onChangeV2, ...props }) => {
  const [token, setToken] = useState<TokenType>(value || data[0]);

  useEffect(() => {
    setToken(value);
  }, [value]);

  const handleChange = (event: SelectChangeEvent) => {
    const _token = data.find((item) => item.address == event.target.value);
    setToken(_token);
    onChangeV2(_token);
  };

  return (
    data.length > 0 && (
      <Select
        value={token?.address ?? ''}
        displayEmpty
        onChange={handleChange}
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
            right: '0',
          },
          ...sx,
        }}
        MenuProps={{
          sx: {
            '& .MuiPaper-root': {
              maxHeight: '300px',
            },
          },
        }}
        style={{
          height: '24px',
          backgroundColor: 'transparent',
          ...style,
        }}
        {...props}
      >
        {data.map((item) => {
          return item.option;
        })}
      </Select>
    )
  );
};

SelectToken.defaultProps = {
  data: [],
};

export default SelectToken;
