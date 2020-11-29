import axios from 'axios'


const viewNotes = payload=>
  ({
    payload,
    type: 'notes/viewNotes'
  })
const addNotes = payload=>
  ({
    payload,
    type: 'notes/addNotes'
  })

const url = 'https://us-central1-field-notes-manager.cloudfunctions.net/api/notes'

export const fetchNotes = ()=> async(dispatch)=>{
  try{
    const res = await axios.get(url)
    console.log(res.data)
    dispatch(viewNotes(res.data))
  }catch(err){
    console.log(err)
  }
  
}

export const createNote = (data)=> async(dispatch)=>{
  try{
    const res = await axios.post(url, data)
    dispatch(addNotes(res.data))
  }catch(err){
    console.log(err)
  } 
}
