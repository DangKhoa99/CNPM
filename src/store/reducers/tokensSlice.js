import {createSlice} from '@reduxjs/toolkit'

const tokensSlice = createSlice({
    name: 'tokens',
    initialState: {
        token: "",
    },
    reducers: {
        addToken: (state, action) => {
            state.token = action.payload;
        }
    }
})

// Reducer
const tokensReducer = tokensSlice.reducer

// Selector
export const tokensSelector = state => state.tokens.token;

// Action export
export const {addToken} = tokensSlice.actions

// Export reducer
export default tokensReducer