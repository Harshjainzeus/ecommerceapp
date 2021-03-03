import React from 'react';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useStore } from '../context/store';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useAuth} from '../context/authcontext';
import { Redirect } from 'react-router-dom';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Checkout() {
    const store = useStore();
    const auth = useAuth();
    let total = 0;
    const [open, setOpen] = React.useState(false);
    // const total = store.sumtotal;
    // console.log(total)
    const handleClick = async () => {
        total = await store.getTotal();
        setOpen(true);
        store.removeCart();
       
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    return (
        auth.user?
        <div style={{ margin: "30px auto" }}>
            <h2>Total Amount Payable : $ {store.sumtotal === 0 ? 0 : store.sumtotal}</h2>

            <Button variant="contained" color="primary" onClick={handleClick}>
                <Typography>Place Order</Typography>
            </Button>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                you payed {total} and you will get it
                </Alert>
            </Snackbar>
        </div>
        : <Redirect to = "/login"/>

    );
}