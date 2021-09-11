
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './Modal.css';
import CloseIcon from '@material-ui/icons/Close';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 ;
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

export default function SimpleModal({state,draft}) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    console.log(state);
    const [open, setOpen] = React.useState(state)

    // const handleOpen = () => {
    //      setOpen(true);
    //      return true;
    // };

    const handleClose = () => {
        // state=false;
        console.log(open);
         setOpen(true);
         console.log(open);
    };

    const body = (
        <div style={modalStyle} className={classes.paper} >
            {/* <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <SimpleModal /> */}
            <div className="row">
                <div className="col-md-6">
                    Event Name
                    <h1>{draft.eventName}</h1>
                    <hr></hr>
                    {draft.eventDescription}
                    <h2>Tentative Date:</h2>
                    {draft.eventDate}

                    <div class="form-outline" >
                        <textarea class="form-control" id="textAreaExample" rows="10" placeholder="Comment If any" style={{backgroundColor:"#FFF7AE"}}></textarea>
                    </div>
                </div>
                <div className="col-md-6">
                      <div className="float-right"  onClick={handleClose}> <CloseIcon /><div>
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
                    <div className="float-right" style={{position:"relative"}}>
                    <button type="button" className="btn" style={{width:"50%",backgroundColor:"#fde964"}}>Download Pdf</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    );

    return (
 
        <div>
            {/* <button type="button" onClick={handleOpen}>
                Open Modal
            </button> */}
            <Modal
                open={state}

                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

