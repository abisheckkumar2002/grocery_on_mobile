import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './checkout.css'


import Header from '../../layouts/Header/header';

import { useNavigate, useParams, Link } from "react-router-dom";
import { cartSelector, fetchcart } from '../../Slices/fetchcart';
import { useDispatch, useSelector } from 'react-redux';
import { async } from 'q';
import { deliverycharge, submitorder } from '../../Api/submitorder';
import moment from 'moment';
import swal from "sweetalert";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { COUPEN, SUBMITORDER } from '../../Constant';
import axios from 'axios';

export default function Checkout() {

    const history = useNavigate();
    const [prodcuctdisc, setprodcuctdisc] = useState(0)
    const [coupentext, setCoupentext] = useState('')
    const [custom, setCustom] = useState(false)
    const [customtext, setCustomtext] = useState(0)
    const [errcustom, setErrcustom] = useState(false)
    const [coupenerr, setCoupenerr] = useState({
        checkcoupen: false,
        validcoupen: false
    })
    const { cartproducts, total } = useSelector(cartSelector)
    const dispatch = useDispatch()
    const { id } = useParams()


    const [tiptype, setTiptype] = useState({
        five: true,
        ten: false,
        fifteen: false,
        twenty: false
    })
    const [deliverytype, setDeliverytype] = useState('standard')

    const [price, setPrice] = useState({
        shipping: {
            standard: 0,
            express: 0
        },
        tip: 0,
        grandtotal: total,
        coupenamt: 0,
        tax: 0
    })

    useEffect(() => {
        const token = localStorage.getItem("user_token");
        dispatch(fetchcart(token, 'initial'))
        if (id == "Delivery") {
            getdeliverycharge()
        }
        else {
            getdeliverycharge2()
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);



    const getdeliverycharge2 = async () => {
        const token = localStorage.getItem("user_token");
        const response = await deliverycharge(token)
        var tax = response.products.map(e => e.tax)
        var tax_tot = tax.reduce((a, b) => a + b, 0)
        var data = { ...price }
        data.grandtotal = Number(response.sub_total) + Number(tax_tot)
        data.tax = tax_tot
        setprodcuctdisc(response.products_discount)
        setPrice(data)
    }


    const getdeliverycharge = async () => {
        const token = localStorage.getItem("user_token");
        const response = await deliverycharge(token)
        var tax = response.products.map(e => e.tax)
        var tax_tot = tax.reduce((a, b) => a + b, 0)
        //    console.log("final",final)
        console.log("harifuck", total)
        var data = { ...price }
        data.shipping.standard = Number(response.standard_charge.shipping_fees)
        data.shipping.express = Number(response.sameday_charge.shipping_fees)
        data.grandtotal = Number(response.standard_charge.shipping_fees) + Number(response.sub_total) + Number(tax_tot)
        data.tax = tax_tot
        setprodcuctdisc(response.products_discount)
        setPrice(data)
    }

    const tipvalidate = (value) => {
        switch (value) {
            case "five":
                var data = { ...tiptype }
                data.five = true
                data.ten = false
                data.fifteen = false
                data.twenty = false
                setTiptype(data)
                break;
            case "ten":
                var data = { ...tiptype }
                data.five = false
                data.ten = true
                data.fifteen = false
                data.twenty = false
                setTiptype(data)
                break;
            case "fifteen":
                var data = { ...tiptype }
                data.five = false
                data.ten = false
                data.fifteen = true
                data.twenty = false
                setTiptype(data)
                break;
            case "twenty":
                var data = { ...tiptype }
                data.five = false
                data.ten = false
                data.fifteen = false
                data.twenty = true
                setTiptype(data)
                break;

        }
    }

    const selecttip = () => {
        if (custom) {

            if (Number(customtext) <= 0) {
                setErrcustom(true)
            }
            else {
                var data = { ...price }
                data.tip = Number(customtext)
                if (deliverytype == "standard") {
                    if (data.coupenamt < 0) {
                        data.grandtotal = Number(customtext) + Number(total) + Number(data.shipping.standard) + Number(data.tax)
                    }
                    else {
                        data.grandtotal = Number(customtext) + (Number(total) - Number(data.coupenamt)) + Number(data.shipping.standard) + Number(data.tax)
                    }
                }
                else {
                    if (data.coupenamt < 0) {
                        data.grandtotal = Number(customtext) + Number(total) + Number(data.shipping.express) + Number(data.tax)
                    }
                    else {
                        data.grandtotal = Number(customtext) + (Number(total) - Number(data.coupenamt)) + Number(data.shipping.express) + Number(data.tax)
                    }
                }
                setPrice(data)
            }
        }
        else {
            if (tiptype.five) {
                var data = { ...price }
                data.tip = Number(5)
                if (deliverytype == "standard") {
                    if (data.coupenamt < 0) {
                        data.grandtotal = Number(5) + Number(total) + Number(data.shipping.standard) + Number(data.tax)
                    }
                    else {
                        data.grandtotal = Number(5) + (Number(total) - Number(data.coupenamt)) + Number(data.shipping.standard) + Number(data.tax)
                    }

                }
                else {
                    if (data.coupenamt < 0) {
                        data.grandtotal = Number(5) + Number(total) + Number(data.shipping.express) + Number(data.tax)
                    }
                    else {
                        data.grandtotal = Number(5) + (Number(total) - Number(data.coupenamt)) + Number(data.shipping.express) + Number(data.tax)
                    }
                }

                setPrice(data)
            }
            else if (tiptype.ten) {
                var data = { ...price }
                data.tip = Number(10)
                if (deliverytype == "standard") {
                    if (data.coupenamt < 0) {
                        data.grandtotal = Number(10) + Number(total) + Number(data.shipping.standard) + Number(data.tax)
                    }
                    else {
                        data.grandtotal = Number(10) + (Number(total) - Number(data.coupenamt)) + Number(data.shipping.standard) + Number(data.tax)
                    }
                }
                else {
                    if (data.coupenamt < 0) {
                        data.grandtotal = Number(10) + Number(total) + Number(data.shipping.express) + Number(data.tax)
                    }
                    else {
                        data.grandtotal = Number(10) + (Number(total) - Number(data.coupenamt)) + Number(data.shipping.express) + Number(data.tax)
                    }
                }
                setPrice(data)
            }
            else if (tiptype.fifteen) {
                var data = { ...price }
                data.tip = Number(15)
                if (deliverytype == "standard") {
                    if (data.coupenamt < 0) {
                        data.grandtotal = Number(15) + Number(total) + Number(data.shipping.standard) + Number(data.tax)
                    }
                    else {
                        data.grandtotal = Number(15) + (Number(total) - Number(data.coupenamt)) + Number(data.shipping.standard) + Number(data.tax)
                    }
                }
                else {
                    if (data.coupenamt < 0) {
                        data.grandtotal = Number(15) + Number(total) + Number(data.shipping.express) + Number(data.tax)
                    }
                    else {
                        data.grandtotal = Number(15) + (Number(total) - Number(data.coupenamt)) + Number(data.shipping.express) + Number(data.tax)
                    }
                }
                setPrice(data)
            }
            else {
                var data = { ...price }
                data.tip = Number(20)
                if (deliverytype == "standard") {
                    if (data.coupenamt < 0) {
                        data.grandtotal = Number(20) + Number(total) + Number(data.shipping.standard) + Number(data.tax)
                    }
                    else {
                        data.grandtotal = Number(20) + (Number(total) - Number(data.coupenamt)) + Number(data.shipping.standard) + Number(data.tax)
                    }
                }
                else {
                    if (data.coupenamt < 0) {
                        data.grandtotal = Number(20) + Number(total) + Number(data.shipping.express) + Number(data.tax)
                    }
                    else {
                        data.grandtotal = Number(20) + (Number(total) - Number(data.coupenamt)) + Number(data.shipping.express) + Number(data.tax)
                    }
                }
                setPrice(data)
            }
        }
    }

    const unselectTip = () => {

        var data = { ...price }
        data.tip = Number(0)
        if (deliverytype == "standard") {
            if (data.coupenamt < 0) {
                data.grandtotal = Number(0) + Number(total) + Number(data.shipping.standard) + Number(data.tax)
            }
            else {
                data.grandtotal = Number(0) + (Number(total) - Number(data.coupenamt)) + Number(data.shipping.standard) + Number(data.tax)
            }
        }
        else {
            if (data.coupenamt < 0) {
                data.grandtotal = Number(0) + Number(total) + Number(data.shipping.express) + Number(data.tax)
            }
            else {
                data.grandtotal = Number(0) + (Number(total) - Number(data.coupenamt)) + Number(data.shipping.express) + Number(data.tax)
            }
        }
        setPrice(data)
        var data = { ...tiptype }
        data.five = true
        data.ten = false
        data.fifteen = false
        data.twenty = false
        setTiptype(data)

    }

    const placeorder = async () => {

        if (id == "Pickup") {
            var pickupdata = localStorage.getItem("Pickup_data")
            var data = JSON.parse(pickupdata)
            const token = localStorage.getItem("user_token");

            var str = moment(data.date).format('MM-DD-YYYY')
            console.log("Final", str)
            var data = {
                "location_mode": "Pickup",
                "pickup_location": data.address,
                "pickup_date": str,
                "pickup_time": data.time
            }

            const Response = await submitorder(data, token)
            if (Response.message == "Order created successfully") {
                swal({
                    title: "Order booked Successfully",
                    icon: "success",
                    timer: 4000
                })
                window.location = '/orderhistory'
            }
        }
        else {
            const token = localStorage.getItem("user_token");
            var data = {
                "location_mode": "Delivery",
                "tip_amount": Number(price.tip),
                "d_type": deliverytype
            }

            const Response = await submitorder(data, token)
            {
                swal({
                    title: "Order booked Successfully",
                    icon: "success",
                    timer: 4000
                })
                window.location = '/orderhistory'
            }
            console.log("reqdata", Response.data)
            window.location = '/orderhistory'
        }
    }

    const changedelivery = (e) => {

        if (e.target.value == "standard") {
            setDeliverytype(e.target.value)
            setTest(true)
            var data = { ...price }
            data.grandtotal = Number(total) + Number(data.shipping.standard) + Number(data.tip)
            setPrice(data)
        }
        else {
            setDeliverytype(e.target.value)
            setTest(false)
            var data = { ...price }
            data.grandtotal = Number(total) + Number(data.shipping.express) + Number(data.tip)
            setPrice(data)
        }

    }


    const [test, setTest] = useState(true)

    const coupenvalidate = async (e) => {
        if (!coupentext) {
            var error = { ...coupenerr }
            error.checkcoupen = true
            setCoupenerr(error)
        }
        else {
            try {
                const response = await axios({
                    url: `${COUPEN}` + coupentext,
                    method: "get"
                })

                if (response.data.coupon_discount) {
                    var data = { ...price }
                    var discountamt = ((Number(response.data.coupon_discount)) * (Number(total)) / (Number(100)))
                    data.coupenamt = Number(discountamt)
                    if (deliverytype == "standard") {
                        data.grandtotal = (Number(total) + Number(data.shipping.standard) - Number(discountamt)) + Number(data.tip) + Number(data.tax)
                    }
                    else {
                        data.grandtotal = (Number(total) + Number(data.shipping.express) - Number(discountamt)) + Number(data.tip) + Number(data.tax)
                    }
                    setPrice(data)
                    var error = { ...coupenerr }
                    error.validcoupen = false
                    error.checkcoupen = false
                    setCoupenerr(error)
                }
            }
            catch (err) {
                var error = { ...coupenerr }
                error.validcoupen = true
                error.checkcoupen = false
                setCoupenerr(error)
                console.log("ERROR ===>", err)
            }
        }

    }
    const [check, setCheck] = useState(false)

    const checkvalidate = (e) => {
        if (!check) {
            setCheck(true)
        }
        else {
            setCheck(false)
        }
    }

    const cutometextvalidate = (e) => {
        setCustomtext(e.target.value)
        if (e.target.value <= 0) {
            setErrcustom(true)
        }
        else {
            setErrcustom(false)
        }
    }
    const cancelcustom = () => {
        setCustom(false)
        var data = { ...tiptype }
        data.five = true
        data.ten = false
        data.fifteen = false
        data.twenty = false
        setTiptype(data)
    }
    return (
        <>

            <Header dataparenttochild={"cartminus"} />

            <div className='allbody'>
                {/* <!-- Check Out Page --> */}
                <section class="finalcheckout ">

                    <div class="container">
                        <div class="row" >
                            <div class="col-lg-6">
                                <div class="card" style={{ padding: "15px" }}>
                                    <img src={require('../../assets/Animation.gif')} alt="" />
                                    <p style={{ marginTop: "12px" }}>
                                        "During this difficult time, our fulfilment & delivery staff are doing best to serve our customer.
                                        Would you like to reward our delivery staff who are working hard to deliver the goods during the pandemic
                                        and extreme circumstance? Add your Tips - It is optional."
                                    </p>

                                    {id == "Delivery" ?
                                        <div class="row" style={{ alignItems: "center" }}>
                                            <div class="col-lg-12">
                                                {/* <div class="row frr"> */}

                                                {/* <button class="tip" >$ Tip Value (Dollar) </button> */}
                                                {!custom ?
                                                    <>
                                                        <button type="button" onClick={() => tipvalidate('five')} class={tiptype.five ? "btn btn-outline-success active" : "btn btn-outline-success"}  ><img src={require('../../assets/laugh.png')} alt="" /> $5 </button>
                                                        <button type="button" onClick={() => tipvalidate('ten')} class={tiptype.ten ? "btn btn-outline-success active" : "btn btn-outline-success"}><img src={require('../../assets/staremoji.png')} alt="" /> $10 </button>
                                                        <button type="button" onClick={() => tipvalidate('fifteen')} class={tiptype.fifteen ? "btn btn-outline-success active" : "btn btn-outline-success"}><img src={require('../../assets/heart.png')} alt="" /> $15 </button>
                                                        <button type="button" onClick={() => tipvalidate('twenty')} class={tiptype.twenty ? "btn btn-outline-success active" : "btn btn-outline-success"}><img src={require('../../assets/clap 25.png')} alt="" /> $20 </button>
                                                        <button type="button" onClick={() => setCustom(true)} class={tiptype.twenty ? "btn btn-outline-success active" : "btn btn-outline-success"}><img src={require('../../assets/clap 25.png')} alt="" /> custom </button>
                                                    </>
                                                    : null}

                                                {custom ?
                                                    <div style={{ margin: "4px 0px 4px 10px" }}>
                                                        <label for="exampleInputEmail1">Custom </label>
                                                        <input class="tipfield" placeholder="Enter Tip" type="number" onChange={(e) => cutometextvalidate(e)} />
                                                        <button onClick={() => cancelcustom()} style={{ marginLeft: "10px" }} className="btn coupbtnz" type="button" >cancel</button>
                                                        {errcustom ?
                                                            <label style={{ color: 'red' }} >please enter minimun 1 doller*</label> : null}
                                                    </div  > : null}
                                                {/* </div> */}
                                                {/* <div class="form-group">
    <label for="exampleInputEmail1">Custom</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter tip"/>
  </div> */}


                                            </div>
                                            <div class="col-lg-12" style={{ textAlign: "end", marginTop: "10px" }}>
                                                <button onClick={() => selecttip()} class="wannatipbtn" >Wanna Tip </button>
                                            </div>
                                            {price.tip > 0 ?
                                                <div class="col-lg-12" style={{ textAlign: "end", marginTop: "10px" }}>
                                                    <button onClick={() => unselectTip()} class="wannatipbtn" >Clear Tip </button>
                                                </div> : null}

                                        </div> : null}
                                </div>

                                {/* 
        {id == "Delivery" ?
        <>
        <div>
            <label class="mt10">
                Notes For Delivery:
            </label>
         
        </div>
        <div>
            <textarea placeholder="Give Any Delivery Instructions">
                
                
            </textarea>
        </div>
        </>:null} */}

                                <div class="card couponstart">
                                    <label class="marlef">
                                        Enter The Coupen Code
                                    </label>
                                    <div class="row" style={{ alignItems: "baseline" }}>


                                        <div class="col">
                                            <input value={coupentext} type="text" class="form-control marlef marbotm" id="formGroupExampleInput" placeholder="Code Number " onChange={(e) => setCoupentext(e.target.value)} />
                                            {coupenerr.checkcoupen ?
                                                <label style={{ color: "red" }} >please enter coupon code</label> : null}
                                            {coupenerr.validcoupen ?
                                                <label style={{ color: "red" }} >please enter valid coupon code</label> : null}
                                        </div>
                                        <div class="col">
                                            {price.coupenamt <= 0 ?
                                                <button onClick={() => coupenvalidate()} class="btn coupbtnz marbotm">Apply</button> : null}

                                            {price.coupenamt > 0 ?
                                                <button class="btn coupbtnz marbotm" style={{ marginLeft: "4px" }} onClick={() => {
                                                    setCoupentext('')
                                                    var data = { ...price }
                                                    if (deliverytype == "standard") {
                                                        data.grandtotal = Number(total) + Number(data.tax) + Number(data.tip) + Number(data.shipping.standard)
                                                    }
                                                    else {
                                                        data.grandtotal = Number(total) + Number(data.tax) + Number(data.tip) + Number(data.shipping.express)
                                                    }

                                                    data.coupenamt = 0
                                                    setPrice(data)

                                                }} > Clear</button> : null}
                                        </div>

                                    </div>

                                </div>

                            </div>


                            <div class="col-lg-6">
                                {id == "Delivery" ?
                                    <>
                                        <div className='selectdelivery'>
                                            <h4>Select Your Delivery</h4>
                                        </div>
                                        <div class="card">

                                            <div class="chcklabel">
                                                <input type="radio" onChange={(value) => changedelivery(value)} checked={test} name="delivery" value="standard" />
                                                <label class="ml10" style={{ fontWeight: "700" }}>Standard  Delivery  (Within 48 hours)</label>

                                            </div>
                                            <div class="chcklabel">
                                                <input type="radio" onChange={(value) => changedelivery(value)} name="delivery" value="sameday" />
                                                <label class="ml10" style={{ fontWeight: "700" }}>Express Delivery  (Within 24 hours)</label>

                                            </div>

                                        </div>
                                    </> : null}

                                <div class="mt10">
                                    <h4>Cart Total</h4>
                                </div>

                                <div>
                                    <div className='savings' style={{ marginBottom: "10px" }}>
                                        <p className='zoom-in-zoom-out mabo'>Your total savings $ {prodcuctdisc}</p>
                                    </div>
                                </div>


                                <div class="card">

                                    <div class="chcklabelnext">




                                        {/* <div class="row">
                    <div class="col">
                        <h6>
                            Product
                        </h6>                     
                        
                        {cartproducts.map((e,i) => 
                        <>                        <p class="product" style={{ marginBottom:"0px" }}>
                              {e.items.name} ({e.quantity} x {e.item_variant.offerprice})
                        </p>
                        
                        <p style={{ marginBottom:"0px" }}>({e.item_variant.variant_value})</p>
                        </>

                        )}
                    </div>
                    <div class="col">
                        <h6 class="rghtalgn">
                            Total
                        </h6>
                        {cartproducts.map((e,i) => 
                        <p class="productvalue" style={{ marginBottom:"0px" }}>
                            ${e.total_amount}
                        </p>)}

                    </div>
                    

                </div> */}

                                        {cartproducts.map((e, i) =>
                                            <Row>
                                                {/* <Col md={9}> */}
                                                <div className='col-md-9 col-8'>
                                                    <>
                                                        <p class="product" style={{ marginBottom: "0px" }}>
                                                            <span>{e.items.name}</span> <span>({e.item_variant.variant_value})</span> <span>({e.quantity} x {e.item_variant.offer_price ? (e.item_variant.offer_price) : e.item_variant.price})</span>
                                                        </p>

                                                        {/* <p style={{ marginBottom:"0px" }}>({e.item_variant.variant_value})</p> */}
                                                    </>
                                                </div>

                                                {/* </Col> */}
                                                {/* <Col md={3}> */}
                                                <div className='col-md-3 col-4'>
                                                    <p class="productvalue" style={{ marginBottom: "0px" }}>
                                                        ${e.total_amount}
                                                    </p>
                                                </div>
                                                {/* </Col> */}
                                            </Row>
                                        )}


                                        <hr></hr>

                                        <div class="row">
                                            <div class="col">

                                                <h6 class="product">
                                                    Sub Total
                                                </h6>
                                            </div>
                                            <div class="col">

                                                <p class="productvalue" >
                                                    $ {parseFloat(total).toFixed(2)}
                                                </p>

                                            </div>

                                            {price.coupenamt > 0 ?
                                                <div class="row">
                                                    <div class="col">

                                                        <h6 class="product">
                                                            Coupon amount
                                                        </h6>
                                                    </div>
                                                    <div class="col">

                                                        <p class="productvalue" style={{ marginRight: "-20px" }}>
                                                            -  $ {parseFloat(price.coupenamt).toFixed(2)}
                                                        </p>

                                                    </div>

                                                </div> : null}

                                            {price.coupenamt > 0 ?
                                                <div class="row">
                                                    <div class="col">

                                                        <h6 class="product">
                                                            Total
                                                        </h6>
                                                    </div>
                                                    <div class="col">

                                                        <p class="productvalue" style={{ marginRight: "-20px" }}>
                                                            $ {parseFloat(total - (price.coupenamt)).toFixed(2)}
                                                        </p>

                                                    </div>

                                                </div> : null}

                                        </div>
                                        <hr></hr>



                                        {id == "Delivery" ?
                                            <div class="row">
                                                <div class="col">

                                                    <h6 class="product">
                                                        Shipping Fee
                                                    </h6>
                                                </div>
                                                <div class="col">

                                                    <p class="productvalue">
                                                        {deliverytype == "standard" ? (price.shipping.standard > 0 ? $(price.shipping.standard) : "FREE") : ("$" + (price.shipping.express))}
                                                    </p>

                                                </div>
                                                <hr></hr>

                                            </div> : null}


                                        {price.tax > 0 ?
                                            <div class="row">
                                                <div class="col">

                                                    <h6 class="product">
                                                        Tax
                                                    </h6>
                                                </div>
                                                <div class="col">

                                                    <p class="productvalue">
                                                        $ {parseFloat(price.tax).toFixed(2)}
                                                    </p>

                                                </div>
                                                <hr></hr>

                                            </div> : null}




                                        {price.tip > 0 ?

                                            <div class="row">
                                                <div class="col">

                                                    <h6 class="product">
                                                        Tips
                                                    </h6>
                                                </div>
                                                <div class="col">

                                                    <p class="productvalue">
                                                        $ {price.tip}
                                                    </p>

                                                </div>
                                                <hr></hr>

                                            </div> : null}



                                        <div class="row" style={{ marginTop: "10px" }}>
                                            <div class="col">
                                                <h6 style={{ fontSize: "17px" }}>
                                                    Grand Total
                                                </h6>

                                            </div>
                                            <div class="col">
                                                {price.grandtotal > 0 ?
                                                    <>
                                                        <h6 class="rghtalgn" style={{ fontSize: "17px" }}>
                                                            $ {parseFloat(price.grandtotal).toFixed(2)}
                                                        </h6>
                                                    </> :
                                                    <>
                                                        <h6 class="rghtalgn" style={{ fontSize: "17px" }}>
                                                            $ {parseFloat(total).toFixed(2)}
                                                        </h6>
                                                    </>}


                                            </div>
                                        </div>
                                        {/* <div class="row">
                <div class="col">
                    <p class="lastp">
                        *Only upto 25% of this purchase is avail from your store card
                    </p>
                    
                </div>
                
                    

                
             </div> */}



                                    </div>

                                </div>


                                <div class="mt10">
                                    <h4>Payment Method </h4>
                                </div>
                                <div class="card">
                                    <div class="finalpadding">

                                        {/* <div>
                 <button class="paypalbtn">
                    <img  src={require('../../assets/PayPal.png')} alt="" /><span>Checkout</span>
                    </button>  
                    </div> */}


                                        <div>
                                            <PayPalScriptProvider options={{ "client-id": "AQBONCsk5VhOBtZgebchF2fh02BYWOgAUh5LaueuHvllnxK5pfvW1vsw2naDHHJ6SSuJmp9XyM350SQe" }}>
                                                <PayPalButtons forceReRender={[price.grandtotal]}
                                                    createOrder={(data, actions) => {
                                                            var convert = parseFloat(price.grandtotal).toFixed(2)
                                                            var convert1 = parseFloat(total).toFixed(2)

                                                           console.log("convert",convert)
                                                           console.log("convert1",convert1)

                                                        return actions.order.create({
                                                            purchase_units: [
                                                                {
                                                                    amount: {
                                                                        value: parseFloat(price.grandtotal).toFixed(2)
                                                                    },
                                                                },
                                                            ],
                                                        });
                                                    }}
                                                    onApprove={(data, actions) => {
                                                        return actions.order.capture().then((details) => {
                                                            if (details.status == "COMPLETED") {
                                                                // var data={
                                                                //     payid:details.id,
                                                                //     transferid:details.purchase_units[0].payments.captures[0].id
                                                                // }
                                                                // payapalorder(data)

                                                                const token = localStorage.getItem("user_token");


                                                                if (id == "Pickup") {


                                                                    var pickupdata = localStorage.getItem("Pickup_data")
                                                                    var data = JSON.parse(pickupdata)
                                                                    const token = localStorage.getItem("user_token");

                                                                    var str = moment(data.date).format('MM-DD-YYYY')
                                                                    console.log("Final", str)
                                                                    var reqdata = {
                                                                        "location_mode": "Pickup",
                                                                        "pickup_location": data.address,
                                                                        "pickup_date": str,
                                                                        "pickup_time": data.time,
                                                                        "payment_type": "Paypal",
                                                                        "transferid": details.purchase_units[0].payments.captures[0].id,
                                                                        "payid": details.id,
                                                                    }





                                                                }
                                                                else {
                                                                    var reqdata = {
                                                                        "location_mode": (id == "Pickup" ? "Pickup" : "Delivery"),
                                                                        "tip_amount": Number(price.tip),
                                                                        "d_type": deliverytype,
                                                                        "payment_type": "Paypal",
                                                                        "transferid": details.purchase_units[0].payments.captures[0].id,
                                                                        "payid": details.id,
                                                                    }
                                                                }




                                                                axios({
                                                                    url: `${SUBMITORDER}`,
                                                                    method: "post",
                                                                    data: reqdata,
                                                                    headers: {
                                                                        'Content-Type': 'application/json',
                                                                        Authorization: "Bearer " + token

                                                                    },

                                                                })
                                                                    .then(function (response) {
                                                                        console.log(response.data, "postalldetailspostalldetailspostalldetails")
                                                                        if (response.data.message == "Order created successfully") {
                                                                            swal({
                                                                                title: "Order booked Successfully",
                                                                                icon: "success",
                                                                                timer: 4000
                                                                            })
                                                                            setTimeout(() => {
                                                                                window.location = '/orderhistory'
                                                                            }, 1000)

                                                                        }
                                                                    })

                                                            }

                                                        })
                                                            .catch((err) => {
                                                                console.log("Error on paypal side", err)
                                                            })


                                                    }}
                                                />
                                            </PayPalScriptProvider>
                                        </div>
                                        {/* 
                    <div>
                 <button class="Debitcardbtn" onclick="openForm()">
                   <img src={require('../../assets/debitcard.png')}  alt="" />
                   
                </button> 
                </div> */}


                                        {/* <div class="ttttt">
                 <span class="paypalspan"> 
                    Powered by <span class="payclr">Pay</span><span class="palclr">Pal</span>
                 </span>
                </div> */}

                                        <div>
                                            {/* <button class="payatdelbtn" onclick="openForm()">
                    <img src={require('../../assets/home.png')} style={{ width:"22px" }}  alt="" /> <span class="ml5px">Pay at the time of Delivery</span>
                    
                 </button>  */}
                                            <div className='paylabel'>
                                                <input type="checkbox" class="largerCheckbox" id="vehicle1" name="vehicle1" onClick={(e) => checkvalidate(e)} />
                                                <label for="vehicle1" style={{ marginLeft: "10px" }}> {id == "Delivery" ? "Pay at the time of Delivery" : "Pay at the time of Pickup"}</label>
                                            </div>
                                        </div>
                                        {/* <!-- <div class="payattime">
                    <input type="checkbox">
                    <label>Pay at the time of Delivery</label>
                </div> --> */}


                                    </div>



                                </div>

                                <div class="row">
                                    {check ?
                                        <div class="col">
                                            <button onClick={() => placeorder()} class="lst3btn" >Place Order </button>
                                        </div> :
                                        <div class="col">
                                            <label class="lst3btn1" >Place Order</label>
                                        </div>}

                                    <div class="col">
                                        <Link onClick={() => history(-1)}><button class="lst3btn" >Back To Cart </button></Link>
                                    </div>

                                    <div class="col">
                                        <Link onClick={() => window.location = "/"}><button class="lst3btn" >Continue Shopping </button></Link>
                                    </div>
                                </div>

                            </div>



                        </div>





                    </div>


                    {/* </div> */}




                </section>

                {/* 
<!-- Check Out Page Section Ends --> */}


            </div>













        </>
    );
}