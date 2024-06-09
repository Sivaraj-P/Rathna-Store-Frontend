import { useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart/EmptyCart";
import { CircularProgress, Container, Fade,Button } from "@mui/material";
import { createContext, useContext, useState,useEffect } from "react";
import OrderSummary from "./OrderSummary/OrderSummary";
import CartItems from "./CartItems/CartItems";
import { groceryContext } from "../Layout/Layout";
import DeliveryForm from "./DeliveryForm/DeliveryForm";
import SaList from "../ShippingAddress/ShippingAddressList";
import { handlelocalStorage } from "../../utils/utils";
import axios from "axios"
import { BASE_URL } from "../../utils/utils";
export const checkoutContext = createContext();


const Cart = () => {
  // Scrolling Bug Fixed
  window.scroll({ top: 0 });

  // Get Cart Items from Context
  const { cartItemsState } = useContext(groceryContext);
  const [cartItems, setCartItems] = cartItemsState;

  const [isProceedToCheckout, setIsProceedToCheckout] = useState(false);
  const [loader, setLoader] = useState(false)
  const [selectedShippingAddress,setSelectedShippingAddress] = useState({});

 
const handleShippingAddress=(data)=>{
  setSelectedShippingAddress(data)
}


const getProductData=async (productId)=>{
  try{
    const response = await axios.get(BASE_URL + `product/${productId}`);
    return response.data
  }catch(e){
    return null
  }
}

const syncData=async ()=>{
  const updatedCartItems = [];
    
    for (let i=0; i<cartItems.length;i++){
      try {
        setLoader(true)
        // Fetch new price for each product
        const productDataUpdate = await getProductData(cartItems[i].id);
        // If new price is fetched successfully, update the price in cart item
        if (productDataUpdate !== null) {
          // Clone the cart item and update its price
          const updatedCartItem = { ...cartItems[i], price: productDataUpdate.price,discount_percent:productDataUpdate.discount_percent,mrp:productDataUpdate.mrp };
          // Push updated cart item to the array
          updatedCartItems.push(updatedCartItem);
        } 
        setCartItems(updatedCartItems)

      } catch (error) {
        console.error("Error updating cart item:", error);
        // If an error occurs, keep the original cart item
       
      }finally{

        // handlelocalStorage("set", "cartItems", updatedCartItems);
        setLoader(false)
        // console.log("set loader false")
      }
}
}


  useEffect(()=>{
syncData()
// console.log(cartItems)
  },[])

  return (
    <checkoutContext.Provider
      value={[isProceedToCheckout, setIsProceedToCheckout]}
    >
      <section
        className={`${
          cartItems.length > 0 ? "min-h-screen " : "h-screen "
        }pt-20 pb-10`}
      >
       {loader?(<div className="w-full flex justify-center items-center"><CircularProgress/></div>):
        cartItems.length > 0 ? (
          <Container
            sx={{ display: "flex", justifyContent: "center", height: "100%" }}
          >
            <section className="grid lg:gap-x-0 gap-x-5 gap-y-8 w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-12 ">
              <div className="col xl:col-span-2 lg:col-span-1 md:col-span-8">
                {!isProceedToCheckout ? <CartItems /> : <SaList value={selectedShippingAddress} onChange={handleShippingAddress} />}
              </div>
              <OrderSummary shippingAddress={selectedShippingAddress} />
              {/* {console.log(selectedShippingAddress,"selected shipping adderess")} */}
            </section>
            
          </Container>
          
        ) : (
          <EmptyCart message={"There are no items in this cart"} />
        )
       }
      </section>
    </checkoutContext.Provider>
  );
};

export default Cart;
