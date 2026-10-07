import { configureStore } from '@reduxjs/toolkit'
import clientsReducer from './features/clientsSlice'

var store = configureStore({
  reducer: {
    clients: clientsReducer
  }
})

export default store
