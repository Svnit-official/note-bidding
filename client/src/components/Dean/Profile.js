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
import { deanDetails } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import useStyles from "./profileStyles";
import UpdateForm from "./DeanUpdateForm";
import { connect } from "react-redux";

const Dashboard = () => {
  const id = sessionStorage.getItem("dean");
  console.log(id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deanDetails(id));
  }, []);
  const d = useSelector((state) => state.authReducer.deanDetail);
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
    return <h1>Loading</h1>;
  } else {
    return (
      <div style={{ marginLeft: "10px", marginRight: "10px" }}>
        <Paper className={classes.paper} elevation={2}>
          <Typography
            variant="h4"
            component="h4"
            align="center"
            style={{ color: "white" }}
          >
            User Details
          </Typography>
        </Paper>
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
                  <b>Name :- </b> {d.deanName}
                </Typography>
                <Typography
                  gutterBottom={true}
                  align="center"
                  variant="body1"
                  style={{ marginBottom: "10px" }}
                >
                  <b>Designation :- </b> {d.deanDesignation}
                </Typography>
                <Typography
                  gutterBottom={true}
                  align="center"
                  variant="body1"
                  style={{ marginBottom: "10px" }}
                >
                  <b>Email</b> : {d.deanEmail}
                </Typography>
                <Typography
                  gutterBottom={true}
                  align="center"
                  variant="body1"
                  style={{ marginBottom: "10px" }}
                >
                  <b>Contact No</b>:- {d.deanContact}
                </Typography>
                <Typography
                  gutterBottom={true}
                  align="center"
                  variant="body1"
                  style={{ marginBottom: "5px" }}
                >
                  Signature:-{" "}
                  <img
                    src="https://signaturely.com/wp-content/uploads/2020/04/unreadable-letters-signaturely.svg"
                    alt="singn"
                    style={{ width: "100%", height: "80px" }}
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
                style={{ height: "100%", width: "100%" }}
                src={d.deanPic}
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
            <DialogTitle id="alert-dialog-title">{"Dean Name"}</DialogTitle>
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
