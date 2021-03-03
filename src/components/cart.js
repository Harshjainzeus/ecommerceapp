import React from "react";
import { useStore } from "../context/store";
import EachCartItem from "./eachcartitem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";




const Cart = () => {

  const store = useStore();
  const cartlist = store.itemlist;


  return cartlist.length === 0 ? (
    <div>
      <h1> No items in Cart </h1>
    </div>
  ) : (<div>
    {cartlist?.map((item) => (

      <div key={item?.product?.id}>
        <EachCartItem  data={item.product} qty={item.qtyadd} />
      </div>

    ))}

    <Grid container>
      <Grid item xs={9}></Grid>
      <Grid
        item
        xs={2}
        style={{
          textAlign: "right",
          marginTop: "10px",
          paddingRight: "30px",
          fontSize: "larger",
        }}
      >
        Total : $ {store.sumtotal}
      </Grid>
    </Grid>


    <Grid container>
      <Grid item xs={9}></Grid>
      <Grid
        item
        xs={3}
        style={{
          textAlign: "right",
          marginTop: "10px",
          paddingRight: "30px",
          fontSize: "larger",
        }}
      >
        <Button variant="contained" color="primary">
          <Link
            to="/checkout"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Typography noWrap>Proceed to checkout</Typography>
          </Link>
        </Button>
      </Grid>
    </Grid>
  </div>


    );


}

export default Cart;
