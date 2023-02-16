import React from "react";

const CurrentLocation = ({
  name,
  country,
  latitude,
  longitude,
  temperature,
  weather,
  minTemp,
  maxTemp,
  pressure,
}) => {
  return (
    <div className="">
      <h1 className="mt-2 text-2xl font-bold">{name}</h1>
      <div className="w-[240px] text-left mt-1 pl-6 flex justify-between">
        <span className="font-bold">Country:</span> <span>{country}</span>
      </div>
      <div className="w-[240px] text-left mt-1 pl-6 flex justify-between">
        <span className="font-bold">Latitude:</span> <span>{latitude}</span>
      </div>
      <div className="w-[240px] text-left mt-1 pl-6 flex justify-between">
        <span className="font-bold">Longitude:</span> <span>{longitude}</span>
      </div>
      <div className="w-[240px] text-left mt-1 pl-6 flex justify-between">
        <span className="font-bold">Weather:</span> <span>{weather}</span>
      </div>
      <div className="w-[240px] text-left mt-1 pl-6 flex justify-between">
        <span className="font-bold">Temperature:</span>{" "}
        <span>{temperature}K</span>
      </div>
      <div className="w-[240px] text-left mt-1 pl-6 flex justify-between">
        <span className="font-bold">Minimum Temperature:</span>{" "}
        <span>{minTemp}K</span>
      </div>
      <div className="w-[240px] text-left mt-1 pl-6 flex justify-between">
        <span className="font-bold">Maximum Temperature:</span>{" "}
        <span>{maxTemp}K</span>
      </div>
      <div className="w-[240px] text-left mt-1 pl-6 flex justify-between">
        <span className="font-bold">Pressure:</span> <span>{pressure}psi</span>
      </div>
    </div>
  );
};

export default CurrentLocation;
