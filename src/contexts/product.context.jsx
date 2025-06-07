import { createContext, useState } from 'react';
import PRODUCTS from '../shop-data.json';
// import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';


//as the actual value you want to access 
export const ProductContext = createContext({
    products: [],

});

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products};

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
