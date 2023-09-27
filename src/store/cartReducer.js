export const initialState = {
    cart: [],
};

//Selector

export const getCartTotal = (cart) => {
    const total = cart?.reduce((amount, item) => (item.price * item.quantity) + amount, 0);
    return total.toFixed(2); // Rounds the total to 2 decimal places
}

const cartReducer = (state, action) => {
    switch(action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.item],
            }
        
        case "REMOVE_FROM_CART":
            const index = state.cart.findIndex(
                (cartItem) => cartItem.id === action.id
            );

            let newCart = [...state.cart];

            if (index>=0) {
                newCart.splice(index, 1);
            } else {
                console.warn(
                    `Can't remove product(id: ${action.id}) as its not in the cart!`
                )
            }

            return {
                ...state,
                cart: newCart
            }
            // case "INCREMENT_QUANTITY":
            //     // Find the item in the cart
            //     const incrementItemIndex = state.cart.findIndex(
            //       (item) => item.id === action.id
            //     );
          
            //     if (incrementItemIndex !== -1) {
            //       // If the item is found, increment its quantity
            //       const incrementedCart = [...state.cart];
            //       const item = incrementedCart[incrementItemIndex]
            //       if(item.quantity<item.stockQuantity){
            //         incrementedCart[incrementItemIndex].quantity++;
            //         return { ...state, cart: incrementedCart };
            //       }
            //     } else {
            //       // If the item is not found, do nothing
            //       return state;
            //     }
            case "INCREMENT_QUANTITY":
      const incrementItemIndex = state.cart.findIndex(
        (item) => item.id === action.id
      );

      if (incrementItemIndex !== -1) {
        const incrementedCart = [...state.cart];
        const item = incrementedCart[incrementItemIndex];
        // Check if incrementing will exceed the stock quantity
        if (item.quantity < item.stockQuantity) {
          item.quantity++;
          return { ...state, cart: incrementedCart };
        }
      }
      return state;// if no index found
          
              case "DECREMENT_QUANTITY":
                // Find the item in the cart
                const decrementItemIndex = state.cart.findIndex(
                  (item) => item.id === action.id
                );
          
                if (decrementItemIndex !== -1) {
                  // If the item is found and the quantity is greater than 1, decrement its quantity
                  const decrementedCart = [...state.cart];
                  if (decrementedCart[decrementItemIndex].quantity > 1) {
                    decrementedCart[decrementItemIndex].quantity--;
                    return { ...state, cart: decrementedCart };
                  }
                }
                // If the item is not found or the quantity is 1, remove the item from the cart
                return {
                  ...state,
                  cart: state.cart.filter((item) => item.id !== action.id),
                };
          

        default:
            return state;
    }
}

export default cartReducer;
  
