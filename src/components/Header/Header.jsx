import { useCallback, useEffect, useState } from "react";
import searchIcon from '../../assets/icons/search-icon.svg';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    clearSuggestions, clearWeatherData,
    fetchCityWeather,
    setCityName,
    setRegion,
    setWeatherStatus
} from "../../store/slices/appSlice.js";
import { toggleSuggestions } from "../../store/slices/uiSlice.js";
import InputError from "../../errors/InputError.jsx";
import Suggestions from "../Suggestions/Suggestions.jsx";

const Header = ({ countryCodes }) => {
    const { isSuggestions } = useSelector((state) => state.ui);
    const { cityWeatherStatus, suggestions, error } = useSelector(state => state.app);
    const dispatch = useDispatch();

    const [cityInput, setCityInput] = useState("");
    const [validInput, setValidInput] = useState(true);

    const getWeatherData = useCallback(async (city= '', lon='', lat='') => {
        const isValidText = city && city.trim().length > 2

            if (isValidText){
                const res = await dispatch(fetchCityWeather([city.trim(), lon, lat]));

               if (res.meta.requestStatus !== "rejected"){
                   if (!lon || !lat){
                       dispatch(setCityName(cityInput));
                       dispatch(setRegion(suggestions[0].state));
                   }

                   dispatch(clearSuggestions());
                   dispatch(toggleSuggestions());
                   setCityInput('');
               }
               else {
                   dispatch(clearWeatherData());
               }
            }
            else {
                setValidInput(false);
            }


    },[cityInput, suggestions]);

    const clearError = useCallback(() => {
        dispatch(setWeatherStatus('idle'));
        setValidInput(true);
    }, [setValidInput])


    useEffect(() => {
        if(!validInput || cityWeatherStatus === 'failed'){
            const timerId = setTimeout(() => {
                clearError()
            }, 3000)
            return () => clearTimeout(timerId)
        }
    }, [validInput, cityWeatherStatus, clearError]);

    const charactersError = !validInput && <InputError>Please enter more than 2 characters</InputError>
    const invalidCityError = cityWeatherStatus === 'failed' && <InputError>{error}</InputError>
    const suggestionsList = <Suggestions countryCodes={countryCodes} cityInput={cityInput} getWeatherData={getWeatherData} />

    return (
        <div className= "flex flex-col min-h-full flex-1 items-start py-12 gap-1 w-full sm:w-11/12 relative md:w-3/4">
            <div className={`flex bg-white w-full px-4  justify-between items-center ${isSuggestions && suggestions.length > 0 ? "rounded-t border-b-2 border-b-gray-200"  : "rounded-md"}`}>
                <input
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            getWeatherData(cityInput);
                        }
                    }}
                    placeholder="Enter city name"
                    onFocus={() => {
                        clearError()
                        !isSuggestions && dispatch(toggleSuggestions())
                    }}
                    onBlur={() => {
                        isSuggestions && dispatch(toggleSuggestions())
                    }}
                    className={`block font-serif w-full py-2 text-gray-900 border-none focus:outline-none ${!validInput || cityWeatherStatus === 'failed' ? "border-2 border-rose-900" : "border-gray-300"} placeholder:text-gray-500 sm:text-sm sm:leading-6`}
                    type="text"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                />
                <button
                    onClick={() => {
                        getWeatherData(cityInput);
                    }}
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
}

Header.propTypes = {
    countryCodes: PropTypes.object.isRequired
}

export default Header;