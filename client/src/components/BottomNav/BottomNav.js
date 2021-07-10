import React,{useState} from 'react'
import {BottomNavigation,BottomNavigationAction,AppBar} from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ViewListIcon from '@material-ui/icons/ViewList';
import PeopleIcon from '@material-ui/icons/People';
import useStyles from './styles'

const BottomNav = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    return (
        <AppBar position="fixed" color="inherit" className={classes.BottomNav} elevation={0}>
            <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.Bcontainer}
      
    >
      <BottomNavigationAction label="Student" icon={<EmojiPeopleIcon />} />
      <BottomNavigationAction label="Billing" icon={<ViewListIcon />} />
      <BottomNavigationAction label="Sponsorship" icon={<PeopleIcon />} />
      
    </BottomNavigation>
    
    </AppBar>
    )
}

export default BottomNav
