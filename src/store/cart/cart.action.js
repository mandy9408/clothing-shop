import {CART_ACTION_TYPES} from './cart.types';
import {createAction} from '../../utils/reducer/reducer.utils';

export const setIsCartOpen=(boolean)=>
    createAction(
        CART_ACTION_TYPES.SET_IS_CART_OPEN,
        boolean
    );







       const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }
       const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }
    
    const addCartItem = (cartItems, productToAdd) => {
    // Find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    //Si hacemos un match en nuestros productos del carrito con el producto que queremos agregar entonces queremos devolver un nuevo array de cartItems
    // If found, increment the quantity
    if (existingCartItem) { //Si existe el producto en el carrito
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                // Agrega el mismo producto pero incrementa la cantidad
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    // If not found, add the new product with quantity 1
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    //Si la cantidad es igual a 1 entonces queremos eliminar el producto del carrito
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }

    //Si no es igual a 1 entonces queremos devolver un nuevo array de cartItems con la cantidad decrementada
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

const clearCartItem = (cartItems, cartItemToClear) => {
    //return back cartItems with matching cart item removed
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}
