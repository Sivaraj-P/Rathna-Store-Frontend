import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  Collapse,
  Container,
  Fade,
  IconButton,
  InputAdornment,
  TextField
} from "@mui/material";
import { useContext, useState } from "react";
import { set, useForm } from "react-hook-form";
import animation from "../../../assets/animations/loginAnimation.gif";
import { groceryContext } from "../../Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../utils/utils";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [RegisterError, setRegisterError] = useState("");
  const [RegisterSuccess, setRegisterSuccess] = useState("");
  const [loader,setLoader] = useState(false)

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email_id: "",
    password: "",
  });

  window.scroll({ top: 0 });

  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };


  // function to handle change events in form
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };





  // fuction to create user with api
  const registerUser = async () => {
    try {
      setLoader(true)
      const response = await axios.post(BASE_URL + "user", user);
      setRegisterSuccess(response.data.message)
    } catch (error) {
      setRegisterError(error.response.data.detail);
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
                    Register
                  </h3>
                  <form
                    onSubmit={handleSubmit(registerUser)}
                    className="text-center lg:space-y-7 md:space-y-6 space-y-7"
                    action="register"
                    method="post"
                  >
                    <div className="flex justify-between items-start gap-3">
                      {/* First Name */}
                      <TextField
                        {...register("first_name", {
                          required: "First Name is required",
                        })}
                        defaultValue={user.first_name}
                        label="First Name"
                        size="small"
                        error={errors.first_name ? true : false}
                        helperText={
                          errors.first_name ? errors.first_name.message : ""
                        }
                        fullWidth
                        color="success"
                        variant="outlined"
                        name="first_name"
                        onChange={handleChange}
                      />

                      {/* Last Name */}
                      <TextField
                        {...register("last_name", {
                          required: "Last Name is required",
                        })}
                        defaultValue={user.last_name}
                        label="Last Name"
                        size="small"
                        error={errors.last_name ? true : false}
                        helperText={
                          errors.last_name ? errors.last_name.message : ""
                        }
                        fullWidth
                        color="success"
                        variant="outlined"
                        name="last_name"
                        onChange={handleChange}
                      />
                    </div>
                    {/* Email */}
                    <TextField
                      {...register("email_id", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/,
                          message: "Invalid email address",
                        },
                      })}
                      defaultValue={user.email_id}
                      label="Email"
                      size="small"
                      error={errors.email ? true : false}
                      helperText={errors.email_id ? errors.email_id.message : ""}
                      fullWidth
                      color="success"
                      variant="outlined"
                      name="email_id"
                      onChange={handleChange}
                    />

                    {/* Phone Number */}
                    <TextField
                      {...register("phone_number", {
                        required: "Phone Number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Phone Number must be exactly 10 numbers",
                        },
                      })}
                      defaultValue={user.phone_number}
                      label="Phone Number"
                      size="small"
                      error={errors.phone_number ? true : false}
                      helperText={
                        errors.phone_number ? errors.phone_number.message : ""
                      }
                      fullWidth
                      color="success"
                      variant="outlined"
                      name="phone_number"
                      onChange={handleChange}
                    />

                    {/* Password */}
                    <TextField
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?])[A-Za-z\d!@#$%^&*()_+{}|:"<>?]{8,}$/,
                          message:
                            "Minimum 8 characters with one uppercase one number and one special character",
                        },
                      })}
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      defaultValue={user.password}
                      fullWidth
                      size="small"
                      error={errors.password ? true : false}
                      helperText={
                        errors.password ? errors.password.message : ""
                      }
                      color="success"
                      variant="outlined"
                      name="password"
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

                    {/* Display the alert only if there is a login error */}
                    {RegisterError && (
                      <Alert severity="error" sx={{ marginTop: 2 }}>
                        {RegisterError}
                      </Alert>
                    )}
                    {RegisterSuccess && (
                      <Alert severity="success" sx={{ marginTop: 2 }}>
                        {RegisterSuccess}
                      </Alert>
                    )}
                    <p>
                      Already have an account?{" "}
                      <a className="text-green-600" href="/login">
                        login here
                      </a>
                    </p>
                    {/* Submit-btn */}
                    {loader?<CircularProgress  color="success"/>:
                    (<Button
                      sx={{ textTransform: "capitalize", width: 150 }}
                      type="submit"
                      color="success"
                      variant="contained"
                      // onClick={registerUser}
                    >
                      Register
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

export default Register;
