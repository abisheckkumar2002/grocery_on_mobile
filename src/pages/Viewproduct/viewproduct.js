import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './viewproduct.css'
import { productdetail } from '../../Api/productdetail';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import { getcart, homedatas, wishlist } from '../../Api/homedata';
import { useDispatch, useSelector } from 'react-redux';
import { Addtocart, cartSelector, fetchaddtionalcart, fetchcart, updatemaincart } from '../../Slices/fetchcart';
import { IMAGE_URL } from '../../Constant';

import Header from '../../layouts/Header/header';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { homeproductsSelector } from '../../Slices/homeproducts';
import { fetchsimilarproducts, similarproSelector, updatesimilarproducts, update_sim_wish } from '../../Slices/similarpro';
import { Circles } from 'react-loader-spinner';


export default function Viewproduct() {

    const history = useNavigate();
    const { home_products } = useSelector(homeproductsSelector)
    const { similarproducts } = useSelector(similarproSelector)
    const [heart, setheart] = useState(false)
    const [loading, setloading] = useState(false)

    const dispatch = useDispatch()
    const { id } = useParams();
    const [itemvariant, setitemvariant] = useState([]);
    const { cartproducts } = useSelector(cartSelector)
    // const sandy = cartproducts.find(e => e.id==id)
    // console.log("sandy",id)
    const [detail, setDeatil] = useState({
        check: false,
        quantity: 0
    });
    const [price, setPrice] = useState({
        price: 0,
        offerprice: 0,
        availablequantity: 0
    })
    const [varientindex, setVarientindex] = useState(0)

    useEffect(() => {
        getproduct()
        const token = localStorage.getItem("user_token");
        dispatch(fetchcart(token, 'detail'))

    }, []);


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


    useEffect(() => {
        getvarient()
        setloading(true)
    }, [cartproducts])


    const getvarient = async () => {
        const token = localStorage.getItem("user_token");

        const hari1 = await productdetail(id, token)
        setloading(false)
        setitemvariant(hari1.product_details.item_variant)
        var p_price = { ...price }
        p_price.offerprice = hari1.product_details.item_variant[varientindex].offer_price
        p_price.price = hari1.product_details.item_variant[varientindex].price
        p_price.availablequantity = hari1.product_details.item_variant[varientindex].quantity
        setPrice(p_price)


        const sandy = cartproducts.find(e => {
            if ((e.product_id == id) && (e.product_variant_id == hari1.product_details.item_variant[varientindex].id))
                return e
        })
        if (sandy) {
            var pdetail = { ...detail }
            pdetail.check = true
            pdetail.quantity = sandy.quantity
            setDeatil(pdetail)
        }
        else {
            var pdetail = { ...detail }
            pdetail.check = false
            pdetail.quantity = 0
            setDeatil(pdetail)
        }
        setVarientindex(varientindex)
    }




    const getproduct = async () => {
        const token = localStorage.getItem("user_token");

        // const product= await localStorage.getItem("cart_product")
        //  var data = JSON.parse(product)

        //  var pdetail={...detail}
        //  pdetail.check=data.check
        //  pdetail.quantity=data.qty
        //  setDeatil(pdetail)

        const hari = await productdetail(id, token)
        // const cartdata1 = await getcart(token)
        setproductss(hari.product_details)

        setproductss1(hari.product_details.category)
        setheart(hari.product_details.is_already_in_wish_list)

        var data = {
            token: token,
            cat_id: hari.product_details.category.id,
            pro_id: hari.product_details.id
        }
        dispatch(fetchaddtionalcart(data))

        // dispatch(fetchsimilarproducts(hari.product_details.category.id))

    }




    let [productss, setproductss] = useState({})

    let [productss1, setproductss1] = useState({})




    function addtocart() {
        const token = localStorage.getItem("user_token");
        if (token) {
            var p_deatil = { ...detail }
            p_deatil.check = true
            p_deatil.quantity = 1
            setDeatil(p_deatil)
            var price = {
                productprice: Number(itemvariant[varientindex].offer_price) * 1,
                cartlength: 1,
                type: 'increment',

            }
            dispatch(updatemaincart(price))


            var data = {
                token: token,
                productid: itemvariant[varientindex].item_id,
                type: 'increment',
                process: "updatecart",
                varientid: itemvariant[varientindex].id
            }
            dispatch(Addtocart(data))
        }
        else {
            swal("Please login to purchase a product.").then(function () {
                window.location = "/login";
            });
        }

    }


    useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const bychangeradio = (index) => {
        setVarientindex(index)
        var p_price = { ...price }
        p_price.offerprice = itemvariant[index].offer_price
        p_price.price = itemvariant[index].price
        p_price.availablequantity = itemvariant[index].quantity
        setPrice(p_price)

        var result = cartproducts.find(e => {
            if ((e.product_id == id) && (e.product_variant_id == itemvariant[index].id))
                return e
        })
        if (result) {
            var p_detail = { ...detail }
            p_detail.check = true
            p_detail.quantity = result.quantity
            p_price.availablequantity = itemvariant[index].quantity
            setDeatil(p_detail)
        }
        else {
            var p_detail = { ...detail }
            p_detail.check = false
            p_detail.quantity = 0
            p_price.availablequantity = itemvariant[index].quantity
            setDeatil(p_detail)
        }

    }



    const updatecart = (value, index) => {
        const token = localStorage.getItem("user_token");
        if (value == 'increment') {
            var p_deatil = { ...detail }
            p_deatil.check = true
            p_deatil.quantity = Number(p_deatil.quantity) + Number(1)
            setDeatil(p_deatil)

            var price = {
                productprice: Number(itemvariant[index].offer_price) * 1,
                cartlength: 0,
                type: 'increment'
            }
            dispatch(updatemaincart(price))

            var data = {
                token: token,
                productid: itemvariant[index].item_id,
                type: "increment",
                process: "updatecart",
                varientid: itemvariant[index].id,
            }
            dispatch(Addtocart(data))
        }
        else {
            if (Number((detail.quantity) == 1)) {

                var p_deatil = { ...detail }
                p_deatil.check = false
                p_deatil.quantity = 0
                setDeatil(p_deatil)

                var price = {
                    productprice: Number(itemvariant[index].offer_price) * 1,
                    cartlength: Number(-1),
                    type: 'decrement'
                }
                dispatch(updatemaincart(price))

                var data = {
                    token: token,
                    productid: itemvariant[index].item_id,
                    type: "decrement",
                    process: "updatecart",
                    varientid: itemvariant[index].id,
                }
                dispatch(Addtocart(data))
            }
            else {

                var p_deatil = { ...detail }
                p_deatil.check = true
                p_deatil.quantity = Number(p_deatil.quantity) - Number(1)
                setDeatil(p_deatil)

                var price = {
                    productprice: Number(itemvariant[index].offer_price) * 1,
                    cartlength: 0,
                    type: 'decrement'
                }
                dispatch(updatemaincart(price))

                var data = {
                    token: token,
                    productid: itemvariant[index].item_id,
                    type: "decrement",
                    process: "updatecart",
                    varientid: itemvariant[index].id,
                }
                dispatch(Addtocart(data))
            }
        }
    }


    const toshow = async () => {
        console.log("Product_details", productss)
        const token = localStorage.getItem("user_token");
        if (heart) {
            setheart(false)
            var data = {
                id: productss.id,
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

        } else {
            setheart(true)
            var data = {
                id: productss.id,
                token: token
            }
            const output = await wishlist(data)
            if (output) {
                swal({
                    title: "Wishlist added successfully!",
                    icon: "success",
                    timer: 2000
                })
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
            dispatch(updatesimilarproducts(send))
            var price = {
                productprice: Number(similarproducts[index].offerprice) * 1,
                cartlength: 1,
                type: 'increment',

            }
            dispatch(updatemaincart(price))
            const token = localStorage.getItem("user_token");
            var data = {
                token: token,
                productid: similarproducts[index].id,
                type: 'increment',
                process: "updatecart",
                varientid: similarproducts[index].varientid
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
            dispatch(updatesimilarproducts(send))

            var price = {
                productprice: Number(similarproducts[index].offerprice) * 1,
                cartlength: 0,
                type: 'increment'
            }
            dispatch(updatemaincart(price))

            var data = {
                token: token,
                productid: similarproducts[index].id,
                type: "increment",
                process: "updatecart",
                varientid: similarproducts[index].varientid,
            }
            dispatch(Addtocart(data))
        }
        else {
            if (Number(similarproducts[index].qty == 1)) {
                var send = {
                    key: value,
                    index: index
                }
                dispatch(updatesimilarproducts(send))

                var price = {
                    productprice: Number(similarproducts[index].offerprice) * 1,
                    cartlength: Number(-1),
                    type: 'decrement'
                }
                dispatch(updatemaincart(price))

                var data = {
                    token: token,
                    productid: similarproducts[index].id,
                    type: "decrement",
                    process: "updatecart",
                    varientid: similarproducts[index].varientid,
                }
                dispatch(Addtocart(data))
            }
            else {
                var send = {
                    key: value,
                    index: index
                }
                dispatch(updatesimilarproducts(send))

                var price = {
                    productprice: Number(similarproducts[index].offerprice) * 1,
                    cartlength: 0,
                    type: 'decrement'
                }
                dispatch(updatemaincart(price))

                var data = {
                    token: token,
                    productid: similarproducts[index].id,
                    type: "decrement",
                    process: "updatecart",
                    varientid: similarproducts[index].varientid,
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
    const toshow123 = async (index) => {
        const token = localStorage.getItem("user_token");
        dispatch(update_sim_wish(index))

        var data = {
            id: similarproducts[index].id,
            token: token
        }
        if (!similarproducts[index].wishlist) {
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

    return (
        <>

            <Header />

            <div className='allbody'>




                {/* <!-- Cartsection --> */}
                <section class="cartsection cardsection">

                    <div class="container">
                        <Button onClick={() => history(-1)} variant="primary"><BsFillArrowLeftCircleFill style={{ fontSize: "18px", marginTop: "-3px" }} /> Back</Button>
                        {/* <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/">Home</a></li>
                            <li class="breadcrumb-item"><a href="/shop">Shop</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Product detail</li>
                        </ol>
                    </nav> */}
                        <div class="row" >
                            <div class="col-lg-12">
                            {loading ?
                                    <div className='loaderss'>
                                        <Circles style={{ justifyContent: "center" }} color="#0c3270" height={100} width={100} />
                                    </div> : 
                                <div class="card">
                                    {/* <div>
                                    <h4>
                                        Product details
                                    </h4>
                                </div> */}
                                
                                    <div class="row" style={{ alignItems: "center" }}>
                                        <div class="col-lg-6" style={{ textAlign: "center" }}>
                                            <div style={{ marginTop: "0%" }}>
                                                <img src={URL = `${IMAGE_URL}` + productss.image} class="zoom viewproductimg" alt="" />
                                            </div>
                                        </div>

                                        <div class="col-lg-6">

                                       

                                            <div class="nextt">
                                                {heart ?
                                                    <div className='hearticons'><button class="btn addedwishlist1" onClick={() => toshow()} type='button'>Wishlist added<i class="fa fa-heart"></i></button></div> :
                                                    <div className='hearticons'><button class="btn addedwishlist2" onClick={() => toshow()} type='button'>Add to wishlist<i class="fa fa-heart"></i></button></div>}
                                                <h4 class="heading4">

                                                    {productss.name}
                                                </h4>

                                                <div className='row' style={{ marginBottom: "15px" }}>

                                                    {itemvariant.map((e, i) =>
                                                        <div className="col-md-3 kgcheck">
                                                            <div style={{ padding: "2px 4px" }}>
                                                                <div class="form-check form-check-inline" style={{ marginRight: "4px" }}>
                                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" value={e.id} checked={varientindex == i} onChange={() => bychangeradio(i)} />
                                                                    <label class="form-check-label" for="inlineRadio1">
                                                                        <span>{e.variant_value} </span> <br></br>
                                                                        {e.offer_price ?
                                                                            <span><span class="card-text" style={{ fontSize: "14px" }}>$ {e.offer_price}</span> <span style={{ fontSize: "12px" }} class="card-text1">$ {e.price}</span> </span>
                                                                            :
                                                                            <span class="card-text" style={{ fontSize: "14px" }}>$ {e.price}</span>
                                                                        }
                                                                    </label>

                                                                </div>
                                                            </div>
                                                            <p className='offerviewproduct'>{e.discount}% off</p>

                                                        </div>
                                                    )}

                                                </div>


                                                {!detail.check ?
                                                    (price.availablequantity > 0) ?
                                                        <div class="padd10px" style={{ textAlign: "left" }}>
                                                            <button onClick={() => addtocart()} data-toggle="tooltip" title="Add to cart" data-button-action="add-to-cart"
                                                                class="insp-cart-button" style={{ height: "45px", border: "2px solid #0b316e" }}>
                                                                <i class="fa fa-shopping-cart ibtn" aria-hidden="true"> </i>  Add to Cart
                                                            </button>
                                                        </div> :
                                                        (
                                                            <div className='outofstack' style={{ textAlign: "left" }}>
                                                                <p className='outofstack_text' >Out Of Stock</p>
                                                            </div>
                                                        )
                                                    :
                                                    <div class="padd10px" style={{ textAlign: "left" }}>
                                                        <button class="cartbtn1st" onClick={() => updatecart('decrement', varientindex)}>-</button>

                                                        <span class="cartbtn2rd" style={{ padding: "0px 6px" }}>{detail.quantity}</span>
                                                        <button class="cartbtn3rd" onClick={() => updatecart('increment', varientindex)}>+</button>
                                                    </div>}

                                                <div className='categoryborder'>
                                                    <p>CATEGORIES : {productss1.name}</p>
                                                    <p>PRODUCT ID : {productss.product_id}</p>
                                                </div>

                                                <p class="pd10">
                                                    <span style={{ color: "black", fontWeight: "600" }}>Description : </span>
                                                    <span class="spannp">
                                                        {productss.description}
                                                    </span>
                                                </p>


                                                <div className='categoryborder1'>
                                                    <p>SHARE THIS PRODUCT</p>
                                                    <a href="https://www.instagram.com" target="_blank" class="para"> <i class="fa fa-instagram" aria-hidden="true"></i></a>
                                                    <a href="https://www.facebook.com/" target="_blank" class="para"> <i class="fa fa-facebook-square" aria-hidden="true"></i></a>
                                                </div>


                                                {/* <div>
                                                    <a class="hoverlast" href="/shop"><button data-toggle="tooltip" title="Add to cart" data-button-action="add-to-cart"
                                                        class="cntnbtn" style={{ marginTop:"2%" }}><i class="fa fa-arrow-left arrow" aria-hidden="true"></i> Continue Shopping

                                                    </button> </a>
                                                </div> */}
                                            </div>

                                        </div>


                                    </div>

                                </div>
                            }

                            </div>
                        </div>

                        <div class="margin20">

                        </div>

                    </div>
                </section>
                ``
                {/* <!-- Cartsection Ends --> */}




                {/* First coursel */}
                {/* <section className=' cardsection'>

                <Container>

                    <div>

                        <div>
                            <h2>
                                TOP CATEGORY
                            </h2>

                        </div>

                        <Slider {...img}>

                        {DATA.map((e, i) =>
                            <div>
                                <div class="card" style={{ height:"350px" }} onClick={() => productdetailss(e.id)}>
                                    <img class="card-img-top" src={require('../../assets/p1.png')} alt="Card image cap" />
                                    <span class="sale">sale</span>
                                    <div class="card-body" style={{ textAlign:"center" }}>
                                        <h5 class="card-title">{e.name}</h5>
                                        <span><span class="card-text">$ {e.offerprice}</span> <span class="card-text1">$ {e.price}</span> </span>
                                    </div>
                                </div>
                            </div>
                             )}
                          
                        </Slider>



                    </div>


                </Container>



            </section> */}




                {/* <section className=' cardsection'>

                    <Container>

                        <div className='caro-pad'>

                            <div>
                                <h2>
                                    SIMILAR PRODUCTS
                                </h2>

                            </div>


                            <Slider {...img}>
                                <div>

                                    <div class="card" style={{ height: "360px", padding: "4px" }} >
                                    <div style={{ cursor: "pointer", textAlign: "center" }}>

<img class="card-img-top category-img1" src={require('../../assets/detailimg.png')} alt="Card image cap" />

<div class="card-body" style={{ textAlign: "center" }}>
    <h5 class="card-title">kjggjk</h5>
        <span><span class="card-text">$ 778</span> <span class="card-text1">$ 77</span> </span>
</div>

</div>
<div class="padd10px" style={{ textAlign: "center" }}>
                                                        <button onClick={() => Addtocartfn(i)} data-toggle="tooltip" title="Add to cart" data-button-action="add-to-cart"
                                                            class="insp-cart-button">
                                                            ADD
                                                        </button>
                                                    </div>

                                                    <div class="padd10px" style={{ textAlign: "center" }}>
                                                    <button class="cartbtn1st" onClick={() => updatecart("decrement", i)}>-</button>

                                                    <span class="cartbtn2rd addcount" style={{ padding: "0px 8px" }}>1</span>
                                                    <button class="cartbtn3rd" onClick={() => updatecart("increment", i)}>+</button>
                                                </div>

                                        </div>

                                </div>

                                <div>

<div class="card" style={{ height: "360px", padding: "4px" }} >
<div style={{ cursor: "pointer", textAlign: "center" }}>

<img class="card-img-top category-img1" src={require('../../assets/detailimg.png')} alt="Card image cap" />

<div class="card-body" style={{ textAlign: "center" }}>
<h5 class="card-title">kjggjk</h5>
<span><span class="card-text">$ 778</span> <span class="card-text1">$ 77</span> </span>
</div>

</div>
<div class="padd10px" style={{ textAlign: "center" }}>
                                                        <button onClick={() => Addtocartfn(i)} data-toggle="tooltip" title="Add to cart" data-button-action="add-to-cart"
                                                            class="insp-cart-button">
                                             
                                                            ADD
                                                        </button>
                                                    </div>

                                                    <div class="padd10px" style={{ textAlign: "center" }}>
                                                    <button class="cartbtn1st" onClick={() => updatecart("decrement", i)}>-</button>

                                                    <span class="cartbtn2rd addcount" style={{ padding: "0px 8px" }}>1</span>
                                                    <button class="cartbtn3rd" onClick={() => updatecart("increment", i)}>+</button>
                                                </div>


    </div>

</div>
<div>

<div class="card" style={{ height: "360px", padding: "4px" }} >
<div style={{ cursor: "pointer", textAlign: "center" }}>

<img class="card-img-top category-img1" src={require('../../assets/detailimg.png')} alt="Card image cap" />

<div class="card-body" style={{ textAlign: "center" }}>
<h5 class="card-title">kjggjk</h5>
<span><span class="card-text">$ 778</span> <span class="card-text1">$ 77</span> </span>
</div>

</div>

<div class="padd10px" style={{ textAlign: "center" }}>
                                                        <button onClick={() => Addtocartfn(i)} data-toggle="tooltip" title="Add to cart" data-button-action="add-to-cart"
                                                            class="insp-cart-button">
                                                          
                                                            ADD
                                                        </button>
                                                    </div>

                                                    <div class="padd10px" style={{ textAlign: "center" }}>
                                                    <button class="cartbtn1st" onClick={() => updatecart("decrement", i)}>-</button>

                                                    <span class="cartbtn2rd addcount" style={{ padding: "0px 8px" }}>1</span>
                                                    <button class="cartbtn3rd" onClick={() => updatecart("increment", i)}>+</button>
                                                </div>
    </div>

</div>
<div>

<div class="card" style={{ height: "360px", padding: "4px" }} >
<div style={{ cursor: "pointer", textAlign: "center" }}>

<img class="card-img-top category-img1" src={require('../../assets/detailimg.png')} alt="Card image cap" />

<div class="card-body" style={{ textAlign: "center" }}>
<h5 class="card-title">kjggjk</h5>
<span><span class="card-text">$ 778</span> <span class="card-text1">$ 77</span> </span>
</div>

</div>

<div class="padd10px" style={{ textAlign: "center" }}>
                                                        <button onClick={() => Addtocartfn(i)} data-toggle="tooltip" title="Add to cart" data-button-action="add-to-cart"
                                                            class="insp-cart-button">
                                                         
                                                            ADD
                                                        </button>
                                                    </div>

                                                    <div class="padd10px" style={{ textAlign: "center" }}>
                                                    <button class="cartbtn1st" onClick={() => updatecart("decrement", i)}>-</button>

                                                    <span class="cartbtn2rd addcount" style={{ padding: "0px 8px" }}>1</span>
                                                    <button class="cartbtn3rd" onClick={() => updatecart("increment", i)}>+</button>
                                                </div>

    </div>

</div>
<div>

<div class="card" style={{ height: "360px", padding: "4px" }} >
<div style={{ cursor: "pointer", textAlign: "center" }}>

<img class="card-img-top category-img1" src={require('../../assets/detailimg.png')} alt="Card image cap" />

<div class="card-body" style={{ textAlign: "center" }}>
<h5 class="card-title">kjggjk</h5>
<span><span class="card-text">$ 778</span> <span class="card-text1">$ 77</span> </span>
</div>

</div>

<div class="padd10px" style={{ textAlign: "center" }}>
                                                        <button onClick={() => Addtocartfn(i)} data-toggle="tooltip" title="Add to cart" data-button-action="add-to-cart"
                                                            class="insp-cart-button">
                                                         
                                                            ADD
                                                        </button>
                                                    </div>

                                                    <div class="padd10px" style={{ textAlign: "center" }}>
                                                    <button class="cartbtn1st" onClick={() => updatecart("decrement", i)}>-</button>

                                                    <span class="cartbtn2rd addcount" style={{ padding: "0px 8px" }}>1</span>
                                                    <button class="cartbtn3rd" onClick={() => updatecart("increment", i)}>+</button>
                                                </div>

    </div>

</div>
<div>

<div class="card" style={{ height: "360px", padding: "4px" }} >
<div style={{ cursor: "pointer", textAlign: "center" }}>

<img class="card-img-top category-img1" src={require('../../assets/detailimg.png')} alt="Card image cap" />

<div class="card-body" style={{ textAlign: "center" }}>
<h5 class="card-title">kjggjk</h5>
<span><span class="card-text">$ 778</span> <span class="card-text1">$ 77</span> </span>
</div>

</div>

<div class="padd10px" style={{ textAlign: "center" }}>
                                                        <button onClick={() => Addtocartfn(i)} data-toggle="tooltip" title="Add to cart" data-button-action="add-to-cart"
                                                            class="insp-cart-button">
                                              
                                                            ADD
                                                        </button>
                                                    </div>

                                                    <div class="padd10px" style={{ textAlign: "center" }}>
                                                    <button class="cartbtn1st" onClick={() => updatecart("decrement", i)}>-</button>

                                                    <span class="cartbtn2rd addcount" style={{ padding: "0px 8px" }}>1</span>
                                                    <button class="cartbtn3rd" onClick={() => updatecart("increment", i)}>+</button>
                                                </div>
    </div>

</div>



                                    </Slider>







                                </div>


                            </Container>

                        </section> */}

                <section className=' cardsection'>

                    <Container>

                        <div className='caro-pad'>

                            <div>
                                <h2>SIMILAR PRODUCTS</h2>
                            </div>
                            <Slider {...img}>

                                {similarproducts.map((e, i) =>
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
                                                                        <div onClick={() => toshow123(i)} style={{ color: "red" }} className='hearticons'><i class="fa fa-heart"></i></div> :
                                                                        <div onClick={() => toshow123(i)} style={{ color: "black" }} className='hearticons'><i class="fa fa-heart"></i></div>}
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
                                                    <button class="cartbtn1st" onClick={() => updatecart123("decrement", i)}>-</button>

                                                    <span class="cartbtn2rd addcount" style={{ padding: "0px 8px" }}>{e.qty}</span>
                                                    <button class="cartbtn3rd" onClick={() => updatecart123("increment", i)}>+</button>
                                                </div>
                                            }

                                        </div>


                                    </div>

                                )}

                            </Slider>

                        </div>


                    </Container>



                </section>









            </div>

        </>
    );
}