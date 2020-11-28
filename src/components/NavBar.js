import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  nav: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const [isLoggedin, setisLoggedin] =React.useState(true)
  const history = useHistory()

  React.useEffect(()=>{
    if(!localStorage.getItem('token')){
      history.push('/')
    }
  },
  [isLoggedin])

  const logout = ()=>{
    localStorage.clear()
    setisLoggedin(!isLoggedin)
  }

  return (
    <div className={classes.nav}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Field Notes Manager
          </Typography>
          <Button  onClick={logout} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}