import { configureStore } from '@reduxjs/toolkit'
import homeslice from './homeSlice.js'

export const store = configureStore({
    reducer: {
        home: homeslice
    },
})