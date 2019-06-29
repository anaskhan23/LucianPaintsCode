import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Default from "./components/Default";
import Cart from "./components/Cart";
import Modal from "./components/Modal";
import { ProductConsumer } from "./context";
import ProceedToPay from "./components/Cart/ProceedToPay"
import Register from "./components/Register"
import Payment from "./components/Payment"
import Login from "./components/Login";
class App extends Component {
  render() {
    return (  
      
      <ProductConsumer>
        {value => {
          const { cart } = value;
console.log("is registered ",value.isRegistered)
console.log("EmailId",value.emailId)
console.log("Name",value.name)

            return (
              <React.Fragment>     
                 <Navbar name={value.name}/>
              <Switch>
                <Route exact path="/" component={ProductList} />
                <Route path="/details" component={Details} />
                <Route path="/cart" component={Cart} />
                <Route path="/Register" render={(props)=><Register {...props} isRegistered={value.isRegistered} email={value.emailId} name={value.name}/>} />
                <Route path="/payment"  render={(props) => <Payment {...props} cart={cart} total={value.cartSubTotal} email={value.emailId} />}/>  
                <Route path="/Login" render={(props) => <Login {...props} email={value.emailId} />}/>
                <Route component={Default} />
              </Switch>
              <Modal />
        
              </React.Fragment>
            );
          
        }}
      </ProductConsumer>
      
    );
  }
}

export default App;
