import React from "react";

import { type SolarConfig } from "../solare-store";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  lat: number;
  lon: number;
  dec: number;
  az: number;
  kwp: number;
};

export interface Props {
  initialValues: SolarConfig;
  onSubmitConfig: (data: SolarConfig) => void;
}

const SolarConfigModalComponent: React.FC<Props> = ({
  initialValues,
  onSubmitConfig,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: initialValues as any,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmitConfig(data as unknown as SolarConfig);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        <label
          htmlFor="lat"
          className={`block font-bold text-sm mb-2 ${
            errors.lat ? "text-red-400" : "text-purple-400"
          }`}
        >
          Latitude
        </label>
        <input
          type="number"
          id="lat"
          className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-500 focus:bg-purple-600 ${
            errors.lat
              ? "text-red-300 border-red-400"
              : "text-purple-200 border-purple-400"
          }`}
          {...register("lat", { required: true, min: -90, max: 90 })}
        />
        {errors.lat && (
          <p className="text-red-500 text-sm mt-2">Latitude is required.</p>
        )}
      </div>

      <div className="mb-8">
        <label
          htmlFor="lon"
          className={`block font-bold text-sm mb-2 ${
            errors.lon ? "text-red-400" : "text-purple-400"
          }`}
        >
          Longitude
        </label>
        <input
          type="number"
          id="lon"
          className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-500 focus:bg-purple-600 ${
            errors.lon
              ? "text-red-300 border-red-400"
              : "text-purple-200 border-purple-400"
          }`}
          {...register("lon", { required: true, min: -180, max: 180 })}
        />
        {errors.lon && (
          <p className="text-red-500 text-sm mt-2">Longitude is required.</p>
        )}
      </div>

      <div className="mb-8">
        <label
          htmlFor="dec"
          className={`block font-bold text-sm mb-2 ${
            errors.lon ? "text-red-400" : "text-purple-400"
          }`}
        >
          Solar Panel Declination (0 = horizontal, 90 = vertical)
        </label>
        <input
          type="number"
          id="dec"
          className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-500 focus:bg-purple-600 ${
            errors.dec
              ? "text-red-300 border-red-400"
              : "text-purple-200 border-purple-400"
          }`}
          {...register("dec", { required: true, min: 0, max: 90 })}
        />
        {errors.dec && (
          <p className="text-red-500 text-sm mt-2">Declination is required.</p>
        )}
      </div>

      <div className="mb-8">
        <label
          htmlFor="az"
          className={`block font-bold text-sm mb-2 ${
            errors.az ? "text-red-400" : "text-purple-400"
          }`}
        >
          Solar Panel Azimuth (West = 90, South = 0, East = -90)
        </label>
        <input
          type="number"
          id="az"
          className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-500 focus:bg-purple-600 ${
            errors.az
              ? "text-red-300 border-red-400"
              : "text-purple-200 border-purple-400"
          }`}
          {...register("az", { required: true, min: -90, max: 90 })}
        />
        {errors.az && (
          <p className="text-red-500 text-sm mt-2">Azimuth is required.</p>
        )}
      </div>

      <div className="mb-8">
        <label
          htmlFor="kwp"
          className={`block font-bold text-sm mb-2 ${
            errors.kwp ? "text-red-400" : "text-purple-400"
          }`}
        >
          Solar Panel Max. Peak Power in Kilo Watt
        </label>
        <input
          type="float"
          step="0.01"
          id="kwp"
          className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-500 focus:bg-purple-600 ${
            errors.kwp
              ? "text-red-300 border-red-400"
              : "text-purple-200 border-purple-400"
          }`}
          {...register("kwp", { required: true, min: 0 })}
        />
        {errors.kwp && (
          <p className="text-red-500 text-sm mt-2">Peak Power is required.</p>
        )}
      </div>

      <input type="submit" value="Save Settings" />
    </form>
  );
};

export default SolarConfigModalComponent;
