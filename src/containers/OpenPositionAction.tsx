import { Dialog, DialogContent, IconButton, ListItemIcon, ListItemText, Popover, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '_components/MenuItem';
import EditSVG from '_assets/icons/edit.svg';
import RemoveSVG from '_assets/icons/remove.svg';
import SwitchButton from '_components/switchButton';
import { Position } from '_src/services/tokens/types';
import { usePositionRegistryContract } from '_src/hooks';
import { EvmService } from '_src/services';
import AutoOrder from './AutoOrder';

interface IOpenPositionAction {
  data: Position;
}

const OpenPositionAction: React.FC<IOpenPositionAction> = ({ data }) => {
  const [settingAnchorEl, setSettingAnchorEl] = useState<HTMLButtonElement | null>(null);
  const positionRegistryContract = usePositionRegistryContract();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // status=1是从暂停恢复， status =2是暂停，status =3 是终止
  // 1.Opening 2.Paused 3.Closed
  const [isSwitch, setIsSwitch] = useState(data.status === 'Opening');

  const handleOpenMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettingAnchorEl(event.currentTarget);
    console.log(data);
  };

  const handleOpenMenuClose = () => {
    setSettingAnchorEl(null);
  };

  const handleOnClickSwitch = async () => {
    try {
      await EvmService.positionRegistry.rotatePosition({
        contract: positionRegistryContract,
        positionId: data.positionId,
        status: isSwitch ? '2' : '1',
      });
      setIsSwitch(!isSwitch);
    } catch (error) {
      console.log('暂停失败');
    }
  };

  const handleOnClickClose = async () => {
    try {
      await EvmService.positionRegistry.rotatePosition({
        contract: positionRegistryContract,
        positionId: data.positionId,
        status: '3',
      });
      setIsSwitch(!isSwitch);
    } catch (error) {
      console.log('删除失败');
    }
  };

  return (
    <Fragment>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleOpenMenuClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        open={Boolean(settingAnchorEl)}
        anchorEl={settingAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleOpenMenuClose}
        PaperProps={{
          sx: {
            width: '144px',
            padding: '8px 0',
            backgroundColor: '#FEFEFE',
            boxShadow: '0px 1px 25px rgba(19, 33, 82, 0.1), 0px 0px 4px rgba(19, 33, 82, 0.06)',
            '& .MuiMenuItem-root': {
              height: '40px',
            },
          },
        }}
      >
        <MenuItem onClick={handleOnClickSwitch}>
          <ListItemIcon>
            <SwitchButton
              value={isSwitch}
              sx={{
                width: '24px',
                height: '15px',
              }}
              size="small"
            />
          </ListItemIcon>
          <ListItemText>ON/OFF</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsEdit(true);
          }}
        >
          <ListItemIcon>
            <EditSVG />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleOnClickClose}>
          <ListItemIcon>
            <RemoveSVG />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Popover>
      <Dialog
        PaperProps={{ sx: { borderRadius: 3 } }}
        open={isEdit}
        onClose={() => {
          setIsEdit(false);
        }}
      >
        <DialogContent sx={{ padding: 0 }}>
          <AutoOrder
            isEdit={false}
            tokenList={[
              {
                address: data.from.contractAddress,
                name: data.from.symbol,
                option: (
                  <MenuItem
                    value={data.from.contractAddress}
                    key={data.from.contractAddress}
                    style={{ height: '48px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={data.from.image} style={{ width: '24px', height: '24px', marginRight: '4px' }} />
                      <Typography
                        color="#000"
                        sx={{ fontSize: '20px', textTransform: 'capitalize', fontWeight: 500, fontFamily: 'Inter' }}
                      >
                        {data.from.symbol}
                      </Typography>
                    </div>
                  </MenuItem>
                ),
              },
            ]}
            coinList={[
              {
                address: data.to.contractAddress,
                name: data.to.symbol,
                option: (
                  <MenuItem value={data.to.contractAddress} key={data.to.contractAddress} style={{ height: '48px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={data.to.image} style={{ width: '24px', height: '24px', marginRight: '4px' }} />
                      <Typography
                        color="#000"
                        sx={{ fontSize: '20px', textTransform: 'capitalize', fontWeight: 500, fontFamily: 'Inter' }}
                      >
                        {data.to.symbol}
                      </Typography>
                    </div>
                  </MenuItem>
                ),
              },
            ]}
            chainName={data.chainName}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default OpenPositionAction;
