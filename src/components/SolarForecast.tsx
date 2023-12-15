import React from "react";
import type { SolarForecast } from "../solare-store";

export interface Props {
  onShowConfig: () => void;
  solarData: SolarForecast;
}

const SolarForecastComponent: React.FC<Props> = ({
  onShowConfig,
  solarData,
}: Props) => {
  console.log(solarData);
  return (
    <div>
      Hello ForeCast
      <i className="wi wi-night-sleet"></i>
      <button onClick={() => onShowConfig()}> Show Config </button>
    </div>
  );
};

export default SolarForecastComponent;
