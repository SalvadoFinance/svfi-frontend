import { BigNumberish } from 'ethers';
import { NETWORK } from '_constants/chainInfo';
import { ERC20 } from '_src/typechain-types';
import { PromiseOrValue } from '_src/typechain-types/common';

export const approve = async (contract: ERC20, chainId: number, amount: PromiseOrValue<BigNumberish>) => {
  const positionControllerAddress = chainId ? NETWORK[chainId].contracts.POSITION_CONTROLLER_ADDRESS : undefined;
  const transaction = await contract.approve(positionControllerAddress, amount);
  console.log(`ERC20 Approve: ${transaction.hash}`);
  return await transaction.wait();
};

export const allowance = async (contract: ERC20, account: string, chainId: number) => {
  const positionControllerAddress = chainId ? NETWORK[chainId].contracts.POSITION_CONTROLLER_ADDRESS : undefined;
  const result = await contract.allowance(account, positionControllerAddress);

  return result;
};

export const decimals = async (contract: ERC20) => {
  return await contract.decimals();
};

export const balanceOf = async (contract: ERC20, account: string) => {
  return await contract.balanceOf(account);
};
