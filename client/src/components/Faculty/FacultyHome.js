import React, { useState,useEffect } from "react";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import BottomNav from "../BottomNav/BottomNav";
// import AddButton from '../AddButton/AddButton';
import {useDispatch,useSelector} from "react-redux";
import {getPendingRequests} from '../../actions/facultyActions';


const FacultyHome = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('fac_profile'))
  console.log(user);
  useEffect(()=>{
    dispatch(getPendingRequests(user.facultyID))
  }
    ,[]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <NavBar />
      <BottomNav />
    </div>
  );
};

export default FacultyHome;
