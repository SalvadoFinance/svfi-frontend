import dayjs from 'dayjs';
import { BigNumberish } from 'ethers';
import { PromiseOrValue } from '_src/typechain-types/common';

interface IAutoCycle {
  interval: PromiseOrValue<BigNumberish>;
  firstTime: PromiseOrValue<BigNumberish>;
}

export const getAutoCycle = (
  data: { time: string; uint: 'Minute' | 'Hour' | 'Day' | 'Week' | 'Month' },
  settingFirstTime: number,
): IAutoCycle => {
  const { time, uint } = data;

  const result: IAutoCycle = {
    interval: '',
    firstTime: '',
  };

  if (uint == 'Minute') {
    result.interval = Number(time) * 60;
    result.firstTime = dayjs().add(result.interval, 'second').unix();
  } else if (uint == 'Hour') {
    result.interval = Number(time) * 3600;
    result.firstTime = dayjs().add(result.interval, 'second').unix();
  } else if (uint == 'Day') {
    result.interval = Number(time) * 24 * 3600;
    result.firstTime = dayjs().add(result.interval, 'second').add(settingFirstTime, 'hour').unix();
  } else if (uint == 'Week') {
    result.interval = Number(time) * 7 * 24 * 3600;
    result.firstTime = dayjs().add(result.interval, 'second').add(settingFirstTime, 'hour').unix();
  } else if (uint == 'Month') {
    result.interval = Number(time) * 30 * 24 * 3600;
    result.firstTime = dayjs().add(result.interval, 'second').add(settingFirstTime, 'hour').unix();
  }

  return result;
};
