import React from 'react';
import { Box, Button, Dialog, DialogContent, IconButton, SvgIcon, Typography } from '@mui/material';

import SuccessSVG from '_src/assets/icons/success.svg';
import FailSVG from '_src/assets/icons/fail.svg';
import CloseSVG from '_src/assets/icons/close.svg';
import { useNavigate } from 'react-router-dom';
import pageURL from '_constants/pageURL';

type IAutoInvestResult = {
  open: boolean;
  onClose: () => void;
  type: boolean;
  data?: {
    explorerUrl: string;
    token: string;
    coin: string;
  };
};
const AutoInvestResult: React.FC<IAutoInvestResult> = ({ open, onClose, data, type }) => {
  const { explorerUrl, coin, token } = data;
  const navigate = useNavigate();

  return (
    <Dialog PaperProps={{ sx: { borderRadius: 3 } }} open={open} onClose={onClose}>
      <DialogContent sx={{ width: 400, padding: '42px 25px 32px 25px', boxSizing: 'border-box' }}>
        <Box display="flex" alignItems="center" flexDirection="column" rowGap={2}>
          {type ? <SuccessSVG style={{ marginBottom: '14px' }} /> : <FailSVG style={{ marginBottom: '14px' }} />}
          <Typography color="#000" sx={{ fontSize: '16px', fontWeight: 600, fontFamily: 'Inter' }}>
            {type ? 'Transaction Submitted' : 'Transaction revert'}
          </Typography>
          {type ? (
            <Typography
              color="#666"
              align="center"
              sx={{ fontSize: '14px', fontWeight: 400, fontFamily: 'HarmonyOS Sans' }}
            >
              Your position creation to swap {coin} to {token} has been succesfully submitted to the blockchain and will
              be confirmed soon
            </Typography>
          ) : (
            <Typography
              color="#666"
              align="center"
              sx={{ fontSize: '14px', fontWeight: 400, fontFamily: 'HarmonyOS Sans' }}
            >
              Your position creation to swap {coin} to {token} has been failed submitted.
            </Typography>
          )}

          {type && (
            <a
              target="_blank"
              href={explorerUrl}
              style={{
                fontSize: '14px',
                color: '#FAC406',
                fontWeight: 400,
                cursor: 'pointer',
                fontFamily: 'HarmonyOS Sans',
                textDecoration: 'underline',
                marginBottom: '14px',
              }}
            >
              View on explorer
            </a>
          )}

          {type ? (
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
              <Button
                size="medium"
                disableElevation
                variant="contained"
                type="submit"
                sx={{
                  fontFamily: 'HarmonyOS Sans',
                  fontWeight: 700,
                  color: '#000',
                  backgroundColor: '#F6F6F4',
                  borderRadius: '8px',
                  marginRight: '15px',
                  width: '50%',
                  textTransform: 'capitalize',
                  fontSize: '16px',
                }}
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                size="medium"
                disableElevation
                variant="contained"
                type="submit"
                sx={{
                  fontFamily: 'HarmonyOS Sans',
                  fontWeight: 700,
                  color: '#000',
                  borderRadius: '8px',
                  width: '50%',
                  textTransform: 'capitalize',
                  fontSize: '16px',
                }}
                onClick={() => {
                  navigate(pageURL.position);
                }}
              >
                Manage Position
              </Button>
            </Box>
          ) : (
            <Button
              size="medium"
              disableElevation
              variant="contained"
              type="submit"
              sx={{
                fontFamily: 'HarmonyOS Sans',
                fontWeight: 700,
                color: '#000',
                borderRadius: '8px',
                marginRight: '15px',
                width: '50%',
                textTransform: 'capitalize',
                fontSize: '16px',
              }}
              onClick={onClose}
            >
              Close
            </Button>
          )}
        </Box>

        {/* <Box position="absolute" top={16} right={16}>
          <IconButton onClick={onClose}>
            <SvgIcon sx={{ fontSize: 18 }} component={CloseSVG} inheritViewBox />
          </IconButton>
        </Box> */}
      </DialogContent>
    </Dialog>
  );
};

AutoInvestResult.defaultProps = {
  data: {
    explorerUrl: '',
    token: '',
    coin: '',
  },
};

export default AutoInvestResult;
