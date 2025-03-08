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
      <div className="w-[95%] md:w-[85%] bg-gray-50 m-auto mt-12 rounded-xl shadow-2xl shadow-black/20">
        <div className="flex flex-row justify-between w-full h-[25%] bg-black rounded-t-xl md:p-3.5 p-2">
          <span className="text-white md:text-2xl text-[18px] font-medium my-auto">Your Cart{carts.length > 0 ? `(${carts.length})`: ""}</span>
          {carts.length > 0 ? (
            <button onClick={handleEmptyCart} className="text-white hover:text-gray-200 cursor-pointer p-1 md:text-[20px] text-xs rounded-xl bg-[#d83434] hover:bg-[#cc0000]">
              <span>
                <DeleteForeverRoundedIcon className="md:mb-0.5 mb-0" />
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

            <table className="border-separate md:border-spacing-4 border-spacing-1 w-full p-1">
                <thead>
                  <tr className="md:text-left md:text-[17px] text-[11px]">
                    <th className="md:pr-0 pr-2">Action</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
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
                            <DeleteIcon className="text-red-500 hover:text-red-900 hover:bg-red-300 cursor-pointer bg-red-100 p-0.5 md:!h-[32px] md:!w-[35px]"/>
                          </button>
                          </td>
                          <td>
                            <img src={data.imgdata} alt="jpg" className="md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-md"/>
                          </td>
                          <td className="md:text-[15px] md:text-left text-center text-[9px]">{data.dish}</td>
                          <td className="md:text-[15px] text-[9px]">{data.price}</td>
                          <td>
                            <div className="flex flex-row md:gap-2 gap-1">
                              <button onClick={data.qnty<=0 ? handleDelete(data.id) :()=>handleDecrement(data)}><RemoveIcon className="bg-blue-200 hover:bg-blue-400 cursor-pointer md:!w-[30px] !w-[15px] !h-[15px] md:!h-[30px] md:p-2 p-1"/></button>
                              <input type="text" className="md:w-[50px] md:h-[30px] w-[15px] h-[15px] my-auto text-center border border-gray-300 md:text-[16px] text-[8px] md:translate-y-0 translate-y-[1px]" value={data.qnty} disabled />
                              <button onClick={()=>handleIncrement(data)} className=""><AddIcon className="bg-blue-200 hover:bg-blue-400 cursor-pointer md:!w-[30px] md:!h-[30px] !w-[15px] !h-[15px] md:p-2 p-1"/></button>
                            </div>
                          </td>
                          <td className="text-right md:text-[15px] text-[9px]">₹ {data.price*data.qnty}</td>
                        </tr>
                      )
                    }) 
                  }
                </tbody>
                <tfoot>
                  <th colSpan={4}></th>
                  <th className="md:text-left md:text-[15px] text-[9px]">Items In Cart : <span className="text-red-700">{totalQuantity}</span></th>
                  <th className="text-right flex md:flex-row md:justify-end flex-col md:text-[15px] text-[9px]">Total Price : <span className="text-red-700">₹ {totalPrice}</span></th>
                </tfoot>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default CartDetails;
