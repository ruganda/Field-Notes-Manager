import { createSlice } from '@reduxjs/toolkit'

//New redux toolrit recommended way of writting a reducer.
//it is updates the notes slice in the central store
// const  notesSlice = createSlice({
//   name: 'notes',
//   initialState:{
//     notes:[]
//   },
//   reducers:{
//     addNote: (state, action) => [action.payload, ...state],
//     viewNotes: (action) => action.payload
//   }
// })



//Another common patter on writting a reducer
const initialState= {
  notes:[]
}
const notesReducer = ( state=initialState, action)=>{
  switch (action.type) {
    case 'notes/addNotes':
      return {notes: [action.payload, ...state.notes]}
    case 'notes/viewNotes':
      return { notes: action.payload}
    default:
      return state;
  }
}

// export default notesSlice.reducers
export default notesReducer