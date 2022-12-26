import { InputAdornment, FormHelperText, InputBaseProps, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import Input from '_components/Input';

interface IPassword {
  helperText: React.ReactNode;
}

const Password: React.FC<IPassword & InputBaseProps> = React.forwardRef<HTMLInputElement, IPassword>(
  ({ helperText, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>();

    return (
      <Input
        {...props}
        helperText={helperText}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(true)} onMouseDown={() => setShowPassword(false)} edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    );
  },
);

export default Password;
