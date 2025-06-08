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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));

    }
    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart,cartCount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
