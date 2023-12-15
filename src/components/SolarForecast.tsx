import React from "react";
import type { WattHourEntry } from "../solare-store";

import moment from "moment";

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
  console.log(JSON.stringify(solarData));
  let currentDay;

  return (
    <div className="flex flex-col py-8 w-fit mx-auto">
      {solarData?.map((entry, idx) => {
        if (idx === 0) return;

        let showDate = false;

        const absoluteVal = entry.value - solarData[idx - 1].value;
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

        // TODO: use kwp to get % of max values and define correct icon to show

        return (
          <div className="grid grid-cols-2 gap-8 py-2">
            {showDate && <div className="col-span-2">{day}</div>}
            <div className="flex items-center">{timeRange}</div>
            <div className="flex items-center">
              <i className="wi wi-night-sleet mr-2 h-14 w-14 text-4xl text-purple-400"></i>{" "}
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
