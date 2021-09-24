import React from "react";
import styles from "./Profile.module.css";
import drishti from "./drishti.png";
export default function Profile() {
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
            <a href="/club/home">
              <span className={styles.navright}>Back To DashBoard</span>
            </a>
            <button className={`btn ${styles.logoutbtn}`}>LOGOUT</button>
          </div>
        </div>
        <div className={`d-flex ${styles.downpart}`}>
          <img className={styles.clublogo} src={drishti} alt="club" />
          <div className={styles.midmeName}>CEV</div>
          <div className={styles.changepass}>
            <a href="/club/resetPassword" style={{ color: " #C24545" }}>
              Change Password
            </a>
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
                  <div className={styles.field}>club name</div>
                  <input
                    className={styles.fieldinput}
                    placeholder="Drishti-A revolutionary club"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class={`bi bi-pencil ${styles.pencil}`}
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>{" "}
                  <hr />
                </div>
              </div>
              <div className={styles.content}>
                <div>
                  <div className={styles.field}>club name</div>
                  <input
                    className={styles.fieldinput}
                    placeholder="Technical Hobby Club"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class={`bi bi-pencil ${styles.pencil}`}
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>
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
                <div className={styles.field}>Description</div>
                <div style={{ width: "400px" }}>
                  DRISHTI is responsible for spreading technical awareness in
                  SVNIT and is comprised of a bunch of inquisitive members where
                  each one of us is ready to share what we got through our
                  experiences and experiments by the medium of various
                  workshops, seminars, events and hands-on
                </div>
                <input className={styles.fieldinput} placeholder="" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class={`bi bi-pencil ${styles.pencil}`}
                  viewBox="0 0 16 16"
                >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
                <hr />
              </div>
            </div>
          </div>
          {/* THIRD SEGMENT */}
          <div className="d-flex">
            <div className={styles.thirdsideline}></div>
            <div className={styles.content}>
              <div>
                <div className={styles.field}>contact</div>
                <div className={styles.phonenumber}>
                  <div>John Wick</div>
                  <div style={{ marginLeft: "20px" }}>- 9876543210</div>
                </div>

                <hr />
                <div className={styles.phonenumber}>
                  <div>Walter White</div>
                  <div style={{ marginLeft: "20px" }}>- 9874563210</div>
                </div>
                <hr />
                <div className={styles.field}>Email ID</div>
                <div>drishti.nitsurat@gmail.com</div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
