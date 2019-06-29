import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";
import { storeProducts } from "../data";
import styled from "styled-components";
export default class Details extends Component {
  constructor(props) {
    super(props);


    // This binding is necessary to make `this` work in the callback
    this.handleColor = this.handleColor.bind(this);
  }
  rang="";
  handleColor(e){
    this.rang=e.currentTarget.value;
    console.log(this.rang)
  }
  render() {

    const ShadeButton = styled.button`
    border:none;
    height:80px;
    width:100px;
    `
    return (
      <ProductConsumer>
        {value => {
          const {
            id,
            company,
            img,
            info,
            price,
            title,
            inCart
          } = value.detailProduct;

          return (
            <div className="container py-5">
              {/* title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{title}</h1>
                </div>
              </div>
              {/* end of title */}
              <div className="row">
                <div className="col-10 mx-auto col-md-3 my-2">
                  <img src={img} className="img-fluid" alt="" />
                </div>
                {/* prdoduct info */}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h1>model : {title}</h1>
                  <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                    made by : <span className="text-uppercase">{company}</span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      price : <span>₹</span>
                      {price}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    <h3>Do you want to add Shades in your colour</h3>
                <br/>
                  <ShadeButton value="Narangi" onClick={this.handleColor}>
                  <img src="img/narangi.png" className="img-fluid" alt="" />
                  </ShadeButton> &nbsp;&nbsp;&nbsp;&nbsp;
                  <ShadeButton value="GreenGold" onClick={this.handleColor}>
                  <img src="img/greengold.png" className="img-fluid" alt="" />
                  </ShadeButton> &nbsp;&nbsp;&nbsp;&nbsp;
                  <ShadeButton value="Jamuni" onClick={this.handleColor}>
                  <img src="img/jamuni.png" className="img-fluid" alt="" />
                  </ShadeButton> &nbsp;&nbsp;&nbsp;&nbsp;
                  <ShadeButton value="JollyHolly" onClick={this.handleColor}>
                  <img src="img/jolly holly.png" className="img-fluid" alt="" />
                  </ShadeButton> &nbsp;&nbsp;&nbsp;&nbsp;
                  <ShadeButton value="Lemon" onClick={this.handleColor}>
                  <img src="img/lemon.png" className="img-fluid" alt="" />
                  </ShadeButton> &nbsp;&nbsp;&nbsp;&nbsp;
                  <ShadeButton value="Magenta" onClick={this.handleColor}>
                  <img src="img/magenta.png" className="img-fluid" alt="" />
                  </ShadeButton> &nbsp;&nbsp;&nbsp;&nbsp;
                  <ShadeButton value="Mayur" onClick={this.handleColor}>
                  <img src="img/mayur.png" className="img-fluid" alt="" />
                  </ShadeButton> &nbsp;&nbsp;&nbsp;&nbsp;
                  <ShadeButton value="Maroon" onClick={this.handleColor}>
                  <img src="img/maroon.png" className="img-fluid" alt="" />
                  </ShadeButton> &nbsp;&nbsp;&nbsp;&nbsp;
                  <ShadeButton value="Mehendi" onClick={this.handleColor}>
                  <img src="img/mehendi.png" className="img-fluid" alt="" />
                  </ShadeButton> &nbsp;&nbsp;&nbsp;&nbsp;
                  <ShadeButton value="NagpuriOrange" onClick={this.handleColor}>
                  <img src="img/nagpuri orange.png" className="img-fluid" alt="" />
                  </ShadeButton> &nbsp;&nbsp;&nbsp;&nbsp;
                  <ShadeButton value="Orange" onClick={this.handleColor}>
                  <img src="img/orange.png" className="img-fluid" alt="" />
                  </ShadeButton> &nbsp;&nbsp;&nbsp;&nbsp;
                  <ShadeButton value="OxfordBlue" onClick={this.handleColor}>
                  <img src="img/oxford blue.png" className="img-fluid" alt="" />
                  </ShadeButton> &nbsp;&nbsp;&nbsp;&nbsp;
                  <ShadeButton value="Revel" onClick={this.handleColor}>
                  <img src="img/Revel.png" className="img-fluid" alt="" />
                  </ShadeButton> &nbsp;&nbsp;&nbsp;&nbsp;
                  <ShadeButton value="SignalRed" onClick={this.handleColor}>
                  <img src="img/signal red.png" className="img-fluid" alt="" />
                  </ShadeButton> &nbsp;&nbsp;&nbsp;&nbsp;
                  <ShadeButton value="SportyYellow" onClick={this.handleColor}>
                  <img src="img/sporty yellow.png" className="img-fluid" alt="" />
                  </ShadeButton> &nbsp;&nbsp;&nbsp;&nbsp;
                  <ShadeButton value="TerraCotta" onClick={this.handleColor}>
                  <img src="img/terracotta.png" className="img-fluid" alt="" />
                  </ShadeButton> 
                  
                  
                  </p>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    some info about product :
                  </p>
                  <p className="text-muted lead">{info}</p>
                  {/* buttons */}
                  <div>
                    <Link to="/">
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      cart
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                        if(this.rang.length > 0){
                          value.generateShade(id,this.rang)
                        }
                      }}
                    >
                      {inCart ? "in cart" : "add to cart"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
