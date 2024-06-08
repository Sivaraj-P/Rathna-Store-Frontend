import { Button, Container, useMediaQuery } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import ProductCard, { ProductCardSkeleton } from '../../Products/ProductCard/ProductCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../utils/utils';

const EnjoyOurFreshGroceryItems = () => {
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // MediaQuery
    const isExtraSmallScreen = useMediaQuery('(max-width: 640px)');

    const getProductData = async () => {
        try {
          const response = await axios.get(BASE_URL + `product?category=${selectedCategory}`);
          setItems(response.data);
        } catch (error) {
          // setError(error);
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

    // Get Grocery Items
    useEffect(() => {
       getProductData()
    }, [selectedCategory])

    return (
        <Container >
            <div className='space-y-7 xl:space-y-8'>
                {/* Title */}
                <h1 className='text-center pb-0 md:text-2xl text-xl font-semibold capitalize tracking-wide'>
                    Enjoy Our Healthy And Fresh <br />
                    Grocery Items
                </h1>
                {/* Items Toggler  */}
                <ItemsToggler
                    alignment={selectedCategory}
                    setAlignment={setSelectedCategory} />

                {/*Grocery Items */}
                <div className='grid md:grid-cols-3 sm:grid-cols-2 
                lg:gap-6 gap-x-5 gap-y-5'>
                    {!isLoading ?
                        items.map(item => (
                            <ProductCard key={item.id}
                                product={item} />
                        ))
                        : Array.from({ length: 3 }).map((pd, i) => {
                            return <ProductCardSkeleton key={i} />
                        })
                    }
                </div>
                <Button
                    onClick={() => navigate('/products')}
                    color='success'
                    size={isExtraSmallScreen ? 'small' : 'medium'}
                    variant='outlined'
                    sx={{ textTransform: 'capitalize', display: 'block', mx: 'auto' }}>
                    View All Products
                </Button>
            </div>
        </Container>
    );
};

// Grocery Items Toggler
const ItemsToggler = ({ alignment, setAlignment }) => {
    // MediaQuery
    const isExtraSmallScreen = useMediaQuery('(max-width: 640px)')
    const isLargeScreen = useMediaQuery('(min-width: 1024px)');
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    // window.scroll({ top: 0 });
    const getCategoryData = async () => {
      try {
        const response = await axios.get(BASE_URL + "category");
        setCategory(response.data);
      } catch (error) {
        // setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      getCategoryData();
    }, []);

    return (
        <div className='space-x-3 md:space-x-5 text-center'>
            {category.slice(0,3).map(category => (
                <Button
                    sx={{ textTransform: 'capitalize', transition: 'all 150ms ease-in-out' }}
                    size={isExtraSmallScreen ? 'small' : isLargeScreen ? 'large' : 'medium'}
                    color='success'
                    variant={alignment === category.id ? 'contained' : 'text'}
                    key={category.id}
                    onClick={(e) => setAlignment(Number.parseInt(e.target.value))}
                    value={category.id}>
                    {category.name}
                </Button>
            ))}
        </div >
    )
}

export default EnjoyOurFreshGroceryItems;