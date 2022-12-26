import { IconButton, Popover, Typography, TypographyProps } from '@mui/material';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';

import JumpSVG from '_assets/icons/jump.svg';
import MenuItem from '_components/MenuItem';
// import { useCopy } from '_src/hooks';

const ShareInvest: React.FC<TypographyProps> = ({ children, sx, ...props }) => {
  const routerParams = useParams<{ chainName: string; coinId: string; coinAddress: string }>();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  // const [isCopy, setCopy] = useCopy();
  const handleOpenClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenClose = () => {
    setAnchorEl(null);
  };

  const handleOnClickCoingecko = () => {
    window.open(`https://www.coingecko.com/en/coins/${routerParams.coinId}`);
    handleOpenClose();
  };

  const handleOnClickTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${location.href}`);
    handleOpenClose();
  };

  return (
    <Fragment>
      <IconButton onClick={handleOpenClick}>
        <JumpSVG />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleOpenClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            padding: '8px 0',
            backgroundColor: '#FEFEFE',
            boxShadow: '0px 1px 25px rgba(19, 33, 82, 0.1), 0px 0px 4px rgba(19, 33, 82, 0.06)',
          },
        }}
      >
        <MenuItem onClick={handleOnClickCoingecko}>Coingecko</MenuItem>
        <MenuItem onClick={handleOnClickTwitter}>Share to Twitter</MenuItem>
      </Popover>
    </Fragment>
  );
};

export default ShareInvest;
