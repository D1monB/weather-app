import withWeatherData from "../../hocs/withWeatherData.jsx";
import PropTypes from "prop-types";
import countryLocation from "../../assets/icons/country-location-icon.svg"
import regionLocation from "../../assets/icons/region.png"

// eslint-disable-next-line react-refresh/only-export-components
const Footer = ({ weatherInfo, countryCodes, region }) => {

    return (
        <div className="w-auto text-sky-500 font-medium sm:w-10/12 md:w-11/12 min-w-[295px] mt-4 flex gap-y-3 flex-col items-center shadow-2xl rounded-lg ">
            {weatherInfo[0].country &&
                <div className="flex w-full bg-white gap-4 items-center text-xl px-4 sm:px-9 shadow-2xl rounded-lg py-3">
                    <img className="w-6" src={countryLocation} alt="Location icon"/>
                    Country: {countryCodes[weatherInfo[0].country]}
                </div>
            }
            {region &&
                <div className="flex w-full bg-white gap-4 items-center text-xl px-4 sm:px-9 shadow-2xl rounded-lg py-3">
                    <img className="w-7" src={regionLocation} alt="Region icon"/>Region: {region}
                </div>}
        </div>
    );
};

Footer.propTypes = {
    weatherInfo: PropTypes.array.isRequired,
    countryCodes: PropTypes.object.isRequired,
    region: PropTypes.string
}
// eslint-disable-next-line react-refresh/only-export-components
export default withWeatherData(Footer);