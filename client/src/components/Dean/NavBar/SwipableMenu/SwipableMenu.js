import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});



export default function TemporaryDrawer({ x }) {
  const classes = useStyles();
  const [state, setState] = useState(x);
  const userDean = JSON.parse(localStorage.getItem('dean_profile'));
  const toggleDrawer = () => {
    setState((pre) => !pre);
  };



  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        <Link to="/dean/home" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to="/dean/responded" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemText primary="Responded" />
          </ListItem>
        </Link>
        <Link to={`/finance/${userDean.deanID}/details`} style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemText primary="Details" />
          </ListItem>
        </Link>
     </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={state} onClose={toggleDrawer}>
        {list()}
      </Drawer>
    </div>
  );
}
