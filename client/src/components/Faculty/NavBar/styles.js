import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(1),
    margin: theme.spacing(0.5),
  },
}));
