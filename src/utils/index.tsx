import { format, addHours, addDays, addMonths, getUnixTime } from 'date-fns';

type IChartInterval = '1h' | '1d' | '3d' | '1w' | '1m' | '1y';

interface IIntervalResponse {
  start: number | Date;
  end: number | Date;
}

export const formatDate = (date: number | Date) =>
  format(date, 'dd/MM/yy HH:mm ');

export const formatCurrency = (currency: string) =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  }).format;

export const getDatesByInterval = (
  date: number | Date,
  interval: IChartInterval,
): IIntervalResponse | undefined => {
  switch (interval) {
    case '1h':
      return { start: getUnixTime(addHours(date, -1)), end: getUnixTime(date) };
    case '1d':
      return { start: getUnixTime(addDays(date, -1)), end: getUnixTime(date) };
    case '3d':
      return { start: getUnixTime(addDays(date, -3)), end: getUnixTime(date) };
    case '1w':
      return { start: getUnixTime(addDays(date, -7)), end: getUnixTime(date) };
    case '1m':
      return {
        start: getUnixTime(addMonths(date, -1)),
        end: getUnixTime(date),
      };
    case '1y':
      return {
        start: getUnixTime(addMonths(date, -12)),
        end: getUnixTime(date),
      };
    default:
      break;
  }
};
