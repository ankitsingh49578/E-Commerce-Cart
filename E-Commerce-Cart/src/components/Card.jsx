import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Card({ send, val, img, name, address, price, rating }) {
  return (
    <div className="md:w-[340px] md:h-[330px] w-[80%] p-3 bg-gray-100 shadow-black/20 hover:shadow-black/40 hover:cursor-pointer shadow-2xl duration-300 rounded-xl">
      <img src={img} alt="" className="w-full h-[200px] rounded-4xl" />

      <div className="mt-2">
        <div className="flex flex-row justify-between mb-1">
          <h2 className="font-medium">{name}</h2>
          <span className="bg-green-600 text-white p-0.5 px-1.5 my-auto text-[13px] font-medium rounded-[6px]">
            {rating} ★
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <h2>{address}</h2>
          <span>₹ {price}</span>
        </div>
        <div className="w-full h-[0.5px] bg-black/30 mt-1.5 mb-1"></div>
        <div className="flex flex-row justify-between">
          <img
            src="https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp"
            alt="img"
            className="w-[20px] h-[20px] my-auto"
          />
          <button onClick={()=>send(val)} className="bg-[#e64343] hover:bg-[#cc0000] cursor-pointer mt-1 h-[35px] md:text-[14px] text-[10px] rounded-full md:px-2.5 px-1.5 text-white">
            ADD TO CART{" "}
            <span>
              <ShoppingCartIcon className="md:!h-[20px] md:!w-[20px] !h-[15px] !w-[15px]" />
            </span>
          </button>
          <img
            src="https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp"
            alt="img"
            className="w-[40px] h-[15px] my-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
