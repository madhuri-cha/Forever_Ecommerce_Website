import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContextProvider';
import Title from './Title';
import Product from '../pages/Product';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])


    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                </p>
            </div>

                <div>
                    {
                        bestSeller.map((item, index) => (

                            <Product key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                        ) 
                    )
                    }
                </div>
        </div>

    
    )
}

export default BestSeller