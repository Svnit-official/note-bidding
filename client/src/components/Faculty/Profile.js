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
import UpdateForm from "./FacultyUpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { facultyDetails } from "../../actions/auth";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loaders/Load.js";
import styles from "./Profile.module.css";
import drishti from "./drishti.png";
export default function Profile() {
  const id = sessionStorage.getItem("faculty");
  console.log(id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(facultyDetails(id));
  }, []);
  const d = useSelector((state) => state.authReducer.facultyDetail);
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
    return <Loading />;
  }
  return (
    <>
      <div className={styles.topDiv}>
        <div className={styles.navbar}>
          <div className="d-flex">
            <img
              className={styles.logo}
              alt="logo"
              src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/NIT_Surat_Logo.svg/1200px-NIT_Surat_Logo.svg.png"
            ></img>
            <div style={{ marginLeft: "15px" }}>
              <div className={styles.navhead}>SVNIT</div>
              <div className={styles.navheadsub}>EVENTS PORTAL</div>
            </div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <a href="/faculty/home">
              <span className={styles.navright}>Back To DashBoard</span>
            </a>
            <button className={`btn ${styles.logoutbtn}`}>LOGOUT</button>
          </div>
        </div>
        <div className={`d-flex ${styles.downpart}`}>
          <img className={styles.clublogo} src={d.facultyPic} alt="club" />
          <div className={styles.midmeName}>{d.facultyName}</div>
          <div className={styles.changepass}>
            <a href="/club/resetPassword" style={{ color: " #C24545" }}>
              Change Password
            </a>
            <br />
            <Button
              align="center"
              variant="contained"
              color="primary"
              onClick={handleDialogOpen}
              style={{ marginTop: "10px" }}
            >
              Update Details
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.downDiv}>
        <div>
          {/* FIRST SEGMENT */}
          <div className="d-flex">
            <div className={styles.sideline}></div>
            <div>
              <div className={styles.content}>
                <div>
                  <div className={styles.field}>Designation</div>
                  <p className={styles.fieldinput}>{d.facultyDesignation}</p>
                  <hr />
                </div>
              </div>
              <div className={styles.content}>
                <div>
                  <div className={styles.field}>Email</div>
                  <p className={styles.fieldinput}>{d.facultyEmail}</p>
                  <hr />
                </div>
              </div>
              <div className={styles.content}>
                <div>
                  <div className={styles.field}>Contact No.</div>
                  <p className={styles.fieldinput}>{d.facultyContact}</p>
                  <hr />
                </div>
              </div>
            </div>
          </div>
          {/* SECOND SEGMENT */}
          <div className="d-flex">
            <div className={styles.secsideline}></div>
            <div className={styles.content}>
              <div>
                <div className={styles.field}>Signature</div>
                <div style={{ width: "400px" }}>
                  <img
                    style={{ width: "250px", height: "80px" }}
                    src={d.signature}
                    alt="signature"
                  ></img>
                </div>
                <hr />
              </div>
            </div>
          </div>
          {/* THIRD SEGMENT */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Faculty Name"}</DialogTitle>
            <DialogActions>
              <UpdateForm />
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}
