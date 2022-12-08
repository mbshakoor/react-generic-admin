// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import entityReducer from './slices/entitySlice'

export const store = configureStore({
  reducer: {
    entity: entityReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})



