import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(() => ({
    root: {
      width: '20vw',
      height: '80vh',
      margin: '15px',
    },
    media: {
      height: '60vh',
      width: '20vw'
    },
    cardAction: {
        display: "block",
        textAlign: "initial",
    },
    
}));

export default function FavoriteCard (movie) {
   const classes = useStyles();
    
   

    return (
    <Link underline='none' component={RouterLink} to={`/details/${movie.movie.movieId}`}>
      <Card className={classes.root}>
        <ButtonBase className={classes.cardAction}>
          <CardMedia className={classes.media} image={movie.movie.imageUrl} />
          <CardContent>
            <Typography align="center" gutterBottom variant="h4" component="h2">
            {movie.movie.name}
            </Typography>
          </CardContent>
        </ButtonBase>
      </Card>
    </Link>
    );
}