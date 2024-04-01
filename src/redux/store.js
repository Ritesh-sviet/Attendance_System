import { configureStore } from '@reduxjs/toolkit'
import FetchDetailsSlice from './slices/FetchDetailsSlice'

export const store = configureStore({
  reducer: {
    data: FetchDetailsSlice,
  },
})