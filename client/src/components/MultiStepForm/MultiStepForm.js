import React,{ useState,useEffect } from "react";
import {
    Step,
    Stepper,
    StepLabel,
    Typography,
    Button
  } from "@material-ui/core";
  import { makeStyles } from "@material-ui/core";
  
  // import StepOne from "./StepOne";
  
  const useStyles = makeStyles({
    root: {
      width: "100%"
    }
  });
  const deanAuth = true;
  const MultiStepForm = ({progress}) => {
    const classes = useStyles();
  
    //hooks
    const [activeStep, SetActiveStep] = useState(1);
  
    const getSteps = () => {
      return ["Club Request", "Faculty Advisor", "Finance Dept", "Dean"];
    };
  
    const steps = getSteps();
    
    useEffect(()=>{
        SetActiveStep(progress);
    },[])

    return (
        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      );
    };
    
    export default MultiStepForm;