import withWeatherData from '../../hocs/withWeatherData.jsx'
import PropTypes from 'prop-types';
import temperature from '../../assets/temperature.png';
import location from '../../assets/icons/location.png'
import { weatherData } from "./weatherData.js";
import {useWeatherContext} from "../../providers/WeatherProvider.jsx";

// eslint-disable-next-line react-refresh/only-export-components
const MainContent = ({ weatherInfo }) => {
    const { setWeatherData } = useWeatherContext();

    return (
        <div
            className="border text-sky-500 relative font-medium rounded-lg bg-white border-gray-300  shadow sm:w-11/12 md:w-4/5 w-auto sm:pt-6 min-w-[295px] sm:pb-10 py-6 px-4 sm:px-9 ">
            <button
                onClick={() => setWeatherData([])}
                className={"absolute top-2 right-3  hover:opacity-75 text-xl"}
            >
                x
            </button>
            <div className="text-4xl sm:text-5xl flex justify-center mt-1.5 mb-6 break-words">
                <h2 className="break-words">
                    {weatherInfo[0].cityName}
                </h2>
                <img className="w-10 sm:w-12" src={location} alt="Location icon"/>
            </div>
            <div
                className="grid grid-rows-[1fr_auto] grid-cols-2 sm:grid-rows-1 sm:grid-cols-3 justify-between sm:justify-between">
                <div
                    className="flex sm:col-span-1 flex-col col-span-1 row-span-1 order-2 sm:order-1 gap-4 items-start  justify-start sm:justify-end">
                    <div className="flex flex-col justify-center">
                        <p>{weatherInfo[0].month} {weatherInfo[0].day}</p>
                        <p>{weatherInfo[0].dayOfTheWeek}</p>
                    </div>
                    <div className="relative ">
                        <p className="flex items-center text-4xl">{weatherInfo[0].temp}°
                            <img className="w-12"
                                 src={temperature}
                                 alt="Temperature"/>
                        </p>
                        <p>Feels like {weatherInfo[0].feelsLike}°</p>
                    </div>
                </div>
                <div className="flex mb-2 sm:mb-0 sm:col-span-1 col-span-2 row-span-1 gap-4 flex-col order-1 sm:order-2 items-center ">
                    <img src={weatherInfo[0].image} alt=""/>
                    <p className="text-2xl">{weatherInfo[0].weatherName}</p>
                </div>
                <div className="flex sm:col-span-1 justify-end col-span-1 row-span-1 order order-3 items-start sm:items-end">
                    <ul className="text-sm gap-1 flex flex-col justify-start items-left">
                        {weatherData.map((item, i) => (
                            <Item item={item} weatherInfo={weatherInfo[0]} key={i}/>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
const Item = ({ item, weatherInfo }) => {

    const {title, image} = item;
    const text = (title === "sunrise" || title === "sunset")
        ? `${item.text} ${weatherInfo[title]}`
        : `${weatherInfo[title]} ${item.text}`;

    return (
        <li className="inline-flex gap-1">
            <img className="w-4" src={image} alt={title}/>
            {text}
        </li>
    )
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    weatherInfo: PropTypes.object.isRequired,
}

MainContent.propTypes = {
    weatherInfo: PropTypes.array.isRequired,
}

// eslint-disable-next-line react-refresh/only-export-components
export default withWeatherData(MainContent);