import Header from "./components/Header/Header.jsx";
import MainContent from "./components/MainContent/MainContent.jsx";
import Footer from "./components/Footer/Footer.jsx";
import countryCodes from "./data/country.js";

function App() {
    return (
        <div className="container flex flex-col mx-auto p-4 max-w-3xl items-center">
            <Header countryCodes={countryCodes} />
            <MainContent />
            <Footer countryCodes={countryCodes} />
        </div>
    )
}

export default App
