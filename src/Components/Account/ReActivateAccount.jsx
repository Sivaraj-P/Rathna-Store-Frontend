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
import emailVerify from "../../assets/gifs/mail_verify.gif"
import { groceryContext } from "../Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/utils";
import axios from "axios";

const ReActivateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [status, setStatus] = useState(false);
  const [reActivateError, setreActivateError] = useState("");
  const [loader,setLoader] = useState(false)
  const [user, setUser] = useState({
    email_id: ""
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
    // console.log(name);
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // function to close alerts

  const handleClose=()=>{
    setreActivateError("")
  }

  // function to re activate user with api
  const activateAccount = async () => {
    // console.log("login");
    try {
      setLoader(true)
      const response = await axios.post(BASE_URL + "reactivate", user);
      setStatus(true)
      setreActivateError(response.data.message)
      setTimeout(() => {
        navigate('/login')
    }, 3000);
    //   navigate(from);
      // localStorage.setItem("token", response);
      // navigate("/cart");
    } catch (error) {
      // setreActivateError();
      setStatus(false)
      setreActivateError(error.response.data.detail)
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
                src={emailVerify}
                alt="login"
              />
            </div>
            {/* Form */}
            <div className="flex md:justify-start justify-center">
              <div className="flex items-center max-w-[26rem] p-4 h-80">
                <div className="lg:space-y-10 md:space-y-8 space-y-10">
                  {/* Form Title */}
                  <h3 className="text-center font-semibold text-gray-800 lg:text-3xl md:text-2xl text-3xl">
                    Email Verification
                  </h3>
                  <form
                    className="text-center lg:space-y-7 md:space-y-6 space-y-7"
                    action="login"
                    onSubmit={handleSubmit(activateAccount)}
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
                    />

                    

                    {/* Display the alert only if there is a login error */}
                    {reActivateError &&
                      <Alert
                        onClose={handleClose}
                        severity={status?"success":"error"}
                        variant="filled"
                        sx={{ width: '100%', }}
                      >
                        {reActivateError}
                      </Alert>
                    }

                    {/* <p>
                      Dont have an account?{" "}
                      <a className="text-green-600" href="/register">
                        click here
                      </a>
                    </p> */}
                    {/* Submit-btn */}
                    
                    {loader?(<CircularProgress  color="success"/>):
                    (<Button
                      sx={{ textTransform: "capitalize" }}
                      type="submit"
                      color="success"
                      variant="contained"
                    // onClick={loginUser}
                    >
                      Proceed
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

export default ReActivateAccount;
