import React, {useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import BottomNav from "../../BottomNav/BottomNav";
// import AddButton from '../AddButton/AddButton';
import {useDispatch,useSelector} from "react-redux";
import {getRespondedRequests} from '../../../actions/facultyActions';
import FacultyCard from '../FacultyCard/FacultyCard';
import {CircularProgress , Typography} from '@material-ui/core'


const FacultyResponded = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('fac_profile'))
  // console.log(user);
  useEffect(()=>{
    // dispatch(getPendingRequests(user.facultyID))
    dispatch(getRespondedRequests(user.facultyID));
  }
    ,[]);
    const d = useSelector((state) => state.facultyReducer.requests);
    console.log(d)

  return (
    <div>
        <NavBar />
        { !d ? <CircularProgress /> : (
          d.map((x,i)=>(
            <FacultyCard  draft={x} key={i}/>
          ))
        )}
    </div>
  );
};

export default FacultyResponded;
