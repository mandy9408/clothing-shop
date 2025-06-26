import {createSelector} from 'reselect';



const newCartCount = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
);
const newCartTotal = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
);
//dispatch the new action to the reducer
dispatch(
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: cartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount
    })
);