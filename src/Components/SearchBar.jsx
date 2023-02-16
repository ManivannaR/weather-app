import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllSearchResults,
  addSearchResults,
  resetSearchResults,
} from "../ReduxStore/Slices/searchResults";
import { setSelectedState } from "../ReduxStore/Slices/selectedLocationSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchResults = useSelector(fetchAllSearchResults);

  const [input, setInput] = useState("");

  const handleSearch = async () => {
    dispatch(resetSearchResults());
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=3a2167babd4a2cec90ebdad06a140b71`
    );
    const data = await response.json();
    data.forEach((obj) => {
      dispatch(addSearchResults({ ...obj }));
    });
  };

  const navigateWeatherPage = (e) => {
    let latitude = e.target.getAttribute("a-key");
    let index = searchResults.findIndex((obj) => {
      return obj.lat == latitude;
    });
    dispatch(setSelectedState(searchResults[index]));
    dispatch(resetSearchResults());
    navigate("/details");
  };

  return (
    <div className="bg-white drop-shadow h-96 w-[310px] md:w-[440px] lg:w-[270px] mt-2 mb-2 p-1 flex flex-wrap flex-row justify-between">
      <input
        type="text"
        placeholder="Enter a location"
        className="border border-gray-400 text-sm h-8 p-1 w-[187px] sm:w-[246px] md:w-[376px] lg:w-[206px]"
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="border border-black h-8 text-sm p-1"
        onClick={handleSearch}
      >
        Search
      </button>
      <div className="bg-white drop-shadow h-80 w-[220px] sm:w-[290px] md:w-[450px] lg:w-[250px] m-2 flex flex-col">
        <div className="text-left mx-2 mt-1">Search Results: </div>
        {searchResults.map((obj) => {
          return (
            <div
              a-key={obj.lat}
              key={obj.lon}
              className="mx-2 mt-2 p-1 border hover:cursor-pointer hover:border-gray-900 text-left"
              onClick={navigateWeatherPage}
            >
              {obj.name}, {obj.state}, {obj.country}
              <div className="hidden">{obj.lat}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;
