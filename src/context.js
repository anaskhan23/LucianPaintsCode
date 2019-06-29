import React, { Component } from "react";
import { storeProducts, detailProduct ,shade} from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {

    state = {
      products: [],
      shades:[],
      detailProduct: detailProduct,
      cart: [],
      modalOpen: false,
      modalProduct: detailProduct,
      cartSubTotal: 0,
      cartTax: 0,
      cartTotal: 0,
      isRegistered:false,
      emailId:"",
      name:""
    }
  
  ;
  componentDidMount() {
    this.setProducts();
    this.setShade();
  }
   
  setShade=()=>{
    let shades=[];
    shade.forEach(item => {
      shades.push(item)
    });
    this.setState(()=>{
      return { shades }
    })
  }
  setName=(title)=>{
  this.setState({
    name:title
  })
  console.log("Name in context",title)
  }

  setProducts = () => {
    let products = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });
    this.setState(() => {
      return { products };
    }, this.checkCartItems);
  };
  getRegistered=()=>{
    this.setState({
      isRegistered:true
    })
    console.log("isregister ",this.state.isRegistered)
  }

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };
  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  onChangeName=(e)=> {
    this.setState({
        name: e.target.value
    });
}
  onChangeEmail=(e)=> {
    this.setState({
        emailId: e.target.value
    });
    console.log("Registered email flow",this.state.emailId)
}

  generateShade= (id,color)=>{
    const tempShades={...this.state.shades}  
    const rang=color;
    console.log(tempShades)
    const arr=Object.values(tempShades)
    var f;
    var found = arr.some(function(item, index) { f = index; return item.color == rang; });
    // const index=arr.findIndex(x => x.color == rang)
    console.log(f)
    const shade=tempShades[f]
    shade.incart=true;
    const price=shade.price
    shade.count=1
    shade.total=price
    let tempProducts = [...this.state.products];
    const place = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[place];
    product.inCart = true;
    product.count = 1;
    const cost = product.price;
    product.total = cost;
    this.setState(()=>{
    return {
    cart:[...this.state.cart,product,shade]
    }
    })
    
    }

  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(() => {
      return {
        products: [...tempProducts],
        cart: [...this.state.cart, product],
        detailProduct: { ...product }
      };
    }, this.addTotals);
  };
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };
  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(() => {
      return {
        cart: [...tempCart]
      };
    }, this.addTotals);
  };
  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(() => {
        return { cart: [...tempCart] };
      }, this.addTotals);
    }
  };
  getTotals = () => {
    // const subTotal = this.state.cart
    //   .map(item => item.total)
    //   .reduce((acc, curr) => {
    //     acc = acc + curr;
    //     return acc;
    //   }, 0);
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    return {
      subTotal,
      tax,
      total
    };
  };
  addTotals = () => {
    const totals = this.getTotals();
    this.setState(
      () => {
        return {
          cartSubTotal: totals.subTotal,
          cartTax: totals.tax,
          cartTotal: totals.total
        };
      },
      () => {
        // console.log(this.state);
      }
    );
  };
  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    tempCart = tempCart.filter(item => {
      return item.id !== id;
    });

    this.setState(() => {
      return {
        cart: [...tempCart],
        products: [...tempProducts]
      };
    }, this.addTotals);
  };
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          getRegistered:this.getRegistered,
          generateShade:this.generateShade,
          onChangeEmail:this.onChangeEmail,
          onChangeName:this.onChangeName,
          closeModal: this.closeModal,
          setName:this.setName,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
