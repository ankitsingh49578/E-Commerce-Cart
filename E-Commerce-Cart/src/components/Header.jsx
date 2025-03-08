import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from "@mui/material/Badge";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Header() {
  const {carts} = useSelector((state)=>state.allCart);   //  can get the value of initial state
  // console.log(cartData)
  return (
    <>
      <div className='flex flex-row justify-between py-4 sm:px-16 px-6 text-white bg-black w-full h-16'>
        <NavLink to="/">
          <div className='font-bold text-3xl'>E-Commerce</div>
        </NavLink>
        <NavLink to="/cart">
          <Badge badgeContent={carts.length} color='error'><ShoppingCartIcon className='!w-10 !h-10 text-5x'/></Badge>
        </NavLink>
      </div>
    </>
  )
}

export default Header

