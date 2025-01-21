
const ErrorMessage = ({ children, clearError }) => {
    return (
        <div
            className="shadow-xl text-rose-900 bg-white min-w-[200px] sm:w-1/2 text-center cursor-pointer hover:shadow-lg py-2 px-2 rounded-xl mb-3 transition duration-300 ease-in-out hover:text-rose-400"
            onClick={clearError}
        >
            {children}
        </div>
    );
};

export default ErrorMessage;