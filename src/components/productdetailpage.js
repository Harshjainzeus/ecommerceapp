import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
// import Button from '@material-ui/core/Button';
import {useStore} from '../context/store';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


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
    button: {
        // display: 'block',
        marginTop: theme.spacing(2),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 50,
      },
}));


function ProductDetail() {
    const classes = useStyles();
    const { id } = useParams();
    const [tile, setTile] = useState(null);
    const [qty, setQty] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [fopen, setFopen] = React.useState(false);

    

    const cartofcontext = useStore();

    const handleChange = (event) => {
        setQty(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClosesnake = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
        setFopen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const cartAdd = () => {
        console.log(tile,qty)
        cartofcontext.addToCart(tile,qty);
        setFopen(true);

    };
   
  

    useEffect(() => {
        axios
            .get(
                `http://localhost:8000/ecommerce/products/${id}`
            )
            .then((response) => {
                console.log(response.data)
                setTile(response.data)

            })
            .catch((err) => {
                console.log(err)

            });
    },[id]//here id is required since it tells when to call at backend
    );

    return (

        <div className={classes.root}>

            <Paper className={classes.paper}>
                <Grid container >
                    <Grid item sm>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={tile?.image_url} />
                        </ButtonBase>
                    </Grid>
                    <Grid item sm>
                        <Grid item container direction="column" spacing={2}>
                            <Typography gutterBottom variant="subtitle1">
                                <p><b>{tile?.title}</b></p>
                                <p>by {tile?.seller}</p>
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                            </Typography>
                            <Typography variant="subtitle1">$ {tile?.cost}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <div>
                            
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-controlled-open-select-label">Qty</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    value={qty}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                               
                                </Select>
                            </FormControl>
                            <IconButton onClick={cartAdd}>
                  <AddShoppingCartIcon />
                </IconButton>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
            <Snackbar open={fopen} autoHideDuration={6000} onClose={handleClosesnake}>
        <Alert onClose={handleClosesnake} severity="success">
        Added {qty} {tile?.title} to the shopping cart
        </Alert>
      </Snackbar>
        </div>
        
    );

}

export default ProductDetail;