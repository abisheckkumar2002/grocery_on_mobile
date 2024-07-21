import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './shop.css'
import { homedatas, wishlist } from '../../Api/homedata';
import { gettttt } from '../../Api/getcategory';
import { gettlow } from '../../Api/sortby';
import { useNavigate, useParams } from "react-router-dom";
import Pagination from 'react-responsive-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { categoryproductsSelector, fetchcategoryfilter, fetchcategoryproducts, updatecategoryproducts, update_cat_wish } from '../../Slices/categoriesfilter';
import { Addtocart, cartSelector, fetchcart, fetchcartforshop, updatemaincart } from '../../Slices/fetchcart';
import { IMAGE_URL } from '../../Constant';
import { Circles } from 'react-loader-spinner'
import swal from "sweetalert";
// import Pagination from '@material-ui/lab/Pagination';

import Header from '../../layouts/Header/header';
export default function Shop() {
    const dispatch = useDispatch()
    const { id } = useParams();

    const [heart, setheart] = useState(false)

    const { category_products, total } = useSelector(categoryproductsSelector)
    const { cartproducts } = useSelector(cartSelector)
    const [catactive, setcatactive] = useState(0);
    const [pagess, setpage] = useState(1);

    const [loading, setloading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("user_token");
        if (token) {
            var data = {
                token: token,
                catid: id
            }
            dispatch(fetchcartforshop(data))
        }
        else {
            var data1 = {
                cartdata: [],
                catid: id,
                page: 1,
                token:token
            }
            dispatch(fetchcategoryproducts(data1))
        }

    }, [])
    useEffect(() => {
        getdata()
        setloading(true)
    }, []);

    const toshow =  async(index) => {
        const token = localStorage.getItem("user_token");
        if(token){     
      dispatch(update_cat_wish(index))
    //   const token = localStorage.getItem("user_token");
      var data = {
        id: category_products[index].id,
        token: token
    }
    if (!category_products[index].wishlist) {
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


    const getdata = async () => {
        // setloading(true)
        const hariiiii = await homedatas()
        setloading(false)
        const result = hariiiii.freefire.categories.findIndex(e => Number(e.id) == Number(id))
        setcatactive(result)
        setcategory(hariiiii.freefire.categories)

    }

    let [category, setcategory] = useState([]);
    let [prices, setprices] = useState('');



    const viewproducts = async (id, index) => {
        const token = localStorage.getItem("user_token");
        setprices('all')
        setpage(1)
        setcatactive(index)
        var data = {
            catid: id,
            cartdata: cartproducts,
            page: 1,
            token:token
        }
        dispatch(fetchcategoryproducts(data))

    }


    const handleChange = async (e, index) => {
        const token = localStorage.getItem("user_token");
        setpage(1)
        setprices(e.target.value)
        if (e.target.value == 'all') {
            var data = {
                catid: category[index].id,
                cartdata: cartproducts,
                page: 1,
                token:token
            }
            dispatch(fetchcategoryproducts(data))

        }
        else {
            var data = {
                catid: category[index].id,
                cartdata: cartproducts,
                type: e.target.value.toLowerCase(),
                page: 1,
                token:token
            }
            dispatch(fetchcategoryfilter(data))
        }
    }

    const productdetailss = (id) => {
        //  alert(id)
        window.location = "/viewproduct/" + id
    }






    const Addtocartfn = async (index) => {
        console.log("TEST", category_products[index])
        const token = localStorage.getItem("user_token");
        if (token) {
            var send = {
                key: 'increment',
                index: index
            }
            dispatch(updatecategoryproducts(send))

            if (Number(category_products[index].offerprice)) {
                var price = {
                    productprice: Number(category_products[index].offerprice) * 1,
                    cartlength: 1,
                    type: 'increment'
                }
            }
            else {
                var price = {
                    productprice: Number(category_products[index].price) * 1,
                    cartlength: 1,
                    type: 'increment'
                }

            }
            dispatch(updatemaincart(price))
            const token = localStorage.getItem("user_token");
            var data = {
                token: token,
                productid: category_products[index].id,
                type: 'increment',
                process: "updatecart",
                varientid: category_products[index].varientid,
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
            dispatch(updatecategoryproducts(send))
            if (Number(category_products[index].offerprice)) {
                var price = {
                    productprice: Number(category_products[index].offerprice) * 1,
                    cartlength: 0,
                    type: 'increment'
                }

            } else {
                var price = {
                    productprice: Number(category_products[index].price) * 1,
                    cartlength: 0,
                    type: 'increment'
                }
            }

            dispatch(updatemaincart(price))

            var data = {
                token: token,
                productid: category_products[index].id,
                type: "increment",
                process: "updatecart",
                varientid: category_products[index].varientid
            }
            dispatch(Addtocart(data))
        }
        else {
            if (Number(category_products[index].qty == 1)) {
                var send = {
                    key: value,
                    index: index
                }
                dispatch(updatecategoryproducts(send))

                var price = {
                    productprice: Number(category_products[index].offerprice) * 1,
                    cartlength: Number(-1),
                    type: 'decrement'
                }

                dispatch(updatemaincart(price))

                var data = {
                    token: token,
                    productid: category_products[index].id,
                    type: "decrement",
                    process: "updatecart",
                    varientid: category_products[index].varientid,
                }
                dispatch(Addtocart(data))
            }
            else {
                var send = {
                    key: value,
                    index: index
                }
                dispatch(updatecategoryproducts(send))

                var price = {
                    productprice: Number(category_products[index].offerprice) * 1,
                    cartlength: 0,
                    type: 'decrement'
                }
                dispatch(updatemaincart(price))

                var data = {
                    token: token,
                    productid: category_products[index].id,
                    type: "decrement",
                    process: "updatecart",
                    varientid: category_products[index].varientid,
                }
                dispatch(Addtocart(data))
            }
        }

    }

    const pagechange = (value) => {
        const token = localStorage.getItem("user_token");
        // alert(category[catactive].id)
        setpage(value)
        if (prices) {
            if (prices == 'all') {
                var data = {
                    catid: category[catactive].id,
                    cartdata: cartproducts,
                    page: value,
                    token:token
                }
                dispatch(fetchcategoryproducts(data))
            }
            else {
                var data = {
                    catid: category[catactive].id,
                    cartdata: cartproducts,
                    type: prices.toLowerCase(),
                    page: value,
                    token:token
                }
                dispatch(fetchcategoryfilter(data))
            }

        }
        var data = {
            catid: category[catactive].id,
            cartdata: cartproducts,
            page: value,
            token:token
        }
        dispatch(fetchcategoryproducts(data))
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


                {/* <!-- Shopscetion --> */}

                <section class="maintain cardsection">
                    <div class="container">

                        <div class="row">
                            <div class="col-md-3">
                                <div class="sidebar-area ml8px">

                                    <div class="sidebar mb-35">
                                        {/* <!-- <h3 class="sidebar-title">SHOP BY CATEGORY</h3> --> */}

                                        <div>
                                            <ul class="product-categories">
                                                {category.map((e, index) =>
                                                    (index == catactive) ?
                                                        <li><a style={{ color: "#bf0b32" }} onClick={() => viewproducts(e.id, index)}>{e.name}<i class="fa fa-angle-right"></i></a></li> :
                                                        <li><a style={{ color: "black" }} onClick={() => viewproducts(e.id, index)}>{e.name}<i class="fa fa-angle-right"></i></a></li>
                                                )}
                                                {/* <li><a class="" href="#">More..</a></li> */}
                                            </ul>
                                        </div>

                                    </div>


                                </div>
                            </div>




                            <div class="left-column col-md-9">


                                {!category_products.length ? null :
                                    <div class="borderbox">

                                        <label for="cars" class="">Sort By : </label>

                                        <select value={prices} onChange={(value) => handleChange(value, catactive)} id="sex" style={{ padding: "6px", marginLeft: "5px", fontSize: "15px" }}>
                                            <option value="all">Select</option>
                                            <option value="lowtohigh">Price (Low to high)</option>
                                            <option value="hightolow">Price (High to low)</option>
                                        </select>


                                    </div>}


                                {loading ?
                                    <div className='loaderss'>
                                        <Circles style={{ justifyContent: "center" }} color="#0c3270" height={100} width={100} />
                                    </div> :



                                    <div>

                                        {category_products.length == 0 && loading == false ?

                                            <div className='firstsearch'>
                                                {loading ? null :
                                                    <img style={{ height: "450px" }} src={require('../../assets/product-not-found.jpg')} class="img-fluid" alt="" />

                                                }
                                            </div> :


                                            <div class="row">
                                                {category_products.map((e, i) =>
                                                    <div class="col-lg-3 col-md-6">

                                                        <div class="card" style={{ width: "100%", height: "360px", padding: "4px" }}>

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
                                                                <img class="card-img-top category-img" src={URL = `${IMAGE_URL}` + e.image} alt="Card image cap" />

                                                                <div class="card-body" style={{ textAlign: "center" }}>
                                                                    <h5 class="card-title" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-html="true" title={e.name}>{e.name}</h5>

                                                                    {e.offerprice ?
                                                                        <span><span class="card-text">$ {e.offerprice}</span> <span class="card-text1">$ {e.price}</span> </span>
                                                                        :
                                                                        <span class="card-text">$ {e.price}</span>
                                                                    }
                                                                </div>

                                                            </div>

                                                            {!e.check ?
                                                                e.status == "inStack" ?
                                                                    (<div class="padd10px" style={{ textAlign: "center" }}>
                                                                        <button onClick={() => Addtocartfn(i)} data-toggle="tooltip" title="Add to cart" data-button-action="add-to-cart"
                                                                            class="insp-cart-button">
                                                                            {/* <i class="fa fa-shopping-cart" aria-hidden="true"></i> */}
                                                                            ADD
                                                                        </button>
                                                                    </div>) : (<div className='outofstack' >
                                                                        <p className='outofstack_text' >Out of Stock</p>
                                                                    </div>)
                                                                :
                                                                <div class="padd10px" style={{ textAlign: "center" }}>
                                                                    <button class="cartbtn1st" onClick={() => updatecart("decrement", i)}>-</button>

                                                                    <span class="cartbtn2rd" style={{ padding: "0px 6px" }}>{e.qty}</span>
                                                                    <button class="cartbtn3rd" onClick={() => updatecart("increment", i)}>+</button>
                                                                </div>
                                                            }


                                                        </div>

                                                    </div>
                                                )}


                                            </div>


                                        }
                                    </div>
                                }


                            </div>

                        </div>

                    </div>


                    {/* <div style={{ marginTop: "20px" }}>
                    <nav aria-label="Page navigation example" class="mart20">


                        <ul class="pagination justify-content-center">
                            {DATA1.map((e, i) =>

                                <li class="page-item"><a class={"page-link " + e.active} lable={i} onClick={() => Paginations(i, e.label)} >{e.label}</a></li>
                            )}
                        </ul>

                    </nav>
                </div> */}

                    <div style={{ marginTop: "30px" }}>
                        <Pagination
                            current={pagess}
                            total={total}
                            onPageChange={(value) => pagechange(value)}
                        />
                    </div>

                    {/* 
                <div style={{ textAlign: "center" }}>
                <Pagination count={Math.round((totalPages / 20))} page={pagess} color="primary" onChange={setpage} />
                </div> */}



                </section>




            </div>




        </>
    );
}