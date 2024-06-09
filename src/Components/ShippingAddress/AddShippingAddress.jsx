import { forwardRef } from 'react';
import { Button, Dialog, Fade, Grow, useMediaQuery, TextField,CircularProgress,Alert } from "@mui/material";
import { Check } from '@mui/icons-material';
import { useState, useEffect ,useContext} from 'react';
import { useForm } from 'react-hook-form';
import { groceryContext } from '../Layout/Layout';
import axios from 'axios';
import { BASE_URL } from '../../utils/utils';
const AddShippingAddress = ({ open, handleOpen,update,shippingData,getShippingAddressData }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    // Media Query

    const { userTokenState } = useContext(groceryContext);
    const [loginToken, setLoginToken] = userTokenState;
    const isExtraSmallScreen = useMediaQuery('(max-width:640px)')
    const [addError, setaddError] = useState("");
    const [addSuccess, setaddSuccess] = useState("");
    const [loader, setLoader] = useState(false)
    const [shippingAddress, setShippingAddress] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        landmark: "",
        pincode: "",
        contact: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

useEffect(()=>{
if (update){
    setShippingAddress(shippingData)


}
},[shippingData])
    const postShippingAddress = async () => {
        try {
          setLoader(true)
          const headers={
            headers: {
              'Authorization': `Token ${loginToken.token}`,
            }
          }
          if (update){
            const response = await axios.patch(BASE_URL + `shipping-address/${shippingData.id}`, shippingAddress,headers);
            getShippingAddressData();
          }else{
            const response = await axios.post(BASE_URL + "shipping-address", shippingAddress,headers);
          }
          handleOpen(false)
        } catch (error) {
            // console.log(error)
          setaddError("Failed to add or update address");
        } finally {
          setLoader(false)
        }
      };
    return (
        <Dialog
            TransitionComponent={transition}
            open={open}
            onClose={() => {
                handleOpen(false)
            }}>
            <div className={`p-5 items-center flex justify-center text-center`}>
                <div className='sm:space-y-11 space-y-8'>
                    <div className='space-y-5'>


                        <div className='sm:text-6xl text-5xl'>

                        </div>

                        <form
                            onSubmit={handleSubmit(postShippingAddress)}
                            className="text-center lg:space-y-7 md:space-y-6 space-y-7"
                            action="register"
                            method="post"
                        >

                            {/* First Name */}
                            <TextField
                                {...("address", {
                                    value:true,
                                    required: "Address is required",
                                })}
                                value={shippingAddress.address}
                                label="Address"
                                size="small"
                                error={errors.address ? true : false}
                                helperText={
                                    errors.address ? errors.address.message : ""
                                }
                                fullWidth
                                color="success"
                                variant="outlined"
                                name="address"
                                multiline
                                rows={2}
                                //   maxRows={4}/
                                onChange={handleChange}
                            />
                            < div className="flex justify-between items-start gap-3">
                                {/* Last Name */}
                                {/* {console.log("form data",shippingAddress.state)} */}

                                <TextField
                                    {...register("city", {
                                        value:true,
                                        required: "City is required",
                                    })}
                                    value={shippingAddress.city}
                                    label="City"
                                    size="small"
                                    error={errors.city ? true : false}
                                    helperText={
                                        errors.city ? errors.city.message : ""
                                    }
                                    fullWidth
                                    color="success"
                                    variant="outlined"
                                    name="city"
                                    onChange={handleChange}
                                  
                                />

                                <TextField
                                    {...register("state", {
                                        value:true,
                                        required: "State is required"
                                    })}
                                    value={shippingAddress.state}
                                    label="State"
                                    size="small"
                                    error={errors.email ? true : false}
                                    helperText={errors.state ? errors.state.message : ""}
                                    fullWidth
                                    color="success"
                                    variant="outlined"
                                    name="state"
                                  
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex justify-between items-start gap-3">
                                <TextField
                                    {...register("country", {
                                        value:true,
                                        required: "Country is required",
                                    })}
                                    value={shippingAddress.country}
                                    label="Country"
                                    size="small"
                                    error={errors.country ? true : false}
                                    helperText={
                                        errors.country ? errors.country.message : ""
                                    }
                                    fullWidth
                                    color="success"
                                    variant="outlined"
                                    name="country"
                                    onChange={handleChange}
                                />
                                <TextField
                                    {...register("pincode", {
                                        value:true,
                                        required: "Pincode is required",
                                        pattern: {
                                            value: /^[0-9]{6}$/,
                                            message: "Pincode must be exactly 6 numbers",
                                          },
                                    })}
                                    value={shippingAddress.pincode}
                                    label="Pincode"
                                    size="small"
                                    error={errors.pincode ? true : false}
                                    helperText={
                                        errors.pincode ? errors.pincode.message : ""
                                    }
                                    fullWidth
                                    color="success"
                                    variant="outlined"
                                    name="pincode"
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="flex justify-between items-start gap-3">
                                    <TextField
                                        {...register("landmark", {
                                            value:true,
                                            required: "Landmark is required",
                                        })}
                                        value={shippingAddress.landmark}
                                        label="Landmark"
                                        size="small"
                                        error={errors.landmark ? true : false}
                                        helperText={
                                            errors.landmark ? errors.landmark.message : ""
                                        }
                                        fullWidth
                                        color="success"
                                        variant="outlined"
                                        name="landmark"
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        {...register("contact", {
                                            value:true,
                                            required: "Contact is required",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Phone Number must be exactly 10 numbers",
                                              },
                                        })}
                                        value={shippingAddress.contact}
                                        label="Contact"
                                        size="small"
                                        error={errors.contact ? true : false}
                                        helperText={
                                            errors.contact ? errors.contact.message : ""
                                        }
                                        fullWidth
                                        color="success"
                                        variant="outlined"
                                        name="contact"
                                        onChange={handleChange}
                                    />

                                    {/* Password */}
                                </div>
                            

                            {/* Display the alert only if there is a login error */}
                            {addError && (
                                <Alert severity="error" sx={{ marginTop: 2 }}>
                                    {addError}
                                </Alert>
                            )}
                            {addSuccess && (
                                <Alert severity="success" sx={{ marginTop: 2 }}>
                                    {addSuccess}
                                </Alert>
                            )}
                           
                            {/* Submit-btn */}
                            {loader ? <CircularProgress color="success" /> :
                                (
                                    <div className='flex justify-center space-x-4 sm:space-x-5 lg:space-x-6'>

                                    <>
                                        {/* Cancel Btn*/}
                                        <Button
                                            sx={{ textTransform: 'capitalize', width: 90 }}
                                            color='error'
                                            variant='contained'
                                            size={isExtraSmallScreen ? 'small' : 'medium'}
                                            onClick={() => {
                                                handleOpen(false)
                                            }}>
                                            Cancel
                                        </Button>
                                        {/* Remove Btn */}
                                        <Button
                                            sx={{ textTransform: 'capitalize', width: 90 }}
                                            color='success'
                                            type="submit"
                                            size={isExtraSmallScreen ? 'small' : 'medium'}
                                            variant='contained'
                                        >
                                                {update ? "Update":"Add"}
                                        </Button>
                                    </>
                                </div>
                                )}
                        </form>
                    </div>

                    {/* Dialog Actions */}
                   
                </div>
            </div>

        </Dialog>
    );
};

// This sub_component will add Transition on the dialog
const transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
});
export default AddShippingAddress;