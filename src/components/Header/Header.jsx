import useWeatherService from "../../services/Weather-service/Weather-service.js";
import {useCallback, useEffect, useState} from "react";
import {useWeatherContext} from "../../providers/WeatherProvider.jsx";

const Header = () => {
    const [cityInput, setCityInput] = useState("");
    const [validInput, setValidInput] = useState(true);
    const { setWeatherData, setError, setLoading, error } = useWeatherContext();
    const { getWeatherData } = useWeatherService();

    const onRequest = useCallback(async () => {
        try{
            const inputText = cityInput && cityInput.trim().length > 2

            if (inputText){
                setLoading(true)
                const weatherData = await getWeatherData(cityInput);
                setWeatherData([weatherData]);
                setCityInput('');
                console.log(weatherData)
            }
            else{
                setValidInput(false)
            }
        }
        catch (e){
            setError(e.message);
            setWeatherData([]);
        }
        finally {
            setLoading(false)
        }
    },[setWeatherData, cityInput, getWeatherData]);

    const clearError = useCallback(() => {
        setValidInput(true)
        setError(false)
    }, [setValidInput, setError])


    useEffect(() => {

        if(!validInput || error){
            const timerId = setTimeout(() => {
                clearError()
            }, 3000)

            return () => clearTimeout(timerId)
        }

    }, [validInput, error, clearError]);

    return (
        <div className= "flex  min-h-full flex-1 items-start py-12 gap-1 w-full sm:w-11/12 md:w-3/4">
            <div className="flex flex-1 flex-col justify-center items-start">
                <input
                    onKeyUp={(e) => {
                        if(e.key === 'Enter'){
                            onRequest();
                        }
                    } }
                    placeholder="Enter city name"
                    onFocus={clearError}
                    className={`block px-2 font-serif w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${validInput ? "ring-gray-300" : "ring-rose-500"} placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 hover:border-rose-500 ${!validInput ? "border-rose-500" : "border-gray-300"}`}
                    type="text"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                />
                {(!validInput && !error) && <div className="text-rose-500 ml-2 text-xs">Please enter more than 2 characters</div>}
                {error && <div className="text-rose-500 ml-2 text-xs">{error}</div>}
            </div>
            <button
                onClick={() => onRequest()}
                role="button"
                className="inline-flex items-center rounded-md bg-blue-700 text-white ring-inset px-4 py-2 ring-1 shadow-sm hover:bg-blue-600"
            >
                Get weather
            </button>
        </div>
    );
};

export default Header;