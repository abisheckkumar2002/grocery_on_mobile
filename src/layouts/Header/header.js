import React, { Component, useState, useEffect } from 'react';
import './header.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BsCart } from 'react-icons/bs';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
// import options from './data';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { homedatas, wishlist } from '../../Api/homedata';

import { getcartproducts } from '../../Api/cartproducts';
import { searchdatas } from '../../Api/searchproduct';
import { searchingdatas } from '../../Api/searching';

import { Addtocart, addtocart123, cartSelector, deletecart, deletecartproducts, fetchcart, Removecart, updatecartproducts } from '../../Slices/fetchcart';
import { useDispatch, useSelector } from 'react-redux';
import { addtocart, removecart } from '../../Api/addtocart';
import { homeproductsSelector, updatewithcart } from '../../Slices/homeproducts';
import { IMAGE_URL } from '../../Constant';
import { update_cproducts_withcart } from '../../Slices/categoriesfilter';
import { confirm } from "react-confirm-box";

import { MdOutlineDelete } from 'react-icons/md';
import { update_sproductswithcart } from '../../Slices/similarpro';
import {fetchhomeproducts} from '../../Slices/homeproducts'
import { update_wishlist_withcart } from '../../Slices/wishlist';
export default function Header(props) {

    const dispatch =useDispatch()
  
    const { cartproducts, total, cartlength } = useSelector(cartSelector)
    const { categories } = useSelector(homeproductsSelector)
    

    // useEffect (() => {
    //     const token = localStorage.getItem("user_token");
    //     if(token)
    //     {
    //         dispatch(fetchcart(token,'initial'))
    //     }
    //   },[])

    // useEffect (() => {
        
    //     dispatch(fetchhomeproducts())
    
    //   },[])

    useEffect(() => {

        getdata()

        // getcsrf()
    }, []);


    const [selected, setSelected] = useState([]);

    const [options, setoptions] = useState([]);
    const history = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("user_token");
        console.log("harrrrrrrrrrrrrr", token)
        settokens(token)



    }, []);



    let [tokens, settokens] = useState("");




    const Search = async (e) => {

        console.log("eeeeeee", e)
        settypeletter(e)

        const searchlist = await searchdatas(e)
        setoptions(searchlist.products)
        console.log("searchlist", searchlist.products)


    }


    const [typeletter, settypeletter] = useState("")

    const [normalsearch, setnormalsearch] = useState([])



    const searchproducts = async (e) => {
        console.log(e, "typeletter")

        const searching = await searchingdatas(e)
        setnormalsearch(searching.products.data)
        console.log(searching.products.data, "searching.products.data")
    }


    let [count, setCount] = useState(0);
    // let [cart, setCart] = useState(false);

    let [dataslider, setdataslider] = useState([])

    const getdata = async () => {
        const hari = await homedatas()

        console.log("bbbbb", hari.data123)
        console.log("freefire", hari.freefire)
        setdataslider(hari.data123)

    }



    let [DATA, setDATA] = useState([]);



    const logout = async () => {

        const test = await confirm("Are you sure do you want to logout?");
        settokens("")
        if (test) {
            localStorage.removeItem("user_token");

            swal({
                title: "Logout Successfully",
                icon: "warning",
                dangerMode: true,
                timer: 2000
            }).then(function() {
                    window.location = "/";
                });
            // swal("Logout Successfully.").then(function() {
            //     window.location = "/";
            // });
        }
        // window.location = '/'
    }


    const login = () => {
        window.location = "/login"
        settokens("")

    }


    const productdetailss = (id) => {
        //  alert(id)
        window.location = "/viewproduct/" + id
    }


    const updatecart = async (value, index) => {
        const token = localStorage.getItem("user_token");

        if (value == 'decrement') {
            //Decrease cart products quantity
            var send = {
                value: index,
                key: "decrement"
            }
            dispatch(updatecartproducts(send))

            //Decrease home products quantity
            var update = {
                cartdata: cartproducts,
                position: index,
                value: 'decrement'
            }
            dispatch(updatewithcart(update))

            //Decrease category products quantity
            var update = {
                cartdata: cartproducts,
                position: index,
                value: 'decrement'
            }
            dispatch(update_cproducts_withcart(update))

            
            //Decrease category products quantity
            var update = {
                cartdata: cartproducts,
                position: index,
                value: 'decrement'
            }
            dispatch(update_sproductswithcart(update))

             //Decrease wishlist products quantity
             var update = {
                cartdata: cartproducts,
                position: index,
                value: 'decrement'
            }

            dispatch(update_wishlist_withcart(update))

            //Decrease cart products quantity with api call
            var data = {
                token: token,
                productid: cartproducts[index].product_id,
                type: "decrement",
                process: "updatecart",
                varientid: cartproducts[index].product_variant_id
            }
            dispatch(Addtocart(data))

        }
        else {
            //Increase cart products quantity
            var send = {
                value: index,
                key: "increment"
            }
            dispatch(updatecartproducts(send))

            //Increase home products quantity
            var update = {
                cartdata: cartproducts,
                position: index,
                value: 'increment',

            }

            dispatch(updatewithcart(update))

            //Increase home products quantity
            var update = {
                cartdata: cartproducts,
                position: index,
                value: 'increment'
            }

            dispatch(update_cproducts_withcart(update))

            var update = {
                cartdata: cartproducts,
                position: index,
                value: 'increment'
            }
            dispatch(update_sproductswithcart(update))



            
            //Increase wishlist products quantity
            var update = {
                cartdata: cartproducts,
                position: index,
                value: 'increment'
            }

            dispatch(update_wishlist_withcart(update))

            //Increase cart products quantity with api call
            var data = {
                token: token,
                productid: cartproducts[index].product_id,
                type: "increment",
                process: "updatecart",
                varientid: cartproducts[index].product_variant_id
            }
            console.log("increment_cart", cartproducts)
            dispatch(Addtocart(data))

        }

    }


    const cartproductsfn = () => {
        const token = localStorage.getItem("user_token");
        dispatch(fetchcart(token))
    }


    const homesection = () => {
        window.location = "/"
    }

    const shoplist = () => {
        window.location = "/shop/" + categories[0].id
    }

    const searchlist = () => {
        window.location = "/search1"
    }

    const orderhistory = () => {
        window.location = "/orderhistory"
    }

    const buyagainzz = () => {
        window.location = "/buyagain"
    }
    const accountdetailzz = () => {
        window.location = "/accountdetails"
    }
    const addresslistzz = () => {
        window.location = "/addresslist"
    }
    const wishlistzz = () => {
        window.location = "/wishlist"
    }
    const changepasswordzz = () => {
        window.location = "/changepassword"
    }
    const contactus = () => {
        window.location = "/contactus"
    }

    const deleteproducts = (index) => {

        swal({
            title: "Removed",
            icon: "warning",
            dangerMode: true,
            timer: 2000
        })

        dispatch(deletecart(index))
        const token = localStorage.getItem("user_token");


        //Decrease home products quantity
        var update = {
            cartdata: cartproducts,
            position: index,
            value: 'delete'
        }
        dispatch(updatewithcart(update))

        //Decrease shop products quantity
        var update = {
            cartdata: cartproducts,
            position: index,
            value: 'delete',

        }

        dispatch(update_cproducts_withcart(update))

          //Decrease shop products quantity
          var update = {
            cartdata: cartproducts,
            position: index,
            value: 'delete',

        }

        dispatch(update_sproductswithcart(update))

        //Decrease apicall products quantity
        var data = {
            token: token,
            id: cartproducts[index].cart_id
        }

        dispatch(deletecartproducts(data))

    }

    return (
        <>

            <div className='heading-Nav'>

                <div class="header-bottom header-bottom-other header-sticky cardsection">

                    <div class="container">
                        <div>
                            <div class="row">
                                <div class="col-md-2">
                                    <div class="logo">
                                        <Link onClick={() => homesection()}>
                                            <img src={require('../../assets/logo.png')} class="img-fluid" alt="" />
                                        </Link>
                                    </div>
                                </div>

                                <div class="col-md-5">
                                    {/* <div class="header-advance-search" style={{ marginTop: "10px" }}>
                                    <form action="#">
                                        <input type="text" name="s" id="s" placeholder="Search your product" class="ui-autocomplete-input"
                                            autocomplete="off" />
                                        <button type="submit"><span class="icon_search"><i class="fa fa-search" aria-hidden="true"></i></span></button>
                                    </form>
                                </div> */}

                                    <form>
                                        <div onClick={() => searchlist()}>
                                            <div className='searchdiv'>
                                                <AsyncTypeahead
                                                    id="basic-example"
                                                    onSearch={Search}
                                                    onChange={setSelected}
                                                    options={options}
                                                    placeholder="Search product here..."
                                                    selected={selected}
                                                // onInputChange={input =>searchhing(input)}
                                                />
                                                <button type="button" onClick={() => searchproducts(typeletter)} className='search_btn'><span class="icon_search"><i class="fa fa-search" aria-hidden="true"></i></span></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div class="col-md-2 col-6">
                                    <div class="header-contact d-flex" style={{ marginTop: "10px" }}>
                                        <div class="phone-icon">
                                            <img src={require('../../assets/icon-call.png')} class="img-fluid" alt="" />
                                        </div>
                                        <div class="phone-number">
                                            Call Us <span class="number">866-868-8365</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-3 col-6">

                                    {/* <a onClick={() => cartproductsfn()} class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                                    <BsCart className='mycarticon' />
                                    <span> My Cart </span>
                                    <span>{cartlength} item
                                        ${parseFloat(total).toFixed(2)}</span>
                                </a> */}

                                    {props.dataparenttochild != "cartminus" ?
                                        <>
                                        <div className='textend'>
                                            <a onClick={() => cartproductsfn()} class="btn mycartbtn" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                                                <BsCart className='mycarticon' />

                                                {!cartlength>0 ?
                                                <span> My Cart  </span>:
                                                <span> {cartlength} item(s)
                                                    $ {parseFloat(total).toFixed(2)}</span>}
                                            </a>
                                            </div>
                                        </> : null}

                                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                                        <div class="offcanvas-header">
                                            <h5 class="offcanvas-title" id="offcanvasExampleLabel">My Cart</h5>
                                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>


                                        {!cartproducts.length ?
                                            <div className='firstsearch'>
                                                <img style={{ height: "450px" }} src={require('../../assets/product-not-found.jpg')} class="img-fluid" alt="" />
                                                {/* <h1>Searching...</h1> */}
                                            </div> :

                                            <div class="offcanvas-body">
                                                   <div className='offbodyy'> 
                                                {cartproducts.map((e, i) =>
                                             
                                            <div className='cartborder'>
                                                    <div class="row" style={{ marginTop:"10px" }}>
                                                        <div class="col-md-3 col-lg-3 col-3">
                                                            <img class="card-img-top borderimg" style={{ width: "100%" }} src={URL = `${IMAGE_URL}` + e.items.image} alt="Card image cap" />
                                                        </div>
                                                        <div class="col-md-9 col-lg-9 col-9">
                                                        <div class="row">
                                                        <div class="col-md-10 col-lg-10 col-10">
                                                        <p style={{ marginBottom:"0px" }} data-id_customization="0">{e.items.name}</p>
                                                        </div>
                                                        <div class="col-md-2 col-lg-2 col-2">
                                                        <div style={{ textAlign:"center" }}>
                                                            <MdOutlineDelete style={{ cursor:"pointer" }} onClick={() => deleteproducts(i)} className='mdoutline' />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-lg-12 col-12">
                                                        <div class="row">
                                                        <div class="col-md-5 col-lg-5 col-4">
                                                        <div><span style={{ fontSize:"13px" }}>({e.item_variant.variant_value})</span></div>
                                                        <div class='cartprices'><span  style={{ fontWeight:"800" }}> $ {parseFloat(e.price).toFixed(2)}</span></div>
                                                        </div>
                                                        <div class="col-md-7 col-lg-7 col-8">
                                                            <div class="padd10px cartprices1" style={{ textAlign: "end" }}>
                                                                <button class="cartbtn1st" onClick={() => updatecart("decrement", i)}>-</button>

                                                                <span class="cartbtn2rd" style={{ padding: "0px 6px" }}>{e.quantity}</span>
                                                                <button class="cartbtn3rd" onClick={() => updatecart("increment", i)}>+</button>
                                                            </div>
                                                            </div>
    
                                                            </div>
                                                        </div>
                                                        </div>
                                                        </div>     

                                                        {/* <div class="col-lg-4 col-4">

                                                            <a class=""
                                                                href="#"
                                                                data-id_customization="0">{e.items.name}</a>
                                                     <div>

                               <span>({e.item_variant.variant_value})</span>
                                        </div>
                                                            <div>

                                                                <span> $ {parseFloat(e.price).toFixed(2)}</span>
                                                            </div>
                                                       </div> */}




                                                        {/* <div  class="col-lg-5 col-5">
                                                            <div style={{ textAlign:"center" }}>
                                                            <MdOutlineDelete style={{ cursor:"pointer" }} onClick={() => deleteproducts(i)} className='mdoutline' />
                                                            </div>

                                                            <div class="padd10px" style={{ textAlign: "left" }}>
                                                                <button class="cartbtn1st" onClick={() => updatecart("decrement", i)}>-</button>

                                                                <span class="cartbtn2rd" style={{ padding: "0px 6px" }}>{e.quantity}</span>
                                                                <button class="cartbtn3rd" onClick={() => updatecart("increment", i)}>+</button>
                                                            </div>
                                                        </div> */}

                                                    </div>
                                                    </div>

                                                  
                                                    
                                                )}
  </div>
                                                <div>
                                                    <Button className='pay_btn cartlisted' variant='success' onClick={() => window.location = "/cart"} >     <span>{cartlength} item(s)
                                                        $ {parseFloat(total).toFixed(2)}</span> Proceed to View Cart <MdKeyboardArrowRight className='arrowicon'/></Button>
                                                </div>


                                            </div>
                                        }


                                    </div>


                                </div>



                            </div>
                        </div>
                    </div>

                </div>

                <div class="header2">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <div class="container">

                            <ul class="ddop">
                                <li class="navitemnav dropdown">
                                    <a class="navitemnav dropdown-toggle ff menu-container" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        SHOP BY CATEGORY <i class="fa fa-angle-down mtlf5px" aria-hidden="true"></i>
                                    </a>

                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <div class="sidebar-area">

                                            <div class="sidebar mb-35">

                                                <ul class="product-categories filess">
                                                    <li><Link class="" to="#">Chocloate</Link></li>
                                                    <li><Link class="" to="#">Vegetables</Link></li>
                                                    <li><Link class="" to="#">Grocery</Link></li>
                                                </ul>
                                            </div>


                                        </div>
                                    </div>


                                </li>
                            </ul>

                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <Link class="nav-link" onClick={() => homesection()}>Home </Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" onClick={() => shoplist()}>Shop</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" onClick={() => contactus()}>Contact</Link>
                                    </li>
                                    {/* <li class="nav-item">
                <a class="nav-link" href="../pages/myorder.html     ">My Order</a>
            </li> */}
                                    {tokens ?
                                        // <li class="nav-item">
                                        //     <button type='button' class="nav-link" onClick={()=>logout()} >Logout</button>
                                        // </li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link btn btn-secondary dropdown-toggle myorderzz" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                My Profile<i class="fa fa-angle-down mtlf5px" aria-hidden="true"></i>
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <Link class="dropdown-item" onClick={() => orderhistory()}>Orders history</Link>
                                                {/* <Link class="dropdown-item" to="/storecard">Store Card </Link> */}
                                                <Link class="dropdown-item" onClick={() => buyagainzz()}> Buy Again</Link>
                                                <Link class="dropdown-item" onClick={() => addresslistzz()}> Address List</Link>
                                                <Link class="dropdown-item" onClick={() => wishlistzz()}>Wishlist</Link>
                                                {/* <Link class="dropdown-item" onClick={() => window.location="/wishlist"}> Wish List</Link> */}
                                                <Link class="dropdown-item" onClick={() => accountdetailzz()}> Account details </Link>
                                                <Link class="dropdown-item" onClick={() => changepasswordzz()}>  Change Password</Link>
                                                <Link class="dropdown-item" onClick={() => logout()}>  Logout</Link>
                                            </div>
                                        </li>
                                        :
                                        <li class="nav-item">
                                            <button type='button' style={{ background: "#0c3270", borderColor: "#0c3270", borderRight:"1px solid #0c3270", borderLeft:"1px solid #0c3270" }} class="nav-link" onClick={() => login()} >Login</button>

                                        </li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>



            </div>




        </>

    );

}





