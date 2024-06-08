import { Button, useMediaQuery,Alert } from "@mui/material";
import { groceryContext } from "../../Layout/Layout";
import { useContext,useState,useEffect } from "react";
import { checkoutContext } from "../Cart";
import axios from "axios";
import { BASE_URL } from "../../../utils/utils";
import PopUpDialog from "../../PopUpDialog/PopUpDialog";
import { useNavigate } from "react-router-dom";
import { handlelocalStorage } from "../../../utils/utils";

const OrderSummary = ({shippingAddress}) => {
  // Get Cart Items from Context
  const { cartItemsState } = useContext(groceryContext);
  const { userTokenState } = useContext(groceryContext);
  const [loginToken, setLoginToken] = userTokenState;
  const [cartItems, setCartItems] = cartItemsState;
  const [openDialog, setOpenDialog] = useState(false);
  const[loading,setLoading]=useState(false)
  
  const [submitErrors,setSubmitErrors]=useState("")

  const handleClose= ()=>setSubmitErrors("")
   
  const [isProceedToCheckout, setIsProceedToCheckout] =
    useContext(checkoutContext);
    const navigate = useNavigate()
  // Media Query
  const isMediumScreen = useMediaQuery("(max-width:1024px)");

  const subtotal = Number.parseFloat(
    cartItems.reduce((total, item) => total + Number.parseFloat(item.total), 0)
  );

const orderData=()=>{
 const orders=[]
 cartItems.forEach(item => {
  orders.push({product_id:item.id,quantity:item.quantity})
 }
);
return {shipping_address_id:shippingAddress.id,order_list:orders}

}


const handleOK = () => {
  // Reset the Cart_items
  handlelocalStorage('remove', 'cartItems')
  setCartItems([])
  setOpenDialog(!openDialog)
  navigate('/orders')
}
const submitOrders=async()=>{
  const headers={
    headers: {
      'Authorization': `Token ${loginToken.token}`,
    }
  }
  try{
    const response=await axios.post(BASE_URL+'order-items',orderData(),headers)
    console.log("order submitted")
    setOpenDialog(true)

  }
  catch(e){
console.log(e.response.data.detail)
setSubmitErrors(e.response.data.detail)
  }
  finally{

  }
}



  return (
    <>
     <PopUpDialog
                open={openDialog}
                message={'Order Placed successfully'}
                handleOk={handleOK}
                placeOrder={true} />
    <div className="flex justify-center md:pt-16 col md:col-span-4 lg:col-span-1">
      
      <div
        className={`lg:space-y-4 sticky top-0 bottom-0 w-full max-w-[25rem] space-y-3`}
      >
        {/* Title */}
        <h3 className="lg:text-xl text-lg sm:font-semibold font-bold tracking-wide">
          Order Summary
        </h3>

        {/* Total Bill */}
        <table className="table-auto h-28 text-sm w-full">
          <tbody>
            {/* Subtotal */}
            <tr className="font-medium lg:text-gray-800 text-gray-6000">
              <td>Subtotal</td>
              <td>&#x20b9;{subtotal.toFixed(2)}</td>
            </tr>
            {/* Delivery Charge */}
            <tr className="font-medium text-sm lg:text-gray-800 text-gray-600">
              <td>Delivery charge</td>
              <td>&#x20b9; 0.00</td>
            </tr>
            {/* Total */}
            <tr className="lg:font-medium font-semibold lg:text-lg">
              <td>Total</td>
              <td style={{ color: "green" }}>
                &#x20b9; {(subtotal ).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Proceed to checkout */}
       {!isProceedToCheckout?(
         <Button
         fullWidth
         onClick={() => setIsProceedToCheckout(!isProceedToCheckout)}
         sx={{
           textTransform: "capitalize",
           transition: "display 1000s ease-in-out",
           display: isProceedToCheckout ? "none" : "block",
         }}
         variant="contained"
         size={isMediumScreen ? "small" : "medium"}
         color="success"
       >
         Proceed to checkout
       </Button>
       ):(
        <>        
         { submitErrors &&
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: '100%', }}
            >
              {submitErrors}
            </Alert>
          
         }
         <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ textTransform: "capitalize" }}
                  color="success"
                  onClick={()=>{
                    submitOrders();
                
                  }}
                >
                  Place Order
                </Button>
                </>

       )
}
        
      </div>
    </div>
    </>
  );
};

export default OrderSummary;
