import { Container, Fade ,Avatar,CircularProgress} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";
import success from '../../assets/gifs/success.gif'
import failed from '../../assets/icons/failed.png'

// import { groceryContext } from "../Layout/Layout";

const AccountActivation = () => {
  const [status, setStatus] = useState(false);
  const [message,setMessage]=useState('');
  const [loading, setLoading] = useState(true);
  window.scroll({ top: 0 });

//   const { userTokenState } = useContext(groceryContext);
//   const [loginToken, setLoginToken] = userTokenState;

  
  const { activationToken } = useParams();

 
  
  const getAccouctActivation = async () => {
    try {

      const response = await axios.get(BASE_URL + "activate-user/"+activationToken);
      setStatus(true)
      setMessage(response.data.message);
    } catch (error) {
      // setError(error);
    //   console.log(error);
    setMessage(error.response.data.detail)
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAccouctActivation();
  }, []);

  return (
<>
{loading ? (<CircularProgress/>):(
<Container>
<div className="flex flex-col items-center h-screen w-full justify-center">
<img src={status?success:failed} height={status?200:100} width={status?200:100}/>
<p className={status?"text-green-600":"text-red-600 font-semibold m-5 text-center"}>{message}</p>

</div></Container>
)}
</>
  );
};

export default AccountActivation;
