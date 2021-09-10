import React from 'react'
import { Link } from 'react-router-dom'
export default function Eventcard(props) {
    return (
        <div className="border border-dark rounded" style={{paddingLeft:"2rem",paddingTop:"1rem",paddingRight:"2rem",paddingBottom:"1rem",backgroundColor:"#E8F6EF",marginBottom:"1rem"}} >
            <span style={{fontWeight:"400",color:"#A7C4BC"}}>Event Name</span>
            <h1 style={{fontWeight:"700"}}>Quriosity 7.0</h1>
            <div className="d-flex mt-4">
                <div style={{fontWeight:"600"}}>
                <Link className="" style={{textDecoration:"none",color:"black"}}>Send to Dashboard</Link>
                </div>
               <div className="" style={{marginLeft:"auto",fontWeight:"600",color:"#71EFA3"}}>
                <div style={{color:"#A7C4BC",marginLeft:"1.5rem"}}>status</div>
                Approved
               </div>
            </div>
            <div>
            <button type="button" class="m-2 btn btn-success">Button</button>
            <button type="button" class="m-2 btn btn-danger">Button</button>
            <button type="button" class="m-2 btn btn-warning">Button</button>
            </div>
        </div>
    )
}


