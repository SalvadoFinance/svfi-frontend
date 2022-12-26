import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import type { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers';
import { ethers } from 'ethers';

function getSigner(provider: JsonRpcProvider, account: string): JsonRpcSigner {
  return provider.getSigner(account).connectUnchecked();
}

function getProviderOrSigner(provider: JsonRpcProvider, account?: string): JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(provider, account) : provider;
}

export function isAddress(value: any): string | false {
  try {
    return ethers.utils.getAddress(value);
  } catch {
    return false;
  }
}

export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function getContract<T extends Contract = Contract>(
  address: string,
  ABI: any,
  provider: JsonRpcProvider,
  account?: string,
): T | null {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  try {
    return new Contract(address, ABI, getProviderOrSigner(provider, account)) as T;
  } catch (error) {
    return null;
  }
}
