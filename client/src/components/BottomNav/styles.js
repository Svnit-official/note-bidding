import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) =>({
    Bcontainer: {
      width: 700,
    },
    BottomNav : {
        top : 'auto',
        bottom: 0 ,
        alignItems: 'center'

    },
    [theme.breakpoints.down('sm')] : {
        Bcontainer : {
            width: 400,
        }
      }
  }));
  