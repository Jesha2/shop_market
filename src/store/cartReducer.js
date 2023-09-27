export const initialState = {
    cart: [],
};

//Selector

export const getCartTotal = (cart) => {
    const total = cart?.reduce((amount, item) => (item.price * item.quantity) + amount, 0);
    return total.toFixed(2); // Rounds the total to 2 decimal places
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };

    case "REMOVE_FROM_CART":
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );

      let newCart = [...state.cart];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product(id: ${action.id}) as it's not in the cart!`
        );
      }

      return {
        ...state,
        cart: newCart,
      };

    case "UPDATE_CART":
      return {
        ...state,
        cart: action.cart,
      };

    default:
      return state;
  }
};

export default cartReducer;

