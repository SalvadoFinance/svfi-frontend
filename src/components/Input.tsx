import { InputBase, InputBaseProps, inputBaseClasses, FormHelperText } from '@mui/material';
import React, { Fragment } from 'react';

interface IInput {
  placeholder?: string;
  helperText?: React.ReactNode;
}

const Input: React.FC<IInput & InputBaseProps> = React.forwardRef<HTMLInputElement, IInput>(
  ({ placeholder, helperText, ...props }, ref) => {
    return (
      <Fragment>
        <InputBase
          fullWidth
          placeholder={placeholder}
          inputRef={ref}
          autoComplete="off"
          {...props}
          sx={{
            boxSizing: 'border-box',
            width: '100%',
            borderRadius: '4px',
            border: '1px solid #EAE8E5',
            background: '#fff',
            padding: '0 14px',
            fontSize: '14px',
            height: '40px',
            color: '#999',
            fontFamily: 'HarmonyOS Sans',
            input: {
              paddingLeft: '14px',
            },
          }}
        />
        {helperText && (
          <FormHelperText sx={{ height: '16px', fontSize: '12px', color: 'rgba(248, 87, 87, 0.854)' }}>
            {helperText}
          </FormHelperText>
        )}
      </Fragment>
    );
  },
);

export default Input;
