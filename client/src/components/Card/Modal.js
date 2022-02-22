

import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './Modal.css';
import { useDispatch } from 'react-redux';
import {postClubComments} from '../../actions/clubActions';
// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal({draft}) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [comments,setComments] = useState([draft?.comments]);
    const [comment,setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('club_profile'));
    const dispatch = useDispatch();
    useEffect(()=>{
        setComments(draft?.comments);
    } , [])

   const handleCommentPost = async (e) => {
    e.preventDefault();
        console.log(comment);

        const request = {
           id : draft._id,
            comment
        }

        const newComments = await dispatch(postClubComments(user.clubID , request))
        console.log("data at modal",newComments);

        setComments(newComments);
        setComment('');
   }

   console.log(draft.comments);

    return (
        <div style={modalStyle} className={classes.paper} >
            <div className="row">
                <div className="col-md-6">
                    Event Name
                    <h1>{draft.eventName}</h1>
                    <hr></hr>
                    {draft.eventDescription}
                    <h2>Tentative Date:</h2>
                    {draft.eventDate}
                    <h6>{draft.financeRequired ? "Finance is Required" : "Finance is Not Required"}</h6>
                    <ul>
                        <li>First Prize : {draft.FirstPrice}</li>
                        <li>Second Prize : {draft.SecondPrice}</li>
                        <li>Third Prize : {draft.ThirdPrice}</li>
                        <li>Miscellaneous : {draft.expences}</li>
                        <li>Total : {draft.Total}</li>
                    </ul>
                    <div class="form-outline" >
                        {comments.map((c)=>(
                            <p><strong>{c.name} : </strong>{c.comment}</p>
                        ))}
                        <textarea class="form-control" id="textAreaExample" rows="2" placeholder="Comment If any" style={{backgroundColor:"#FFF7AE"}} value = {comment}
                        onChange={(e)=> setComment(e.target.value)}></textarea>
                        <button onClick={handleCommentPost}>Send</button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="rightboxtop"><h1>Status</h1></div>
                    
                    <ul style={{ listStyle: "none" }}>
                    <div className="verticol"></div>
                        <li className="" style={{display:"flex"}}  >
                            <div className="dots"></div>
                            <div className="rightbox" style={{marginTop:"-10px"}}>
                                <h3>Club Request</h3>
                                Request successfully made by thr club
                            </div>
                        </li>
                        <li className="" style={{display:"flex"}}>
                            <div className="dots"></div>
                            <div className="rightbox"><h3>Finance Advisor</h3>
                            Resend with the corrections suggested in PDF</div>
                        </li>
                        <li className="" style={{display:"flex"}}>
                            <div className="dots"></div>
                            <div className="rightbox">
                                <h3>Finance Department</h3>
                                  Request pending with faculty advisor
                                </div>
                        </li>
                        <li className="" style={{display:"flex"}}>
                            <div className="dots"></div>
                            <div className="rightbox">
                            <h3>Club Request</h3>
                            Request successfully made by the club
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
                }

