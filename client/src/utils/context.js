import {createContext, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

export const Contex = createContext();

const AppContext = ({children}) => {

    const [categories,setCategories] = useState();
    const [products,setProducts] = useState();
    const [cartItems,setCartItems] = useState([]);
    const [cartCount,setCartCount] = useState(0);
    const [cartSubTotle,setCartSubTotle] = useState(0);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    },[location])

    useEffect(() => {

        let count = 0;
        cartItems.map(item => count += item.quantity);
        setCartCount(count);

        let subTotal = 0;
        cartItems.map(item => (subTotal += item.attributes.Price * item.quantity));
        setCartSubTotle(subTotal);
    },[cartItems]);

    const handelAddToCart = ( product, quantity ) => {
        const updatedCart = [...cartItems];
        const existingItemIndex = updatedCart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
            updatedCart[existingItemIndex].quantity += quantity;
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, { ...product,quantity }]);
        }

    }

    const handelRemoveFromCart = (product) => {
        let items = [...cartItems];
        items = items.filter(p => p.id !== product.id);
        setCartItems(items);
    }

    const handelCartProductQuantity = (type,product) => {
        const updatedCart = [...cartItems];
        const existingItemIndex = updatedCart.findIndex(item => item.id === product.id);
        if(type === 'inc'){
            updatedCart[existingItemIndex].quantity += 1;
        } 
        else if (type === 'dec') {
            if(updatedCart[existingItemIndex].quantity === 1) return;
            updatedCart[existingItemIndex].quantity -= 1;
        }

        setCartItems(updatedCart);
    }
    

    return(<Contex.Provider 
        value={{
            categories, setCategories,
            products, setProducts,
            cartItems, setCartItems,
            cartSubTotle, setCartSubTotle,
            cartSubTotle, setCartSubTotle,
            handelAddToCart, handelRemoveFromCart, handelCartProductQuantity,
            cartCount,setCartCount
        }}
    >{children} </Contex.Provider>)

}

export default AppContext;
