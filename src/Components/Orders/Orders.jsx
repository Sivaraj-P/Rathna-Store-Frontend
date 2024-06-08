import { useNavigate } from "react-router-dom";
import { CircularProgress, Popover, Pagination, Button, Stack, useMediaQuery } from "@mui/material";
import { createContext, useContext, useState, useEffect } from "react";
import { groceryContext } from "../Layout/Layout";
import EmptyCart from "../Cart/EmptyCart/EmptyCart";
import { Close, Done, Pending } from "@mui/icons-material";
import axios from "axios"
import { BASE_URL } from "../../utils/utils";
import OrdersCard from "./OrdersCard";
import FilterOrder from "./FilterOrders";


const Orders = () => {
    // Scrolling Bug Fixed
    window.scroll({ top: 0 });
    const isSmallScreen = useMediaQuery('(max-width:768px)'); // Adjust the max-width value as needed
    const { userTokenState } = useContext(groceryContext);
    const [loginToken, setLoginToken] = userTokenState;
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false)
    const [orderDetails, setOrderDetails] = useState([])
    const [loader, setLoader] = useState(true)

    const handlePopover = () => {
        setOpen(!open)
    }

    const getOrderDetails = async (page) => {

        try {
            const headers = {
                headers: {
                    'Authorization': `Token ${loginToken.token}`,
                }
            }
            const response = await axios.get(BASE_URL + `orders?page=${page}`, headers);
            setOrderDetails(response.data)
        } catch (error) {
            console.log(error)

        } finally {


            setLoader(false)

        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)

    }


    useEffect(() => {
        getOrderDetails(page)
    }, [page])

    return (

        <section
            className={`${orderDetails.orders?.length > 0 ? "min-h-screen " : "h-screen "
                }pt-20`}
        >
            {loader ? (<div className="h-full w-full grid place-items-center"><CircularProgress /></div>) :
                orderDetails.orders?.length > 0 ? (

                    <div className="container mx-auto px-4 md:px-6 py-8">
                        <h1 className="text-3xl font-bold mb-6">Orders</h1>
                        {/* <div className="w-full flex justify-end p-10"><FilterOrder/></div> */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                orderDetails.orders.map(data => (
                                    <OrdersCard orderDetails={data} />
                                ))
                            }
                        </div>
                       {orderDetails.next_page &&
                       (
                        <Stack spacing={2} style={{ margin: 30 }}>
                        <Pagination count={orderDetails.total_pages} shape="rounded" style={{ display: "flex", justifyContent: "center", }} size={isSmallScreen ? "small" :"large"} onChange={handleChangePage} />
                    </Stack>
                       )
                       }
                    </div>

                ) : (
                    <EmptyCart message={"There are no purchased orders"} />
                )
            }
        </section>
    );
};

export default Orders;   
