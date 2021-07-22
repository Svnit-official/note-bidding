import React, { useState, useEffect } from "react";
import Card from "../../Card/Card";
import NavBar from "../../NavBar/NavBar";
import BottomNav from "../../BottomNav/BottomNav";
// import AddButton from '../AddButton/AddButton';
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import SubmitForm from "../../SubmitForm/SubmitForm";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
//import SwipeableTemporaryDrawer from "../../NavBar/SwipableMenu/SwipableMenu";
import { useDispatch, useSelector } from "react-redux";
import { getRequest, getDraftRequest } from "../../../actions/clubActions";

const Home = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("club_profile"));
  console.log(user.clubID);
  useEffect(() => {
    dispatch(getDraftRequest(user.clubID));
    dispatch(getRequest(user.clubID));
  }, []);
  const d = useSelector((state) => state.formReducer.drafts);
  console.log(d);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const progress = function (status) {
    switch (status) {
      case "sentByClub":
        return 0;
      case "approvedByFaculty":
        return 1;
      case "approvedByFinance":
        return 2;
      case "approvedByDean":
        return 3;
      default:
        return null;
    }
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
    </div>
  );
};

export default Home;
