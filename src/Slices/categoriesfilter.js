import { createSlice } from '@reduxjs/toolkit'
import { CATEGORY_FILTER_URL, CATEGORY_URL, FETCH_CART, Home_URL } from '../Constant/index.js'
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

export const initialState = {
  loading: false,
  hasErrors: false,
  category_products: [],
  total: 0
}

const categoryproductsSlice = createSlice({
  name: 'categoryproducts',
  initialState,
  reducers: {
    getcategoryproducts: (state, { payload }) => {
      state.category_products = payload.cat_data,
        state.total = payload.tot
    },

    updatecategoryproducts: (state, { payload }) => {
      console.log("update_products_data", payload)
      if (payload.key == 'increment') {
        var data = [...state.category_products]
        data[payload.index].check = true
        data[payload.index].qty = Number(data[payload.index].qty) + Number(1)
        state.category_products = data
      }
      else {
        var data = [...state.category_products]
        if (Number(data[payload.index].qty) == Number(1)) {
          var data = [...state.category_products]
          data[payload.index].check = false
          data[payload.index].qty = Number(0)
          state.category_products = data
        }
        else {
          var data = [...state.category_products]
          let count = Number(data[payload.index].qty) - Number(1)
          data[payload.index].qty = count
          state.category_products = data
        }
      }

    },
    update_cproducts_withcart: (state, { payload }) => {

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

      var final = state.category_products.map(e => {
        var sathish = cartdata1.find(f => f.id == e.id)
        if (sathish != undefined) {
          return sathish
        }
        else {
          return e
        }
      })

      console.log("test", final)
      state.category_products = final

    },

    update_cat_wish: (state, { payload }) => {
      var data = [...state.category_products]
      data[payload].wishlist = !data[payload].wishlist
      state.category_products = data
    },



  },
})

export const { getcategoryproducts, updatecategoryproducts, update_cproducts_withcart,update_cat_wish } = categoryproductsSlice.actions
export const categoryproductsSelector = state => state.categoryproducts
export default categoryproductsSlice.reducer


export function fetchcategoryproducts(payload) {
  console.log("idddddd", payload)
  return async dispatch => {
    try {
      const response = await axios({
        method: "get",
        url: `${CATEGORY_URL}` + Number(payload.catid) + "&page=" + payload.page,
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + payload.token
      },
      })


      if (payload.cartdata.length >= 1) {
        var categoryproducts = response.data.products.data.map(e => ({
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
          varientid: e.item_variant.id,
          status: e.items.status,
          wishlist: e.is_already_in_wish_list,
        })
        )

        var final = categoryproducts.map(e => {
          var sathish = cart_products.find(f => f.id == e.id)
          if (sathish != undefined) {
            return sathish
          }
          else {
            return e
          }
        })
        var data = {
          cat_data: final,
          tot: Math.round((response.data.products.total / 16))
        }

        dispatch(getcategoryproducts(data))


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
        var data = {
          cat_data: Arr,
          tot: Math.round((response.data.products.total / 16))
        }
        dispatch(getcategoryproducts(data))

      }
    }
    catch (err) {
      console.log("error", err)
    }
  }
}


export function fetchcategoryfilter(payload) {
  return async dispatch => {

    try {
      const response = await axios({
        method: "get",
        url: `${CATEGORY_FILTER_URL}` + Number(payload.catid) + '&sort=' + payload.type + '&page=' + payload.page,
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + payload.token
      },
      })


      if (payload.cartdata.length >= 1) {
        var categoryproducts = response.data.products.data.map(e => ({
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
          status: e.status,
          wishlist: e.is_already_in_wish_list,
        })
        )

        var final = categoryproducts.map(e => {
          var sathish = cart_products.find(f => f.id == e.id)
          if (sathish != undefined) {
            return sathish
          }
          else {
            return e
          }
        })
        var data = {
          cat_data: final,
          tot: Math.round((response.data.products.total / 16))
        }
        dispatch(getcategoryproducts(data))
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

        var data = {
          cat_data: Arr,
          tot: Math.round((response.data.products.total / 16))
        }
        dispatch(getcategoryproducts(data))
      }
    }
    catch (err) {
      console.log("error", err)
    }

  }
}