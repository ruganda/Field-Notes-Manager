import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './reducers/notesReducer';

export default configureStore({
  reducer: {
    notes: notesReducer
  }
})

