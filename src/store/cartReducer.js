export const initialState = {
    cart: [],
};

//Selector

export const getCartTotal = (cart) => {
    //const subtotal = cart.reduce((total, item) => total + item.price, 0);
    return(cart?.reduce((amount, item) => +item.price + amount, 0));
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

        default:
            return state;
    }
}

export default cartReducer;
  