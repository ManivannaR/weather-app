import React, { useState, useEffect } from "react";
import CurrentLocation from "../Components/CurrentLocation";
import Error from "../Components/Error";
import SearchBar from "../Components/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { selectAllFavorites } from "../ReduxStore/Slices/favoritesSlices";
import { setSelectedState } from "../ReduxStore/Slices/selectedLocationSlice";
import { resetSearchResults } from "../ReduxStore/Slices/searchResults";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favoriteLocations = useSelector(selectAllFavorites);

  const [currentLocationWeather, setCurrentLocationWeather] = useState(false);

  const [locationDetails, setLocationDetails] = useState({
    latitude: "",
    longitude: "",
  });

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

  const handleClick = async () => {
    setCurrentLocationWeather(!currentLocationWeather);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${locationDetails.latitude}&lon=${locationDetails.longitude}&appid=3a2167babd4a2cec90ebdad06a140b71`
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

  const fetchCurrentLocation = async () => {
    const successCallback = (position) => {
      setLocationDetails({
        ...locationDetails,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };
    const errorCallback = (error) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  const navigateWeatherPage = (e) => {
    let latitude = e.target.getAttribute("a-key");
    let index = favoriteLocations.findIndex((obj) => {
      return obj.lat == latitude;
    });
    dispatch(setSelectedState(favoriteLocations[index]));
    dispatch(resetSearchResults());
    navigate("/details");
  };

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  return (
    <div className="bg-teal-500 w-screen p-1 text-center">
      <div className="bg-white mx-auto mt-10 w-80 sm:w-96 md:w-[500px] lg:w-[750px] mb-36 p-1 drop-shadow">
        <div className="font-bold italic text-gray-900 text-3xl sm:text-4xl">
          Weather Finder
        </div>
        <div className="text-gray-600 text-sm sm:text-md lg:text-lg mt-1">
          Search for a certain location to find the weather of that location
        </div>
        <div className="bg-teal-500 mx-auto mt-2 w-64 sm:w-80 md:w-[450px] lg:w-[700px] p-1 drop-shadow flex flex-wrap justify-between">
          <div className="bg-white drop-shadow h-96 w-[310px] md:w-[440px] lg:w-[415px] mt-2 mb-2 p-1">
            {locationDetails.latitude ? (
              <div>
                Click{" "}
                <span
                  onClick={handleClick}
                  className="underline text-blue-500 hover:text-blue-800 hover:cursor-pointer"
                >
                  HERE
                </span>{" "}
                to get weather info on your current location.
                {currentLocationWeather ? (
                  <CurrentLocation
                    name={weatherDetails.name}
                    country={weatherDetails.country}
                    latitude={weatherDetails.latitude}
                    longitude={weatherDetails.longitude}
                    temperature={weatherDetails.temperature}
                    minTemp={weatherDetails.minTemp}
                    maxTemp={weatherDetails.maxTemp}
                    pressure={weatherDetails.pressure}
                    weather={weatherDetails.weather}
                  />
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <Error />
            )}
          </div>
          <SearchBar />
        </div>
        <div className="flex flex-row justify-start mb-4">
          <div className="w-[150px] font-bold mt-2 ml-4">
            Your Favorite Locations:{" "}
          </div>
          <div className="flex flex-row flex-wrap justify-start">
            {favoriteLocations.map((obj) => {
              return (
                <div
                  a-key={obj.lat}
                  key={obj.lon}
                  className="mt-2 border border-gray-300 w-[100px] mr-2 pt-2 hover:cursor-pointer"
                  onClick={navigateWeatherPage}
                >
                  {obj.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
