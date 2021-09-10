import React from "react";
function Hombut(props)
{
    console.log(props);
    var colour =  "btn btn-light btn-lg " + props.color;
    console.log(props.color);
    return(
        <div className="d-inline m-2 "  style={{fontSize:"2rem"}} >
            <a href={props.link}><button type="button" className={colour}>{props.text}</button></a>
        </div>
    )
}
export default Hombut;