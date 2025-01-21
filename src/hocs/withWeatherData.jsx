import { useSelector, useDispatch } from "react-redux";
import { selectAll, clearWeatherData, setWeatherStatus } from "../store/slices/appSlice.js";
import ErrorMessage from "../errors/ErrorMessage.jsx";

const withWeatherData = (WrappedComponent) => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const weatherData = useSelector(selectAll)
        const { cityWeatherStatus, region, cityName, error } = useSelector(state => state.app)
        const dispatch = useDispatch();

        if (cityWeatherStatus === 'loading')
            return <div>Loading...</div>;

        if (cityWeatherStatus === 'failed')
            return (
                <ErrorMessage clearError={() => dispatch(setWeatherStatus('idle'))}>
                    {error}
                </ErrorMessage>
            )

        return weatherData.length > 0 &&
            <WrappedComponent
                weatherInfo={weatherData}
                clearWeatherData={() => dispatch(clearWeatherData())}
                region={region}
                cityName={cityName}
                {...props} />
    }
}

export default withWeatherData;