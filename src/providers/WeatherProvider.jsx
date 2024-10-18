import {createContext, useContext, useState} from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState([]);
    const [region, setRegion] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    //The API does not very accurately transmit the city by coordinates, an error of 100m can give out the name of the city district.
    const [cityName, setCityName] = useState('');

    const value = {
        weatherData,
        setWeatherData,
        loading,
        setLoading,
        error,
        setError,
        setRegion,
        region,
        cityName,
        setCityName
    }

    return (
        <WeatherContext.Provider value={value}>
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeatherContext = () => useContext(WeatherContext);