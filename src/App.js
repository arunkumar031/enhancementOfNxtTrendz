import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const cartItem = cartList.find(each => each.id === id)
    const {quantity} = cartItem
    const updatedProduct = {...cartItem, quantity: quantity + 1}
    this.setState(prevState => ({
      cartList: [
        ...prevState.cartList.filter(each => each.id !== id),
        updatedProduct,
      ],
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const cartItem = cartList.find(each => each.id === id)
    const {quantity} = cartItem
    if (quantity > 1) {
      const updatedProduct = {...cartItem, quantity: quantity - 1}
      this.setState(prevState => ({
        cartList: [
          ...prevState.cartList.filter(each => each.id !== id),
          updatedProduct,
        ],
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    this.setState({cartList: cartList.filter(each => each.id !== id)})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const {quantity} = product

    const itemPresent = cartList.find(each => each.id === product.id)
    if (itemPresent === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updatedProduct = {
        ...product,
        quantity: itemPresent.quantity + quantity,
      }
      this.setState(prevState => ({
        cartList: [
          ...prevState.cartList.filter(each => each.id !== product.id),
          updatedProduct,
        ],
      }))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
