import { Button, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import { deanDetails } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import useStyles from "./profileStyles";
import UpdateForm from "./DeanUpdateForm";
import Loading from "../Loaders/Load.js";
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
    return <Loading />;
  } else {
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
              <a href="/dean/home">
                <span className={styles.navright}>Back To DashBoard</span>
              </a>
              <button className={`btn ${styles.logoutbtn}`}>LOGOUT</button>
            </div>
          </div>
          <div className={`d-flex ${styles.downpart}`}>
            <img className={styles.clublogo} src={d.deanPic} alt="club" />
            <div className={styles.midmeName}>{d.deanName}</div>
            <div className={styles.changepass}>
              <a href="/dean/resetPassword" style={{ color: " #C24545" }}>
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
                    <p className={styles.fieldinput}>{d.deanDesignation}</p>
                    <hr />
                  </div>
                </div>
                <div className={styles.content}>
                  <div>
                    <div className={styles.field}>Email</div>
                    <p className={styles.fieldinput}>{d.deanEmail}</p>
                    <hr />
                  </div>
                </div>
                <div className={styles.content}>
                  <div>
                    <div className={styles.field}>Contact No.</div>
                    <p className={styles.fieldinput}>{d.deanContact}</p>
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
              <DialogTitle id="alert-dialog-title">{"Dean Name"}</DialogTitle>
              <DialogActions>
                <UpdateForm details={d} />
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </>
    );
  }
};
export default Dashboard;
