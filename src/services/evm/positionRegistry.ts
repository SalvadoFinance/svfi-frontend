import { BigNumberish, BytesLike } from 'ethers';
import { PositionRegistry } from '_src/typechain-types';
import { PromiseOrValue } from '_src/typechain-types/common';

interface IRotatePosition {
  contract: PositionRegistry;
  positionId: PromiseOrValue<BytesLike>;
  status: PromiseOrValue<BigNumberish>;
}

export const rotatePosition = async (data: IRotatePosition) => {
  const { contract, positionId, status } = data;
  const transaction = await contract.rotatePosition(positionId, status);
  console.log(`Rotate Position: ${transaction.hash}`);
  return await transaction.wait();
};
