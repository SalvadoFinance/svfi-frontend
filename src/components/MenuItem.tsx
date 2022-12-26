import { MenuItem as MuiMenuItem, MenuItemProps } from '@mui/material';

const MenuItem: React.FC<MenuItemProps> = ({ children, ...props }) => {
  return (
    <MuiMenuItem
      {...props}
      sx={{
        '&.Mui-selected , &.Mui-selected:focus-visible, &.Mui-selected:hover, &:hover': {
          backgroundColor: '#f6f6f4',
        },
      }}
    >
      {children}
    </MuiMenuItem>
  );
};

export default MenuItem;
