  
import React,{useState,useRef} from 'react';
import { Typography,TextField,Button } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import {postClubComments} from '../../actions/clubActions'

const CommentSection = ({id}) => {
    //console.log(post);
    const classes = useStyles();
    //const [comments,setComments] = useState([post?.comments]);
    const [comment,setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('club_profile'));
    const dispatch = useDispatch();
    //const commentRef = useRef();

    const handleClick = async (e) => {

        console.log(comment);

        const request = {
            id,
            comment
        }

        const newComments = await dispatch(postClubComments(user.clubID , request))
        console.log(newComments);

        // e.preventDefault();
        // const finalComment =  `${user.result.name} : ${comment}`;
        // const newComments = await dispatch(commentPost(finalComment , post._id));
        // setComments(newComments);
        // setComment('');

        // commentRef.current.scrollIntoView({behavior: 'smooth'});
    }
    
    return (
        <div>
             <div className={classes.commentsOuterContainer}>
                {/* <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {comments.map((c,i)=>(
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            {/* <strong>{c.split(':')}</strong>
                            {c.split(':')[1]} */}
                             {/* {c}
                        </Typography> 
                     ))}
                    <div ref={commentRef}/> */}
                {/* </div>   */} */}
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