import Header from "./components/Header/Header.jsx";
import MainContent from "./components/MainContent/MainContent.jsx";
import { WeatherProvider } from "./providers/WeatherProvider.jsx";

function App() {
    return (
        <div className="container flex flex-col mx-auto p-4 max-w-3xl items-center">
            <WeatherProvider>
                <Header />
                <MainContent  />
            </WeatherProvider>
        </div>
    )
}

export default App
