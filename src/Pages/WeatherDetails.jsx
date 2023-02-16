import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSelectedLocation } from "../ReduxStore/Slices/selectedLocationSlice";
import { addFavorite } from "../ReduxStore/Slices/favoritesSlices";
import { useNavigate } from "react-router-dom";

const WeatherDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const locationDetails = useSelector(fetchSelectedLocation);

  const [weatherDetails, setWeatherDetails] = useState({
    name: "",
    country: "",
    latitude: "",
    longitude: "",
    temperature: "",
    minTemp: "",
    maxTemp: "",
    pressure: "",
    weather: "",
  });

  const fetchWeatherDetails = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${locationDetails.lat}&lon=${locationDetails.lon}&appid=3a2167babd4a2cec90ebdad06a140b71`
    );
    const data = await response.json();
    setWeatherDetails({
      ...weatherDetails,
      name: data.name,
      country: data.sys.country,
      latitude: data.coord.lat,
      longitude: data.coord.lon,
      temperature: data.main.temp,
      minTemp: data.main.temp_min,
      maxTemp: data.main.temp_max,
      pressure: data.main.pressure,
      weather: data.weather[0].description,
    });
  };

  useEffect(() => {
    fetchWeatherDetails();
  }, []);

  const handleAddFavorites = () => {
    dispatch(addFavorite({ ...locationDetails }));
  };

  return (
    <div className="w-screen h-screen bg-teal-700 flex flex-row">
      <div className="bg-white drop-shadow w-[300px] h-[420px] m-2 p-2">
        <button
          onClick={() => navigate("/")}
          className="border border-gray-800 w-[70px] text-center hover:text-white hover:bg-gray-800"
        >
          Back
        </button>
        <h1 className="mt-2 text-2xl font-bold text-center">
          {weatherDetails.name}
        </h1>
        <div className="w-[240px] text-left mt-1 pl-6 flex justify-between">
          <span className="font-bold">Country:</span>{" "}
          <span>{weatherDetails.country}</span>
        </div>
        <div className="w-[240px] text-left mt-1 pl-6 flex justify-between">
          <span className="font-bold">Latitude:</span>{" "}
          <span>{weatherDetails.latitude}</span>
        </div>
        <div className="w-[240px] text-left mt-1 pl-6 flex justify-between">
          <span className="font-bold">Longitude:</span>{" "}
          <span>{weatherDetails.longitude}</span>
        </div>
        <div className="w-[240px] text-left mt-1 pl-6 flex justify-between">
          <span className="font-bold">Weather:</span>{" "}
          <span>{weatherDetails.weather}</span>
        </div>
        <div className="w-[240px] text-left mt-1 pl-6 flex justify-between">
          <span className="font-bold">Temperature:</span>{" "}
          <span>{weatherDetails.temperature}K</span>
        </div>
        <div className="w-[240px] text-left mt-1 pl-6 flex justify-between">
          <span className="font-bold">Minimum Temperature:</span>{" "}
          <span>{weatherDetails.minTemp}K</span>
        </div>
        <div className="w-[240px] text-left mt-1 pl-6 flex justify-between">
          <span className="font-bold">Maximum Temperature:</span>{" "}
          <span>{weatherDetails.maxTemp}K</span>
        </div>
        <div className="w-[240px] text-left mt-1 pl-6 flex justify-between">
          <span className="font-bold">Pressure:</span>{" "}
          <span>{weatherDetails.pressure}psi</span>
        </div>
        <button
          className="border border-gray-800 w-[200px] text-center mx-auto mt-4 ml-9 hover:text-white hover:bg-gray-800"
          onClick={handleAddFavorites}
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default WeatherDetails;
