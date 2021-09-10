import React from 'react'
import NavBar from '../../NavBar/NavBar'
import Eventcard from './Eventcard'
export default function Events() {
    return (
            <div>
                <NavBar />
                <div className="row container-fluid" style={{paddingTop:"100px"}}>
                     <div className="col-md-4 col-sm-12" style={{backgroundColor:""}}>
                     </div>
                     <div className="col-md-8 col-sm-12 ">
                     <Eventcard />
                     <Eventcard />
                     <Eventcard />
                    </div> 
                </div>
            </div>
    )
}
