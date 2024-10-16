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
                    className="shadow-xl text-rose-500 bg-white w-1/2 text-center cursor-pointer hover:shadow-lg py-2 rounded-xl transition duration-300 ease-in-out hover:text-rose-400 hover:"
                >
                    {error}
                </div>
            )

        return weatherData.length > 0 && <WrappedComponent weatherInfo={weatherData} {...props} />
    }
}

export default withWeatherData;