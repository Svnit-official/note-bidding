import React from 'react'

import {AppBar,Toolbar,Typography,Button} from '@material-ui/core';
import SimpleDrawer from './SwipableMenu/SwipableMenu'
import useStyles from './styles';

const NavBar = () => {
    const classes = useStyles();
    const open = true;


    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary" elevation={6} >
        <Toolbar>
    <SimpleDrawer state={open}/>
          
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
