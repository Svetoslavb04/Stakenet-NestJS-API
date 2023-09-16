import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StakenetPropertyEnum } from '../enum/stakenet-property.enum';

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
          return { data: typeof data === 'bigint' ? data.toString() : data };
        }

        //Data type is seconds
        if ([StakenetPropertyEnum.lockDurationInSeconds].includes(property)) {
          const lockDurationInSeconds: bigint = data;

          let result: {
            data: {
              raw: string;
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

        if ([StakenetPropertyEnum.userStakedTimestamp].includes(property)) {
          const numberTimestamp = Number(data);

          return {
            data: {
              raw: numberTimestamp,
              userStakedTimestamp: {
                timestampInSeconds: numberTimestamp,
                timestampInMilliseconds: numberTimestamp * 1000,
                date: new Date(numberTimestamp * 1000),
              },
            },
          };
        }

        return { data: typeof data === 'bigint' ? data.toString() : data };
      }),
    );
  }
}
