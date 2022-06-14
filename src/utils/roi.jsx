import _ from 'lodash';

export const getPeriodReward = (secondsAmount, blocksPerSecond, rewardPerBlock) => {
  return secondsAmount * blocksPerSecond * rewardPerBlock;
};

