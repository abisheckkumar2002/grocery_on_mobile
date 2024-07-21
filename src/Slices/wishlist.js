import { createSlice } from '@reduxjs/toolkit'
import { FETCH_CART, URL_ADD_TO_WISHLIST } from '../Constant/index.js'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
export const initialState = {
   wishlist_pro:[]
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    getwishlist: (state, { payload }) => {
     state.wishlist_pro=payload
    },
    remove_wishlist_pro: (state, { payload }) => {
       var data = [...state.wishlist_pro]
       if(payload > -1)
       {
        data.splice(payload,1)
        state.wishlist_pro = data
       }
     },
     wishlist_updatecart: (state, { payload }) => {
      if (payload.key == 'increment') {
        var data = [...state.wishlist_pro]
        data[payload.index].check = true
        data[payload.index].qty = Number(data[payload.index].qty) + Number(1)
        state.wishlist_pro = data
      }
      else {
        var data = [...state.wishlist_pro]
        if (Number(data[payload.index].qty) == Number(1)) {
          var data = [...state.wishlist_pro]
          data[payload.index].check = false
          data[payload.index].qty = Number(0)
          state.wishlist_pro = data
        }
        else {
          var data = [...state.wishlist_pro]
          let count = Number(data[payload.index].qty) - Number(1)
          data[payload.index].qty = count
          state.wishlist_pro = data
        }
      }

     }, 

     update_wishlist_withcart: (state, { payload }) => {

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
        if (cartdata1[payload.position].qty == 1) {
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
        cartdata1[payload.position].qty = Number(cartdata1[payload.position].qty) + 1
        cartdata1[payload.position].check = true
      }

      var final = state.wishlist_pro.map(e => {
        var sathish = cartdata1.find(f => f.id == e.id)
        if (sathish != undefined) {
          return sathish
        }
        else {
          return e
        }
      })

      console.log("test", final)
      state.wishlist_pro = final

    },
  },
})

export const {getwishlist,remove_wishlist_pro,wishlist_updatecart,update_wishlist_withcart} = wishlistSlice.actions
export const wishlistSelector = state => state.wishlist
export default wishlistSlice.reducer

export function fetchwishlist(payload,token) {

  return async dispatch => {
    try {
        const response = await axios({
            method: "get",
            url: `${URL_ADD_TO_WISHLIST}`,
            headers: {
              'Content-Type': 'application/json',
              Authorization: "Bearer " + token
          },
          })
        
      
    
            var home_products = response.data.whishlist.map(e => ({
              id: e.item.id,
              name: e.item.name,
              qty: 0,
              check: false,
              discount: e.item.item_variant[0].discount,
              offerprice: e.item.item_variant[0].offer_price,
              price: e.item.item_variant[0].price,
              image: e.item.image,
              varientid: e.item.item_variant[0].id,
              status: e.item.status,
              wishlist: e.item.is_already_in_wish_list,
            }))
        
            if (payload.length >= 1) {
    
            var cart_products = payload.map(e => ({
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
    
            console.log("final", final)
            dispatch(getwishlist(final))
          }
          else {
    
            dispatch(getwishlist(home_products))
          }
          
    
    }
    catch(err)
    {
       console.log("Wishlisterr ===>",err)
    }
  }
}

