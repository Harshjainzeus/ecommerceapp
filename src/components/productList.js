import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import {NavLink} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
    },
    image: {
      width: 150,
      height: 150,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));


  function ComplexGrid( {tile} ) {
    const classes = useStyles();

    return (

    <div className={classes.root}>
    <NavLink to = {`/products/${tile.id}`}>
    <Paper className={classes.paper}>
        <Grid container >
          <Grid item sm>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={tile.image_url} />
            </ButtonBase>
          </Grid>
          <Grid item  sm>
            <Grid item container direction="column" spacing={2}>

                <Typography gutterBottom variant="subtitle1">
                  <p><b>{tile.title}</b></p>
                  <p>by {tile.seller}</p>
                </Typography>
                <Typography variant="body2" gutterBottom>
                 
                </Typography>
                <Typography variant="subtitle1">$ {tile.cost}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      </NavLink>
      </div>
    );

  }

  export default ComplexGrid;