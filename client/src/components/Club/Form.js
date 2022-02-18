import { React, useState } from "react";
import styles from "./Login.module.css";
import HomeIcon from "@material-ui/icons/Home";
import svnitLogo from "../../styles/nitsurat.svg";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { clubsignin } from "../../actions/auth";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";

const initialState = {
  username: "",
  password: "",
};
export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialState);
  const [view, setview] = useState("desktop");
  const handleShowPassword = () => setShowPassword(!showPassword);
  const classes = useStyles();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let x = await dispatch(clubsignin(form, history));
    console.log(x.status);
    if (x.status === "success") return;
    else setIncorrectPassword(true);
  };
  window.onresize = () => {
    if (window.visualViewport.width < 950 && view === "desktop") {
      setview("mobile");
    } else if (window.visualViewport.width > 950 && view === "mobile") {
      setview("desktop");
    }
  };
  //console.log(view);
  return (
    <div
      className="container-fluid "
      style={{
        backgroundColor: "#F8FCFF",
        height: "810px",
      }}
    >
      <button className={styles.backbtn}>Back</button>

      <div className={`row h-100 ${styles.mainrow}`}>
        <>
          <div styles={{ backgroundColor: "#F8FCFF" }}>
            <div
              className="col-md-12 d-flex justify-content-center h-100"
              style={{ paddingTop: "40px", backgroundColor: "#F8FCFF" }}
            >
              <div className="d-block">
                <div className="d-flex justify-content-center">
                  <img
                    src={svnitLogo}
                    alt="svnit-logo"
                    style={{ marginRight: "2em" }}
                  />
                  <div>
                    <div className={styles.logbrandhead}>SVNIT</div>
                    <div className={styles.logbrandsub}>EVENT PORTAL</div>
                  </div>
                </div>
                <form className={styles.loginbox} onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="username"
                    className={`form-control`}
                    placeholder="username"
                    style={{ width: "394.15px", display: "block" }}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    onChange={handleChange}
                    name="password"
                    className={`form-control`}
                    placeholder="password"
                    style={{
                      width: "100%",
                      display: "inline",
                      marginTop: "25px",
                    }}
                  />
                  <button
                    type="submit"
                    class="btn"
                    style={{
                      fontSize: "1.5rem",
                      color: "white",
                      backgroundColor: "#316797",
                      borderRadius: "6px",
                      width: "394.15px",
                      height: "47.2px",
                      marginTop: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Login as Club
                  </button>
                  <hr />
                  <button
                    // type="submit"
                    class="btn"
                    style={{
                      fontSize: "1.5rem",
                      color: "white",
                      backgroundColor: "#316797",
                      borderRadius: "6px",
                      width: "394.15px",
                      height: "47.2px",
                      marginTop: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    View Accepted Events
                  </button>
                  <hr />
                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        margin: "0",
                        fontWeight: "600",
                        fontSize: "25px",
                        fontFamily: "cursive",
                      }}
                    >
                      OR
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <a
                        href="/dean/login"
                        type="button"
                        class="btn"
                        style={{
                          fontSize: "1.5rem",
                          color: "white",
                          backgroundColor: "#316797",
                          borderRadius: "6px",
                          width: "110px",
                          height: "47.2px",
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Dean
                      </a>
                      <a
                        href="/faculty/login"
                        type="button"
                        class="btn"
                        style={{
                          fontSize: "1.5rem",
                          color: "white",
                          backgroundColor: "#316797",
                          borderRadius: "6px",
                          width: "110px",
                          height: "47.2px",
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Faculty
                      </a>
                      <a
                        href="/finance/login"
                        type="button"
                        class=" btn"
                        style={{
                          fontSize: "1.5rem",
                          color: "white",
                          backgroundColor: "#316797",
                          borderRadius: "6px",
                          width: "110px",
                          height: "47.2px",
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Finance
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          )
        </>
      </div>
    </div>
  );
}
