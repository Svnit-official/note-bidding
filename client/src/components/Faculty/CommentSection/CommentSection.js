import React,{useState,useRef,useEffect} from 'react';
import { Typography,TextField,Button } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import {postFacultyComments} from '../../../actions/facultyActions';
import { getPendingRequests } from "../../../actions/facultyActions";

const CommentSection = ({draft}) => {
    //console.log(post);
    const classes = useStyles();
    const [comments,setComments] = useState([draft?.comments]);
    const [comment,setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('fac_profile'));
    const dispatch = useDispatch();
    //const commentRef = useRef();

    useEffect(()=>{
        setComments(draft?.comments);
    } , [])
  

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(comment);

        const request = {
           id : draft._id,
            comment
        }

        const newComments = await dispatch(postFacultyComments(user.facultyID , request))
        console.log(newComments);

        setComments(newComments);
        setComment('');
        
        // commentRef.current.scrollIntoView({behavior: 'smooth'});
    }
    
    return (
        <div>
             <div className={classes.commentsOuterContainer}>
             <div className={classes.commentsInnerContainer}>
                    {comments.map((c)=>(<div>
                        <Typography  variant="h6">{c.name}  :</Typography>
                        <Typography  gutterBottom variant='subtitle1'>
                            {c.comment}
                        </Typography>
                        </div>
                    ))}
                </div>


             <Typography>comment 1</Typography>
                    <div style={{width : '70%'}}>
                    <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                    <TextField 
                        fullWidth
                        rows = {1}
                        variant="outlined"
                        label="Comment"
                        multiline
                        value = {comment}
                        onChange={(e)=> setComment(e.target.value)}
                    />
                    <Button 
                    style={{marginTop : '10px'}}
                    fullWidth
                    disabled={!comment}
                    variant="contained"
                    onClick={handleClick}
                    color="primary"
                    >Submit</Button>
                    </div>
            </div>
        </div>
    )
}

export default CommentSection