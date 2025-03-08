import React, { useState } from 'react'
import CardData from './CardData'
import Card from './Card'
import { addToCart } from '../redux/features/cartSlice'
import {useDispatch} from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';

function Home() {
  const [cartData, setCartData] = useState(CardData)
  const dispatch = useDispatch();

  // add to cart
  const send = (e) =>{
    dispatch(addToCart(e));
    toast.success('Item Added To Your Cart')
  }
  return (
    <>
      <div className='mt-4 md:px-16'>
        <h2 className='sm:text-3xl text-2xl font-semibold text-center my-4'>Restaurants in Faridabad Open now</h2>
        <div className='flex flex-row flex-wrap gap-7 mb-10 justify-center'>
        {
          cartData.map((val, index) =>{
            return <Card val={val} send={send} img={val.imgdata} name={val.dish} address={val.address} price={val.price} rating={val.rating}/>
          })
        }
        </div>
      </div>
    </>
  )
}

export default Home