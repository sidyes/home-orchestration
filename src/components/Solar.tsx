import React, { useEffect } from "react";

import { useStore } from "@nanostores/react";
import {
  getSolarData,
  showSolarConfig,
  solarConf,
  solarResult,
} from "../solare-store";
import SolarConfigModalComponent from "./SolarConfigModal";
import SolarForecastComponent from "./SolarForecast";

const SolarComponent: React.FC = () => {
  const $showConfig = useStore(showSolarConfig);
  const $solarConfig = useStore(solarConf);
  const $solarResult = useStore(solarResult);

  useEffect(() => {
    getSolarData(false);
  }, []);

  return (
    <div className="relative w-full max-w-6xl">
      <h1 className="text-6xl font-normal leading-normal mt-0 mb-2 text-pink-800">
        Solar Forecast
      </h1>
      {$showConfig ? (
        <SolarConfigModalComponent
          initialValues={$solarConfig}
          onSubmitConfig={(data) => {
            solarConf.set(data);
            showSolarConfig.set(false);
            getSolarData(true);
          }}
        />
      ) : (
        <SolarForecastComponent
          solarData={$solarResult}
          onShowConfig={() => showSolarConfig.set(true)}
        />
      )}
    </div>
  );
};

export default SolarComponent;
