import React, { useState } from "react";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper,Switch } from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { clubFormSubmit, clubFormDraft } from "../../actions/clubActions";
import { useHistory } from "react-router-dom";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const SubmitForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("club_profile"));
  const clubID = user?.clubID;
  const [postData, setPostData] = useState({});
  const [chooseFinance , setChooseFinance] = useState(false);
  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    console.log({ ...postData ,financeRequired : chooseFinance });
     dispatch(clubFormSubmit({ ...postData ,financeRequired : chooseFinance }, clubID, history));
  };

  const saveDraft = (e) => {
    dispatch(clubFormDraft({ ...postData }, clubID, history));
    
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <Typography variant="h6">Create an Event</Typography>
        <TextField
          id="filled-required"
          name="headName"
          variant="outlined"
          label="Head Name"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="eventName"
          variant="outlined"
          label="Event Name"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="eventDate"
          type="date"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="eventDescription"
          variant="outlined"
          multiline
          rows={3}
          label="Description"
          fullWidth
          onChange={handleChange}
        />
        <Typography>Do You Want to Choose Finance</Typography><Switch {...label} onChange={()=>{
          setChooseFinance((prev)=>!prev)
            console.log(chooseFinance);
            }} />
        {chooseFinance &&(
          <div style={{width: '100%'}}>
          <TextField
          name="FirstPrice"
          variant="outlined"
          type = "number"
          label="First Price"
          onChange={handleChange}
        />
          <TextField
          name="SecondPrice"
          type = "number"
          variant="outlined"
          label="Second Price"
          onChange={handleChange}
        />

<TextField
          name="ThirdPrice"
          type = "number"
          variant="outlined"
          label="Third Price"
          onChange={handleChange}
        />

<TextField
          name="expences"
          variant="outlined"
          multiline
          rows={3}
          label="miscellaneous expences"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="Total"
          type = "number"
          variant="outlined"
          label="Total"
          fullWidth
          onChange={handleChange}
        />
        </div>
        )}
        
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, pdf: base64 })}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          // type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          // type="submit"
          onClick={saveDraft}
        >
          Save as Draft
        </Button>
        <Button variant="contained" color="secondary" fullWidth size="large" >
          clear
        </Button>
      </form>
    </Paper>
  );
};

export default SubmitForm;
