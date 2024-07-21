import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './home.css'
import CountUp from 'react-countup';
import { homedatas, wishlist } from '../../Api/homedata';
import { addtocart } from '../../Api/addtocart';
import { Csrf } from '../../Api/csrf_cookies';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Addtocart, cartSelector, fetchcart, updatemaincart } from '../../Slices/fetchcart';
import { getcartproducts } from '../../Api/cartproducts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchhomeproducts, gethomeproducts, homeproductsSelector, updatehomeproducts, update_home_wish } from '../../Slices/homeproducts';
import { CATEGORY_IMAGE_URL, IMAGE_URL } from '../../Constant';

import Header from '../../layouts/Header/header';
import swal from "sweetalert";

import Carousel from 'react-bootstrap/Carousel';


export default function Home(props) {


    const [heart, setheart] = useState(false)
    const { home_products, categories } = useSelector(homeproductsSelector)


    // const {cartproducts} = useSelector(cartSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem("user_token");
        if (token) {
            dispatch(fetchcart(token, 'initial'))
        }
        else {
            var data = []
            dispatch(fetchhomeproducts(data))
        }

    }, [])




    const toshow = async (index) => {


        const token = localStorage.getItem("user_token");


if(token){


        dispatch(update_home_wish(index))

        var data = {
            id: home_products[index].id,
            token: token
        }


        if (!home_products[index].wishlist) {
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



    const navigate = useNavigate();

    // const getdata = async () => {

    //     dispatch(fetchhomeproducts(cartproducts))
    //     console.log("wow",cartproducts)
    // }

    const updatecart = (value, index) => {

        const token = localStorage.getItem("user_token");
        if (value == 'increment') {

            var send = {
                key: value,
                index: index
            }
            dispatch(updatehomeproducts(send))

            var price = {
                productprice: Number(home_products[index].offerprice) * 1,
                cartlength: 0,
                type: 'increment'
            }
            dispatch(updatemaincart(price))

            var data = {
                token: token,
                productid: home_products[index].id,
                type: "increment",
                process: "updatecart",
                varientid: home_products[index].varientid,
            }
            dispatch(Addtocart(data))
        }
        else {
            if (Number(home_products[index].qty == 1)) {
                var send = {
                    key: value,
                    index: index
                }
                dispatch(updatehomeproducts(send))

                var price = {
                    productprice: Number(home_products[index].offerprice) * 1,
                    cartlength: Number(-1),
                    type: 'decrement'
                }
                dispatch(updatemaincart(price))

                var data = {
                    token: token,
                    productid: home_products[index].id,
                    type: "decrement",
                    process: "updatecart",
                    varientid: home_products[index].varientid,
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
                    productprice: Number(home_products[index].offerprice) * 1,
                    cartlength: 0,
                    type: 'decrement'
                }
                dispatch(updatemaincart(price))

                var data = {
                    token: token,
                    productid: home_products[index].id,
                    type: "decrement",
                    process: "updatecart",
                    varientid: home_products[index].varientid,
                }
                dispatch(Addtocart(data))
            }
        }

    }


    const Addtocartfn = async (index) => {

        const token = localStorage.getItem("user_token");
        if (token) {

            var send = {
                key: 'increment',
                index: index
            }
            dispatch(updatehomeproducts(send))
            var price = {
                productprice: Number(home_products[index].offerprice) * 1,
                cartlength: 1,
                type: 'increment',

            }
            dispatch(updatemaincart(price))
            const token = localStorage.getItem("user_token");
            var data = {
                token: token,
                productid: home_products[index].id,
                type: 'increment',
                process: "updatecart",
                varientid: home_products[index].varientid
            }
            dispatch(Addtocart(data))
        }
        else {
            swal("Please login to purchase a product.").then(function () {
                window.location = "/login";
            });

        }
    }











    const productdetailss = (id) => {
        window.location = "/viewproduct/" + id
    }




    const img = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
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


    const nextimg = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,

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




    const commonimg = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,

        responsive: [
            {
                breakpoint: 996,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
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

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);





    const viewproducts = (id) => {

        // const token = localStorage.setItem("cat_id");
        // alert(id)
        window.location = "/shop/" + id

    }

    const viewdetail = (e) => {
        var data = JSON.stringify(e)
        localStorage.setItem("cart_product", data)
        window.location = "/viewproduct/" + e.id


    }


    return (
        <>


            <Header />



            <div className="allbody">

                {/* <!-- submenu --> */}

                <section class="maintain">

                    <div class="container">

                        <div class="row">

                            <div class="col-md-3">
                                <div class="sidebar-area">
                                    {/* <!--=======  single sidebar  =======--> */}
                                    {/* <h4 style={{ fontWeight: "600" }}>CATEGORIES</h4> */}
                                    <div class="sidebar mb-35">

                                        <ul class="product-categories">
                                            {categories.map((e, i) =>
                                                <li><a class="" onClick={() => viewproducts(e.id)}>{e.name}<i class="fa fa-angle-right"></i></a></li>
                                            )}
                                            {/* <li><a class="" href="#">More..</a></li> */}
                                        </ul>

                                    </div>


                                </div>
                                {/* <!--=======  End of single sidebar  =======--> */}
                            </div>

                            <div class="col-md-9">
                                <div className='looo'>
                                    {/* <Slider {...commonimg}>

                                  <div>
                                  <img style={{ width: "100%" }} src={require('../../assets/b1.png')} class="img-fluid mt5px" alt="" />

<div>

<span><span><img  src={require('../../assets/download-removebg-preview.png')} class="img-fluid" alt="" /></span> <span><img  src={require('../../assets/appstore.png')} class="img-fluid" alt="" /></span></span>
    </div>

                                  </div>
                                  <div>
                                  <img style={{ width: "100%" }} src={require('../../assets/grocery banner.png')} class="img-fluid mt5px" alt="" />
                                  </div>

                            </Slider> */}



                                    <Carousel>
                                        <Carousel.Item>
                                            <img style={{ width: "100%" }} src={require('../../assets/b1.png')} class="img-fluid mt5px" alt="" />
                                            <Carousel.Caption className='caption1'>
                                                <div>
                                                    <a href="https://play.google.com/store/apps/details?id=com.app.onlinegrocery" target="_blank"><img src={require('../../assets/playstore.png')} class="img-fluid imag1" alt="" /></a>
                                                    <a href="https://play.google.com/store/apps/details?id=com.app.onlinegrocery" target="_blank"><img src={require('../../assets/appstore.png')} class="img-fluid imag1" alt="" /></a>
                                                </div>
                                            </Carousel.Caption>
                                        </Carousel.Item>


                                        <Carousel.Item>
                                            <img src={require('../../assets/grocerybanner.png')} class="img-fluid" alt="" />
                                            <Carousel.Caption className='caption2'>
                                                <div>
                                                    <span><span><a href="https://play.google.com/store/apps/details?id=com.app.onlinegrocery" target="_blank"><img src={require('../../assets/playstore.png')} class="img-fluid imag1" alt="" /></a></span> <span><a href="https://play.google.com/store/apps/details?id=com.app.onlinegrocery" target="_blank"><img src={require('../../assets/appstore.png')} class="img-fluid imag1" alt="" /></a></span></span>
                                                </div>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    </Carousel>



                                </div>
                                {/* <img style={{ width: "100%" }} src={require('../../assets/b1.png')} class="img-fluid mt5px" alt="" /> */}
                            </div>


                        </div>

                    </div>


                </section>


                {/* Submenu Section Ends */}





                <section className=' cardsection'>

                    <Container>

                        <div className='caro-pad'>

                            <div>
                                <h2>
                                    TOP CATEGORY
                                </h2>

                            </div>
                            <Slider {...nextimg}>


                                {categories.map((e, i) =>
                                    <div>

                                        <div class="card" style={{ height: "250px", cursor: "pointer", padding: "4px" }} onClick={() => viewproducts(e.id)} >
                                            <img class="card-img-top category-img" src={URL = `${CATEGORY_IMAGE_URL}` + e.image} alt="Card image cap" />

                                            <div class="card-body">
                                                <h5 class="card-title category-title" style={{ fontWeight: "600" }}>{e.name}</h5>

                                            </div>
                                        </div>


                                    </div>

                                )}

                            </Slider>

                        </div>


                    </Container>



                </section>











                {/* First coursel */}
                <section className=' cardsection'>

                    <Container>

                        <div className='caro-pad'>

                            <div>
                                <h2>RECENT PRODUCTS</h2>
                            </div>
                            <Slider {...img}>

                                {home_products.map((e, i) =>
                                    <div>

                                        <div class="card" style={{ height: "360px", padding: "4px" }} >
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
                                            <div onClick={() => viewdetail(e)} style={{ cursor: "pointer", textAlign: "center" }}>

                                                <img class="card-img-top category-img1" src={URL = `${IMAGE_URL}` + e.image} alt="Card image cap" />

                                                <div class="card-body" style={{ textAlign: "center" }}>
                                                    <h5 class="card-title">{e.name}</h5>
                                                    {e.offerprice ?
                                                        <span><span class="card-text">$ {e.offerprice}</span> <span class="card-text1">$ {e.price}</span></span>
                                                        :
                                                        <span class="card-text">$ {e.price}</span>
                                                    }
                                                </div>

                                            </div>

                                            {e.check == false ?
                                                e.status == 'inStack' ?
                                                    (<div class="padd10px" style={{ textAlign: "center" }}>
                                                        <button onClick={() => Addtocartfn(i)} data-toggle="tooltip" title="Add to cart" data-button-action="add-to-cart"
                                                            class="insp-cart-button">
                                                            {/* <i class="fa fa-shopping-cart" aria-hidden="true"></i> */}
                                                            ADD
                                                        </button>
                                                    </div>) :
                                                    (<div className='outofstack' >
                                                        <p className='outofstack_text' >Out of Stock</p>
                                                    </div>)

                                                :
                                                <div class="padd10px" style={{ textAlign: "center" }}>
                                                    <button class="cartbtn1st" onClick={() => updatecart("decrement", i)}>-</button>

                                                    <span class="cartbtn2rd addcount" style={{ padding: "0px 8px" }}>{e.qty}</span>
                                                    <button class="cartbtn3rd" onClick={() => updatecart("increment", i)}>+</button>
                                                </div>
                                            }

                                        </div>


                                    </div>

                                )}

                            </Slider>

                        </div>


                    </Container>



                </section>




                {/* Second coursel */}

















                {/* <section class="ad">

                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <img src={require('../../assets/b2.jpg')} style={{ width: "100%" }} class="img-fluid" alt="" />
                        </div>
                        <div class="col-md-6">
                            <img src={require('../../assets/b3.jpg')} style={{ width: "100%" }} class="img-fluid" alt="" />
                        </div>
                    </div>

                </div>

            </section> */}


                <section class="ad">

                    <div class="container">
                        <div class="downloadnoww">
                            <Container>
                                <Row>
                                    <Col md={6}>

                                    </Col>
                                    <Col md={6}>
                                        <div className='grocerylastbanner'>
                                            <span><span><a href="https://play.google.com/store/apps/details?id=com.app.onlinegrocery" target="_blank"><img src={require('../../assets/playstore.png')} class="img-fluid images" alt="" /></a></span> <span><a href="https://play.google.com/store/apps/details?id=com.app.onlinegrocery" target="_blank"><img src={require('../../assets/appstore.png')} class="img-fluid images" alt="" /></a></span></span>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                            {/* <div>
                        <span><span><Link to="/"><img  src={require('../../assets/playstore.png')} class="img-fluid" alt="" /></Link></span> <span><Link to="/"><img  src={require('../../assets/appstore.png')} class="img-fluid" alt="" /></Link></span></span>
                        </div> */}

                        </div>
                        {/* <img  src={require('../../assets/grocery banner.png')} class="img-fluid" alt="" />
                
               
                <span><span><Link to="/"><img  src={require('../../assets/playstore.png')} class="img-fluid" alt="" /></Link></span> <span><Link to="/"><img  src={require('../../assets/appstore.png')} class="img-fluid" alt="" /></Link></span></span> */}

                        {/* <img src={require('../../assets/grocery.png')} class="img-fluid widthimages" alt="" /> */}
                    </div>

                </section>







            </div>








        </>




    );
}