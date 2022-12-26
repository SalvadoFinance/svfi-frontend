import { InputBase, InputBaseProps, FormHelperText, Box } from '@mui/material';
import React, { Fragment } from 'react';

interface IInputAmount {
  placeholder?: string;
  helperText?: React.ReactNode;
  sx?: InputBaseProps['sx'];
}

const InputAmount: React.FC<IInputAmount & InputBaseProps> = React.forwardRef<HTMLInputElement, IInputAmount>(
  ({ placeholder, helperText, sx, ...props }, ref) => {
    return (
      <Box>
        <InputBase
          fullWidth
          placeholder={placeholder}
          inputRef={ref}
          autoComplete="off"
          {...props}
          sx={{
            boxSizing: 'border-box',
            width: '100%',
            height: '60px',
            borderRadius: '4px',
            border: 0,
            background: '#F7F6F4',
            padding: '0 12px',

            fontFamily: 'HarmonyOS Sans',
            '& .MuiInputBase-input': {
              padding: 0,
              fontSize: '18px',
              color: '#000',

              '::placeholder': {
                color: '#999',
              },
            },
            ...sx,
          }}
        />
        {helperText && (
          <FormHelperText sx={{ height: '16px', fontSize: '12px', color: 'rgba(248, 87, 87, 0.854)' }}>
            {helperText}
          </FormHelperText>
        )}
      </Box>
    );
  },
);

export default InputAmount;
