import { BigNumberish } from 'ethers';
import { PositionController } from '_src/typechain-types';
import { PromiseOrValue } from '_src/typechain-types/common';
import { OrderTypes } from '_src/typechain-types/contracts/controllers/PositionController';

interface ICreatePosition {
  contract: PositionController;
  chainId: number;
  amount: PromiseOrValue<BigNumberish>;
  strategy: string;
  account: string;
  from: string;
  to: string;
  interval: PromiseOrValue<BigNumberish>;
  firstTime: PromiseOrValue<BigNumberish>;
  buyNow: PromiseOrValue<boolean>;
}

export const createPosition = async (data: ICreatePosition) => {
  const { contract, account, from, to, amount, interval, strategy, firstTime, buyNow } = data;

  const orderParams: OrderTypes.OrderParamsStruct = {
    owner: account, // 当前用户
    strategy, // 默认为 '', DCA 策略
    from, // USDT 支付币种
    to, // 买进的 BTC 币种
    amount, // USDT 支付币种的金额，买多少U的BTC
    interval, // 天：24 * 3600, 周： 7 * 24 * 3600, 2周：14 * 24 * 3600, 月：30 * 24 * 3600
    buyNow, // 是否立即定投
    firstTime, // 开始定投的时间 08:00 ， 12.8 + 1 + 定投时间
    slippage: 0, // 默认：0, 划点 允许损失多少 金额，购买BTC，0不生效，>0 生效
    priceLimit: 0, // 默认：0, 低于BTC的现价，才进行购买，0不生效，>0 生效
    endTime: 0, // 默认：0, 0 不生效
    params: '0x',
  };

  console.log(orderParams);
  const transaction = await contract.createPosition(orderParams);

  console.log(`Create Position: ${transaction.hash}`);
  return await transaction.wait();
};
