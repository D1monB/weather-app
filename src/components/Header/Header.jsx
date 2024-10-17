import useWeatherService from "../../services/Weather-service/Weather-service.js";
import {useCallback, useEffect, useState} from "react";
import {useWeatherContext} from "../../providers/WeatherProvider.jsx";
import searchIcon from '../../assets/icons/search-icon.svg'


const Header = () => {
    const [cityInput, setCityInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [validInput, setValidInput] = useState(true);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { setWeatherData, setError, setLoading, error } = useWeatherContext();
    const { getWeatherData, getCitySuggestions } = useWeatherService();

    const onRequest = useCallback(async () => {
        try{
            const inputText = cityInput && cityInput.trim().length > 2

            if (inputText){
                setLoading(true)
                const weatherData = await getWeatherData(cityInput.trim());
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


    const fetchCitySuggestions = useCallback(async () => {
        if(cityInput.length > 2){
            try {
                const cityList = await getCitySuggestions(cityInput);
                setSuggestions(cityList)
            }
            catch (e){
                console.log(e)
            }

        }
        else if (suggestions.length > 0) {
            setSuggestions([]);
        }

    }, [cityInput])

    useEffect( () => {
        console.log('fff')
        fetchCitySuggestions();

    }, [cityInput])

    useEffect(() => {

        if(!validInput || error){
            const timerId = setTimeout(() => {
                clearError()
            }, 3000)

            return () => clearTimeout(timerId)
        }

    }, [validInput, error, clearError]);

    const charactersError = (!validInput && !error) && <div className="font-medium text-rose-900 ml-2 text-xs">Please enter more than 2 characters</div>;
    const invalidCityError = error && <div className="font-medium text-rose-900 ml-2 text-xs">{error}</div>;
    const suggestionsList = (validInput && showSuggestions && suggestions.length > 0) &&
        (
            <ul className="absolute shadow-2xl top-2/3 z-10 left-0 w-full bg-white py-1.5 flex flex-col gap-1 rounded-b">
                {suggestions.map((city, index) => (
                    <li
                        key={index}
                        className="w-full pl-3 p-1 hover:bg-gray-200 cursor-pointer"
                        onMouseDown={() => setCityInput(city.name)}
                    >
                        {city.name}
                    </li>
                ))}
            </ul>
        )

    return (
        <div className= "flex flex-col min-h-full flex-1 items-start py-12 gap-1 w-full sm:w-11/12 relative md:w-3/4">
            <div className={`flex bg-white w-full px-4  justify-between items-center ${suggestions.length > 0 && showSuggestions ? "rounded-t border-b-2 border-b-gray-200"  : "rounded-md"}`}>
                <input
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            onRequest();
                        }
                    }}
                    placeholder="Enter city name"
                    onFocus={() => {
                        clearError()
                        setShowSuggestions(true);
                    }}
                    onBlur={() => {
                        setShowSuggestions(false);
                    }}
                    className={`block font-serif w-full py-2 text-gray-900 border-none focus:outline-none ${!validInput || error ? "border-2 border-rose-900" : "border-gray-300"} placeholder:text-gray-500 sm:text-sm sm:leading-6`}
                    type="text"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                />
                <button
                    onClick={() => onRequest()}
                    role="button"
                    className="inline-flex items-center rounded-md bg-white text-white ring-inset py-2 hover:opacity-75"
                >
                    <img className="w-8" src={searchIcon} alt="seacrh button"/>
                </button>
            </div>
            {charactersError}
            {invalidCityError}
            {suggestionsList}
        </div>
    );
};

export default Header;