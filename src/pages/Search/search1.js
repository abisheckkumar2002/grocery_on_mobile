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
import { homedatas, wishlist } from '../../Api/homedata';

import { getcartproducts } from '../../Api/cartproducts';
import { searchdatas } from '../../Api/searchproduct';
import { searchingdatas } from '../../Api/searching';

import { Addtocart, addtocart123, cartSelector, deletecart, deletecartproducts, fetchcart, Removecart, updatecartproducts, updatemaincart } from '../../Slices/fetchcart';
import { useDispatch, useSelector } from 'react-redux';
import { addtocart, removecart } from '../../Api/addtocart';
import { homeproductsSelector, updatewithcart } from '../../Slices/homeproducts';
import { IMAGE_URL } from '../../Constant';
import { update_cproducts_withcart } from '../../Slices/categoriesfilter';
import { fetchsearchproducts, fetchsearchsuggestion, getsearchproducts, getsearchsuggestions, searchSelector, updatesearchproducts, update_search_wish, update_sproducts_withcart } from '../../Slices/search';

import { MdOutlineDelete } from 'react-icons/md';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import swal from "sweetalert";


export default function Header(props) {


    const dispatch = useDispatch()
    const { cartproducts, total, cartlength } = useSelector(cartSelector)
    const { suggestionwords, search_products } = useSelector(searchSelector)
    // const { total } = useSelector(cartSelector)
    console.log("search_products", search_products)

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


    const [selected, setSelected] = useState('');
    console.log(selected, "frrrtrttttttttttt")
    const [options, setoptions] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("user_token");
        dispatch(fetchcart(token, 'initial'))

    }, [])


    useEffect(() => {
        const token = localStorage.getItem("user_token");
        console.log("harrrrrrrrrrrrrr", token)
        settokens(token)



    }, []);


    // useEffect(() => {
      
    //     dispatch(fetchsearchproducts(cartproducts, selected, 'selected'))
       
        
    // }, [selected]);


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

            //Decrease search products quantity     

            var update = {
                cartdata: cartproducts,
                position: index,
                value: 'decrement'
            }
            dispatch(update_sproducts_withcart(update))

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

            //Increase search products quantity
            var update = {
                cartdata: cartproducts,
                position: index,
                value: 'increment'
            }

            dispatch(update_sproducts_withcart(update))



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


    const searchfn = (value) => {
        const token = localStorage.getItem("user_token");
        console.log("value",value)
        if (value.length >= 3) {
            dispatch(fetchsearchsuggestion(value))
            dispatch(fetchsearchproducts(cartproducts, value, 'initial',token))
        }
        else {
            dispatch(getsearchsuggestions([]))
            dispatch(getsearchproducts([]))
        }
    }

    const selectfn = (value) => {
        const token = localStorage.getItem("user_token");
console.log("jkk",value)

        setSelected(value)
        dispatch(fetchsearchproducts(cartproducts, value, 'selected',token))
    }

    const Addtocartfn = async (index) => {
        const token = localStorage.getItem("user_token");
        if (token) {
            var send = {
                key: 'increment',
                index: index
            }
            dispatch(updatesearchproducts(send))

            var price = {
                productprice: Number(search_products[index].offerprice) * 1,
                cartlength: 1,
                type: 'increment',

            }
            dispatch(updatemaincart(price))


            var data = {
                token: token,
                productid: search_products[index].id,
                type: 'increment',
                process: "updatecart",
                varientid: search_products[index].varientid
            }
            dispatch(Addtocart(data))
        }
        else {
            swal("Please login to purchase a product.").then(function () {
                window.location = "/login";
            });
        }
    }

    const updatecart123 = (value, index) => {
        const token = localStorage.getItem("user_token");
        if (value == 'increment') {

            var send = {
                key: value,
                index: index
            }
            dispatch(updatesearchproducts(send))

            var price = {
                productprice: Number(search_products[index].offerprice) * 1,
                cartlength: 0,
                type: 'increment'
            }
            dispatch(updatemaincart(price))

            var data = {
                token: token,
                productid: search_products[index].id,
                type: "increment",
                process: "updatecart",
                varientid: search_products[index].varientid,
            }
            console.log("paypal", search_products[index])
            dispatch(Addtocart(data))
        }
        else {
            if (Number(search_products[index].qty == 1)) {
                var send = {
                    key: value,
                    index: index
                }
                dispatch(updatesearchproducts(send))

                var price = {
                    productprice: Number(search_products[index].offerprice) * 1,
                    cartlength: Number(-1),
                    type: 'decrement'
                }
                dispatch(updatemaincart(price))

                var data = {
                    token: token,
                    productid: search_products[index].id,
                    type: "decrement",
                    process: "updatecart",
                    varientid: search_products[index].varientid,
                }
                dispatch(Addtocart(data))
            }
            else {
                var send = {
                    key: value,
                    index: index
                }
                dispatch(updatesearchproducts(send))

                var price = {
                    productprice: Number(search_products[index].offerprice) * 1,
                    cartlength: 0,
                    type: 'decrement'
                }
                dispatch(updatemaincart(price))

                var data = {
                    token: token,
                    productid: search_products[index].id,
                    type: "decrement",
                    process: "updatecart",
                    varientid: search_products[index].varientid,
                }
                dispatch(Addtocart(data))
            }
        }

    }



    const viewdetails = (e) => {
        var data = JSON.stringify(e)
        localStorage.setItem("cart_product", data)
        window.location = "/viewproduct/" + e.id
    }

    const deleteproducts = (index) => {

        dispatch(deletecart(index))
        const token = localStorage.getItem("user_token");

        var update = {
            cartdata: cartproducts,
            position: index,
            value: 'delete'
        }
        dispatch(update_sproducts_withcart(update))

        var data = {
            token: token,
            id: cartproducts[index].cart_id
        }

        dispatch(deletecartproducts(data))



    }
    const inputchange = (value) => {
      console.log("VALUE",value)
    }

    const toshow = async (index) => {
        const token = localStorage.getItem("user_token");

        if(token){     
        dispatch(update_search_wish(index))

        var data = {
            id: search_products[index].id,
            token: token
        }
        if (!search_products[index].wishlist) {
            const output = await wishlist(data)
            if (output) {
                swal({
                    title: "Wishlist added successfully!",
                    icon: "success",
                    timer: 2000
                })
            }
        }
        else {
            const output = await wishlist(data)
            if (output) {
                swal({
                    title: "Wishlist removed successfully!",
                    icon: "warning",
                    timer: 2000
                })
            }
        }
    }
    else {
        swal("Please login to purchase a product.").then(function () {
            window.location = "/login";
        });
    }

    }


    return (
        <>



            <div class="header-bottom header-bottom-other header-sticky cardsection search-bottom">

                <div class="container">
                    <div>
                        <div class="row justifyend">
                            <div class="col-md-2">
                                <div class="logo">
                                    <div style={{ cursor:"pointer" }} onClick={() => window.location = '/'}>
                                        <img src={require('../../assets/logo.png')} class="img-fluid" alt="" />
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-7">


                                <form>
                                    <div className='searchdiv'>
                                        <AsyncTypeahead
                                            id="basic-example"
                                            // onSearch={(text) => searchfn(text)}
                                            onChange={(text) => selectfn(text)}
                                            onInputChange={(text) => searchfn(text)}
                                            options={suggestionwords}
                                            placeholder="Search product here..."
                                            selected={selected}
                                        // onChange={setSelected}
                                        />
                                        <button type="button" onClick={() => searchproducts(typeletter)} className='search_btn'><span class="icon_search"><i class="fa fa-search" aria-hidden="true"></i></span></button>
                                    </div>
                                    {/* <div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="search product here..." aria-label="Recipient's username" aria-describedby="button-addon2"/>
  <button class="btn btn-primary" type="button" id="button-addon2" style={{ marginTop:"20px", top:"-10px" }}><i class="fa fa-search" aria-hidden="true"></i></button>
</div> */}
                                </form>
                            </div>


                            <div class="col-md-3 col-6" style={{ textAlign: "center" }}>
<div>
                                <a onClick={() => cartproductsfn()} class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                                    <BsCart className='mycarticon' />
                                    {!cartlength>0 ?
                                                <span> My Cart  </span>:
                                                <span> {cartlength} item(s)
                                                    $ {parseFloat(total).toFixed(2)}</span>}
                                </a>
                                </div>
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
 {cartproducts.map((e, i) =>
                                            <div className='cartborder'>
                                                    <div class="row" style={{ marginTop:"10px" }}>
                                                        <div class="col-md-3 col-lg-3 col-3">
                                                            <img class="card-img-top borderimg" style={{ width: "100%" }} src={URL = `${IMAGE_URL}` + e.items.image} alt="Card image cap" />
                                                        </div>
                                                        <div class="col-md-9 col-lg-9 col-9">
                                                        <div class="row">
                                                        <div class="col-md-10 col-lg-10 col-10">
                                                        <p style={{ marginBottom:"0px", textAlign: "left" }} data-id_customization="0">{e.items.name}</p>
                                                        </div>
                                                        <div class="col-md-2 col-lg-2 col-2">
                                                        <div style={{ textAlign:"center" }}>
                                                            <MdOutlineDelete style={{ cursor:"pointer" }} onClick={() => deleteproducts(i)} className='mdoutline' />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-lg-12 col-12">
                                                        <div class="row">
                                                        <div class="col-md-5 col-lg-5 col-4" style={{ textAlign: "left" }}>
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






                                            <div>
                                                <Button className='pay_btn' variant='success' onClick={() => window.location = "/cart"} >     <span>{cartlength} item
                                                    ${parseFloat(total).toFixed(2)}</span> Proceed to View Cart</Button>
                                            </div>


                                        </div>

                                    }
                                </div>




                            </div>



                        </div>
                    </div>
                </div>

            </div>











            <section className='cardsection se'>

                <Container>
                <Button onClick={() => history(-1)} variant="primary"><BsFillArrowLeftCircleFill style={{ fontSize: "18px", marginTop: "-3px" }} /> Back</Button>
                    <div className='caro-pad'>

                        {/* <div>
                            <h2>
                                PRODUCTS
                            </h2>

                        </div> */}

                        {!search_products.length ?
                            <div className='firstsearch'>
                                <img style={{ height: "450px" }} src={require('../../assets/product-not-found.jpg')} class="img-fluid" alt="" />
                                {/* <h1>Searching...</h1> */}
                            </div> :

                            <Row>

                                <div className='product-search'>
                                    <h2>
                                        PRODUCTS
                                    </h2>

                                </div>

                                {search_products.map((e, i) =>
                                    <div className='col-md-3 col-6'>

                                        <div class="card" style={{ height: "350px", width:"100%" }} >
                                        <div className='cardiconflex'>

<div>
                                            {e.discount ?
                                                <div>
                                                    <label className='off-card'>{e.discount}% off</label>
                                                </div>
                                                : null}
                                                 </div>

<div>

  {e.wishlist ?
                                                                        <div onClick={() => toshow(i)} style={{ color: "red" }} className='hearticons'><i class="fa fa-heart"></i></div> :
                                                                        <div onClick={() => toshow(i)} style={{ color: "#0c3270" }} className='hearticons'><i class="fa fa-heart"></i></div>}
                                                                </div>
                                                            </div>

                                            <div onClick={() => viewdetails(e)} style={{ cursor: "pointer", textAlign: "center" }}>

                                                <img class="card-img-top category-img" src={URL = `${IMAGE_URL}` + e.image} alt="Card image cap" />

                                                <div class="card-body" style={{ textAlign: "center" }}     >
                                                    <h5 class="card-title">{e.name}</h5>
                                                    {e.offerprice ?
                                                        <span><span class="card-text">$ {e.offerprice}</span> <span class="card-text1">$ {e.price}</span> </span>
                                                        :
                                                        <span class="card-text">$ {e.price}</span>}

                                                </div>

                                            </div>

                                            {e.check == false ?
                                                <div class="padd10px" style={{ textAlign: "center" }}>
                                                    <button onClick={() => Addtocartfn(i)} data-toggle="tooltip" title="Add to cart" data-button-action="add-to-cart"
                                                        class="insp-cart-button">

                                                        ADD
                                                    </button>
                                                </div>
                                                :
                                                <div class="padd10px" style={{ textAlign: "center" }}>
                                                    <button class="cartbtn1st" onClick={() => updatecart123("decrement", i)}>-</button>

                                                    <span class="cartbtn2rd" style={{ padding: "0px 6px" }}>{e.qty}</span>
                                                    <button class="cartbtn3rd" onClick={() => updatecart123("increment", i)}>+</button>
                                                </div>
                                            }

                                        </div>


                                    </div>

                                )}

                            </Row>
                        }
                    </div>




                    {/* 
                    <div className='firstsearch'>
                         <img src={require('../../assets/search-icon-line-icon-icon-24.png')} class="img-fluid" alt="" />
                         <h1>Searching...</h1>
                    </div> */}


                </Container>



            </section>









        </>

    );

}





