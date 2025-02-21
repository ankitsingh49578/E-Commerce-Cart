import React, { useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeToCart, decrementSingleItems, emptyCart } from "../redux/features/cartSlice";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

function CartDetails() {
  const {carts} = useSelector((state)=>state.allCart);

  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)

  const dispatch = useDispatch();

  // add to cart
  const handleIncrement = (e)=>{
    dispatch(addToCart(e));
  }

  // deleting a single item
  const handleDelete = (e)=>{
    dispatch(removeToCart(e));
  }

  // decrementing a single item
  const handleDecrement = (e)=>{
    dispatch(decrementSingleItems(e));

    if(carts.length == 1 && e.qnty <= 1){
      toast.success('Your Cart Is Empty')
    }
    else if(e.qnty <= 1){
      toast.success('Item Removed From Your Cart')
    }
  }

  // Making Cart empty
  const handleEmptyCart = () =>{
    dispatch(emptyCart());

    toast.success('Your Cart Is Empty')
  }

  // counting Total price of all the items
  const totalPriceFunction = (e)=>{
    let total = 0;

    carts.map((e, idx)=>{
      total += e.price*e.qnty;
    })
    setTotalPrice(total)
  }

  useEffect(() => {
    totalPriceFunction();
  }, [totalPriceFunction])
  
  // counting total no. of items in the cart (total quantity)
  const totalQuantityFunction = (e)=>{
    let total = 0;

    carts.map((e, idx)=>{
      total += e.qnty;
    })
    setTotalQuantity(total);
  }

  useEffect(() => {
    totalQuantityFunction()
  }, [totalQuantityFunction])
  

  return (
    <>
      <div className="w-[95%] md:w-[60%] bg-gray-50 m-auto mt-12 rounded-xl shadow-2xl shadow-black/20">
        <div className="flex flex-row justify-between w-full h-[25%] bg-black rounded-t-xl p-3.5">
          <span className="text-white text-2xl font-medium">Your Cart{carts.length > 0 ? `(${carts.length})`: ""}</span>
          {carts.length > 0 ? (
            <button onClick={handleEmptyCart} className="text-white hover:text-gray-200 cursor-pointer p-1 rounded-xl bg-[#d83434] hover:bg-[#cc0000]">
              <span>
                <DeleteForeverRoundedIcon className="mb-0.5" />
                Empty Cart
              </span>
            </button>
          ) : (
            ""
          )}
        </div>

        <div className="">
          {carts.length === 0 ? (
            <div className="flex flex-col place-items-center justify-center p-6">
              <ShoppingCartIcon className="!w-[10%] !h-[35%] text-gray-300" />
              <p className="text-gray-300">Your Cart is Empty</p>
            </div>
          ) : (

            <table className="border-separate border-spacing-4 w-full">
                <thead>
                  <tr className="text-left">
                    <th className="">Action</th>
                    <th className="">Product</th>
                    <th className="">Name</th>
                    <th className="">Price</th>
                    <th className="">Qty</th>
                    <th className="text-right">Total Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    carts.map((data, index) => {
                      return (
                        <tr>
                          <td>
                          <button onClick={()=>handleDelete(data.id)}>
                            <DeleteIcon className="text-red-500 hover:text-red-900 hover:bg-red-300 cursor-pointer bg-red-100 p-0.5 !h-[32px] !w-[35px]"/>
                          </button>
                          </td>
                          <td>
                            <img src={data.imgdata} alt="jpg" className="w-[40px] h-[40px] rounded-md"/>
                          </td>
                          <td>{data.dish}</td>
                          <td>{data.price}</td>
                          <td>
                            <div className="flex flex-row gap-2">
                              <button onClick={data.qnty<=0 ? handleDelete(data.id) :()=>handleDecrement(data)} className=""><RemoveIcon className="bg-blue-200 hover:bg-blue-400 cursor-pointer !w-[30px] !h-[30px] p-2"/></button>
                              <input type="text" className="w-[50px] text-center border border-gray-300" value={data.qnty} disabled />
                              <button onClick={()=>handleIncrement(data)} className=""><AddIcon className="bg-blue-200 hover:bg-blue-400 cursor-pointer !w-[30px] !h-[30px] p-2"/></button>
                            </div>
                          </td>
                          <td className="text-right">₹ {data.price*data.qnty}</td>
                        </tr>
                      )
                    }) 
                  }
                </tbody>
                <tfoot>
                  <th colSpan={4}></th>
                  <th className="text-left">Items In Cart <span className="mx-2">:</span> <span className="text-red-700">{totalQuantity}</span></th>
                  <th className="text-right">Total Price <span className="mx-2">:</span> <span className="text-red-700">₹ {totalPrice}</span></th>
                </tfoot>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default CartDetails;
