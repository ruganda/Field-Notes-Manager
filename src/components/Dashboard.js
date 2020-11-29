import React  from 'react';
import {Avatar} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import Notes from './Notes';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import NavBar from './NavBar';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
// import {viewNotes, addNotes} from '../reducers/notesReducer'
import { fetchNotes, createNote } from '../actions/notesAction';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  description:{
    marginTop: theme.spacing(1)
  },
  notesContainer:{
    paddingLeft:'7%'
  },
  addNote:{
    padding:'1%'
  }
}));

export default function Dashboard() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

const {notes} = useSelector(state=> state.notes)
console.log(notes, 'notes')

const handleNameChange = (e)=>{
    e.preventDefault()
    setName(e.target.value)
  }

  const handleDescriptionChange = (e)=>{
    e.preventDefault();
    setDescription(e.target.value);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const data = {
      name,
      description,
      date: selectedDate.toISOString()
    }

    dispatch(createNote(data))
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  React.useEffect(()=>{

    dispatch(fetchNotes())
  },
  []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <NavBar/>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item  sm={4} md={4} className={classes.addNote} >
          <h3> Add Notes </h3>
          <form onSubmit={(e)=>handleSubmit(e)}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={name}
              autoComplete="name"
              autoFocus
              placeholder='Enter your Name'
              onChange={(e)=>handleNameChange(e)}
            />
            
            <KeyboardDatePicker
              disableToolbar
              fullWidth
              variant="outlined"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date"
              value={selectedDate}
              onChange={handleDateChange}
              
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />

          <TextField
            fullWidth
            onChange={(e)=>handleDescriptionChange(e)}
            label="Description"
            multiline
            rows={4}
            name={'description'}
            value={description}
            variant="outlined"
            className={classes.description}
          />
          
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save Notes
            </Button>
          </form>
      </Grid>
      <Grid item sm={8} md={8} component={Paper} elevation={6} square className={classes.notesContainer}>
      <Notes notes ={notes}/>
      </Grid>
    </Grid>
    </MuiPickersUtilsProvider>
  );
}