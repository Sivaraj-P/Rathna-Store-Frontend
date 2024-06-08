import React from 'react'
import { BASE_URL } from "../../utils/utils";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { groceryContext } from "../Layout/Layout";
import { CircularProgress } from '@mui/material';
import ProductCard from './ProductCard';
import EmptyCart from '../Cart/EmptyCart/EmptyCart';
import { Inventory, CheckBox, CreditCard } from '@mui/icons-material';

export const OrderProducts = () => {
  const { userTokenState } = useContext(groceryContext);
  const [loginToken, setLoginToken] = userTokenState;
  const [loading, setLoading] = useState(true);
  window.scroll({ top: 0 });
  const [orderProducts, setOrderProducts] = useState([])
  const [orderDetails, setOrderDetails] = useState({})
  const { orderID } = useParams();

  const getOderProducts = async () => {
    try {
      const headers = {
        headers: {
          'Authorization': `Token ${loginToken.token}`,
        }
      }
      const response = await axios.get(BASE_URL + `order-items/${orderID}`, headers);
      setOrderDetails(response.data.order)
      setOrderProducts(response.data.products);
    } catch (error) {
      // setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOderProducts();
  }, []);

  return (
    <section
      className={`${orderProducts.length > 0 ? "min-h-screen " : "h-screen "
        }pt-20`}
    >
      {loading && <div className='w-full h-full grid place-items-center'><CircularProgress /></div>}

      {orderProducts?.length > 0 ? (

        <div className="container mx-auto px-4 md:px-6 py-8">
          <div>
            <h1 className="text-base font-bold mb-6">Orders ID {orderDetails.order_id}</h1>

          </div>

          {/* <div className="w-full flex justify-end p-10"><FilterOrder/></div> */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {
              orderProducts.map(data => (
                <ProductCard productDetails={data} />
              ))
            }


          </div>
          {/* <div className="my-5 flex justify-evenly">
            <div className="grid ">
              <div className="flex items-center gap-2">
                <Inventory className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">3 Products</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckBox className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Paid</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Visa *1234</span>
              </div>
            </div>
            <div className="grid gap-2 text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm font-medium">Tax:</span>
                <span className="text-sm font-medium">$12.00</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm font-medium">Shipping:</span>
                <span className="text-sm font-medium">$5.00</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-semibold">$117.00</span>
              </div>
            </div>
          </div> */}
        </div>

      ) : (
        <EmptyCart message={"No products found"} />
      )}
    </section>
  )
}
