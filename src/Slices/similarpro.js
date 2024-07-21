import { createSlice } from '@reduxjs/toolkit'
import { CATEGORY_URL, FETCH_CART, Home_URL, SEARCHING_URL, SEARCH_URL } from '../Constant/index.js'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
export const initialState = {
   similarproducts:[]
}

const similarproSlice = createSlice({
  name: 'similarpro',
  initialState,
  reducers: {
    getsimilarpro: (state, { payload }) => {
       state.similarproducts=payload
  },
  updatesimilarproducts: (state, { payload }) => {
    console.log("update_products_data", payload)
    if (payload.key == 'increment') {
      var data = [...state.similarproducts]
      data[payload.index].check = true
      data[payload.index].qty = Number(data[payload.index].qty) + Number(1)
      state.similarproducts = data
    }
    else {
      var data = [...state.similarproducts]
      if (Number(data[payload.index].qty) == Number(1)) {
        var data = [...state.similarproducts]
        data[payload.index].check = false
        data[payload.index].qty = Number(0)
        state.similarproducts = data
      }
      else {
        var data = [...state.similarproducts]
        let count = Number(data[payload.index].qty) - Number(1)
        data[payload.index].qty = count
        state.similarproducts = data
      }
    }
  },
  update_sproductswithcart: (state, { payload }) => {

    var cartdata1 = payload.cartdata.map(e => ({
      id: e.product_id,
      name: e.items.name,
      qty: e.quantity,
      check: true,
      discount: e.item_variant.discount,
      offerprice: e.item_variant.offer_price,
      price: e.item_variant.price,
      image: e.items.image,
      varientid: e.product_variant_id,
      status: "inStack"
    }))

    if (payload.value == 'decrement') {
      if ((cartdata1[payload.position].qty == 1)) {
        cartdata1[payload.position].qty = 0
        cartdata1[payload.position].check = false
      }
      else {
        cartdata1[payload.position].qty = Number(cartdata1[payload.position].qty) - 1
        cartdata1[payload.position].check = true
      }
    }
    else if ((payload.value == "delete")) {
      cartdata1[payload.position].qty = 0
      cartdata1[payload.position].check = false
    }
    else {
      cartdata1[payload.position].qty = Number(cartdata1[payload.position].qty) + Number(1) 
      cartdata1[payload.position].check = true
    }

    var final = state.similarproducts.map(e => {
      var sathish = cartdata1.find(f => f.id == e.id)
      if (sathish != undefined) {
        return sathish
      }
      else {
        return e
      }
    })
    state.similarproducts = final
  },
  update_sim_wish: (state, { payload }) => {
    var data = [...state.similarproducts]
    data[payload].wishlist = !data[payload].wishlist
    state.similarproducts = data
  },
}
})

export const {getsimilarpro,updatesimilarproducts,update_sproductswithcart,update_sim_wish} = similarproSlice.actions
export const similarproSelector = state => state.similarpro

export default similarproSlice.reducer


export function fetchsimilarproducts(payload) {
console.log("payloadpayloadpayload",payload)
  return async dispatch => {
    try {
      const response =  await axios({
        method:"get",
        url:`${CATEGORY_URL}`+Number(payload.catid),
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + payload.token
      },
       })
      
     
       var home_products = response.data.products.data.map(e => ({
        id: e.id,
        name: e.name,
        qty: 0,
        check: false,
        discount: e.item_variant[0].discount,
        offerprice: e.item_variant[0].offer_price,
        price: e.item_variant[0].price,
        image: e.image,
        varientid: e.item_variant[0].id,
        status: e.status,
        wishlist: e.is_already_in_wish_list,
      }))

      var cart_products = payload.cartdata.map(e => ({
        id: e.product_id,
        name: e.items.name,
        qty: e.quantity,
        check: true,
        discount: e.item_variant.discount,
        offerprice: e.item_variant.offer_price,
        price: e.item_variant.price,
        image: e.items.image,
        varientid: e.product_variant_id,
        status: e.items.status,
        wishlist: e.is_already_in_wish_list,
      })
      )

      var final = home_products.map(e => {
        var sathish = cart_products.find(f => f.id == e.id)
        if (sathish != undefined) {
          return sathish
        }
        else {
          return e
        }
      })
    
     var convert = final.findIndex(e => e.id == payload.pro_id)
     final.splice(convert, 1);  
    //  console.log("CONVERT",convert)
      if(payload.cartdata.length > 0)
      {
        dispatch(getsimilarpro(final))
      }
    else
    {
      var convert = home_products.findIndex(e => e.id == payload.pro_id)
      home_products.splice(convert, 1);  
      dispatch(getsimilarpro(home_products))
    }

    }
    catch(err)
    {
      console.log("simillarerr",err.response.data)
    } 
  }
}