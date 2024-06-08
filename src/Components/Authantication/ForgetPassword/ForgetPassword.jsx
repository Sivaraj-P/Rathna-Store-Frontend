import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Alert,
    Button,
    Collapse,
    Container,
    Fade,
    IconButton,
    InputAdornment,
    TextField, CircularProgress
} from "@mui/material";
import { useContext, useState } from "react";
import { set, useForm } from "react-hook-form";
import animation from "../../../assets/animations/loginAnimation.gif";
import { groceryContext } from "../../Layout/Layout";
import { json, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/utils";
import axios from "axios";

const ForgetPassword = () => {
    const {
        register,watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [logInError, setLogInError] = useState("");
    const [status, setStatus] = useState(false);
    const [verifyPassword, setVerifyPassword] = useState(false);
    const [loader, setLoader] = useState(false)
    const [user, setUser] = useState({
        email_id: "",
        password: "",
        confirm_password: "",
        otp: ""
    });

    // Scrolling Bug Fixed
    window.scroll({ top: 0 });

    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    const { userLoggedInState } = useContext(groceryContext);
    const [isUserLoggedIn, setIsUserLoggedIn] = userLoggedInState;

    // function to handle change events in form
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        setUser((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // function to close alerts

    const handleClose = () => {
        setLogInError("")
    }

    // function to login user with api
    const forgetPassword = async () => {
        try {
            setStatus(false)
            setLoader(true)
            if (!verifyPassword) {
                console.log(BASE_URL + "login");
                const response = await axios.post(BASE_URL + "generate-otp", {email_id:user.email_id});
                setVerifyPassword(true)
            }
            else {
                const response = await axios.post(BASE_URL + "forget-password", user);
                setStatus(true)
                setLogInError(response.data.message)
            }
            //   navigate(from);

        } catch (error) {
            // setLogInError();
            setLogInError(error.response.data.detail)
            // console.log(error);
        } finally {
            setLoader(false)
        }
    };

    return (
        <section className="h-screen px-2 items-center flex justify-center sm:px-6 lg:px-8">
            <Fade in={true}>
                <Container>
                    <div className="grid md:grid-cols-2">
                        {/* Animation */}
                        <div className="col hidden md:flex items-center justify-center">
                            <img
                                className="lg:max-h-80 max-h-[17rem]"
                                src={animation}
                                alt="login"
                            />
                        </div>
                        {/* Form */}
                        <div className="flex md:justify-start justify-center">
                            <div className="flex items-center max-w-[26rem] p-4 h-80">
                                <div className="lg:space-y-10 md:space-y-8 space-y-10">
                                    {/* Form Title */}
                                    <h3 className="text-center font-semibold text-gray-800 lg:text-3xl md:text-2xl text-3xl">
                                        Forget Password
                                    </h3>
                                    <form
                                        className="text-center lg:space-y-7 md:space-y-6 space-y-7"
                                        action="login"
                                        onSubmit={handleSubmit(forgetPassword)}
                                        method="post"
                                    >
                                        {verifyPassword ?
                                            (<>
                                                <TextField
                                                    {...register("otp", {
                                                        required: "OTP is required",
                                                        pattern: {
                                                            value: /^\d{7}$/,
                                                            message: "OTP must be exactly 7 digits",
                                                        },
                                                    })}
                                                    label="OTP"
                                                    size="small"
                                                    name="otp"
                                                    type="number"
                                                    
                                                    error={!!errors.otp}
                                                    helperText={errors.otp ? errors.otp.message : ""}
                                                    fullWidth
                                                    color="success"
                                                    variant="outlined"
                                                    onChange={handleChange}
                                                />

                                                <TextField
                                                    defaultValue={user.password}
                                                    {...register("password", {
                                                        required: "Password is required",
                                                        pattern: {
                                                            value:
                                                                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                                                            message:
                                                                "Minimum 8 characters with one uppercase letter and one number",
                                                        },
                                                    })}
                                                    label="Password"
                                                    name="password"
                                                    type={showPassword ? "text" : "password"}
                                                    fullWidth
                                                    size="small"
                                                    error={errors.password ? true : false}
                                                    helperText={
                                                        errors.password ? errors.password.message : ""
                                                    }
                                                    color="success"
                                                    variant="outlined"
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                >
                                                                    {showPassword ? (
                                                                        <VisibilityOff fontSize="inherit" />
                                                                    ) : (
                                                                        <Visibility fontSize="inherit" />
                                                                    )}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                                <TextField
                                                    defaultValue={user.confirm_password}
                                                    {...register("confirm_password", {
                                                        required: "Password is required",
                                                        validate: (value) => value === watch("password") || "Passwords do not match",

                                                        pattern: {
                                                            value:
                                                                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                                                            message:
                                                                "Minimum 8 characters with one uppercase letter and one number",
                                                                
                                                        },
                                                    })}
                                                    label="Confirm Password"
                                                    name="confirm_password"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    fullWidth
                                                    size="small"
                                                    error={errors.confirm_password ? true : false}
                                                    helperText={
                                                        errors.confirm_password ? errors.confirm_password.message : ""
                                                    }
                                                    color="success"
                                                    variant="outlined"
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                >
                                                                    {showConfirmPassword ? (
                                                                        <VisibilityOff fontSize="inherit" />
                                                                    ) : (
                                                                        <Visibility fontSize="inherit" />
                                                                    )}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                /></>)
                                            : (<TextField
                                                {...register("email_id", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address",
                                                    },
                                                })}
                                                defaultValue={user.email_id}
                                                label="Email"
                                                size="small"
                                                name="email_id"
                                                error={errors.email_id ? true : false}
                                                helperText={errors.email_id ? errors.email_id.message : ""}
                                                fullWidth
                                                color="success"
                                                variant="outlined"
                                                onChange={handleChange}
                                            />)}

                                        {/* Password */}


                                        {/* Display the alert only if there is a login error */}
                                        {logInError &&
                                            <Alert
                                                onClose={handleClose}
                                                severity={status ? "success" : "error"}
                                                variant="filled"
                                                sx={{ width: '100%', }}
                                            >
                                                {logInError}
                                            </Alert>
                                        }

                                        {/* {!verifyPassword &&(
                                            <p>
                                            Remember password?{" "}
                                            <a className="text-green-600" href="/register">
                                                click here
                                            </a>
                                        </p>
                                        )} */}
                                        {/* Submit-btn */}

                                        {loader ? (<CircularProgress color="success" />) :
                                            (<Button
                                                sx={{ textTransform: "capitalize" }}
                                                type="submit"
                                                color="success"
                                                variant="contained"
                                            // onClick={loginUser}
                                            >
                                                {!verifyPassword ? "Generate OTP" : "Change Password"}
                                            </Button>)}
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </Container>
            </Fade>
        </section>
    );
};

export default ForgetPassword;
