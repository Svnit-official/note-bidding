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
import React, { useState } from "react";
import useStyles from "./profileStyles";
import UpdateForm from "./DeanUpdateForm";
const Dashboard = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
                <b>Name</b> : DEAN NAME
              </Typography>
              <Typography
                gutterBottom={true}
                align="center"
                variant="body1"
                style={{ marginBottom: "10px" }}
              >
                <b>Designation</b> : Nalla
              </Typography>
              <Typography
                gutterBottom={true}
                align="center"
                variant="body1"
                style={{ marginBottom: "10px" }}
              >
                <b>Email</b> : dean@gmail.com
              </Typography>
              <Typography
                gutterBottom={true}
                align="center"
                variant="body1"
                style={{ marginBottom: "10px" }}
              >
                <b>Contact No</b>:- XXXXXXXXXX
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
              style={{ width: "100%" }}
              src="https://images.unsplash.com/photo-1626271812535-249679371de6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=718&q=80"
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
};

export default Dashboard;
