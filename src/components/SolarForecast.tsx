import React from "react";
import type { WattHourEntry } from "../solare-store";

export interface Props {
  onShowConfig: () => void;
  solarData: WattHourEntry[];
}

const SolarForecastComponent: React.FC<Props> = ({
  onShowConfig,
  solarData,
}: Props) => {
  console.log(JSON.stringify(solarData));
  return (
    <div className="flex flex-col py-8 w-fit mx-auto">
      {solarData?.map((entry, idx) => {
        const absoluteVal =
          idx === 0 ? entry.value : entry.value - solarData[idx - 1].value;
        return (
          <div className="grid grid-cols-2 gap-8 py-2">
            <div className="flex items-center">{entry.date}</div>
            <div className="flex items-center">
              <i className="wi wi-night-sleet mr-2 h-14 w-14 text-4xl"></i>{" "}
              {absoluteVal} Wh
            </div>
          </div>
        );
      })}
      <button onClick={() => onShowConfig()}> Show Config </button>
    </div>
  );
};

export default SolarForecastComponent;
