import { Outlet } from "react-router-dom";
import Navbar, { userToken} from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { createContext, useState,useEffect } from "react";
import { handlelocalStorage } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

export const groceryContext = createContext();
const Layout = () => {
    const userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(userLoggedIn);
    const [loginToken, setLoginToken] = useState(JSON.parse(userToken));
    const [cartItems, setCartItems] = useState(cartItemsFromlocalStorage);
    const navigate = useNavigate()

    useEffect(()=>{
        const expire = new Date(loginToken?.expiry);
const currentTime = new Date();

if (expire && expire<currentTime){
    localStorage.removeItem('userToken')
    setIsUserLoggedIn(false)
    localStorage.setItem('userLoggedIn', JSON.stringify(false))
    
    
navigate("/login")
} 
    },[navigate])

    return (
        <groceryContext.Provider value={{
            userLoggedInState: [isUserLoggedIn, setIsUserLoggedIn],
            cartItemsState: [cartItems, setCartItems],
            userTokenState:[loginToken, setLoginToken]
        }}>
            <Navbar userLoggedIn={userLoggedIn} />
            <section className="min-h-screen">
                <Outlet />
            </section>
            <Footer />
        </groceryContext.Provider>
    );
};

// Get CartItems from localStorage
const cartItemsFromlocalStorage = handlelocalStorage('get', 'cartItems') || [];

export default Layout;