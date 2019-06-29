import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { ProductConsumer } from "../context";
import axios from 'axios';
import "./Login.css";

export default class Login extends Component {
    email=this.props.email;
  constructor(props) {
    super(props);

    this.state = {
      
      id:0,
        name: '',
        emailId: '',
        contact: '',
        location:'',
        completeAddress:'',
        zipcode:'',
        product:[]
    };
  }

  validateForm() {
    return this.state.emailId.length > 0 ;
  }

 

  handleSubmit = event => {
    event.preventDefault();
  }

  getUser=()=>{
    axios.get('http://localhost:3000/users?email='+this.props.email)
    .then(response => {
        this.setState({
          id:response.data[0].id,
          name:response.data[0].name,
          emailId:response.data[0].emailId,
          contact:response.data[0].contact,
          location:response.data[0].location,
          completeAddress:response.data[0].completeAddress,
          zipcode:response.data[0].zipcode,
          product:response.data[0].product,
          
        });
        console.log("Now User ",this.state.name)
        console.log("Response Login ",response.data)
      })
      .catch(function(error) {
        console.log("Sorry you are not our registered customer")
    })
  }

  render() {
    return (
        <ProductConsumer>
        {value => {
       return(
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
                        <label>Email : </label>
                        <input  type="email"
                                className="form-control"
                                value={value.emailId}
                                onChange={value.onChangeEmail}
                                required/>
                    </div>
          
                    <div className="form-group">
                        <input type="button"  value="Login" onClick={()=>{
                            this.getUser();
                            value.getRegistered();
                            value.setName(this.state.name);
                        }} className="btn btn-primary" />
                        <p>{this.state.name}</p>
                    </div>
        </form>
      </div>)
         }}
         </ProductConsumer>
    );
    
  }
}