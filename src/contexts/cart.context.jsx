//going to emigrate this code to Redux video 165

// import { collection } from 'firebase/firestore';
import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';


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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};




export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemToCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
});


export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [{ cartCount, cartTotal, cartItems }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (cartItems) => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );
        const payload = {
            cartItems,
            cartTotal: newCartTotal,
            cartCount: newCartCount
        };
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
    }


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


    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        clearItemFromCart,
        cartTotal,
        cartCount,
        cartItems
    };



    // const setIsCartOpen = (boolean) => {
    //     dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    // }


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

};
