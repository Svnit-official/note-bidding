import React, { useState, useEffect } from "react";
import Hombut from "./Hombut";
import Card from "../../Card/Card";
import "./Home.css";
import NavBar from "../../NavBar/NavBar";
import BottomNav from "../../BottomNav/BottomNav";
// import AddButton from '../AddButton/AddButton';
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import SubmitForm from "../../SubmitForm/SubmitForm";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
//import SwipeableTemporaryDrawer from "../../NavBar/SwipableMenu/SwipableMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  getRequest,
  getDraftRequest,
  fetchPublishedEvents,
} from "../../../actions/clubActions";
import PublishedCard from "../../Card/PublishedCard";
import Load from "../../Loaders/Load";

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
  console.log("These are the published Events : ", published);
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
      <div
        className="container-fluid"
        style={{
          backgroundColor: "#BDD9F2",
          paddingTop: "100px",
          paddingBottom: "170px",
        }}
      >
        <div className="row">
          <div className="col-md-6 col-sm-12  cardpart">
            {/* card */}
            <div
              class="card col-md-7 col-sm-12 offset-md-4 p-4 shadow-lg"
              style={{
                borderRadius: "4%",
                backgroundColor: "#fdfdf7",
                display: "block",
              }}
            >
              <div className="p-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/NIT_Surat_Logo.svg/1200px-NIT_Surat_Logo.svg.png"
                  height="280px"
                  class="card-img-top"
                  alt="..."
                />
              </div>
              <div class="card-body mt-2 ">
                <h3 class=" text-center h1 font-weight-bold">
                  <b>CEV</b>
                </h3>
                <p
                  class="card-text text-center lead "
                  style={{ fontWeight: "400", color: "#B2B8A3" }}
                >
                  Technical Student Society
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 pt-4">
            <div>
              <p className="headline">DashBoard</p>
              <br></br>
              <div className="text-left">
                <Hombut
                  color={"text-secondary"}
                  text={"Drafts"}
                  link={"./drafts"}
                />
                <Hombut
                  color={"text-danger"}
                  text={"Corrections"}
                  link={"./correction"}
                />
              </div>
              <p className="small lead text-left p-2 m-2">Event requests</p>
              <div>
                <Hombut color={"text-primary"} text={"All"} link={"./sent"} />
                <Hombut
                  color={"text-secondary"}
                  text={"Approved"}
                  link={"./approved"}
                />
                <Hombut
                  color={"text-danger"}
                  text={"Rejected"}
                  link={"./rejected"}
                />
              </div>
              <br></br>
            </div>
          </div>
        </div>
      </div>
      <div style={{left : '0px',display :'flex' ,flexDirection:'row',justifyContent: 'flex-end' , position: 'relative',marginTop:'-100px'}}>
      <div style={{marginRight : '75px'}}>
      <IconButton aria-label="Add" onClick={handleClickOpen} size="large">
        <AddCircleOutlineIcon color="primary" fontSize="Large"/>
      </IconButton>
      </div>
      </div>
      {!published ? (
        <Load />
      ) : (
        published.map((draft) => <PublishedCard draft={draft} />)
      )}
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
