import { Container, Fade } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import ProductCard, { ProductCardSkeleton } from "./ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
// import loader from "../../assets/gifs/loader.gif";
const Products = ({ categoryProducts }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();
  window.scroll({ top: 0 });

  const getProductData = async () => {
    if (categoryId === undefined) {
      var api_url = BASE_URL + `product`;
    } else {
      var api_url = BASE_URL + `product?category=${categoryId}`;
    }
    try {
      const response = await axios.get(api_url);
      setProducts(response.data);
    } catch (error) {
      // setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductData();
  }, []);

  return (
    
    <main className="min-h-screen space-y-5 pt-20 mb-9">
      <Fade in={true}>
        <Container className="xl:space-y-10 sm:space-y-8 space-y-6">
          {/* Product_cards*/}
          <section
            className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 
                lg:gap-6 gap-x-5 gap-y-5 "
          >
           {loading ? (
              // Display skeleton loading cards when loading
              Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            ) : products.length === 0 ? (
              // Display message when there are no products
              <p className="text-xl w-max text-center">No products found in this category</p>
            ) : (
              // Render product cards if there are products
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}

          </section>
        </Container>
      </Fade>
    </main>
  );
};

export default Products;
