import React from "react";
import { Fade,Card,CardActions,CardContent,useMediaQuery,Button } from "@mui/material";


const ProductCard = ({productDetails}) => {
  const isMediumScreen = useMediaQuery(
    "(min-width: 768px) and (max-width: 1024px)"
  );
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  return (
   <>
    <Fade in={true} >
        <div className="grid xl:max-w-[300px] max-w-[40rem] py-2.5 px-3 xl:grid-cols-3 sm:grid-cols-3 grid-cols-5 lg:gap-x-2.5 gap-x-2 items-center rounded-md w-full bg-white hover:shadow-sm">
          {/*Img */}
          <div className="col flex items-center justify-center">
            <img src={productDetails.product_image} className="lg:h-16 h-10" alt={productDetails.name} />
          </div>

          <div className="col-span-2 overflow-hidden pt-2">
            <div className=" overflow-hidden lg:space-y-2 space-y-0.5">
              {/* Name */}
              <h4 className="font-semibold lg:max-h-none  overflow-hidden lg:text-gray-700 sm:text-sm text-xs">
                {productDetails.name}
              </h4>

              {/* Description */}
              <h6 className="text-justify text-xs text-gray-700">
               Quantity : {productDetails.qty}
              </h6>
            </div>
          </div>

          <div className="flex sm:col-span-1 col-span-2 justify-around items-start">
            <div className="lg:space-y-1 md:space-y-0 sm:space-y-0.5 m-2">
              {/*Total Price */}
              <h3 className="text-xs  whitespace-nowrap ">
                 Price
              </h3>
              <h3 className="font-medium whitespace-nowrap text-xs text-gray-900">
                {productDetails.price }
              </h3>
            </div>
            <div className="lg:space-y-1 md:space-y-0 sm:space-y-0.5 m-2">
              {/*Total Price */}
              <h3 className="text-xs  whitespace-nowrap ">
                 Total
              </h3>
              <h3 className="font-semibold whitespace-nowrap sm:text-base text-sm text-green-600">
                &#x20b9; {productDetails.total }
              </h3>
            </div>
          </div>

        </div>
      </Fade>
   </>
  
  )
}

export default ProductCard