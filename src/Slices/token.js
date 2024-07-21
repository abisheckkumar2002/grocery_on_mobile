import { createSlice } from '@reduxjs/toolkit'
import { FETCH_CART } from '../Constant/index.js'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
export const initialState = {
  loading: false,
  hasErrors: false,
  cartproducts:[],
  total:0
}

const fetchcartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getcart: (state, { payload }) => {
      state.cartproducts = payload.cartcount,
      state.total=payload.total
    },
   
  
  },
})

export const {getcart,addtocart123} = fetchcartSlice.actions
export const cartSelector = state => state.cart
export default fetchcartSlice.reducer
export function fetchcart(payload) {
  return async dispatch => {
    try {
      const response =  await axios({
        method:"get",
        url:`${FETCH_CART}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + tokk
      },
       })
       
    }
    catch(err)
    {

    }
  }
}

