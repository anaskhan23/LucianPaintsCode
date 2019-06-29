import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import { Link } from "react-router-dom";
import { storeProducts } from "../data";
import styled from "styled-components";
import SlideShow from "./Slider"
import { ProductConsumer } from "../context";
export default class ProductList extends Component {
  state = {
    products: storeProducts
  };
  render() {
    return (
      <React.Fragment>
        <ProductWrapper className="py-5">
          <div className="container">
            <Title name="our" title="products" />
            <SlideShow/>
            <div className="row">
              <ProductConsumer>
                {value => {
                  return value.products.map(product => {
                    return <Product key={product.id} product={product} />;
                  });
                }}
              </ProductConsumer>
            </div>
            <Link to="/register">
              <button className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
              >Register</button></Link>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/Login">
              <button className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
              >Login</button></Link>
          </div>

        </ProductWrapper>
      </React.Fragment>
    );
  }
}

const ProductWrapper = styled.section``;
