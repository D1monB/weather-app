import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import weatherService from '../../services/Weather-service/Weather-service';

const { getWeatherData, getCitySuggestions } = weatherService();
const createGenericAsyncThunk = (name, asyncFn) => createAsyncThunk(
    name,
    async (arg) => {
        return await asyncFn(...arg)
    }
)

const appAdapter = createEntityAdapter();
const initialState = appAdapter.getInitialState(
    {
        cityWeatherStatus: 'idle',
        suggestions: [],
        region: '',
        cityName: '',
        error: null,
    },
);

export const fetchCityWeather = createGenericAsyncThunk('app/fetchCityWeather', getWeatherData)
export const fetchCitySuggestions = createGenericAsyncThunk('app/fetchCitySuggestions', getCitySuggestions)

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setRegion: (state, action) => {state.region = action.payload},
        setCityName: (state, action) => {state.cityName = action.payload},
        setWeatherStatus: (state, action) => {state.cityWeatherStatus = action.payload},
        clearWeatherData: (state) => {appAdapter.removeAll(state)},
        clearSuggestions: (state) => {state.suggestions = []}
    },
    selectors: {
      selectSuggestions: state => state.suggestions,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCityWeather.pending, (state) => {
                state.cityWeatherStatus = 'loading';
            })
            .addCase(fetchCityWeather.fulfilled, (state, action) => {
                state.cityWeatherStatus = 'succeeded';
                appAdapter.setAll(state, [action.payload]);
            })
            .addCase(fetchCityWeather.rejected, (state, action) => {
                state.cityWeatherStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchCitySuggestions.fulfilled, (state, action) => {
                state.suggestions = action.payload;
            })
    }
})

export const { selectAll } = appAdapter.getSelectors(state => state.app);
export const { setRegion, setCityName, setWeatherStatus, clearWeatherData, clearSuggestions} = appSlice.actions;
export default appSlice.reducer;
