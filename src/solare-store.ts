import { persistentMap } from "@nanostores/persistent";
import axios from "axios";
import { action, atom, onMount } from "nanostores";

export const showSolarConfig = atom(false);

export type SolarConfig = {
  lat?: string;
  lon?: string;
  dec?: string;
  az?: string;
  kwp?: string;
};

export interface WattHourEntry {
  date: string;
  value: number;
}

export type SolarForecast = {
  executedLast?: string;
  wattHours?: WattHourEntry[];
};

export const solarConf = persistentMap<SolarConfig>(
  "solarConf",
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export const solarResult = persistentMap<SolarForecast>(
  "solarResult",
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

const getHoursDiffBetweenDates = (dateInitial: any, dateFinal: any) =>
  (dateFinal - dateInitial) / (1000 * 3600);

const transformObjToArr = (resp: { [key: string]: string }) => {
  const result: WattHourEntry[] = [];

  Object.keys(resp).forEach((elem) => {
    result.push({
      date: elem,
      value: +resp[elem],
    });
  });

  return result;
};

export const getSolarData = action(
  solarResult,
  "getSolarData",
  async (store, enforce: boolean) => {
    const { lat, lon, dec, az, kwp } = solarConf.get();

    // it is enough when already one property is undefined
    if (lat === undefined) {
      return store.get();
    }

    const { executedLast } = solarResult.get();

    let loadData = executedLast === undefined;

    if (!loadData) {
      const diff = getHoursDiffBetweenDates(
        new Date(executedLast as string),
        new Date()
      );

      // only load solar data if last time was > 1h ago and config is available
      loadData = diff > 1 && Object.keys(solarConf).length !== 0;
    }

    if (loadData || enforce) {
      const response = await axios.get(
        `https://api.forecast.solar/estimate/watthours/${lat}/${lon}/${dec}/${az}/${kwp}`
      );

      const update = {
        executedLast: new Date().toISOString(),
        wattHours: transformObjToArr(response.data.result),
      };
      store.set(update);
    }

    return store.get();
  }
);
