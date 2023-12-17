import React, { useEffect, useState } from "react";
import type { WattHourEntry } from "../solare-store";
import { FaRegThumbsUp } from "@react-icons/all-files/fa/FaRegThumbsUp";
import { FaRegThumbsDown } from "@react-icons/all-files/fa/FaRegThumbsDown";

import moment, { type Moment } from "moment";

export interface Props {
  onShowConfig: () => void;
  solarData: WattHourEntry[];
  kwp: number;
}

const SolarForecastComponent: React.FC<Props> = ({
  onShowConfig,
  solarData,
  kwp,
}: Props) => {
  let currentDay;

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => setDomLoaded(true), []);

  const getWeatherIcon = (wattHours: number, date: Moment) => {
    const rel = +(wattHours / (kwp * 1000)).toFixed(2);

    if (rel >= 0.7) {
      // sunny
      return <FaRegThumbsUp className="mr-4 h-8 w-8 text-green-400" />;
    } else if (rel > 0.3) {
      // partially sunny
      return (
        <FaRegThumbsUp className="mr-4 h-8 w-8 -rotate-90 text-yellow-400" />
      );
    } else {
      // cloudy / night
      return <FaRegThumbsDown className="mr-4 h-8 w-8  text-red-400" />;
    }
  };

  return (
    domLoaded && (
      <div className="flex flex-col py-8 w-fit mx-auto">
        {solarData?.map((entry, idx) => {
          if (idx === 0) return;

          let showDate = false;

          const absoluteVal = entry.value - solarData[idx - 1].value;
          if (absoluteVal < 0) return;

          const startDate = moment(solarData[idx - 1].date);
          const curr = moment(entry.date);

          const day = curr.format("D MMM YYYY");
          const timeRange = `${startDate.format("HH:mm")} - ${curr.format(
            "HH:mm"
          )}`;

          if (!currentDay || curr.diff(currentDay, "days") !== 0) {
            showDate = true;
            currentDay = curr;
          }

          return (
            <div className="grid grid-cols-2 gap-8 py-2" key={idx}>
              {showDate && <div className="col-span-2">{day}</div>}
              <div className="flex items-center">{timeRange}</div>
              <div className="flex items-center">
                {getWeatherIcon(absoluteVal, curr)}
                {absoluteVal} Wh
              </div>
            </div>
          );
        })}
        <button onClick={() => onShowConfig()}> Show Config </button>
      </div>
    )
  );
};

export default SolarForecastComponent;
