module.exports = [{"inputs":[{"internalType":"address","name":"narfexTokenAddress","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_commissionInterval","type":"uint256"},{"internalType":"uint256","name":"_harvestInterval","type":"uint256"},{"internalType":"uint256","name":"_earlyHarvestCommission","type":"uint256"},{"internalType":"bool","name":"_isUnrewardEarlyWithdrawals","type":"bool"},{"internalType":"uint256","name":"_rewardCancelInterval","type":"uint256"},{"internalType":"uint256","name":"_referralPercent","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":true,"internalType":"uint256","name":"block","type":"uint256"}],"name":"ClearReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardPerBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolIndex","type":"uint256"}],"name":"CreatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"block","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolSize","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":true,"internalType":"uint256","name":"block","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"commission","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"block","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolSize","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"commissionInterval","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"createPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"defaultRewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"referAgent","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earlyHarvestCommission","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"address","name":"userAddress","type":"address"}],"name":"getIsEarlyHarvest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"address","name":"userAddress","type":"address"}],"name":"getIsUserCanHarvest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNarfexLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"}],"name":"getPoolSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPoolsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSettings","outputs":[{"internalType":"uint256","name":"uintDefaultRewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"uintCommissionInterval","type":"uint256"},{"internalType":"uint256","name":"uintHarvestInterval","type":"uint256"},{"internalType":"uint256","name":"uintEarlyHarvestCommission","type":"uint256"},{"internalType":"bool","name":"boolIsUnrewardEarlyWithdrawals","type":"bool"},{"internalType":"uint256","name":"uintRewardCancelInterval","type":"uint256"},{"internalType":"uint256","name":"uintReferralPercent","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserLastHarvestBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserPoolSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"}],"name":"harvest","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvestInterval","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isUnrewardEarlyWithdrawals","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"pools","outputs":[{"internalType":"contract IBEP20","name":"token","type":"address"},{"internalType":"uint256","name":"rewardPerBlock","type":"uint256"},{"internalType":"bool","name":"isExists","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolsList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"referralPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardCancelInterval","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"interval","type":"uint256"}],"name":"setCommissionInterval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"setDefaultRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"percents","type":"uint256"}],"name":"setEarlyHarvesCommission","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"interval","type":"uint256"}],"name":"setHarvestInterval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"setPoolRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"setReferralPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"interval","type":"uint256"}],"name":"setRewardCancelInterval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"agent","type":"address"}],"name":"setUserReferAgent","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toggleRewardClearingForEarlyWithdrawals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"updateAllPoolsRewardsSizes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawNarfex","outputs":[],"stateMutability":"nonpayable","type":"function"}];