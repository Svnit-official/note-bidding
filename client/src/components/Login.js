import { React, useState } from 'react'
import styles from '../styles/Login.module.css'
import HomeIcon from '@material-ui/icons/Home';

export default function Login() {
    const [view, setview] = useState("desktop");
    const [sideopen, setsideOpen] = useState(true);
    window.onresize = () => {
        if (window.visualViewport.width < 950 && view == "desktop") {
            setview("mobile");
        }
        else if (window.visualViewport.width > 950 && view == "mobile") {
            setview("desktop");
        }
    }
    function handleSideDrawer(){
        setsideOpen(!sideopen);
    }
    //console.log(view);
    return (

        view == "desktop" ?
            <div className="container-fluid " style={{ backgroundColor:"#F8FCFF",height:"810px"}}>
                    <button className={styles.backbtn} >
                        Back
                    </button>   
                    
                <div className={`row h-100 ${styles.mainrow}`}>
                    {sideopen ?
                        <>
                            <div className={`col-md-8 d-flex justify-content-center h-100`} style={{paddingTop:"90px",backgroundColor:"#F8FCFF"}}>
                            <div className="d-block">
                                    <div className="d-flex justify-content-center">
                                    <img  src="nitsurat.svg"/>
                                    <div>
                                        <div className={styles.logbrandhead}>SVNIT</div>
                                        <div className={styles.logbrandsub}>EVENT PORTAL</div>
                                        </div>
                                    </div>
                                    <div className={styles.loginbox} >
                                            <input type="text" className={styles.loginboxfield} placeholder="username" style={{width:"394.15px",display:"block"}} />
                                            <input type="password" className={styles.loginboxfield} placeholder="password" style={{width:"394.15px",display:"block",marginTop:"40px"}}/>
                                            <button type="button" class="btn" style={{backgroundColor: "#316797",borderRadius: "6px",width: "394.15px",height: "47.2px",marginTop:"49.03px",color:"white",fontSize:"1.5rem"}}>Login</button>
                                    </div>
                                 </div>
                            
                            </div>
                            <div className={`col-md-4 d-flex justify-content-center ${styles.rightcol}`} >
                                <button className={styles.clearbtn} onClick={handleSideDrawer}>X</button>
                                <div >
                                <div className={styles.rhead}>Login as</div>
                                <div className="d-block">
                                 <div className={styles.rightopt}>Dean</div>
                                 <div className={styles.rightopt}>Finance Department</div>
                                 <div className={styles.rightopt}>Club</div>
                                 <div className={styles.rightopt}>Faculty Advisor</div>
                                </div>
                                </div>
                            </div>
                        </>
                        :
                        <div styles={{backgroundColor:"#F8FCFF"}}>
                         <button className={styles.loginbtn} onClick={handleSideDrawer} >
                        Login as
                        </button> 
                        <div className="col-md-12 d-flex justify-content-center h-100" style={{paddingTop:"90px",backgroundColor:"#F8FCFF"}}>
                                <div className="d-block">
                                    <div className="d-flex justify-content-center">
                                    <img  src="nitsurat.svg"/>
                                    <div>
                                        <div className={styles.logbrandhead}>SVNIT</div>
                                        <div className={styles.logbrandsub}>EVENT PORTAL</div>
                                        </div>
                                    </div>
                                    <div className={styles.loginbox} >
                                            <input type="text" className={styles.loginboxfield} placeholder="username" style={{width:"394.15px",display:"block"}} />
                                            <input type="password" className={styles.loginboxfield} placeholder="password" style={{width:"394.15px",display:"block",marginTop:"40px"}}/>
                                            <button type="button" class="btn" style={{ fontSize:"1.5rem",color:"white",backgroundColor: "#316797",borderRadius: "6px",width: "394.15px",height: "47.2px",marginTop:"49.03px"}}>Login</button>
                                    </div>
                                 </div>
                        </div>
                        </div>
                    }
                </div>
            </div>
            :
            <>
            <div className="container-fluid"  >
                <div className={styles.mobNav} >
                <ul>
                    <li className={styles.leftList}><HomeIcon /></li>
                    <li className={styles.leftList}>
                        <button className={styles.mobbackbtn} >
                        Back
                        </button> 
                     </li>
                    <li className={styles.rightList}>
                        <button className={styles.mobbackbtn} >
                        Login as
                        </button> 
                    </li>
                </ul>
                </div>
            </div>
            <div className="row">
           
            <div className="col-md-12 d-flex justify-content-center" style={{marginTop:"100px"}} >
            <div className="d-block">
                <div className="d-flex justify-content-center">
                <img  src="nitsurat.svg"/>
                <div>
                    <div className={styles.logbrandhead}>SVNIT</div>
                    <div className={styles.logbrandsub}>EVENT PORTAL</div>
                    </div>
                </div>
                <div className={styles.loginbox} >
                        <input type="text" className={styles.loginboxfield} placeholder="username" style={{width:"100%",display:"block"}} />
                        <input type="password" className={styles.loginboxfield} placeholder="password" style={{width:"100%",display:"block",marginTop:"40px"}}/>
                        <button type="button" class="btn" style={{color:"white",backgroundColor: "#316797",borderRadius: "6px",width: "100%",height: "47.2px",marginTop:"49.03px"}}>Login</button>
                </div>
             </div>
            </div>
        </div>
        </> 


    )

}
