import React from "react";
import styles from "./Home.module.css";
import LandCard from "./HomeCard";
import events from "./Images.png";
export default function Landing() {
  return (
    <div>
      {/* <div className={styles.backimg}> */}
      <div className={`d-flex ${styles.navbar}`}>
        <div className="" style={{ marginLeft: "auto" }}>
          <a href="/club/login" className={`btn ${styles.loginbtn}`}>
            Login
          </a>
        </div>
      </div>
      <div className={`row ${styles.topDiv}`}>
        <div className="col-md-6 col-sm-12">
          <div className={styles.logo}>
            <img style={{ height: "140px" }} src="nitsurat.svg"></img>
            <div>
              <div className={styles.logbrandhead}>SVNIT</div>
              <div className={styles.logbrandsub}>EVENTS PORTAL</div>
            </div>
            <div className={styles.longtext}>
              NIT Surat is governed by its ex officio visitor, the honorable
              President of India and the NIT Council who head the NIT
              organizational structure. Under the NIT Council is NIT Surat's
              Board of Governors consisting of 12 members that includes
              representatives of the state of Gujarat, MHRD in addition to other
              members appointed by the NIT Council and the institute's senate.
              The Director serves under the Board of Governors, and is the
              school's chief academic and executive officer. Under the director
              and the deputy director are the deans, heads of departments,
              registrar and Chief Hostel Warden.
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="col-md-6 col-sm-12"
        >
          <img
            style={{ maxWidth: "90%", paddingTop: "2em" }}
            src={events}
          ></img>
        </div>
      </div>
      <h1 className={styles.eventHead}>All Upcoming Events</h1>
      <div
        className="row container-fluid justify-content-center"
        style={{
          marginTop: "35px",
          paddingRight: "0",
        }}
      >
        <LandCard
          eventName={"TechnoInovation"}
          date={"02 Aug"}
          clubName={"SVNIT"}
          linkName={"apple"}
          link={"http://ah shit here we go again"}
        />
        <LandCard
          eventName={"TechnoInovation"}
          date={"02 Aug"}
          clubName={"SVNIT"}
          linkName={"apple"}
          link={"http://ah shit here we go again"}
        />
        <LandCard
          eventName={"TechnoInovation"}
          date={"02 Aug"}
          clubName={"SVNIT"}
          linkName={"apple"}
          link={"http://ah shit here we go again"}
        />
        <LandCard
          eventName={"TechnoInovation"}
          date={"02 Aug"}
          clubName={"SVNIT"}
          linkName={"apple"}
          link={"http://ah shit here we go again"}
        />
      </div>
    </div>
  );
}
