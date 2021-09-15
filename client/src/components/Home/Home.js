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
          <button className={`btn ${styles.loginbtn}`}>Admin Login</button>
        </div>
      </div>
      {/* </div> */}
      <div className={`container-fluid ${styles.backimg}`}>
        <div className={`row ${styles.toprow}`}>
          <div className="col-md-6 col-sm-12">
            <div className="d-flex justify-content-center">
              <img src="nitsurat.svg" />
              <div>
                <div className={styles.logbrandhead}>SVNIT</div>
                <div className={styles.logbrandsub}>EVENT PORTAL</div>
              </div>
            </div>
            <div className={styles.contentxtra}>
              NIT Surat is governed by its ex officio visitor, the honorable
              President of India and the NIT Council who head the NIT
              organizational structure. Under the NIT Council is NIT Surat's
              Board of Governors consisting of 12 members that includes
              representatives of the state of Gujarat, MHRD in addition to other
              members appointed by the NIT Council and the institute's senate.
              The Director serves under the Board of Governors, and is the
              school's chief academic and executive officer. Under the director
              and the deputy director are the deans, heads of departments,
              registrar and Chief Hostel Warden. The Registrar is the chief
              administrative officer and oversees day-to-day operations.
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <img style={{ maxWidth: "100%" }} src={events}></img>
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className="" style={{ marginTop: "100px" }}>
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
