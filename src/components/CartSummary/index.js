// Write your code here
import {Component} from 'react'
import Popup from 'reactjs-popup'

import CartContext from '../../context/CartContext'

class CartSummary extends Component {
  state = {activeOption: 'NB', placeOrder: false}

  onClickConfirmOrder = () => {
    this.setState({placeOrder: true})
  }

  onChangePayment = event => {
    this.setState({activeOption: event.target.value})
  }

  render() {
    const {activeOption, placeOrder} = this.state
    const isDisabled = activeOption !== 'COD'

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          const totalPriceList = cartList.map(
            each => each.price * each.quantity,
          )

          const totalCost = totalPriceList.reduce((a, b) => a + b)

          return (
            <div>
              <h1>
                Order Total: <span>Rs {totalCost}/-</span>
              </h1>
              <p>{cartList.length} items in cart</p>
              <Popup
                modal
                trigger={
                  <button type="button" className="button">
                    Checkout
                  </button>
                }
                position="right center"
                className="popup"
              >
                {close => (
                  <div>
                    {placeOrder ? (
                      <p>Your order has been placed successfully</p>
                    ) : (
                      <div>
                        <div>
                          <h1>
                            Order Total: <span>Rs {totalCost}/-</span>
                          </h1>
                          <p>{cartList.length} items in cart</p>
                        </div>
                        <div>
                          <button type="button" onClick={() => close()}>
                            Close
                          </button>
                        </div>

                        <div>
                          <select
                            value={activeOption}
                            onChange={this.onChangePayment}
                          >
                            <option value="NB" disabled>
                              Net Banking
                            </option>
                            <option value="COD">Cash on Delivery</option>
                          </select>
                          <button
                            type="button"
                            disabled={isDisabled}
                            onClick={this.onClickConfirmOrder}
                          >
                            Confirm Order
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Popup>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary

/* for (const each of cartList) {
            totalCost += each.price * each.quantity
          }
*/
