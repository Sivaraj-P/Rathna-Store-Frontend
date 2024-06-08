import { Container, Fade ,Avatar,} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import { useEffect, useState,useContext } from "react";
import { groceryContext } from "../Layout/Layout";

const Account = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  window.scroll({ top: 0 });

  const { userTokenState } = useContext(groceryContext);
  const [loginToken, setLoginToken] = userTokenState;
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  
  const getUserData = async () => {
    try {
      const headers={
        headers: {
          'Authorization': `Token ${loginToken.token}`,
        }
      }
      const response = await axios.get(BASE_URL + "user",headers);
      setUser(response.data);
    } catch (error) {
      // setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
<Container>
<div className="flex items-center h-screen w-full justify-center">

<div className="max-w-xs">
    <div className="bg-white shadow-xl rounded-lg py-3">
        <div className="photo-wrapper p-2 flex justify-center">
        <Avatar {...stringAvatar(`${user.first_name} ${user.last_name}`)} />

        </div>
        <div className="p-2">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user.first_name} {user.last_name}</h3>
            <table className="text-xs my-3">
                <tbody>
                <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                    <td className="px-2 py-2">{user.phone_number}</td>
                </tr>
                <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                    <td className="px-2 py-2">{user.email_id}</td>
                </tr>
            </tbody></table>

          

        </div>
    </div>
</div>

</div></Container>
  );
};

export  default Account;
