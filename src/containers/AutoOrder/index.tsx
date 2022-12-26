import { useEffect, useMemo, useState } from 'react';
import { Box, Button, FormHelperText, MenuItem, Select, Snackbar, Typography } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputAttributes, NumericFormat } from 'react-number-format';

import InputAmount from '_components/InputAmount';
import ChainBTCSVG from '_assets/icons/coin_btc.svg';
import ChainUSDTSVG from '_assets/icons/coin_usdt.svg';
import AutoCycle from '_containers/AutoCycle';
import services, { EvmService } from '_src/services';
import { useErc20Contract, useImmerModal, usePositionControllerContract } from '_src/hooks';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import AutoSetting, { AutoSettingType } from '_containers/AutoSetting';
import SelectToken, { TokenType } from '_components/SelectToken';
import AutoInvestResult from '_components/AutoInvestResult';
import { NETWORK } from '_constants/chainInfo';
import { getAutoCycle } from '_src/utils';
import React from 'react';
import { useImmer } from 'use-immer';
import { LoadingButton } from '@mui/lab';
import { useSnapshot } from 'valtio';
import { ChainStore } from '_src/stores/ChainStore';
import { switchNetwork } from '_components/ConnectWalletWrap/switchNetwork';
import { useNavigate } from 'react-router-dom';
import pageURL from '_constants/pageURL';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<typeof NumericFormat<InputAttributes>, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        allowNegative={false}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
      />
    );
  },
);

interface IAutoOrder {
  isEdit?: boolean;
  chainName: string;
  tokenList: TokenType[];
  coinList: TokenType[];
  defaultToken?: TokenType;
}

type FormValues = {
  amount: string;
  cycle: string;
};

const schema = yup
  .object({
    amount: yup.string().required('Please enter the amount'),
    cycle: yup.string().required('Please enter the time'),
  })
  .required();

const AutoOrder: React.FC<IAutoOrder> = ({ isEdit, chainName, tokenList, defaultToken, coinList }) => {
  const navigate = useNavigate();
  const { chainId, account, connector } = useWeb3React();
  const chainList = useSnapshot(ChainStore);
  const [autoInvestResult, setAutoInvestResult] = useImmer<{
    open: boolean;
    data?: {
      explorerUrl: string;
      token: string;
      coin: string;
    };
    type: boolean;
  }>({
    open: false,
    data: {
      explorerUrl: '',
      token: '',
      coin: '',
    },
    type: false,
  });
  const erc20Contract = useErc20Contract('0x3d119231CC7a939b5D2831de3ff05886EEbD2871');

  const positionControllerContract = usePositionControllerContract();

  const { control, handleSubmit, reset, watch, formState } = useForm<FormValues>({
    defaultValues: {
      amount: '',
      cycle: '1',
    },
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const [allowance, setAllowance] = useState<bigint>(0n);
  const [isApprove, setIsApprove] = useState<boolean>(true);
  const [isSubmit, setIsSubmit] = useState<boolean>(true);
  const [loadingState, handleToggleLoading] = useImmerModal({
    approve: false,
    invest: false,
  });

  const [coin, setCoin] = useState<TokenType & { balance: string; decimals: string }>();
  const [token, setToken] = useState<TokenType>();
  const [setting, setSetting] = useState<AutoSettingType>({
    firstTime: 0,
    buyNow: true,
  });
  // const [autoCycle, setAutoCycle] = useState<string[]>(['daily', '']);
  const [cycleUint, setCycleUint] = useState<'Minute' | 'Hour' | 'Day' | 'Week' | 'Month'>('Day');

  const { errors } = formState;
  const amount = watch('amount');

  useEffect(() => {
    if (defaultToken) {
      setToken(defaultToken);
    } else {
      setToken(tokenList[0]);
    }
  }, [tokenList, defaultToken]);

  useEffect(() => {
    if (coinList.length > 0 && account != '') {
      const _chainId = chainList?.data.find((item) => item.chainName == chainName)?.chainId;
      if (chainId == Number(_chainId)) {
        console.log(chainId, _chainId);
        Promise.all([
          EvmService.erc20.decimals(erc20Contract.attach(coinList[0].address)),
          EvmService.erc20.balanceOf(erc20Contract.attach(coinList[0].address), account),
        ]).then(([decimals, balance]) => {
          setCoin({ ...coinList[0], decimals: decimals.toString(), balance: balance.toString() });
        });
      } else {
        setCoin({ ...coinList[0], decimals: '0', balance: '0' });
      }
    }
  }, [coinList, account]);

  const getErc20ContractBaseData = async () => {
    const [allowance, decimals, balance] = await Promise.all([
      EvmService.erc20.allowance(erc20Contract.attach(coin.address), account, chainId),
      EvmService.erc20.decimals(erc20Contract.attach(coin.address)),
      EvmService.erc20.balanceOf(erc20Contract.attach(coin.address), account),
    ]);
    setAllowance(allowance.toBigInt());
    setCoin({ ...coin, decimals: decimals.toString(), balance: balance.toString() });
  };

  const isApproveFunction = async () => {
    if (amount.trim() != '' && amount != '0' && amount != '0.' && coin?.decimals) {
      const sendAmount = ethers.utils.parseUnits(amount, coin.decimals);

      const isApproveDisabled = sendAmount.lte(ethers.BigNumber.from(allowance));

      setIsSubmit(!isApproveDisabled);
      setIsApprove(isApproveDisabled);
    } else {
      setIsApprove(true);
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    if (chainId && account && coin?.address) {
      getErc20ContractBaseData();
    }
  }, [chainId, account, coin?.address]);

  useEffect(() => {
    if (chainId && account && coin?.address) {
      isApproveFunction();
    }
  }, [chainId, account, coin, amount]);

  const handleOnClickApprove = async () => {
    handleToggleLoading('approve', true);

    try {
      const sendAmount = ethers.utils.parseEther(amount);

      if (ethers.BigNumber.from(allowance).lt(sendAmount)) {
        const totalSupply = await erc20Contract.attach(coin.address).totalSupply();
        await EvmService.erc20.approve(erc20Contract.attach(coin.address), chainId, totalSupply);
        setIsApprove(true);
        setAllowance(totalSupply.toBigInt());
        setIsSubmit(false);
      }
    } catch (error) {
      // handleToggleLoading('approve', false);
    } finally {
      handleToggleLoading('approve', false);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    handleToggleLoading('invest', true);

    try {
      const { contracts, blockExplorerUrls } = NETWORK[chainId];
      const { amount } = data;
      const { interval, firstTime } = getAutoCycle({ time: data.cycle, uint: cycleUint }, setting.firstTime);

      const decimals = await EvmService.erc20.decimals(erc20Contract.attach(coin.address));

      const sendAmount = ethers.utils.parseUnits(amount, decimals);

      const result = await EvmService.positionController.createPosition({
        contract: positionControllerContract,
        chainId,
        amount: sendAmount,
        account,
        from: coin.address,
        to: token.address,
        interval,
        firstTime: firstTime,
        buyNow: setting.buyNow,
        strategy: contracts.DCA_STRATEGY_ADDRESS,
      });
      console.log('交易成功', result);

      setAutoInvestResult((state) => {
        state.open = true;
        state.data = {
          explorerUrl: `${blockExplorerUrls}/tx/${result.transactionHash}`,
          token: token.name,
          coin: coin.name,
        };
        state.type = result.status == 1;
      });
    } catch (error) {
      setAutoInvestResult((state) => {
        state.open = true;
        state.data = {
          explorerUrl: '',
          token: '',
          coin: '',
        };
        state.type = false;
      });
    } finally {
      handleToggleLoading('invest', false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AutoInvestResult
        open={autoInvestResult.open}
        data={autoInvestResult.data}
        type={autoInvestResult.type}
        onClose={() => {
          setAutoInvestResult((state) => {
            state.open = false;
            state.data = {
              explorerUrl: '',
              token: '',
              coin: '',
            };
            state.type = false;
          });
        }}
      />
      <Box
        sx={{
          width: '420px',
          borderRadius: '12px',
          boxShadow: '0px 1px 25px rgba(19, 33, 82, 0.1), 0px 0px 4px rgba(19, 33, 82, 0.06)',
          padding: '32px 24px',
          backgroundColor: '#fefefe',
        }}
      >
        <Box mb="24px" display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography color="#333" sx={{ fontSize: '20px', fontWeight: 700, fontFamily: 'Inter' }}>
              Invest
            </Typography>
            <SelectToken
              data={tokenList}
              disabled={!isEdit}
              onChangeV2={(value) => {
                setToken(value);
                console.log(value);
                navigate(
                  pageURL.autoInvest
                    .replace(':chainName', value.data.chainName)
                    .replace(':coinId', value.data.id)
                    .replace(':coinAddress', value.address),
                );
              }}
              value={token}
            />
          </Box>
          <AutoSetting
            value={setting}
            onChange={(value) => {
              setSetting(value);
            }}
          />
        </Box>
        <Typography color="#333" mb="6px" sx={{ fontSize: '14px' }}>
          Amount Per Period
        </Typography>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => {
            return (
              <InputAmount
                {...field}
                placeholder="0"
                sx={{ paddingRight: '14px', fontSize: '18px', fontWeight: 700, fontFamily: 'HarmonyOS Sans' }}
                inputComponent={NumericFormatCustom as any}
                endAdornment={
                  <SelectToken
                    data={coinList}
                    value={coin}
                    disabled={!isEdit}
                    onChangeV2={async (value) => {
                      const [decimals, balance] = await Promise.all([
                        EvmService.erc20.decimals(erc20Contract.attach(value.address)),
                        EvmService.erc20.balanceOf(erc20Contract.attach(value.address), account),
                      ]);
                      setCoin({ ...value, decimals: decimals.toString(), balance: balance.toString() });
                    }}
                  />
                }
              />
            );
          }}
        />
        <Box display="flex" mb="20px" alignItems="center" justifyContent="space-between">
          <FormHelperText sx={{ height: '16px', fontSize: '12px', color: 'rgba(248, 87, 87, 0.854)' }}>
            {errors?.amount && errors.amount.message}
          </FormHelperText>
          <Typography color="#333" sx={{ fontSize: '12px', fontFamily: 'HarmonyOS Sans' }}>
            Available&nbsp;
            <span style={{ fontWeight: 500 }}>
              {Number(ethers.utils.formatUnits(coin?.balance ?? 0, coin?.decimals ?? 0)).toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 8,
                currency: 'USD',
              })}
              &nbsp;Max
            </span>
          </Typography>
        </Box>

        <Typography color="#333" mb="6px" sx={{ fontSize: '14px' }}>
          Invest Schedule
        </Typography>
        {/* <AutoCycle
          onChangeV2={(value) => {
            setAutoCycle(value);
          }}
          style={{ marginBottom: '36px' }}
        /> */}
        <Controller
          name="cycle"
          control={control}
          render={({ field }) => {
            return (
              <InputAmount
                {...field}
                placeholder="0"
                sx={{ paddingRight: '14px', fontSize: '18px', fontWeight: 700, fontFamily: 'HarmonyOS Sans' }}
                inputComponent={NumericFormatCustom as any}
                endAdornment={
                  <Select
                    value={cycleUint}
                    displayEmpty
                    onChange={(event) => {
                      setCycleUint(event.target.value as any);
                    }}
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
                    }}
                    style={{
                      height: '24px',
                      backgroundColor: 'transparent',
                    }}
                  >
                    {['Minute', 'Hour', 'Day', 'Week', 'Month'].map((item) => {
                      return (
                        <MenuItem value={item} key={item} style={{ height: '48px' }}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                }
              />
            );
          }}
        />
        <Box display="flex" mb="20px" alignItems="center" justifyContent="space-between">
          <FormHelperText sx={{ height: '16px', fontSize: '12px', color: 'rgba(248, 87, 87, 0.854)' }}>
            {errors?.cycle && errors.cycle.message}
          </FormHelperText>
        </Box>
        {chainList?.data.find((item) => item.chainName == chainName)?.chainId == String(chainId) ? (
          !isSubmit ? (
            <LoadingButton
              size="medium"
              disableElevation
              variant="contained"
              type="submit"
              loading={loadingState.invest}
              sx={{
                fontFamily: 'HarmonyOS Sans',
                fontWeight: 700,
                color: '#000',
                borderRadius: '8px',
                width: '100%',
                textTransform: 'capitalize',
              }}
            >
              Auto-Invest
            </LoadingButton>
          ) : (
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <LoadingButton
                size="medium"
                disableElevation
                variant="contained"
                onClick={handleOnClickApprove}
                disabled={isApprove}
                loading={loadingState.approve}
                sx={{
                  fontFamily: 'HarmonyOS Sans',
                  fontWeight: 700,
                  color: '#000',
                  borderRadius: '8px',
                  width: '100%',
                  marginRight: '10px',
                  textTransform: 'capitalize',
                }}
              >
                Approve
              </LoadingButton>
              <LoadingButton
                size="medium"
                disableElevation
                variant="contained"
                type="submit"
                disabled={isSubmit}
                loading={loadingState.invest}
                sx={{
                  fontFamily: 'HarmonyOS Sans',
                  fontWeight: 700,
                  color: '#000',
                  borderRadius: '8px',
                  width: '100%',
                  textTransform: 'capitalize',
                }}
              >
                Auto-Invest
              </LoadingButton>
            </Box>
          )
        ) : (
          <Button
            size="medium"
            disableElevation
            variant="contained"
            sx={{
              fontFamily: 'HarmonyOS Sans',
              fontWeight: 700,
              color: '#000',
              borderRadius: '8px',
              width: '100%',
              textTransform: 'capitalize',
            }}
            onClick={async () => {
              const _chainId = chainList?.data.find((item) => item.chainName == chainName)?.chainId;
              console.log(chainName);
              await switchNetwork(connector.provider, Number(_chainId));
            }}
          >
            Switch Network
          </Button>
        )}
      </Box>
    </form>
  );
};

AutoOrder.defaultProps = {
  isEdit: true,
};
export default AutoOrder;
