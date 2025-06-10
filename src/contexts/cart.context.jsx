// import { collection } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';


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

const removeCartItem = (cartItems,cartItemToRemove) => {
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


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeCartItem: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        setCartCount(newCartCount);
    }, [cartItems]);

    // Se duplica el useEffect para calcular el total del carrito

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total +  cartItem.quantity * cartItem.price,
            0
        );
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));

    }



    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }





    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeCartItem, clearItemFromCart, cartTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
