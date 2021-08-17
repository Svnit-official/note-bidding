import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function PublishedCard({draft}) {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  return (
    <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={draft?.eventPoster}
          title="Event Profile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {draft.eventName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {draft.eventDescription}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <Link href={draft.registerationLink} onClick={preventDefault}>
    Registration Link
  </Link>
            
          </Typography>
        </CardContent>
        <Button size="small" color="primary" href={draft?.socialMedia}>
          Social Media
        </Button>
        <Button size="small" color="primary" href={draft?.web}>
          Web Page
        </Button>
    </Card>
  );
}