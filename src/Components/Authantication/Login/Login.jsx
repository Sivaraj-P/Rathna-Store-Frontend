import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  Collapse,
  Container,
  Fade,
  IconButton,
  InputAdornment,
  TextField,CircularProgress
} from "@mui/material";
import { useContext, useState } from "react";
import { set, useForm } from "react-hook-form";
import animation from "../../../assets/animations/loginAnimation.gif";
import { groceryContext } from "../../Layout/Layout";
import { json, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/utils";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [logInError, setLogInError] = useState("");
  const [loader,setLoader] = useState(false)
  const [user, setUser] = useState({
    email_id: "",
    password: "",
  });

  // Scrolling Bug Fixed
  window.scroll({ top: 0 });

  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };


  const { userLoggedInState } = useContext(groceryContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = userLoggedInState;
  const { userTokenState } = useContext(groceryContext);
  const [loginToken, setLoginToken] = userTokenState;

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

  const handleClose=()=>{
    setLogInError("")
  }

  // function to login user with api
  const loginUser = async () => {
    console.log("login");
    try {
      setLoader(true)
      console.log(BASE_URL + "login");
      const response = await axios.post(BASE_URL + "login", user);
      console.log(response.data);
      localStorage.setItem("userLoggedIn", JSON.stringify(true));
      setIsUserLoggedIn(true);
      setLoginToken(response.data)
      localStorage.setItem('userToken', JSON.stringify(response.data))

      navigate(from);
      // localStorage.setItem("token", response);
      // navigate("/cart");
    } catch (error) {
      // setLogInError();
      setLogInError(error.response.data.detail)
      // console.log(error);
    } finally {
      setLoader(false)
    }
  };


  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      loginUser();
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
                    Log In
                  </h3>
                  <form
                    className="text-center lg:space-y-7 md:space-y-6 space-y-7"
                    action="login"
                    onSubmit={handleSubmit(loginUser)}
                    method="post"
                  >
                    {/* Email */}
                    <TextField
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
                      onKeyDown={handleKeyDown}

                    />

                    {/* Password */}
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
                      onKeyDown={handleKeyDown}

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
                    {logInError &&
                      <Alert
                        onClose={handleClose}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%', }}
                      >
                        {logInError}
                      </Alert>
                    }

                    <p>
                      Dont have an account?{" "}
                      <a className="text-green-600" href="/register">
                        click here
                      </a>
                    </p>
                    <p>
                      Forget password?{" "}
                      <a className="text-green-600" href="/forget-password">
                        click here
                      </a>
                    </p>
                    {/* Submit-btn */}
                    
                    {loader?(<CircularProgress  color="success"/>):
                    (<Button
                      sx={{ textTransform: "capitalize" }}
                      type="submit"
                      color="success"
                      variant="contained"
                    // onClick={loginUser}
                    >
                      Log in
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

export default Login;
