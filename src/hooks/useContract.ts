import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';

import { PositionController, PositionRegistry, ERC20 } from '_src/typechain-types';
import PositionControllerABI from '_src/abis/PositionController.json';
import PositionRegistryABI from '_src/abis/PositionRegistry.json';

import ERC20ABI from '_src/abis/ERC20.json';

import { getContract } from '../utils';

import { NETWORK } from '_src/constants/chainInfo';

export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { provider, account, chainId } = useWeb3React();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !provider || !chainId) return null;
    let address: string | undefined;
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];

    if (!address) return null;
    try {
      return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [addressOrAddressMap, ABI, provider, chainId, withSignerIfPossible, account]) as T;
}

export function usePositionControllerContract() {
  const { chainId } = useWeb3React();
  const address = chainId ? NETWORK[chainId]?.contracts?.POSITION_CONTROLLER_ADDRESS : undefined;
  return useContract<PositionController>(address, PositionControllerABI, true);
}

export function usePositionRegistryContract() {
  const { chainId } = useWeb3React();
  const address = chainId ? NETWORK[chainId]?.contracts?.POSITION_REGISTRY_ADDRESS : undefined;
  return useContract<PositionRegistry>(address, PositionRegistryABI, true);
}

export function useErc20Contract(contractAddress: string) {
  return useContract<ERC20>(contractAddress, ERC20ABI, true);
}
