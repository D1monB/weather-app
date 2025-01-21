import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSuggestions: false
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSuggestions: (state) => {state.isSuggestions = !state.isSuggestions},
    }
})

export default uiSlice.reducer
export const { toggleSuggestions } = uiSlice.actions;