import {useWeatherContext} from "../providers/WeatherProvider.jsx";

const withWeatherData = (WrappedComponent) => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const { weatherData, loading, error, setError } = useWeatherContext();

        if (loading)
            return <div>Loading...</div>;

        if (error)
            return (
                <div
                    onClick={() => setError(false)}
                    className="shadow-xl text-rose-900 bg-white min-w-[200px] sm:w-1/2 text-center cursor-pointer hover:shadow-lg py-2 px-2 rounded-xl transition duration-300 ease-in-out hover:text-rose-400"
                >
                    {error}
                </div>
            )

        return weatherData.length > 0 && <WrappedComponent weatherInfo={weatherData} {...props} />
    }
}

export default withWeatherData;