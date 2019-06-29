import React, { Component } from "react";
import PayPalButton from "./PayPalButton";
import { Link } from "react-router-dom";
import ProceedToPay from "./ProceedToPay";
export default class CartTotals extends Component {
  constructor(props){
    super(props);
        this.state={
            payment:false
        }
        this.handlePayment = this.handlePayment.bind(this);
}
// handlePayment(){

//   console.log("state 1",this.state.payment)
//   this.setState(state =>(
//    { payment:true}),
//    console.log("state 2",this.state.payment)
//   )
// // if (payment){
// //   console.log("before  ptp")
// // return (<ProceedToPay/>)

// // }

// }
handlePayment() {
  console.log("state 1",this.state.payment)
  this.setState(() => {
    return { payment:true};
  });
  console.log("cart",this.props.value.cart)
  
}
  render() {
    
    const {
      cartSubTotal,
      cartTax,
      cartTotal,
      cart,
      clearCart,
      isRegistered
    } = this.props.value;
    const { history } = this.props;
    const emptyCart = cart.length === 0 ? true : false;
    return (
      <React.Fragment>
        {!emptyCart && (
          <div className="container">
            <div className="row">
              <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                <Link to="/">
                  <button
                    className="btn btn-outline-danger text-uppercase mb-3 px-5"
                    type="button"
                    onClick={() => {
                      clearCart();
                    }}
                  >
                    clear cart
                  </button>
                </Link>
                <h5>
                  <span className="text-title"> subtotal :</span>{" "}
                  <strong>₹ {cartSubTotal} </strong>
                </h5>
                <h5>
                  <span className="text-title"> tax :</span>{" "}
                  <strong>₹ {cartTax} </strong>
                </h5>
                <h5>
                  <span className="text-title"> total :</span>{" "}
                  <strong>₹ {cartTotal} </strong>
                </h5>
                {/* <PayPalButton
                  totalAmount={cartTotal}
                  clearCart={clearCart}
                  history={history}
                /> */}

                <button className="btn btn-outline-danger text-uppercase mb-3 px-5"
                    type="button" onClick={this.handlePayment}
                    >Proceed to Pay</button>  
                <h1>{this.state.payment}</h1>
                {
                  this.state.payment?
                   <ProceedToPay cart={this.props.value.cart} 
                                 cartTotal={this.props.value.cartTotal} 
                                 clearCart={this.props.value.clearCart}
                                 isRegistered={this.props.value.isRegistered}/>: null
                }

               
                
  </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
