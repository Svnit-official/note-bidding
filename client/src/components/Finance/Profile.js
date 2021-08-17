import {
  TextField,
  Button,
  Typography,
  Paper,
  Card,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./profileStyles";
import UpdateForm from "./FinanceUpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { financeDetails } from "../../actions/auth";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loaders/Load.js";

const Dashboard = () => {
  const id = sessionStorage.getItem("finance");
  console.log(id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(financeDetails(id));
  }, []);
  const d = useSelector((state) => state.authReducer.financeDetail);
  console.log(d);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  if (!d) {
    return <Loading></Loading>;
  } else {
    return (
      <div style={{ marginLeft: "10px", marginRight: "10px" }}>
        <NavBar></NavBar>
        <Grid container spacing={2} className={classes.grid}>
          <Grid item xs={12} sm={8}>
            <Card className={classes.details} elevation={4}>
              <div style={{ textAlign: "center" }}>
                <Typography
                  gutterBottom={true}
                  align="center"
                  variant="body1"
                  style={{ marginBottom: "10px" }}
                >
                  <b>Name :- </b> {d.financeName}
                </Typography>
                <Typography
                  gutterBottom={true}
                  align="center"
                  variant="body1"
                  style={{ marginBottom: "10px" }}
                >
                  <b>Designation :- </b> {d.financeDesignation}
                </Typography>
                <Typography
                  gutterBottom={true}
                  align="center"
                  variant="body1"
                  style={{ marginBottom: "10px" }}
                >
                  <b>Email :- </b> {d.financeEmail}
                </Typography>
                <Typography
                  gutterBottom={true}
                  align="center"
                  variant="body1"
                  style={{ marginBottom: "10px" }}
                >
                  <b>Contact No :-</b> {d.financeContact}
                </Typography>
                <Typography
                  gutterBottom={true}
                  align="center"
                  variant="body1"
                  style={{ marginBottom: "5px" }}
                >
                  <b>Signature :- </b> <br></br>
                  <img
                    src={d.signature}
                    alt="singn"
                    style={{ width: "20%", height: "80px" }}
                  ></img>
                </Typography>
                <Button
                  align="center"
                  variant="contained"
                  color="primary"
                  onClick={handleDialogOpen}
                >
                  Update Details
                </Button>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className={classes.image} elevation={2}>
              <img
                style={{ width: "100%", height: "100%" }}
                src={d.financePic}
                alt="dean"
              ></img>
            </Card>
          </Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Finance Head Name"}
            </DialogTitle>
            <DialogActions>
              <UpdateForm />
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    );
  }
};

export default Dashboard;
