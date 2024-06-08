import { Button, Fade, Paper, CircularProgress, Accordion, Box, Modal, AccordionSummary, AccordionDetails, Typography, Radio, Alert } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { groceryContext } from "../Layout/Layout";
import { handlelocalStorage } from "../../utils/utils";
import PopUpDialog from "../PopUpDialog/PopUpDialog";
import { useNavigate } from "react-router-dom";
import { ExpandMore, Edit, Delete, DeliveryDiningOutlined } from "@mui/icons-material";
import AddShippingAddress from "./AddShippingAddress";
import { checkoutContext } from "../Cart/Cart";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";

const SaList = ({ value, onChange }) => {
  const { cartItemsState, userTokenState } = useContext(groceryContext);
  const [cartItems, setCartItems] = cartItemsState;
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [addShippingAddress, setAddShippingAddress] = useState(false)
  const [updateShippingAddress, setUpdateShippingAddress] = useState(false)
  const [shippingAddress, setShippingAddress] = useState([]);
  const [loginToken, setLoginToken] = userTokenState;
  const [isProceedToCheckout, setIsProceedToCheckout] = useContext(checkoutContext);
  const navigate = useNavigate();
  const getShippingAddressData = async () => {
    try {
      const headers = {
        headers: {
          'Authorization': `Token ${loginToken.token}`,
        }
      }
      const response = await axios.get(BASE_URL + "shipping-address", headers);
      setShippingAddress(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleShippingAddress = (state) => {
    setAddShippingAddress(state)
  }

  const handleupdateShippingAddress = (state) => {
    setUpdateShippingAddress(state)
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



  const deleteShippingAddressData = async (id) => {
    try {
      console.log("delete", value.id)
      const headers = {
        headers: {
          'Authorization': `Token ${loginToken.token}`,
        }
      }
      const response = await axios.delete(BASE_URL + `shipping-address/${id}`, headers);
      setOpen(false)
      getShippingAddressData()


    } catch (error) {
      console.log(error);
    } finally {

    }
  };


  const handleChange = (data) => {
    onChange(data);
    // event.stopPropagation();
  };
  useEffect(() => {
    console.log()
    getShippingAddressData();
  }, [addShippingAddress]);

  const onSubmit = (data) => {
    setOpenDialog(true);
    handlelocalStorage("set", "deliveryDetails", data);
  };

  const handleOK = () => {
    handlelocalStorage("remove", "cartItems");
    setCartItems([]);
    setOpenDialog(false);
    navigate("/");
  };
  { console.log("value----", value.id) }

  return (
    <>
      {addShippingAddress && <AddShippingAddress open={addShippingAddress} handleOpen={handleShippingAddress} getShippingAddressData={getShippingAddressData}/>}
      {updateShippingAddress && <AddShippingAddress open={updateShippingAddress} handleOpen={handleupdateShippingAddress} update={true} shippingData={value} getShippingAddressData={getShippingAddressData} />}
      
      <PopUpDialog
        open={openDialog}
        message={"Order Placed successfully"}
        handleOk={handleOK}
        placeOrder={true}
      />
      <div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure to delete this shipping address?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {value.address}
              <br />
              <Button onClick={handleClose} color="info">Close</Button>

              <Button onClick={() => {
                console.log("buttuon click", value.id)
                deleteShippingAddressData(value.id)
              }} color="error">Delete</Button>
            </Typography>
          </Box>
        </Modal>
      </div>

      <div className="md:mx-0 mx-auto space-y-4 max-w-[37rem]">
        {/* Go back Btn */}
        <div>
          <Button onClick={() => setIsProceedToCheckout(!isProceedToCheckout)}>Go Back</Button>
        </div>
        <div className="space-y-4">
          {/* Title */}
          <h1 className="lg:text-2xl text-xl font-semibold text-gray-600">
            Shipping Address Details
          </h1>
          <Button
            sx={{ textTransform: 'capitalize' }}
            color='success'
            onClick={() => { setAddShippingAddress(true) }}
            size={'small'}
            variant='contained'
          >
            Add Address
          </Button>
          { loading ?  <CircularProgress />:
          
            shippingAddress.length>0?
         ( <Paper elevation={3} style={{  padding: 10,backgroundColor:"white" ,borderRadius:20}}>
            {loading ? (
              <CircularProgress />
            ) : (


              <>
        <div className="flex flex-col  px-2  lg:gap-x-2.5 gap-x-2 items-center rounded-md w-full ">

                { shippingAddress.map((data) => (

                    <div className="p-1 m-2 w-full" onClick={()=>{
                      handleChange(data)
                    }}>
                      {console.log(value.id)}
                      <Box sx={{ display: "flex", alignItems: "center",justifyContent:"flex-start", width: "100%" }}>

                        <Radio
                          checked={value && value.id === data.id}


                          onChange={() => {
                            handleChange(data)
                          }}
                          value={data}
                          name="radio-buttons"
                          color="success"

                        // inputProps={{ 'aria-label': 'A' }}
                        />

                        <Typography style={{fontSize:14,width:"100%"}}>{data.address}</Typography>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}><Edit color="success" onClick={()=>{
                          setUpdateShippingAddress(true)
                        }}style={{ fontSize: 20, marginLeft: 10 ,cursor:"pointer"}} /><Delete color="error" onClick={() => {
                          handleOpen()
                        }} style={{ fontSize: 20, marginLeft: 10 ,cursor:"pointer"}} />
                        </Box>
                      </Box>
                   </div>
                ))

                }

</div>
              </>


            )}

          </Paper>):
          <Alert  severity="error" icon={<DeliveryDiningOutlined></DeliveryDiningOutlined>}>Kindly add shipping address</Alert>


          }
        
        </div>
      </div>
    </>
  );
};

export default SaList;
