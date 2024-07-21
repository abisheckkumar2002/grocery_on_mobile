import { createSlice } from '@reduxjs/toolkit'
import { ADD_TO_CART, DELETE_CARTPRODUCT, FETCH_CART, REMOVE_CART } from '../Constant/index.js'
import axios from 'axios';
import { fetchhomeproducts } from './homeproducts.js';
import { fetchcategoryproducts } from './categoriesfilter.js';
import { fetchsimilarproducts } from './similarpro.js';
import { fetchwishlist } from './wishlist.js';

export const initialState = {
  loading: false,
  hasErrors: false,
  cartproducts:[],
  total:0,
  cartlength:0
}

const fetchcartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getcart: (state, { payload }) => {
      state.cartproducts = payload.cartitems,
      state.total=payload.tot,
      state.cartlength=Number(payload.cartitems.length)
    },
    updatecartproducts: (state, {payload}) => {
       var data = [...state.cartproducts]
       if(payload.key == 'decrement')
       {
        if(data[payload.value].quantity == 1)
        {
          if (payload.value > -1) 
          { 
            data.splice(payload.value, 1); 
            var total=data.map(e => {
              if(e.total_amount)
              return Number(e.total_amount)
             })
             var final = total.reduce((a, b) => a + b, 0)
             state.cartlength=state.cartlength-1
          }
         
        }
        else
        {
        var count =data[payload.value].quantity
        data[payload.value].quantity= Number(count)-1
        data[payload.value].total_amount=((count-1)*data[payload.value].price)
        var total=data.map(e => {
          if(e.total_amount)
          return Number(e.total_amount)
         })
         var final = total.reduce((a, b) => a + b, 0)
        }  
       }
       else
       {
        var count =data[payload.value].quantity
        data[payload.value].quantity=Number(count)+1
        data[payload.value].total_amount=((count+1)*data[payload.value].price)
        
        var total=data.map(e => {
          if(e.total_amount)
          return Number(e.total_amount)
         })
          var final = total.reduce((a, b) => a + b, 0)
       
       }
  
       state.cartproducts=data
       state.total=final


    },

    updatemaincart: (state, {payload}) => {
      if(payload.type == 'increment')
      {
        state.cartlength= Number(state.cartlength)+Number(payload.cartlength),
        state.total=Number(state.total)+Number(payload.productprice)
      }
      else
      {
     
        state.cartlength= Number(state.cartlength)+Number(payload.cartlength),
        state.total=Number(state.total)-Number(payload.productprice)
      }
    },
    deletecart: (state, {payload}) => {
      // console.log("payload",payload)
      var data = [...state.cartproducts]
      data.splice(payload, 1); 
      var total=data.map(e => {
        if(e.total_amount)
        return Number(e.total_amount)
       })
       var final = total.reduce((a, b) => a + b, 0)
       state.cartlength=state.cartlength-1
       state.total=final
       state.cartproducts=data
    },
    emptycart: (state, {payload}) => {
      state.total=0
      state.cartproducts=[]
      state.cartlength=0
    }

  },
  
 
})


export const {getcart,updatecartproducts,updatemaincart,deletecart,emptycart} = fetchcartSlice.actions
export const cartSelector = state => state.cart
export default fetchcartSlice.reducer

export function fetchcart(payload,value) {
  
  return async dispatch => {
    try {
      const response =  await axios({
        method:"get",
        url:`${FETCH_CART}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + payload
      },
       })
       if(response.data)
       {
        var data={
          cartitems:response.data.cart_items,
          tot:response.data.grand_total
        }
         dispatch(getcart(data))
         dispatch(fetchwishlist(response.data.cart_items,payload))
         
       }
    if(value == 'initial')
    {
      dispatch(fetchhomeproducts(response.data.cart_items,payload))
    }
      
       
    }
    catch(err)
    {
        console.log("error",err)
    } 
  }
}

export function Addtocart(payload) {
  console.log("addcartdata",payload)
  return async dispatch => {
    try {
      var postdata={
        "product_id":payload.productid,
        "product_variant_id":"",
        "quantity": 1,
        "type":payload.type,
        "product_variant_id":payload.varientid
      }
      const response =  await axios({
        method:"post",
        url:`${ADD_TO_CART}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + payload.token
      },
        data:postdata
       })
       if(response.data.message)
       {  
          if(payload.process == 'addtocart')
          {
            dispatch(fetchcart(payload.token))
          }
          
       }
       
    }
    catch(err)
    {
        console.log("error",err)
        console.log("fullerrr",err.response.data)
    } 
  }
}


export function fetchcartforshop(payload) {
  
  return async dispatch => {
    try {
      const response =  await axios({
        method:"get",
        url:`${FETCH_CART}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + payload.token
      },
       })
       if(response.data)
       {
        var data={
          cartitems:response.data.cart_items,
          tot:response.data.grand_total
        }
         dispatch(getcart(data))
         
          var data1 = {
            cartdata:response.data.cart_items,
            catid:payload.catid,
            page:1,
            token:payload.token
          }
         dispatch(fetchcategoryproducts(data1))
       }
 
      
       
    }
    catch(err)
    {
        console.log("error",err)
    } 
  }
}

export function deletecartproducts(payload) {
  
  return async dispatch => {
    try {
      const response =  await axios({
        method:"delete",
        url:`${DELETE_CARTPRODUCT}`+payload.id,
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + payload.token
      },
       })
       console.log("response",response.data)
       return response.data
      
    }
    catch(err)
    {
        console.log("error",err)
    } 
  }
}

export function fetchaddtionalcart(payload) {
  
  return async dispatch => {
    try {
      const response =  await axios({
        method:"get",
        url:`${FETCH_CART}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + payload.token
      },
       })
       
     var data = {
         catid:payload.cat_id,
         cartdata:response.data.cart_items,
         pro_id:payload.pro_id,
         token:payload.token
     }
    //  console.log("ajeeekhan",data)
     dispatch(fetchsimilarproducts(data))
    }
    catch(err)
    {
        console.log("error",err)
    } 
  }
}
