import React, { Component, useState, useEffect } from 'react';
import './search.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BsCart } from 'react-icons/bs';

import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
// import options from './data';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { homedatas } from '../../Api/homedata';

import { getcartproducts } from '../../Api/cartproducts';
import { searchdatas } from '../../Api/searchproduct';
import { searchingdatas } from '../../Api/searching';

import { Addtocart, addtocart123, cartSelector, fetchcart, Removecart, updatecartproducts } from '../../Slices/fetchcart';
import { useDispatch, useSelector } from 'react-redux';
import { addtocart, removecart } from '../../Api/addtocart';
import { homeproductsSelector, updatewithcart } from '../../Slices/homeproducts';
import { IMAGE_URL } from '../../Constant';
import { update_cproducts_withcart } from '../../Slices/categoriesfilter';



export default function Header(props) {

    const dispatch = useDispatch()
    const { cartproducts, total, cartlength } = useSelector(cartSelector)


    const nextimg = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,

        responsive: [
            {
                breakpoint: 996,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },

            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },



        ],
    };



    useEffect(() => {

        getdata()

        // getcsrf()
    }, []);


    const [selected, setSelected] = useState([]);
    console.log(selected, "frrrtrttttttttttt")
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

    function incrementCount(index) {

        const hari = [...DATA]
        console.log("dhariaaaaa", hari)

        if (hari[index].qty) {

            hari[index].qty = (hari[index].qty + 1)


        }


        setDATA(hari)


    }
    function decrementCount(index) {

        const hari = [...DATA]
        if (hari[index].qty > 1) {

            hari[index].qty = (hari[index].qty - 1)


        }

        else {
            const hari = [...DATA]
            console.log("dhariaaaaa", hari)

            hari[index].cart = false
            setDATA(hari)
            console.log("daaaaa", DATA)
        }
        setDATA(hari)
    }




    function addtocart1(index) {

        const hari = [...dataslider]
        console.log("dhariaaaaa", hari)

        hari[index].cart = true
        hari[index].qty = 1
        setdataslider(hari)
        console.log("daaaaa", dataslider)

    }


    function incrementCount1(index) {

        const hari = [...dataslider]
        console.log("dhariaaaaa", hari)

        if (hari[index].qty) {

            hari[index].qty = (hari[index].qty + 1)


        }


        setdataslider(hari)


    }
    function decrementCount1(index) {

        const hari = [...dataslider]
        if (hari[index].qty > 1) {

            hari[index].qty = (hari[index].qty - 1)


        }

        else {
            const hari = [...dataslider]
            console.log("dhariaaaaa", hari)

            hari[index].cart = false
            setdataslider(hari)
            console.log("daaaaa", dataslider)
        }
        setdataslider(hari)
    }

    const logout = () => {
        settokens("")
        localStorage.removeItem("user_token");

        history("/")
        swal({
            title: "Logout Successfully",
            icon: "warning",
            dangerMode: true,
            timer: 2000
        })
    }


    const login = () => {
        history("/login")
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


    const shoplist = () => {
        window.location = "/shop/" + categories[0].id
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
                                        <Link to="/">
                                            <img src={require('../../assets/logo.png')} class="img-fluid" alt="" />
                                        </Link>
                                    </div>
                                </div>

                                <div class="col-md-7">
                                    {/* <div class="header-advance-search" style={{ marginTop: "10px" }}>
                                    <form action="#">
                                        <input type="text" name="s" id="s" placeholder="Search your product" class="ui-autocomplete-input"
                                            autocomplete="off" />
                                        <button type="submit"><span class="icon_search"><i class="fa fa-search" aria-hidden="true"></i></span></button>
                                    </form>
                                </div> */}

                                    <form>
                                        {/* <div className='searchdiv'>
                                        <AsyncTypeahead
                                            id="basic-example"
                                            onSearch={Search}
                                            onChange={setSelected}
                                            options={options}
                                            placeholder="search product here..."
                                            selected={selected}
                                            // onInputChange={input =>searchhing(input)}
                                        />
                                        <button type="button" onClick={() => searchproducts(typeletter)} className='search_btn'><span class="icon_search"><i class="fa fa-search" aria-hidden="true"></i></span></button>
                                    </div> */}

                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="search product here..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                                            <button class="btn btn-primary" type="button" id="button-addon2" style={{ marginTop: "20px", top: "-10px" }}><i class="fa fa-search" aria-hidden="true"></i></button>
                                        </div>
                                    </form>
                                </div>



                                <div class="col-md-3 col-6" style={{ textAlign: "center" }}>

                                    <a onClick={() => cartproductsfn()} class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                                        <BsCart className='mycarticon' />
                                        <span> My Cart </span>
                                        <span>{cartlength} item
                                            ${parseFloat(total).toFixed(2)}</span>
                                    </a>

                                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                                        <div class="offcanvas-header">
                                            <h5 class="offcanvas-title" id="offcanvasExampleLabel">My Cart</h5>
                                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div class="offcanvas-body">
                                            {cartproducts.map((e, i) =>
                                                <div class="row">
                                                    <div class="col-lg-3 col-3">
                                                        <img class="card-img-top" style={{ width: "100%" }} src={URL = `${IMAGE_URL}` + e.items.image} alt="Card image cap" />
                                                    </div>
                                                    <div class="col-lg-9 col-9">

                                                        <a class=""
                                                            href="#"
                                                            data-id_customization="0">{e.items.name}</a>

                                                        <div>

                                                            <span> $ {parseFloat(e.price).toFixed(2)}</span>
                                                        </div>

                                                        <div>

                                                            <span>({e.item_variant.variant_value})</span>
                                                        </div>
                                                        {/* 
                                                    {e.cart == false ?
                                                        <div class="padd10px" style={{ textAlign: "left" }}>
                                                            <button onClick={() => addtocart(i)} data-toggle="tooltip" title="Add to cart" data-button-action="add-to-cart"
                                                                class="insp-cart-button">
                                                                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                                Add
                                                            </button>
                                                        </div>
                                                        : */}
                                                        <div class="padd10px" style={{ textAlign: "left" }}>
                                                            <button class="cartbtn1st" onClick={() => updatecart("decrement", i)}>-</button>

                                                            <span class="cartbtn2rd" style={{ padding: "0px 6px" }}>{e.quantity}</span>
                                                            <button class="cartbtn3rd" onClick={() => updatecart("increment", i)}>+</button>
                                                        </div>
                                                        {/* } */}


                                                    </div>

                                                </div>
                                            )}





                                            <div>
                                                <Button className='pay_btn' variant='success' onClick={() => window.location = "/cart"} >     <span>{cartlength} item
                                                    ${parseFloat(total).toFixed(2)}</span> Proceed to Checkout</Button>
                                            </div>


                                        </div>
                                    </div>


                                </div>



                            </div>
                        </div>
                    </div>

                </div>

                <div class="header2" style={{ display: "none" }}>
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <div class="container">

                            <ul class="ddop">
                                <li class="navitemnav dropdown">
                                    <a class="navitemnav dropdown-toggle ff menu-container" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        SHOP BY CATEGORY <i class="fa fa-angle-down mtlf5px" aria-hidden="true"></i>
                                    </a>

                                    <div class="dropdown-menu" style={{ display: "none" }} aria-labelledby="navbarDropdown">
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
                                        <Link class="nav-link" to="/">Home </Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" onClick={() => shoplist()}>Shop</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/contactus" onClick={() => contactus()}>Contact</Link>
                                    </li>
                                    {/* <li class="nav-item">
                <a class="nav-link" href="../pages/myorder.html     ">My Order</a>
            </li> */}
                                    {tokens ?
                                        // <li class="nav-item">
                                        //     <button type='button' class="nav-link" onClick={()=>logout()} >Logout</button>
                                        // </li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link btn btn-secondary dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                My Order<i class="fa fa-angle-down mtlf5px" aria-hidden="true"></i>
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <Link class="dropdown-item" to="/orderhistory">Orders history</Link>
                                                {/* <Link class="dropdown-item" to="/storecard">Store Card </Link> */}
                                                <Link class="dropdown-item" to="/buyagain"> Buy Again</Link>
                                                <Link class="dropdown-item" to="/addresslist"> Address List</Link>
                                                <Link class="dropdown-item" to="/accountdetails"> Account details </Link>
                                                <Link class="dropdown-item" to="/changepassword">  Change Password</Link>
                                                <Link class="dropdown-item" onClick={() => logout()}>  Logout</Link>
                                            </div>
                                        </li>
                                        :
                                        <li class="nav-item">
                                            <button type='button' style={{ background: "#0c3270", borderColor: "#0c3270" }} class="nav-link" onClick={() => login()} >Login</button>

                                        </li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>






                <div className='cardsection searched'>

                    <div className='container'>
                        <div className='row'>

                            <div className='col-md-3'>
                                <div>
                                    <div class="card" style={{ height: "340px" }}>
                                        <a href="#"><img class="card-img-top" src={require('../../assets/aboutus.png')} alt="Card image cap" /></a>
                                        <span class="sale">sale</span>
                                        <div class="card-body" style={{ textAlign: "center" }}>
                                            <h5 class="card-title">gftrytry</h5>
                                            <span><span class="card-text">$ 758</span> <span class="card-text1">$ 787</span> </span>

                                            {/* {e.check == false ?
                                                                            <div class="padd10px">
                                                                                <button onClick={() => addtocart1(i)} data-toggle="tooltip" title="Add to cart" data-button-action="add-to-cart"
                                                                                    class="insp-cart-button">
                                                                                    Add
                                                                                </button>
                                                                            </div>
                                                                            :
                                                                            <div class="padd10px">
                                                                                <button class="cartbtn1st" onClick={() => decrementCount1(i)}>-</button>

                                                                                <span class="cartbtn2rd" style={{ padding: "0px 6px" }}>{e.qty}</span>
                                                                                <button class="cartbtn3rd" onClick={() => incrementCount1(i)}>+</button>
                                                                            </div>
                                                                        } */}


                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className='col-md-3'>
                                <div>
                                    <div class="card" style={{ height: "340px" }}>
                                        <a href="#"><img class="card-img-top" src={require('../../assets/aboutus.png')} alt="Card image cap" /></a>
                                        <span class="sale">sale</span>
                                        <div class="card-body" style={{ textAlign: "center" }}>
                                            <h5 class="card-title">gftrytry</h5>
                                            <span><span class="card-text">$ 758</span> <span class="card-text1">$ 787</span> </span>

                                            {/* {!detail.check ?
                                                    <div class="padd10px" style={{ textAlign: "left" }}>
                                                        <button onClick={() => addtocart()} data-toggle="tooltip" title="Add to cart" data-button-action="add-to-cart"
                                                            class="insp-cart-button" style={{ height: "45px", border: "2px solid #0b316e" }}>
                                                          
                                                            <i class="fa fa-shopping-cart ibtn" aria-hidden="true"> </i>  Add to Cart
                                                        </button>
                                                    </div>
                                                    :
                                                    <div class="padd10px" style={{ textAlign: "left" }}>
                                                        <button class="cartbtn1st" onClick={() => updatecart('decrement',varientindex)}>-</button>

                                                        <span class="cartbtn2rd" style={{ padding: "0px 6px" }}>{detail.quantity}</span>
                                                        <button class="cartbtn3rd" onClick={() => updatecart('increment',varientindex)}>+</button>
                                                    </div>} */}


                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>



                    </div>


                </div>








            </div>




        </>

    );

}





