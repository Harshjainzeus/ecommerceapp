import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Dashboard from './components/featuredpage';
import Header from './components/header';
import DepartmentWiseProducts from './components/department';
import Fourzerofour from './components/fourzerofour';
import ProductDetail from './components/productdetailpage';
import Cart from './components/cart';
import Checkout from './components/checkout';
import LoginPage from './components/signin';
// import {AuthContext} from './context/authcontext';
// import React , {useContext} from 'react';
import React from "react";
import {useStore} from './context/store';
// import {AuthProvider} from './context/authcontext';
import SignUp from './components/signup'
import { createMuiTheme, Paper, ThemeProvider } from '@material-ui/core';
import Searchcomp from './components/search';

function App() {
  // console.log(sumtotal)
  const store = useStore();
  const theme = createMuiTheme({
    palette: {
      type: store.darkmode ? "dark" : "light",
    },
  });


  return (
    
    <Router>
       
      <ThemeProvider theme={theme}>
      <div className="App">
       <Paper>
     
        <Header />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/departments/:department">
           <DepartmentWiseProducts/>
        </Route>
        <Route exact path="/departments">
          <Redirect to="/departments/science"/>
        </Route>
        <Route exact path="/products/:id">
           <ProductDetail/>
        </Route>

        <Route path="/cart">
           <Cart/>
        </Route>

        <Route path="/search">
           <Searchcomp/>
        </Route>

        <Route path="/checkout">
          <Checkout />
        </Route>

        <Route path="/login">
          <LoginPage/>
        </Route>

        <Route path="/signup">
           <SignUp/>
        </Route>

        <Route component={Fourzerofour} />

        </Switch>
        
        </Paper>
        </div>
        </ThemeProvider>

    </Router>

  );
}

// function ProtectedRoute({ children, ...rest }) {
//   const auth = useContext(AuthContext)
 
//    return (
//      <Route
//        {...rest}
//        render={() =>
//          auth.user ? (
//            children
//          ) : (
//            <Redirect
//              to='/login'
//            />
//          )
//        }
//      />
//    );
//  }

export default App;
