import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  cardroot: {
    width: '87%',
    margin:10
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Notes({notes}) {

  const [expandedList, setExpandedList] = React.useState([])
  const [expanded, setexpanded] = React.useState(false)
  
  const classes = useStyles();
  
  const handleExpandClick = (id) => {
    const expandedListCopy = expandedList
    if(expandedListCopy.includes(id)){
      expandedListCopy.splice(expandedList.indexOf(id),1)

      setExpandedList(expandedListCopy)
    }else{
      expandedListCopy.push(id)

      setExpandedList(expandedListCopy)
    }
    setExpandedList(expandedListCopy)
    setexpanded(!expanded)
    
  };
  

  return (
    <Grid container component="main" className={classes.parentGrid}>
      
      {notes.map(note=>{

        const date = new Date(note.date)
        return(
          <Card key={note.notesId} className={classes.cardroot}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {note.name[0]}
          </Avatar>
        }
        
        title={note.name}
        subheader={date.toDateString()}
      />

      <CardContent>
      <Typography paragraph>
          {`${ expandedList.includes(note.notesId)? note.description: note.description.slice(0,100)} ${note.description.length>100? "...": " "}`}
        </Typography>
        {note.description.length>100 &&
        <>
       { ! expandedList.includes(note.notesId) &&
         <a href="#"> <p onClick={()=>handleExpandClick(note.notesId)}>show more</p></a>
        }
       { expandedList.includes(note.notesId) && 
         <a href="#"> <p onClick={()=>handleExpandClick(note.notesId)}>show less</p></a>
        }
        </>
      }
      </CardContent>
    </Card>
        )
      })

      }
    </Grid>
  );
}
