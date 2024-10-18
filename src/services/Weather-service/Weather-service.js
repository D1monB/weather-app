import axios from 'axios';
import weatherConditions from "./weatherConditions.js";
import { format, fromUnixTime } from 'date-fns';

const convertUnixToTime = (unixTimestamp) => {
    const date = fromUnixTime(unixTimestamp);
    return format(date, 'HH:mm');
};

const cityFilter = (cityArr) => {
     const seen = new Set();

     return cityArr.filter(city => {
         const key = `${city.name} ${city.state}`
         return seen.has(key) ? false : seen.add(key);
     })
}

const monthsArray = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const determineTheDirection = (lon, lat) => {
    let direction = '';

    if (lat > 0) {
        direction += 'North';
    }
    else if (lat < 0) {
        direction += 'South';
    }

    if (lon > 0) {
        direction += ' East';
    }
    else if (lon < 0) {
        direction += ' West';
    }

    if (lat === 0 && lon === 0) {
        return 'Equator';
    }

    return direction.trim() || 'Undefined';
}


const useWeatherService = () => {
    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    //https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}
    const _url = 'https://api.openweathermap.org/data/2.5/weather?';
    const _api = `&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
    const _units = '&units=metric';
    const _geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=';
    const _limit = '&limit=5';

    const getWeatherData = async (city, lon = '', lat = '') => {
        try {
            const request = (lat !== '' && lon !== '')
                ? `${_url}lat=${lat}&lon=${lon}${_api}${_units}`
                : `${_url}q=${city}${_api}${_units}`;
            const res = await axios.get(request);
            return _transformWeatherData(res.data)
        }
        catch (e){
            if (e.response.status === 404) {
                throw new Error('City not found. Please enter a valid city name.');
            }
        }
    }

    const getCitySuggestions = async (cityName) => {
        try {
            const res = await axios.get(`${_geoUrl}${cityName}${_limit}${_api}`);
            console.log(res.data)
            return cityFilter(res.data.map(city => ({
                                name: city.name,
                                country: city.country,
                                lon: city.lon,
                                lat: city.lat,
                                state: city.state,
                            })));
        }
        catch (e) {
            console.log(e)
            throw new Error('Error fetching city suggestions');
        }
    };


    const _transformWeatherData = (data) => {
        const date = new Date();

        return {
            id: data.id,
            month: monthsArray[date.getMonth()],
            day: date.getDate(),
            dayOfTheWeek: daysArray[date.getDay()],
            cityName: data.name,
            temp: Math.floor(data.main.temp),
            feelsLike: Math.floor(data.main.feels_like),
            weatherName: data.weather[0].main,
            sunrise: convertUnixToTime(data.sys.sunrise),
            sunset: convertUnixToTime(data.sys.sunset),
            windSpeed: data.wind.speed,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            image: weatherConditions[data.weather[0].main],
            direction: determineTheDirection(data.coord.lon, data.coord.lat),
            country: data.sys.country
        }
    }

    return { getWeatherData, getCitySuggestions }
}

export default useWeatherService