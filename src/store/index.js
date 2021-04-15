import { configureStore } from '@reduxjs/toolkit'
import tokensReducer from './reducers/tokensSlice'

// Store
const store = configureStore({
    reducer: {
        tokens: tokensReducer,
    }
})

// Export
export default store