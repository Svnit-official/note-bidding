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
import { getRequest, getDraftRequest,fetchPublishedEvents } from "../../../actions/clubActions";
import PublishedCard from "../../Card/PublishedCard";
import Lode from '../../Loaders/Load';

const Home = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("club_profile"));
  console.log(user.clubID);
  useEffect(() => {
    dispatch(getDraftRequest(user.clubID));
    dispatch(getRequest(user.clubID));
    dispatch(fetchPublishedEvents(user.clubID));
  }, []);
  const d = useSelector((state) => state.formReducer.drafts);
  const published = useSelector((state) => state.formReducer.publishedEvents);
  console.log("These are the published Events : " ,published);
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
      <div className="row  mt-3 bg-warning">
       <div className="col-md-6 border">
         {/* card */}
         <div class="card col-md-8 offset-2 " style={{borderRadius:"4%"}}>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/NIT_Surat_Logo.svg/1200px-NIT_Surat_Logo.svg.png" height="300px"  class="card-img-top" alt="..."/>
          <div class="card-body">
            <h3 class="card-title text-center"  ><b>CEV</b></h3>
            <p class="card-text text-center lead" >Technical Student Society</p>
          </div>
        </div>
         </div>
         <div className="col-md-6 border">
           <div style={{fontSize:"3rem",fontWeight:"700",fontStyle:"italic",textShadow:"0px 0px 5px 5px"}}>
                DASHBOARD
           </div>
           </div>
      </div>
      <IconButton aria-label="Add" onClick={handleClickOpen}>
        <AddCircleOutlineIcon color="primary" />
      </IconButton>
      {
        !published ? <Lode /> : (published.map((draft) => (<PublishedCard draft={draft}/>)))
        }
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
