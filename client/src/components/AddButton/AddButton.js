import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import useStyles from './styles'

const AddButton = () => {
  const classes = useStyles();
  return (
    <IconButton aria-label="Add">
      <AddCircleOutlineIcon
        color="primary"
        className = {classes.button}
      />
    </IconButton>
  );
};
export default AddButton;