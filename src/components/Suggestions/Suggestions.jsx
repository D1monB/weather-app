import location from "../../assets/icons/location.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSuggestions, fetchCitySuggestions, setRegion, setCityName } from "../../store/slices/appSlice.js";
import PropTypes from "prop-types";

const Suggestions = ({ countryCodes, cityInput, getWeatherData}) => {
    const { isSuggestions } = useSelector((state) => state.ui);
    const suggestions = useSelector(state => state.app.suggestions);
    const dispatch = useDispatch();

    useEffect( () => {
        if(cityInput){
            const debounceTimer = setTimeout(() => {
                onRequest();
            }, 50);

            return () => clearTimeout(debounceTimer);
        }
    }, [cityInput])

    const onRequest = async () => {
        if (cityInput.trim().length > 2) {
            dispatch(fetchCitySuggestions([cityInput]));
        }
        else {
            dispatch(clearSuggestions());
        }
    }

    return (
        isSuggestions && suggestions.length > 0
            ? cityInput.length > 2 &&
        (
            <ul className="absolute shadow-2xl top-2/3 z-10 left-0 w-full bg-white py-1.5 flex flex-col gap-1 rounded-b">
                {suggestions.map((city, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-3 w-full pl-1.5 p-1 hover:bg-gray-200 cursor-pointer"
                        onMouseDown={async () => {
                            await getWeatherData(city.name, city.lon, city.lat)
                            dispatch(setRegion(city.state));
                            dispatch(setCityName(city.name));
                        }}
                    >
                        <img className="w-7" src={location} alt="Location icon"/>
                        <div className="flex items-center gap-4 pr-2">
                            <span>{city.name}</span>
                            <span className="text-gray-500">{city.state}</span>
                            <span>{countryCodes[city.country]}</span>
                        </div>
                    </li>
                ))}
            </ul>
        ) : null
    );
};

Suggestions.propTypes = {
    countryCodes: PropTypes.object.isRequired,
    cityInput: PropTypes.string.isRequired,
    getWeatherData: PropTypes.func.isRequired,
}

export default Suggestions;