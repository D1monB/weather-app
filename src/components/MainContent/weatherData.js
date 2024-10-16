import sunrise from '../../assets/icons/sunrise.png';
import sunset from '../../assets/icons/sunset.svg';
import humidity from '../../assets/icons/humidity.svg';
import wind from '../../assets/icons/wind.svg';
import compass from '../../assets/icons/compass.svg';
import pressure from '../../assets/icons/up-arrow.svg';

const weatherData = [
    {
        title: 'sunrise',
        text: 'sunrise',
        image: sunrise
    },
    {
        title: 'sunset',
        text: 'sunset',
        image: sunset
    },
    {
        title: 'humidity',
        text: '%',
        image: humidity
    },
    {
        title: 'windSpeed',
        text: 'km/h',
        image: wind
    },
    {
        title: 'direction',
        text: '',
        image: compass
    },
    {
        title: 'pressure',
        text: 'mb',
        image: pressure
    }
];

export { weatherData };
