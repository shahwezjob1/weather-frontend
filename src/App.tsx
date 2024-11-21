import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import { ToastContainer } from "react-toastify";
import { useWeatherHook } from "./hooks/useWeatherHook";
import { toastContainerProps } from "./utils/constants";

const App = () => {
  const { cityName, loading, allWeatherData, handleChangeCity } =
    useWeatherHook();

  return (
    <BrowserRouter>
      <section className="min-h-screen flex flex-col">
        <NavBar handleChangeCity={handleChangeCity} />
        <Routes>
          <Route
            path="/"
            element={
              cityName && allWeatherData ? (
                <Home allWeatherData={allWeatherData} loading={loading} />
              ) : (
                <LandingPage />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer {...toastContainerProps} />
      </section>
    </BrowserRouter>
  );
};

export default App;
