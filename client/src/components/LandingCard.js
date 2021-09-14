import React from "react";
import styles from '../styles/landingCard.module.css';
//below is the template for props.
// const props ={
//     eventName:"TechnoInovation",
//     date:"02 Aug",
//     clubName:"MLSA",
//     linkName:"mereko nahi pata",
//     link:"http://ah shit here we go again"
// }
export default function LandCard(props){
    return(
        <>
        <div className="col-md-5 " style={{marginTop:"15px",marginLeft:"15px"}}>
            <div className={`row ${styles.mainbody}`}>
                <div className="col-6 ">
                    <div className="p-4">
                        <div>
                            <span className={styles.eventNamefield}>Event Name</span>
                        </div>
                        <div>
                            <span className={styles.eventName}>{props.eventName}</span>
                        </div>
                        <br></br>
                        <div>
                            <span className={styles.clubName}>{props.clubName}</span>
                        </div> 
                    </div>
                </div>
                <div className="col-6 justify-content-end">
                    <div className="p-4 ">
                        <div className={styles.landCardRightCol}>
                            <span className={styles.appdeadfield}>Application deadline</span>
                        </div>
                        <div className={styles.landCardRightCol}>
                            <span className={styles.landCardDateBoxes}>{props.date.split(' ')[0]}</span>
                            <span className={styles.landCardDateBoxes}>{props.date.split(' ')[1]}</span>  
                        </div>
                        <br></br>
                        <div className={styles.landCardRightCol}>
                            <a href={props.link} className={styles.linkbox}>{props.linkName}</a>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}