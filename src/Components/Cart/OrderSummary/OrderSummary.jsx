import { Button, useMediaQuery,Alert, FormControl, InputLabel, Select, MenuItem, isMuiElement } from "@mui/material";
import { groceryContext } from "../../Layout/Layout";
import { useContext,useState,useEffect } from "react";
import { checkoutContext } from "../Cart";
import axios from "axios";
import { BASE_URL } from "../../../utils/utils";
import PopUpDialog from "../../PopUpDialog/PopUpDialog";
import { useNavigate } from "react-router-dom";
import { handlelocalStorage } from "../../../utils/utils";
import {CircularProgress} from "@mui/material";

const OrderSummary = ({shippingAddress}) => {
  // Get Cart Items from Context
  const { cartItemsState } = useContext(groceryContext);
  const { userTokenState } = useContext(groceryContext);
  const [loginToken, setLoginToken] = userTokenState;
  const [cartItems, setCartItems] = cartItemsState;
  const [openDialog, setOpenDialog] = useState(false);
  const[loading,setLoading]=useState(false)
  const [paymentMode,setPaymentMode]=useState('')
  const [submitErrors,setSubmitErrors]=useState("")
  const[message,setMessage]=useState('')
  const[loader,setLoader]=useState(false)

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
return {shipping_address_id:shippingAddress.id,order_list:orders,payment_mode:paymentMode}

}


const handleOK = () => {
  // Reset the Cart_items
  handlelocalStorage('remove', 'cartItems')
  setCartItems([])
  setOpenDialog(!openDialog)
  navigate('/orders')
}

const verifyPayment=async(razorpayResponse)=>{
  const headers={
    headers: {
      'Authorization': `Token ${loginToken.token}`,
    }
  }
  try{
    const response=await axios.post(BASE_URL+'verify-payment',razorpayResponse,headers)
    setMessage('Payment Success order placed!')

  }
  catch(e){
console.log(e.response.data.detail)
// setSubmitErrors(e.response.data.detail)
setMessage('Payment Failed')
  }
  finally{
    setOpenDialog(true)
    
  }
}

const submitOrders=async()=>{
  setLoader(true)
  const headers={
    headers: {
      'Authorization': `Token ${loginToken.token}`,
    }
  }
  try{
    const response=await axios.post(BASE_URL+'order-items',orderData(),headers)
    console.log("order submitted")
    if (paymentMode=="COD"){
      setOpenDialog(true)
      setMessage('Order Placed successfully')
    }else{
      var options = {
        key: import.meta.env.VITE_PAYMENT_KEY,
        key_secret: import.meta.env.VITE_PAYMENT_SECRET,
        amount: response.data.total_price * 100,
        currency: "INR",
        name: "Rathna Store",
        description: "Transaction",
        image: "", // add image url
        order_id: response.data.payment_order_id, //localStorage.getItem("res.data.order_id"),
        handler: function (response) {
          // we will handle success by calling handlePayment method and
          // will pass the response that we've got from razorpay
          console.log("Response---------------",response)
          console.log({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          verifyPayment(response);
        },
        prefill: {
          name: "Rathna Store",
          email: "rathnastore@gmail.com",
          contact: "9486577480",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        console.log("Failure Response",response)
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      // console.log("check4 108");
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
  




    }
   


  }
  catch(e){
// console.log(e.response.data.detail)
console.log(e)
setSubmitErrors(e.response.data.detail)
  }
  finally{
setLoader(false)
  }
}


function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}


  return (
    <>
     <PopUpDialog
                open={openDialog}
                message={message}
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

        <FormControl fullWidth color="success">
            <InputLabel id="payment-mode-label" color="success">Payment Mode</InputLabel>
            {console.log("Shipping Address",shippingAddress)}
            <Select 
              labelId="payment-mode-label"
              id="payment-mode"
              value={paymentMode}
              label="Payment Mode"
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <MenuItem value={"COD"}>Cash on Delivery</MenuItem>
              <MenuItem value={"Online Payment"}>Online Payment</MenuItem>
            </Select>
          </FormControl>

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
                  {loader ? <CircularProgress sx={{color:"white"}}/>:'Place Order'}
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
