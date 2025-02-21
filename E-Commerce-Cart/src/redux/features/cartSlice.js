import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    carts: []
}

// card slice 
const cartSlice = createSlice({
   name: "cartslice",
   initialState,
   reducers: {
    // add to cart
    addToCart: (state, action)=>{

        // increment particular item
        const ItemIndex = state.carts.findIndex((item)=>item.id === action.payload.id);
        // console.log(ItemIndex);
        
        if(ItemIndex >= 0){
            state.carts[ItemIndex].qnty += 1
        }
        else{
            const temp = {...action.payload,qnty:1}
            state.carts = [...state.carts, temp];
        }
    },

    // remove particular item if we click on a delete of a particular item
    removeToCart: (state, action)=>{
        const data = state.carts.filter((e)=>e.id !== action.payload);
        state.carts = data
    },

    // decrement particular item
    decrementSingleItems: (state, action)=>{
        const ItemIndex_dec = state.carts.findIndex((item)=>item.id === action.payload.id);
        
        if(state.carts[ItemIndex_dec].qnty > 0){
            state.carts[ItemIndex_dec].qnty -= 1
        }
    },

    // Making Cart Empty
    emptyCart: (state, action)=>{
        state.carts = []
    }
   }
});

export const {addToCart, removeToCart, decrementSingleItems, emptyCart} = cartSlice.actions;

export default cartSlice.reducer;