import { createSlice } from '@reduxjs/toolkit'
import { FETCH_CART, SEARCHING_URL, SEARCH_URL } from '../Constant/index.js'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
export const initialState = {
  suggestionwords:[],
  search_products:[]
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    getsearchsuggestions: (state, { payload }) => {
       state.suggestionwords=payload
    },
    getsearchproducts: (state, { payload }) => {
      state.search_products=payload
   },
   updatesearchproducts: (state, { payload }) => {
    console.log("update_products_data",payload)
    if(payload.key == 'increment')
    {
      var data =[...state.search_products]
      data[payload.index].check = true
      data[payload.index].qty = Number(data[payload.index].qty)+Number(1)
      state.search_products = data
    }
    else
    {
      var data =[...state.search_products]
      if((Number(data[payload.index].qty) == Number(1)))
      {
        var data =[...state.search_products]
        data[payload.index].check = false
        data[payload.index].qty = Number(0)
        state.search_products = data
      }
      else
      {
      var data =[...state.search_products]
      let count = Number(data[payload.index].qty)-Number(1)
      data[payload.index].qty = count
      state.search_products = data
      }
    }
   
  },
  update_sproducts_withcart: (state, { payload }) => {
     
    var cartdata1 = payload.cartdata.map(e => ({
      id:e.product_id,
      name:e.items.name,
      qty:e.quantity,
      check:true,
      discount: e.item_variant.discount,
      offerprice:e.item_variant.offer_price,
      price:e.item_variant.price,
      image:e.items.image
    }))

    if(payload.value == 'decrement')
    {
      if(cartdata1[payload.position].qty == 1)
      {
        cartdata1[payload.position].qty=0
        cartdata1[payload.position].check=false
      }
      else
      {
        cartdata1[payload.position].qty=Number(cartdata1[payload.position].qty)-1
        cartdata1[payload.position].check=true
      }
    }

    else if ((payload.value == "delete"))
    {
      cartdata1[payload.position].qty=0
      cartdata1[payload.position].check=false
    }

    else
    {
      cartdata1[payload.position].qty=Number(cartdata1[payload.position].qty)+1
      cartdata1[payload.position].check=true
    }
   
    var final = state.search_products.map(e => {
      var sathish = cartdata1.find( f => f.id == e.id)
         if(sathish != undefined)
         {
             return sathish
         }
         else
         {
             return e
         }
       })

       console.log("test",final)
       state.search_products=final

  },
   
  update_search_wish: (state, { payload }) => {
    var data = [...state.search_products]
    data[payload].wishlist = !data[payload].wishlist
    state.search_products = data
  },
  },
})

export const {getsearchsuggestions,getsearchproducts,updatesearchproducts,update_sproducts_withcart,update_search_wish} = searchSlice.actions
export const searchSelector = state => state.search

export default searchSlice.reducer

export function fetchsearchsuggestion(value) {
  return async dispatch => {
    try {
      const response =  await axios({
        method:"get",
        url:`${SEARCH_URL}`+value
       })
       dispatch(getsearchsuggestions(response.data.products))
        
    }
    catch(err)
    {
      console.log("ERROR ==>",err)
    } 
  }
}

export function fetchsearchproducts(payload,value,type,token) {
  console.log("cartdata",payload)
  console.log("selectedvalue",value)
  return async dispatch => {
    try {
      const response =  await axios({
        method:"get",
        url:`${SEARCHING_URL}`+(type=='initial' ? value : value[0].label),
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token
      },
       })

       if(payload.length >= 1)
       {
        
         var searchproducts = response.data.products.data.map ( e => ({
          id:e.id,
          name:e.name,
          qty:0,
          check:false,
          discount: e.item_variant[0].discount,
          offerprice:e.item_variant[0].offer_price,
          price:e.item_variant[0].price,
          image:e.image,
          varientid:e.variant_id,
          wishlist: e.is_already_in_wish_list,
         }))

      
  
         var cart_products = payload.map ( e => ({
          id:e.product_id,
          name:e.items.name,
          qty:e.quantity,
          check:true,
          discount: e.item_variant.discount,
          offerprice:e.item_variant.offer_price,
          price:e.item_variant.price,
          image:e.items.image,
          varientid:e.item_variant.id,
          wishlist: e.is_already_in_wish_list,
         })
         )
       
        var final = searchproducts.map(e => {
          var sathish = cart_products.find( f => f.id == e.id)
             if(sathish != undefined)
             {
                 return sathish
             }
             else
             {
                 return e
             }
           })
         
           console.log("final",final)
        dispatch(getsearchproducts(final))
       }
       else
       {
        var Arr = response.data.products.data.map(e => ({
          id:e.id,
          name:e.name,
          qty:0,
          check:false,
          discount: e.item_variant[0].discount,
          offerprice:e.item_variant[0].offer_price,
          price:e.item_variant[0].price,
          image:e.image,
          varientid:e.variant_id,
          wishlist: e.is_already_in_wish_list,
      }))
      console.log("nagoor",Arr)
        dispatch(getsearchproducts(Arr))
       }
     
    }
    catch(err)
    {
      console.log("ERROR ==>",err)
    } 
  }
}