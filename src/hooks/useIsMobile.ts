import type { Theme } from '@mui/material';
import { useMediaQuery } from '@mui/material';

export const useIsMobile = () => {
  const isMobile = useMediaQuery((theme: Theme) => {
    return theme.breakpoints.down('md');
  });
  return isMobile;
};
