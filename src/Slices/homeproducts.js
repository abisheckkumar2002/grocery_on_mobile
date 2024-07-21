import { createSlice } from '@reduxjs/toolkit'
import { FETCH_CART, Home_URL } from '../Constant/index.js'
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
export const initialState = {
  loading: false,
  hasErrors: false,
  home_products: [],
  categories: [],
}

const homeproductsSlice = createSlice({
  name: 'homeproducts',
  initialState,
  reducers: {
    gethomeproducts: (state, { payload }) => {
      state.home_products = payload
    },
    getcategories: (state, { payload }) => {
      state.categories = payload
    },
    updatehomeproducts: (state, { payload }) => {
      console.log("update_products_data", payload)
      if (payload.key == 'increment') {
        var data = [...state.home_products]
        data[payload.index].check = true
        data[payload.index].qty = Number(data[payload.index].qty) + Number(1)
        state.home_products = data
      }
      else {
        var data = [...state.home_products]
        if (Number(data[payload.index].qty) == Number(1)) {
          var data = [...state.home_products]
          data[payload.index].check = false
          data[payload.index].qty = Number(0)
          state.home_products = data
        }
        else {
          var data = [...state.home_products]
          let count = Number(data[payload.index].qty) - Number(1)
          data[payload.index].qty = count
          state.home_products = data
        }
      }

    },
    updatewithcart: (state, { payload }) => {

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

      var final = state.home_products.map(e => {
        var sathish = cartdata1.find(f => f.id == e.id)
        if (sathish != undefined) {
          return sathish
        }
        else {
          return e
        }
      })
      state.home_products = final
    },
    update_home_wish: (state, { payload }) => {
      var data = [...state.home_products]
      data[payload].wishlist = !data[payload].wishlist
      state.home_products = data
    },
  },
})

export const { gethomeproducts, getcategories, updatehomeproducts, updatewithcart ,update_home_wish} = homeproductsSlice.actions
export const homeproductsSelector = state => state.homeproducts
export default homeproductsSlice.reducer
export function fetchhomeproducts(payload,token) {


  return async dispatch => {
    try {
      const response = await axios({
        method: "get",
        url: `${Home_URL}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token
      },
      })
      // console.log("gurruuuuu", payload)
      if (payload.length >= 1) {

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
        dispatch(gethomeproducts(final))
      }
      else {

        var Arr = response.data.products.data.map(e => ({
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
        console.log("nagoor", Arr)
        dispatch(gethomeproducts(Arr))
      }
      dispatch(getcategories(response.data.categories))

    }
    catch (err) {
      console.log("error", err)
    }
  }
}
