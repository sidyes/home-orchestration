import { persistentMap } from "@nanostores/persistent";
import { atom } from "nanostores";

export const isSolarLoaded = atom(false);

export type SolarConfig = {
  lat?: string;
};

export const solar = persistentMap<SolarConfig>(
  "solarConfig",
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
