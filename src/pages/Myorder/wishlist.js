import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './myorder.css'

import Sidebars from './sidebar';


import Header from '../../layouts/Header/header';
import { getwishlist, wishlist } from '../../Api/homedata';
import { Circles } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { remove_wishlist_pro, wishlistSelector, wishlist_updatecart } from '../../Slices/wishlist';
import { Addtocart, fetchcart, updatemaincart } from '../../Slices/fetchcart';
import { IMAGE_URL } from '../../Constant';


export default function Wishlist() {
  const dispatch = useDispatch()
  useEffect(() => {
    getwishlistpro()
    setloading(true)
  }, []);


  const [loading, setloading] = useState(false)
  // const [wishlist, setWishlist] = useState([])
  
  const {wishlist_pro} =useSelector(wishlistSelector)
  console.log("WISHLIST",wishlist_pro)
  const getwishlistpro = async () => {
    const token = localStorage.getItem("user_token");
    // const output = await getwishlist(token)
    // setloading(false)
    // console.log("wishlist", output)
    // setWishlist(output.whishlist)
    if (token) {
      dispatch(fetchcart(token,'initial'))
  }
  }
  
  const viewproduct = (e) => {
    // console.log("IDDDDDDDDDDDDDDD",e)
    // var data = JSON.stringify(e)
    //  localStorage.setItem("cart_product",e)
    window.location = "/viewproduct/" + e
  }

  

  const toshow = async(index) => {
    const token = localStorage.getItem("user_token");
    dispatch(remove_wishlist_pro(index))
    var data = {
      id: wishlist_pro[index].id,
      token: token
  }
    const output = await wishlist(data)
    if (output) {
        swal({
            title: "Wishlist removed successfully!",
            icon: "warning",
            timer: 2000
        })
    }
  }

  const Addtocartfn = async (index) => {

    const token = localStorage.getItem("user_token");
    if (token) {

        var send = {
            key: 'increment',
            index: index
        }
        dispatch(wishlist_updatecart(send))
        var price = {
            productprice: Number(wishlist_pro[index].offerprice) * 1,
            cartlength: 1,
            type: 'increment',

        }
        dispatch(updatemaincart(price))
        const token = localStorage.getItem("user_token");
        var data = {
            token: token,
            productid: wishlist_pro[index].id,
            type: 'increment',
            process: "updatecart",
            varientid: wishlist_pro[index].varientid
        }
        dispatch(Addtocart(data))
    }
    else {
        swal("Please login to purchase a product.").then(function () {
            window.location = "/login";
        });

    }
}


const updatecart = (value, index) => {

  const token = localStorage.getItem("user_token");
  if (value == 'increment') {

      var send = {
          key: value,
          index: index
      }
      dispatch(wishlist_updatecart(send))

      var price = {
          productprice: Number(wishlist_pro[index].offerprice) * 1,
          cartlength: 0,
          type: 'increment'
      }
      dispatch(updatemaincart(price))

      var data = {
          token: token,
          productid: wishlist_pro[index].id,
          type: "increment",
          process: "updatecart",
          varientid: wishlist_pro[index].varientid,
      }
      dispatch(Addtocart(data))
  }
  else {
      if (Number(wishlist_pro[index].qty == 1)) {
          var send = {
              key: value,
              index: index
          }
          dispatch(updatehomeproducts(send))

          var price = {
              productprice: Number(wishlist_pro[index].offerprice) * 1,
              cartlength: Number(-1),
              type: 'decrement'
          }
          dispatch(updatemaincart(price))

          var data = {
              token: token,
              productid: wishlist_pro[index].id,
              type: "decrement",
              process: "updatecart",
              varientid: wishlist_pro[index].varientid,
          }
          dispatch(Addtocart(data))
      }
      else {
          var send = {
              key: value,
              index: index
          }
          dispatch(updatehomeproducts(send))

          var price = {
              productprice: Number(wishlist_pro[index].offerprice) * 1,
              cartlength: 0,
              type: 'decrement'
          }
          dispatch(updatemaincart(price))

          var data = {
              token: token,
              productid: wishlist_pro[index].id,
              type: "decrement",
              process: "updatecart",
              varientid: wishlist_pro[index].varientid,
          }
          dispatch(Addtocart(data))
      }
  }

}


const viewdetail = (e) => {
  var data = JSON.stringify(e)
  localStorage.setItem("cart_product", data)
  window.location = "/viewproduct/" + e.id


}





  return (

    <>

      <Header />

      <div className='allbody'>


        <div>


          <Container>

            <Row>

              <Col md={4}>

                <Sidebars />

              </Col>

              <Col md={8}>

                {/* <div className='myorder'>
                  <div>
                    <h4>
                      Wishlist Products
                    </h4>
                  </div>
                  {loading ?
                    <div className='loaderss'>
                      <Circles style={{ justifyContent: "center" }} color="#0c3270" height={100} width={100} />
                    </div> :
                    <div>
                      {!wishlist.length ?
                        <div className='firstsearch'>
                          <img style={{ height: "450px" }} src={require('../../assets/product-not-found.jpg')} class="img-fluid" alt="" />
                        </div> :
                        <table class="table table-bordered">
                          <thead>
                            <tr>

                              <th scope="col">Product Id</th>
                              <th scope="col">Product</th>
                              <th scope="col">Action</th>
                              <th scope="col">Price</th>

                            </tr>
                            {wishlist.map((e, i) =>
                              <tr>
                                <td class="product-name">{e.id}</td>
                                <td class="product-name">{e.item.name}  </td>
                                <td>
                                  <a><button class="viewbtn margin20 matp" onClick={() => viewproduct(e.item.id)}>View Product</button></a>
                                  <a><button type="button" class="viewwishbtn margin20 matp" style={{ background: "red" }} data-toggle="modal" data-target="#exampleModalCenter90">Cancel</button></a>

                                  <div class="modal fade" id="exampleModalCenter90" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                      <div class="modal-content">
                                        <div class="modal-header">
                                          <h5 class="modal-title" id="exampleModalLongTitle">Are you sure? </h5>
                                          <button type="button" style={{ border: "1px", background: "white" }} class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true" style={{ fontSize: "30px" }}>&times;</span>
                                          </button>
                                        </div>
                                        <div class="modal-body">
                                          Do you really want to remove the wishlist?
                                        </div>
                                        <div class="modal-footer myorder" style={{ padding: "10px" }}>
                                          <button type="button" class="tabbtn" onClick={() => removewishlist(i)} data-dismiss="modal">Yes</button>
                                          <button type="button" style={{ border: "1px", background: "white" }} class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true" className='sideno' style={{ fontSize: "15px" }}>NO</span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                </td>
                                {e.item.item_variant[0].offer_price ?
                                  <td class="product-price"><span class="amount">$ {e.item.item_variant[0].offer_price}</span></td> :
                                  <td class="product-price"><span class="amount">$ {e.item.item_variant[0].price}</span></td>
                                }
                              </tr>
                            )}

                          </thead>
                          <tbody>
                            <tr>


                            </tr>


                          </tbody>
                        </table>
                      }
                    </div>
                  }



                </div> */}



<Row>

{wishlist_pro.map((e, i) =>
   
    <div className='col-md-3 cardsection'>
    <div class="card" style={{height:"360px"}} >

    <div className='cardiconflex'>

<div>
        <div>
            <label className='off-card'>{e.discount} % off</label>
        </div>

</div>

<div>
   
        <div onClick={() => toshow(i)} style={{ color: "red", cursor:"pointer" }} className='hearticons'><i class="fa fa-heart"></i></div> 
</div>
</div>

<div onClick={() => viewdetail(e)} style={{ cursor:"pointer", textAlign: "center"}}>
                                        
                                        <img class="card-img-top category-img" src={URL=`${IMAGE_URL}`+e.image} alt="Card image cap" />

                                        <div class="card-body" style={{ textAlign: "center" }}>
                                            <h5 class="card-title">{e.name}</h5>
                                            
                                            <span><span class="card-text">$ {e.offerprice}</span> <span class="card-text1">$ {e.price}</span> </span>                                     
                                        </div>

                                        </div>
                                                {!e.check ?
                                                <>
                                                <div class="padd10px" style={{ textAlign: "center" }}>
                                                    <button onClick={() => Addtocartfn(i)} data-toggle="tooltip" title="Add to cart" data-button-action="add-to-cart"
                                                        class="insp-cart-button">
                                                        {/* <i class="fa fa-shopping-cart" aria-hidden="true"></i> */}
                                                         ADD
                                                    </button>
                                                </div>
                                                </>:
                                                 <>
                                                   <div class="padd10px" style={{ textAlign: "center" }}>
                                                    <button class="cartbtn1st" onClick={() => updatecart("decrement", i)}>-</button>

                                                    <span class="cartbtn2rd addcount" style={{ padding: "0px 8px" }}>{e.qty}</span>
                                                    <button class="cartbtn3rd" onClick={() => updatecart("increment", i)}>+</button>
                                                </div>
                                                </>}
                                            

                                    </div>
    </div>
   ) }
</Row>




                

              </Col>


            </Row>
          </Container>



        </div>

      </div>

    </>
  );

}