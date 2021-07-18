import React, { useState,useEffect } from "react";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import BottomNav from "../BottomNav/BottomNav";
// import AddButton from '../AddButton/AddButton';
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import SubmitForm from "../SubmitForm/SubmitForm";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SwipeableTemporaryDrawer from "../NavBar/SwipableMenu/SwipableMenu";
import {useDispatch,useSelector} from "react-redux";
import {getRequest , getDraftRequest} from "../../actions/clubActions";

const Home = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('club_profile'))
  console.log(user.clubID);
  useEffect(()=>{
    dispatch(getDraftRequest(user.clubID) );
    dispatch(getRequest(user.clubID) );
  }
    ,[]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <NavBar />
      <IconButton aria-label="Add" onClick={handleClickOpen}>
        <AddCircleOutlineIcon color="primary" />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Submit Event Form"}</DialogTitle>
        <DialogActions>
          <SubmitForm />
        </DialogActions>
      </Dialog>
      <BottomNav />
    </div>
  );
};

export default Home;
