import {createContext, useContext, useState} from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const value = {
        weatherData,
        setWeatherData,
        loading,
        setLoading,
        error,
        setError
    }

    return (
        <WeatherContext.Provider value={value}>
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeatherContext = () => useContext(WeatherContext);