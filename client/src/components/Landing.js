import React from 'react'
import styles from '../styles/Landing.module.css'
import Background from '../styles/BackgroundSVNIT.png';
import HomeIcon from '@material-ui/icons/Home';
import LandCard from './LandingCard';
export default function Landing() {
    return (
        <div >
            {/* <div className={styles.backimg}> */}
            <div className={`d-flex ${styles.navbar}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16" style={{marginLeft:"10px"}}>
  <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
  <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
</svg>
                <div className="" style={{marginLeft:"auto"}}>
                <input type="search" placeholder="search in page" className={styles.searchbar}></input>
                <button className={`btn ${styles.loginbtn}`}>Admin Login</button>
                </div>

            </div>
            {/* </div> */}
            <div className={`container-fluid ${styles.backimg}`}>
                
                <div className={`row ${styles.toprow}`} >
                    <div className="col-md-6 col-sm-12">
                        <div className="d-flex justify-content-center">
                            <img src="nitsurat.svg" />
                            <div>
                                <div className={styles.logbrandhead}>SVNIT</div>
                                <div className={styles.logbrandsub}>EVENT PORTAL</div>
                            </div>

                        </div>
                        <div className={styles.contentxtra}>
                            NIT Surat is governed by its ex officio visitor, the honorable President of India and the NIT Council who head the NIT organizational structure. Under the NIT Council is NIT Surat's Board of
                             Governors consisting of 12 members that includes representatives of the state of Gujarat, MHRD in addition to other members appointed by the NIT Council and the institute's senate. The Director serves under the Board of Governors,
                             and is the school's chief academic and executive officer. Under the director and the deputy director are the deans, heads of departments, registrar and Chief Hostel Warden.

                            The Registrar is the chief administrative officer and oversees day-to-day operations. 

                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <img src="event1.svg" />
                        <img src="event2.svg" />
                        <img src="event3.svg" />
                        <img src="event4.svg" />
                    </div>
                    {/* </div> */}
                </div>
            </div>
            <div className="row container-fluid justify-content-center" style={{ marginTop: "100px" }}>
                <LandCard eventName={"TechnoInovation"} date={"02 Aug"} clubName={"SVNIT"} linkName={"apple"} link={"http://ah shit here we go again"} />
                <LandCard eventName={"TechnoInovation"} date={"02 Aug"} clubName={"SVNIT"} linkName={"apple"} link={"http://ah shit here we go again"} />
                <LandCard eventName={"TechnoInovation"} date={"02 Aug"} clubName={"SVNIT"} linkName={"apple"} link={"http://ah shit here we go again"} />
                <LandCard eventName={"TechnoInovation"} date={"02 Aug"} clubName={"SVNIT"} linkName={"apple"} link={"http://ah shit here we go again"} />
            </div>
        </div>
    )
}

