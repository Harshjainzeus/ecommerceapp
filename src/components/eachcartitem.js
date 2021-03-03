import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';


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


  function EachCartItem( {data,qty} ) {
    const classes = useStyles();

    return (

    <div className={classes.root}>
    <Paper className={classes.paper}>
        <Grid container >
          <Grid item sm>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={data.image_url} />
            </ButtonBase>
          </Grid>
          <Grid item  sm>
            <Grid item container direction="column" spacing={2}>

                <Typography gutterBottom variant="subtitle1">
                  <p><b>{data.title}</b></p>
                  <p>by {data.seller}</p>
                </Typography>
                <Typography variant="body2" gutterBottom>
                 
                </Typography>
                <Typography variant="subtitle1">$ {data.cost}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={3}
            style={{ textAlign: "left", padding: "30px" }}>
                $ {data.cost} &nbsp; x &nbsp; {qty} &nbsp; = &nbsp; ${" "}
            {data.cost * qty}
          </Grid>
        </Grid>
      </Paper>
      </div>
    );

  }

  export default EachCartItem;