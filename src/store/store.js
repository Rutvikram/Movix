import { configureStore } from '@reduxjs/toolkit'
// import homeslice from './homeSlice'
import homeslice from "./homeSlice"

export const store = configureStore({
    reducer: {
        home: homeslice
    },
})