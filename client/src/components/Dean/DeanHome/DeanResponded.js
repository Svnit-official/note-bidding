import React, { useState,useEffect } from "react";
import NavBar from "../NavBar/NavBar"
import BottomNav from "../../BottomNav/BottomNav";
// import AddButton from '../AddButton/AddButton';
import {useDispatch,useSelector} from "react-redux";
import {getRespondedRequestsDean} from '../../../actions/deanActions';
import DeanCard from '../DeanCard/DeanCard';
import { CircularProgress } from "@material-ui/core";


const DeanResponded = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('dean_profile'))
  console.log(user);
  useEffect(()=>{
    dispatch(getRespondedRequestsDean(user.deanID));
  }
    ,[]);

    const req = useSelector((state) => state.deanReducers);
   const d = req.requests;
    // const x = req.disabled; 
    console.log(d);


  return (
    <div>
        <NavBar />
        { !d ? <CircularProgress /> : (
          d.map((x,i)=>(
            <DeanCard draft={x} display={x} key={i}/>
          ))

        )}
    </div>
  );
};

export default DeanResponded;
