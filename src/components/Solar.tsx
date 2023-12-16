import React, { useEffect, useState } from "react";

import { useStore } from "@nanostores/react";
import {
  getSolarData,
  showSolarConfig,
  solarConf,
  solarResult,
  type WattHourEntry,
} from "../solare-store";
import SolarConfigModalComponent from "./SolarConfigModal";
import SolarForecastComponent from "./SolarForecast";
import { onMount } from "nanostores";

const SolarComponent: React.FC = () => {
  const [showSolarConf, setShowSolarConf] = useState(false);

  const $showConfig = useStore(showSolarConfig);
  const $solarConfig = useStore(solarConf);
  const $solarResult = useStore(solarResult);

  onMount(solarConf, () => {
    if (Object.keys(solarConf.get()).length === 0) {
      showSolarConfig.set(true);
    }
  });

  useEffect(() => {
    getSolarData(false, $solarConfig);
    setShowSolarConf($showConfig);
  }, [$showConfig, $solarConfig]);

  return (
    <div className="relative w-full max-w-6xl text-center">
      <h1 className="text-6xl font-normal leading-normal mt-0 mb-2 text-purple-900">
        Solar Forecast
      </h1>
      {showSolarConf ? (
        <SolarConfigModalComponent
          initialValues={$solarConfig}
          onSubmitConfig={(data) => {
            solarConf.set(data);
            showSolarConfig.set(false);
            getSolarData(true, data);
          }}
        />
      ) : (
        <SolarForecastComponent
          solarData={$solarResult?.wattHours as WattHourEntry[] ?? []}
          onShowConfig={() => showSolarConfig.set(true)}
          kwp={$solarConfig?.kwp}
        />
      )}
    </div>
  );
};

export default SolarComponent;
