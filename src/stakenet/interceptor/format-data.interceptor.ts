import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StakenetPropertyEnum } from '../enum/stakenet-property.enum';
import { ethers } from 'ethers';

export interface Response<T> {
  data: T;
}

@Injectable()
export class FormatDataInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const args = context.getArgs();
        const { property } = args[0].query;

        if (!property) {
          if (typeof data !== 'bigint') {
            return { data };
          } else {
            return { data: data.toString() };
          }
        }

        const {
          lockDurationInSeconds,
          userStakedTimestamp,
          allowance,
          totalRewards,
          rewards,
          contractStakeLimit,
          userStakeLimit,
          userMinimumStake,
          calculateMinStake,
          totalSupply,
          balanceOf,
          userData,
        } = StakenetPropertyEnum;

        //Data type is seconds
        if ([lockDurationInSeconds].includes(property)) {
          if (typeof data === 'string') {
            try {
              data = BigInt(data);
            } catch (error) {
              return { data };
            }
          }

          if (typeof data !== 'bigint' && typeof data !== 'number') {
            return { data };
          }

          const lockDurationInSeconds = BigInt(data);

          let result: {
            data: {
              raw: number | string;
              lockDurationIn: {
                days: number | string;
                hours: number | string;
                minutes: number | string;
                seconds: number | string;
                milliseconds: number | string;
              };
            };
          } = {
            data: {
              raw: lockDurationInSeconds.toString(),
              lockDurationIn: {
                days: (lockDurationInSeconds / 86400n).toString(),
                hours: (lockDurationInSeconds / 3600n).toString(),
                minutes: (lockDurationInSeconds / 60n).toString(),
                seconds: lockDurationInSeconds.toString(),
                milliseconds: (lockDurationInSeconds * 1000n).toString(),
              },
            },
          };

          if (lockDurationInSeconds <= Number.MAX_SAFE_INTEGER) {
            const lockDurationInSecondsNumber = Number(lockDurationInSeconds);
            result.data.raw = lockDurationInSecondsNumber;
            result.data.lockDurationIn.days =
              lockDurationInSecondsNumber / 86400;
            result.data.lockDurationIn.hours =
              lockDurationInSecondsNumber / 3600;
            result.data.lockDurationIn.minutes =
              lockDurationInSecondsNumber / 60;
            result.data.lockDurationIn.seconds = lockDurationInSecondsNumber;
            result.data.lockDurationIn.milliseconds =
              lockDurationInSecondsNumber * 1000;
          }

          return result;
        }

        if ([userStakedTimestamp].includes(property)) {
          if (typeof data === 'string') {
            const dataToNumber = Number(data);

            if (isNaN(dataToNumber)) {
              return { data };
            }

            data = dataToNumber;
          }

          if (typeof data !== 'bigint' && typeof data !== 'number') {
            return { data };
          }

          const numberTimestamp = Number(data);

          return {
            data: {
              raw: numberTimestamp,
              userStakedTimestamp: {
                timestampInSeconds: numberTimestamp,
                timestampInMilliseconds: numberTimestamp * 1000,
                dateObject: this.formatDate(new Date(numberTimestamp * 1000)),
              },
            },
          };
        }

        if (
          [
            allowance,
            totalRewards,
            rewards,
            contractStakeLimit,
            userStakeLimit,
            userMinimumStake,
            calculateMinStake,
            totalSupply,
            balanceOf,
          ].includes(property)
        ) {
          if (typeof data === 'string') {
            try {
              data = BigInt(data);
            } catch (error) {
              return { data };
            }
          }

          if (typeof data !== 'bigint' && typeof data !== 'number') {
            return { data };
          }

          const result = {
            data: {
              raw: data.toString(),
            },
          };

          result.data[property] = {
            wei: ethers.formatUnits(data, 'wei'),
            gwei: ethers.formatUnits(data, 'gwei'),
            ether: ethers.formatEther(data),
          };

          return result;
        }

        if (property === userData) {
          const {
            userHasPosition,
            balance,
            reward,
            userHasStaked,
            userStakedTimestamp,
            lockDurationInSeconds,
          } = data;

          const stakeDate = new Date(Number(userStakedTimestamp * 1000n));

          const canWithdrawAfter = new Date(
            Number((userStakedTimestamp + lockDurationInSeconds) * 1000n),
          );

          const balanceFormatted = {
            wei: ethers.formatUnits(balance, 'wei'),
            gwei: ethers.formatUnits(balance, 'gwei'),
            ether: ethers.formatEther(balance),
          };

          const rewardFormatted = {
            wei: ethers.formatUnits(reward, 'wei'),
            gwei: ethers.formatUnits(reward, 'gwei'),
            ether: ethers.formatEther(reward),
          };

          return {
            data: {
              userHasPosition,
              balance: balanceFormatted,
              reward: rewardFormatted,
              userHasStaked,
              userStakedTimestamp: {
                timestamp: Number(userStakedTimestamp),
                timestampInMilliseconds: Number(userStakedTimestamp) * 1000,
                dateObject:
                  Number(userStakedTimestamp) > 0
                    ? this.formatDate(stakeDate)
                    : 0,
              },
              canWithdrawAfter: {
                timestamp:
                  Number(userStakedTimestamp) > 0
                    ? Number(userStakedTimestamp) +
                      Number(lockDurationInSeconds)
                    : 0,
                timestampInMilliseconds:
                  Number(userStakedTimestamp) > 0
                    ? (Number(userStakedTimestamp) +
                        Number(lockDurationInSeconds)) *
                      1000
                    : 0,
                dateObject:
                  Number(userStakedTimestamp) > 0
                    ? this.formatDate(canWithdrawAfter)
                    : 0,
              },
            },
          };
        }

        if (typeof data !== 'bigint') {
          return { data };
        } else {
          return { data: data.toString() };
        }
      }),
    );
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
