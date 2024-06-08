import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import AllCategories from "./Components/AllCategories/AllCategories";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import About from "./Components/About/About";
import Login from "./Components/Authantication/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Cart from "./Components/Cart/Cart";
import Register from "./Components/Authantication/Register/Register";
import Account from "./Components/Account/Account";
import AccountActivation from "./Components/Account/AccountActivation";
import ReActivateAccount from "./Components/Account/ReActivateAccount";
import ForgetPassword from "./Components/Authantication/ForgetPassword/ForgetPassword";
import Orders from "./Components/Orders/Orders";
import { OrderProducts } from "./Components/Orders/OrderProducts";
import { useState,useContext,useEffect } from "react";
function App() {

  const userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(userLoggedIn);



  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<AllCategories />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/categories/:categoryId"
            element={<Products categoryProducts={true} />}
          />
          <Route
            path="/account-activation/:activationToken"
            element={<AccountActivation  />}
          />
           <Route
            path="/email-verification"
            element={<ReActivateAccount />}
          />
           <Route
            path="/forget-password"
            element={<ForgetPassword />}
          />
          {isUserLoggedIn ?<>
            <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<Navigate to="/" />} /></>:
          <>
          <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /></>}
          {/* Protected Route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orderProducts/:orderID" element={<OrderProducts />} />
          </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
