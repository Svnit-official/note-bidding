import React from 'react'

import {AppBar,Toolbar,Typography,Button,IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './styles';

const NavBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary" elevation={6}>
        <Toolbar>
          
          <Typography variant="h6" className={classes.title}>
            SVNIT FORUM
          </Typography>
          <Button color="inherit">Requests</Button>
          <Button color="inherit">Login</Button>
          
        </Toolbar>
      </AppBar>
        </div>
    )
}

export default NavBar
