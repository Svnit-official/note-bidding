import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2, 1),
    backgroundColor: "#3f51b5",
    // height: "100vh",
  },
  grid: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  details: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(5),
  },
  image: {
    padding: theme.spacing(6),
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));
