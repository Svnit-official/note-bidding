import React from 'react';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper} from '@material-ui/core'
import useStyles from './styles';

const SubmitForm = () => {

    const classes = useStyles();

   const handleSubmit = () => {

   } 

    return (
        <Paper className={classes.paper} elevation={6}>
<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}  onSubmit={handleSubmit}>
    <Typography variant="h6">Create an Event</Typography>
    <TextField id="filled-required" name="head" variant="outlined" label="Title"  fullWidth  value = "Head" />
    <TextField name="EventName" variant="outlined" label="Message"  fullWidth value = "Event Name" />
    <TextField name="date" type="date" fullWidth variant="outlined" value = "Event Name" />
    <TextField name="description" variant="outlined" multiline rows={3}  label="Message"  fullWidth value = "description" />

    <div className={classes.fileInput}>
        <FileBase  type="file" multiple={false} style={{width: '50px' , color : 'blue'}}  />
    </div>
    <Button className={classes.buttonSubmit} fullWidth variant="contained" color="primary" size="large" type="submit"  >Submit</Button>
    <Button className={classes.buttonSubmit} fullWidth variant="contained" color="primary" size="large" type="submit"  >Save as Draft</Button>
    <Button  variant="contained" color="secondary" fullWidth size="large"   >clear</Button>
</form>
</Paper>
    )
}

export default SubmitForm