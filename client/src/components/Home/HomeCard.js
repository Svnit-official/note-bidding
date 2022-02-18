import React from "react";
import styles from "./HomeCard.module.css";
import Archive from './Archive';
//below is the template for props.
// const props ={
//     eventName:"TechnoInovation",
//     date:"02 Aug",
//     clubName:"MLSA",
//     linkName:"mereko nahi pata",
//     link:"http://ah shit here we go again"
// }
export default function LandCard(props) {
  return (
    <>
      <div
        className="col-md-4 "
        style={{ marginTop: "15px", marginLeft: "15px" }}
      >
        <div className={`row ${styles.mainbody}`}>
          <div className="col-6 ">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span className={styles.eventNamefield}>Event Name</span>

              <span className={styles.eventName}>{props.eventName}</span>

              <span className={styles.clubName}>{props.clubName}</span>
            </div>
          </div>
          <div className="col-6">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <span className={styles.eventNamefield}>Event Date</span>

              <div style={{ display: "flex", marginTop: "10px" }}>
                <div className={styles.landCardRightCol}>
                  <span className={styles.landCardDateBoxes}>
                    {/* {props.date.split(" ")[0]} */}
                  </span>
                </div>
                <span
                  className={styles.landCardDateBoxes}
                  style={{ marginRight: "0" }}
                >
                  {/* {props.date.split(" ")[1]} */}
                </span>
              </div>

              <span className={styles.clubName}>{props.clubName}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
