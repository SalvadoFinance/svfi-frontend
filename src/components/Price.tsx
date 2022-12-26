import { Typography, TypographyProps } from '@mui/material';

const Price: React.FC<TypographyProps> = ({ children, sx, ...props }) => {
  return (
    <Typography
      mb="4px"
      sx={{ fontSize: '16px', fontWeight: '500', fontFamily: 'HarmonyOS Sans', color: '#333', ...sx }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default Price;
