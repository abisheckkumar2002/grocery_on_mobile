import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './viewcart.css'




import  Header  from '../../layouts/Header/header';




export default function Viewcart() { 

    let [count, setCount] = useState(0);

    function incrementCount() {
        count = count + 1;
        setCount(count);
      }
      function decrementCount() {
        count = count - 1;
        setCount(count);
      }

    useEffect(() => {
        
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);






    return (
        <>
        
        <Header/>
        
        {/* <!-- Cartsection --> */}
<section class="cartsection shopsection1 cardsection">
    <div class="container">
      <div class="row">
         <div class="col-lg-8">
            <div class="card">
                <div>
                    <h4>
                        Shopping Cart
                    </h4>
                </div>
                <div class="col-lg-12 padding20">
                    <div class="comtainer">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-4">
                            <img  src={require('../../assets/Screenshot_1.png')} />

                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-3 col-xs-4">
                            <h6>
                                Hummingbird Printed T-Shirt
                            </h6>
                            <div class="">
                            <span class="spanline">$23.90</span>
                            <span class="marl10"> -20%</span>
                        </div>
                            <b>$19.12</b>
                            

                        </div>
                        <div class="col-lg-5 col-md-5 col-sm-6 col-xs-4">
                            <div class="padd10px">
                            <button class="cartbtn1st" onClick={decrementCount}>-</button>
                       
                       <span class="cartbtn2rd" style={{ padding:"0px 6px" }}>{count}</span>
                       <button class="cartbtn3rd" onClick={incrementCount}>+</button>       
                                <button class="delbtn">Delete</button>
                                
                            </div>
                        </div>
                        
                        
                        
                    </div>
                    <hr></hr>
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-4">
                            <img  src={require('../../assets/Screenshot_1.png')} />

                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-3 col-xs-4">
                            <h6>
                                Hummingbird Printed T-Shirt
                            </h6>
                            <div class="">
                            <span class="spanline">$23.90</span>
                            <span class="marl10"> -20%</span>
                        </div>
                            <b>$19.12</b>
                            

                        </div>
                        <div class="col-lg-5 col-md-5 col-sm-6 col-xs-4">
                            <div class="padd10px">
                            <button class="cartbtn1st" onClick={decrementCount}>-</button>
                       
                       <span class="cartbtn2rd" style={{ padding:"0px 6px" }}>{count}</span>
                       <button class="cartbtn3rd" onClick={incrementCount}>+</button>
                                <button class="delbtn">Delete</button>
                                
                            </div>
                        </div>
                        
                        
                        
                    </div>
                    <hr></hr>
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-4">
                            <img  src={require('../../assets/Screenshot_1.png')} />

                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-3 col-xs-4">
                            <h6>
                                Hummingbird Printed T-Shirt
                            </h6>
                            <div class="">
                            <span class="spanline">$23.90</span>
                            <span class="marl10"> -20%</span>
                        </div>
                            <b>$19.12</b>
                            

                        </div>
                        <div class="col-lg-5 col-md-5 col-sm-6 col-xs-4">
                            <div class="padd10px">
                            <button class="cartbtn1st" onClick={decrementCount}>-</button>
                       
                       <span class="cartbtn2rd" style={{ padding:"0px 6px" }}>{count}</span>
                       <button class="cartbtn3rd" onClick={incrementCount}>+</button>
                                <button class="delbtn">Delete</button>
                                
                            </div>
                        </div>
                        
                        
                        
                    </div>
                    <hr></hr>
                </div>

                </div>
            </div>

            <div class="row">
                <div class="col-lg-4 col-md-3 col-sm-3 col-xs-3  margin20">
                    <a class=" contbtn"> Empty Cart </a>   <a style={{ marginLeft:"10px" }} class="contbtn">Update Cart </a>
        
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-3 margin20">
                    {/* <a class=" contbtn">Update Cart </a> */}
        
                </div>
                <div class="col-lg-4 col-md-5 col-sm-5 col-xs-6 margin20">
                    <a class=" contbtn" href="/shop"><i class="fa fa-arrow-left arrow" aria-hidden="true"></i> Continue Shopping </a>
        
                </div>
              </div>

         </div>

         <div class="col-lg-4">
            <div class="nextt card padding20">
                <div class="cart-summary-line" id="cart-subtotal-products">
                    <span class="label js-subtotal">
                                    3 items
                                </span>
                    <span class="value">
                      $57.36
                    </span>
                            </div>
                            <div class="cart-summary-line" id="cart-subtotal-products">
                                <span class="label js-subtotal">
                                    Shipping
                                            </span>
                                <span class="value">
                                    $7.00
                                </span>
                                        </div>

                                        <div class="borderbtom">

                                        </div>
                                        
                                        <div class="cart-summary-line1" id="cart-subtotal-products">
                                            <span class="label1 js-subtotal">
                                                            Total (Tax Incl.)
                                                        </span>
                                            <span class="value1">
                                              $60.36
                                            </span>
                                                    </div>   
                                                                        
                                                    <div class="text-sm-center">
                                                        <a href="/cart" class="btn btn-primary">Proceed to checkout</a>
                                                        
                                                      </div>
                                        
              
            </div>
            

         </div>
      </div>
      

    </div>
</section>
{/* <!-- Cartsection Ends --> */}
        
        
        </>
    );
}