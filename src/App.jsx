import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import WeatherDetails from "./Pages/WeatherDetails";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/details" element={<WeatherDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
