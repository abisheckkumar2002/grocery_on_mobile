// import React, { useEffect,useState } from 'react';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux';
// import { IMAGE_URL } from '../../Constant';
// import { cartSelector, fetchcart } from '../../Slices/fetchcart';
// import './cart.css'

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_CART, IMAGE_URL } from '../../Constant';
import { Addtocart, cartSelector, deletecart, deletecartproducts, emptycart, fetchcart, updatecartproducts, updatemaincart } from '../../Slices/fetchcart';
import './cart.css'

import { Link } from "react-router-dom";
import { getaddressdatas } from '../../Api/addresslist';


import Header from '../../layouts/Header/header';
import { addaddressdatas } from '../../Api/addaddress';
import { async } from 'q';
import { updateaddressdatas } from '../../Api/updateaddress';
import { MdOutlineDelete } from 'react-icons/md';
import { updatewithcart } from '../../Slices/homeproducts';
import moment from 'moment';
import axios from 'axios';
import { Circles } from 'react-loader-spinner'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function Cart() {

    const [change123, setChange123] = useState(false)
    // const [ndate,setNdate]=useState(new Date())
    const [pickupdata, setPickupdata] = useState({
        address: '',
        date: '',
        time: ''
    })

    const [pickuperror, setPickuperror] = useState({
        address: false,
        date: false,
        time: false
    })

    useEffect(() => {
        var str = moment(new Date()).format('YYYY-MM-DD')
        console.log("test", str)
        getuseraddress()
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [change123]);


    const initialFormValue = {
        type:"",
        address1: "",
        address2: "",
        state: "",
        city: "",
        zipcode: ""
    };

    const [validateError, setValidateError] = useState({});
    console.log(validateError, "hhjgjh")
    const [formValue, setFormValue] = useState(initialFormValue);

    const onChange = (e) => {
        e.preventDefault();
        // console.log(e.target);
        const { id, value } = e.target;
        let formData = { ...formValue, ...{ [id]: value } };
        setFormValue(formData);
        console.log(formValue);


        //setValidateError(formData)
    };


    const {
        type,
        address1,
        address2,
        state,
        city,
        zipcode
    } = formValue;


    const updatecart = (value, index) => {
        const token = localStorage.getItem("user_token");
        if (value == 'decrement') {

            var send = {
                value: index,
                key: "decrement"
            }
            dispatch(updatecartproducts(send))
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

            var send = {
                value: index,
                key: "increment"
            }
            dispatch(updatecartproducts(send))



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

    const { cartproducts, total } = useSelector(cartSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem("user_token");
        dispatch(fetchcart(token, 'initial'))

    }, []);

    let [count, setCount] = useState(0);

    function incrementCount() {
        count = count + 1;
        setCount(count);
    }
    function decrementCount() {
        count = count - 1;
        setCount(count);
    }

    const [loading, setloading] = useState("")

    const [addresslist, setAddresslitst] = useState([])
    const [oldaddress, setOldaddress] = useState({})

    const [mode, setMode] = useState('Delivery')

    const getuseraddress = async () => {

        const token = localStorage.getItem("user_token");
        console.log("adddddddd", token)

        setloading(true)
        const hariaddress = await getaddressdatas(token)
        setloading(false)
        setAddresslitst(hariaddress.address)
        const sandy = hariaddress.address.find(e => {
            if (e.status == "Active")
                return e
        })
        if (sandy) {
            setFormValue(sandy)
            setOldaddress(sandy)
        }
        else {
            setFormValue({})
        }

    }

    const Addaddress = async () => {
        const token = localStorage.getItem("user_token");
        const addregister = await addaddressdatas(token, formValue)
        // console.log("please",addregister.errors)
        if (addregister.errors) {
            setValidateError(addregister.errors);

        }
        else {
            if (change123) {
                setChange123(false)
            }
            else {
                setChange123(true)
            }
            swal({
                title: "Address added Successfully",
                icon: "success",
                timer: 4000
            })
            setValidateError('')
        }
    }



    const ckeckout = async () => {
        if ((formValue.address1 != oldaddress.address1) || (formValue.address2 != oldaddress.address2) || (formValue.city != oldaddress.city) || (formValue.state != oldaddress.state) || (formValue.zipcode != oldaddress.zipcode)) {
            const token = localStorage.getItem("user_token");
            const resonse = await updateaddressdatas(oldaddress.id, formValue, token)
            console.log("please", resonse)
            if (resonse.message == "address updated successfully") {

                window.location = "/checkout/" + "Delivery"
            }
        }
        else {
            window.location = "/checkout/" + "Delivery"
        }
    }
    const pickupcheckout = (e) => {
        if ((!pickupdata.address) && (!pickupdata.date) && (!pickupdata.time)) {
            var error = { ...pickuperror }
            error.address = true,
                error.date = true,
                error.time = true
            setPickuperror(error)
        }
        else if (!pickupdata.address) {
            var error = { ...pickuperror }
            error.address = true,
                setPickuperror(error)
        }
        else if (!pickupdata.date) {
            var error = { ...pickuperror }
            error.date = true,
                setPickuperror(error)
        }
        else if (!pickupdata.time) {
            var error = { ...pickuperror }
            error.time = true
            setPickuperror(error)
        }
        else {
            var data = JSON.stringify(pickupdata)
            localStorage.setItem("Pickup_data", data)
            window.location = "/checkout/" + "Pickup"
        }
    }


    const pickup_data = (e, type) => {
      
        switch (type) {

            case "address":
                var data = { ...pickupdata }
                data.address = e.target.value
                setPickupdata(data)

                var error = { ...pickuperror }
                error.address = false
                setPickuperror(error)
                break;

            case "date":
               
                var data = { ...pickupdata }
                data.date = e

                setPickupdata(data)
                var error = { ...pickuperror }
                error.date = false
                setPickuperror(error)
                break;

            case "time":
                var data = { ...pickupdata }
                data.time = e.target.value
                setPickupdata(data)
                var error = { ...pickuperror }
                error.time = false
                setPickuperror(error)
                break;

        }

    }


    const deleteproducts = (index) => {

        dispatch(deletecart(index))
        const token = localStorage.getItem("user_token");


        //Decrease home products quantity
        var update = {
            cartdata: cartproducts,
            position: index,
            value: 'delete'
        }
        dispatch(updatewithcart(update))

        //Decrease apicall products quantity
        var data = {
            token: token,
            id: cartproducts[index].cart_id
        }

        dispatch(deletecartproducts(data))

    }



    const emptycart123 = async () => {
        dispatch(emptycart())
        const token = localStorage.getItem("user_token");
        try {
            const response = await axios({
                url: `${EMPTY_CART}`,
                method: "delete",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
                },
            })
            console.log("datata", response.data)
        }
        catch (err) {
            console.log("ERROR", err)
        }

    }





    return (
        <>

            <Header />

            <div className='allbody'>


            {loading ?
                                        <div className='loaderss'>
                                        <Circles style={{ justifyContent:"center" }}  color="#0c3270" height={100} width={100} />
                                        </div>:

            <div>
                {cartproducts.length ?
                    <>
                        {/* <!-- Cartsection --> */}
                        <section class="cartsection cardsection checkout">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-8 ">
                                        <div class="card">
                                            <div>
                                                <h4>
                                                    Shopping Cart
                                                </h4>
                                            </div>

                                            {/* <div class="row">
                         <div class="col-lg-3 col-md-3 col-sm-3 col-xs-4 txtalign">
                            <h6 className='detailzz'>Image</h6>
                         </div>
                         <div class="col-lg-3 col-md-4 col-sm-3 col-xs-4 ">
                         <h6 className='detailzz'>Product Details</h6>
                         </div>
                         <div class="col-lg-2 col-md-5 col-sm-6 col-xs-4">
                         <h6 className='detailzz'>Price</h6>
                         </div>
                         <div class="col-lg-2 col-md-5 col-sm-6 col-xs-4">
                         <h6 className='detailzz'>Quantity</h6>
                         </div>
                         <div class="col-lg-2 col-md-5 col-sm-6 col-xs-4">
                         <h6 className='detailzz'>Remove</h6>
                         </div>
                            </div>  */}

                                            <div class="col-lg-12  padding20 overfloww">
                                                {cartproducts.map((e, i) =>
                                                    <div class="comtainer">


                                                        {/* <table class="table">
  <thead>
    <tr>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
      <th scope="col">Handle</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
  {cartproducts.map((e, i) =>
    <tr>
      <th scope="row"> <img  className='ko' src={URL=`${IMAGE_URL}`+e.items.image} /></th>
      <td> <h6>
                              {e.items.name}
                            </h6>
                            <div class="">
                            <span class="marl10"> ({e.item_variant.variant_value})</span>
                            <div>
                            <span class="marl10"> ({e.quantity} x {e.item_variant.offerprice})</span>
                            </div>
                        </div>
                            </td>
      <td> <b>${e.total_amount}</b></td>
      <td> <div class="">
                            <button class="cartbtn1st" onClick={() => updatecart ('decrement',i)}>-</button>
                       
                       <span class="cartbtn2rd" style={{ padding:"0px 6px" }}>{e.quantity}</span>
                       <button class="cartbtn3rd" onClick={() => updatecart('increment',i)}>+</button>
                                
                            </div></td>
                            <td>  <div onClick={() => deleteproducts(i)} class="col-lg-2 col-2">
                        <MdOutlineDelete className='mdoutline'/>
                        </div></td>
    </tr>
  )}
  </tbody>
</table> */}







                                                        <div class="row">
                                                            <div class="col-lg-3 col-md-3 col-4">
                                                                <img className='ko' src={URL = `${IMAGE_URL}` + e.items.image} />

                                                            </div>
                                                            <div class="col-lg-3 col-md-4 col-4">
                                                                <h6>
                                                                    {e.items.name}
                                                                </h6>
                                                                <div class="">
                                                                    <span class="marl10"> ({e.item_variant.variant_value})</span>
                                                                    <div>
                                                                        {e.item_variant.offer_price ?
                                                                            <span class="marl10"> ({e.quantity} x {e.item_variant.offer_price})</span>
                                                                            :
                                                                            <span class="marl10"> ({e.quantity} x {e.item_variant.price})</span>
                                                                        }
                                                                    </div>

                                                                </div>
                                                                {/* <b>${e.total_amount}</b> */}


                                                            </div>

                                                            <div class="col-lg-2 col-md-4 col-4">
                                                                <b>${Number(e.total_amount).toFixed(2)}</b>
                                                            </div>


                                                            <div class="col-lg-3 col-md-5 col-10">
                                                                <div class="">
                                                                    <button class="cartbtn1st" onClick={() => updatecart('decrement', i)}>-</button>

                                                                    <span class="cartbtn2rd" style={{ padding: "0px 6px" }}>{e.quantity}</span>
                                                                    <button class="cartbtn3rd" onClick={() => updatecart('increment', i)}>+</button>


                                                                </div>
                                                            </div>

                                                            <div onClick={() => deleteproducts(i)} class="col-lg-1 col-2">
                                                                <MdOutlineDelete className='mdoutline' />
                                                            </div>


                                                        </div>

                                                        <hr></hr>




                                                    </div>

                                                )}


                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-4 col-md-3 col-5 margin20">
                                                {/* <a class=" contbtn"> Empty Cart </a>  */}
                                                <button onClick={() => emptycart123()} class="btn contbtn redzbtn"> Empty Cart</button>
                                                {/* <a style={{ marginLeft:"10px" }} class="contbtn">Update Cart </a> */}

                                            </div>
                                            {/* <div class="col-lg-4 col-md-4 col-sm-4 col-xs-3 margin20">
                    <a class=" contbtn">Update Cart </a>
        
                </div> */}
                                            <div class="col-lg-8 col-md-8 col-7 margin20" style={{ textAlign:"end", marginLeft:"-4%" }}>
                                                <Link class="btn contbtn" onClick={() => window.location = "/"}><i class="fa fa-arrow-left arrow" aria-hidden="true"></i> Continue Shopping </Link>

                                            </div>
                                        </div>

                                    </div>

                                    <div class="col-lg-4">

                                        {/* <div class="card">
                <label class="marlef">
                    Enter The Coupen Code
                </label>
                <div class="row" style={{ alignItems:"baseline" }}>
                    
                    
                    <div class="col">
                        <input type="text" class="form-control marlef marbotm" id="formGroupExampleInput" placeholder="Code Number " />                      
                    </div>
                    <div class="col">
                        <button class="coupbtn marbotm">Apply</button>
                    </div>

                </div>

            </div> */}
                                        <div class="card padding20">
                                            <div class="cart-summary-line" id="cart-subtotal-products">
                                                <span class="label js-subtotal" style={{ fontWeight: 700 }}>
                                                    {/* {cartproducts.length} items */}
                                                    Cart Total
                                                </span>
                                                <span class="value">
                                                    ${parseFloat(total).toFixed(2)}
                                                </span>
                                            </div>
                                            {/* <div class="cart-summary-line" id="cart-subtotal-products">
                                <span class="label js-subtotal">
                                    Shipping
                                            </span>
                                <span class="value">
                                    $7.00
                                </span>
                                        </div> */}

                                            {/* <div class="borderbtom">

                                            </div> */}
{/* 
                                            <div class="cart-summary-line1" id="cart-subtotal-products">
                                                <span class="label1 js-subtotal">
                                                    Total
                                                </span>
                                                <span class="value1">
                                                    ${parseFloat(total).toFixed(2)}
                                                </span>
                                            </div> */}
                                            {/* <!-- <div class="text-sm-center">
                                                        <a href="https://oceantemplate.com/prestashop/grocery/en/order" class="btn btn-primary">Proceed to checkout</a>
                                                        
                                                      </div> --> */}


                                        </div>




                                        <div class="card padding20" style={{ padding:"10px 10px" }}>
                                        <p className='zoom-in-zoom-out' style={{ marginBottom:"0px", marginTop:"0px" }}> 
                                                *Alert! Our delivery service is currently available only in
                                                MARYLAND
                                                WAHINGTON DC
                                                FAIRFAX COUNTY- VA
                                                LOUDOUN COUNTY - VA
                                                ARLINGTON-VA & ALEXANDRIA-VA.
                                                If you want delivery service to outside of the above location,
                                                please call us at 866-868-8365 before confirming the order.
                                            </p>
                                        </div>




                                        <section class="checkout">
                            {/* <div class="container"> */}
                                <div className='aaa'>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div>
                                                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => setMode("Delivery")} >Delivery</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => setMode("Pickup")} >Pick Up</a>
                                                    </li>
                                                    {/* <!-- <li class="nav-item">
                      <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</a>
                    </li> --> */}
                                                </ul>
                                            </div>
                                            <div class="tab-content" id="pills-tabContent">
                                                <div class="row">

                                                </div>
                                                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                                                    {addresslist.length ?
                                                        <div style={{ textAlign: "end" }} onClick={() => window.location = "/addresslist"}>
                                                            <a  class="addchanges" >Add / Change Address</a>
                                                        </div>: null} 


                                                    <div>
                                                        <div class="row">
                                                            {/* <div class="col-lg-12">
                                  <label>
                                     Address Line 1*
                                  </label>
                                  </div> */}
                                  <div class="col-lg-12">
                                                                <label>
                                                                   Type
                                                                </label>
                                                                <input type="text" class="form-control" placeholder="Ex : Home / Office" id="type" onChange={onChange} value={type} />
                                                                {validateError.type && (
                                                                    <span style={{ color: "red", fontSize: "14px" }}>
                                                                        {validateError.type}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div class="col-lg-12">
                                                                <label>
                                                                    Address Line 1*
                                                                </label>
                                                                <input type="text" class="form-control" placeholder="" id="address1" onChange={onChange} value={address1} />
                                                                {validateError.address1 && (
                                                                    <span style={{ color: "red", fontSize: "14px" }}>
                                                                        {validateError.address1}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div class="col-lg-12">
                                                                <label>
                                                                    Address Line 2
                                                                </label>
                                                                <input type="text" class="form-control" placeholder="" id="address2" onChange={onChange} value={address2} />
                                                                {validateError.address2 && (
                                                                    <span style={{ color: "red", fontSize: "14px" }}>
                                                                        {validateError.address2}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div>
                                                                    <label>
                                                                        City*
                                                                    </label>

                                                                    <input type="text" class="form-control" placeholder="" id="city" onChange={onChange} value={city} />
                                                                    {validateError.city && (
                                                                        <span style={{ color: "red", fontSize: "14px" }}>
                                                                            {validateError.city}
                                                                        </span>
                                                                    )}
                                                                </div>

                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div>

                                                                    <label>
                                                                        State*
                                                                    </label>


                                                                    <input type="text" class="form-control" placeholder="" id="state" onChange={onChange} value={state} />
                                                                    {validateError.state && (
                                                                        <span style={{ color: "red", fontSize: "14px" }}>
                                                                            {validateError.state}
                                                                        </span>
                                                                    )}
                                                                </div>

                                                            </div>

                                                        </div>
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div>
                                                                    <label>
                                                                        Zip Code*
                                                                    </label>

                                                                    <input type="text" class="form-control" placeholder="" id="zipcode" onChange={onChange} value={zipcode} />
                                                                    {validateError.zipcode && (
                                                                        <span style={{ color: "red", fontSize: "14px" }}>
                                                                            {validateError.zipcode}
                                                                        </span>
                                                                    )}
                                                                </div>

                                                            </div>
                                                            <div class="col-lg-12">

                                                                {addresslist.length ?
                                                                    <div>

                                                                        <button onClick={() => ckeckout()} style={{ marginTop: "0%" }} class="applybtn mediamt20" type='button'>Check out</button>
                                                                    </div> :
                                                                    <div>

                                                                        <button onClick={() => Addaddress()} style={{ marginTop: "0%", width: "100%" }} class="applybtn mediamt20" type='button'>Add address</button>
                                                                    </div>}

                                                            </div>

                                                        </div>




                                                    </div>


                                                </div>






                                                <div class="tab-pane fade pickupp" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                    <div>
                                                        <div class="row">
                                                            <div class="col-lg-12">
                                                                <label>
                                                                    Pickup Location*
                                                                </label>
                                                            </div>
                                                            <div class="col-lg-12">
                                                                {/* <select onChange={(value) => pickup_data(value,"address")} class="" name="data[Order][pickup_location]"> */}
                                                                <select onChange={(value) => pickup_data(value, "address")} class="" name="data[Order][pickup_location]">
                                                                    <option value="" selected="" disabled="">Select your location <i class="fa fa-caret-down" aria-hidden="true"></i></option>
                                                                    <option value="kalpana bazaar 25 waveley">Kalpana Bazaar 45 Waverley Dr STE N Frederick, MD 21702</option>
                                                                    <option value="12 PM-3 PM">Kalpana Bazaar 337 Hospital Dr STE T Glen Burnie, MD 21061</option>

                                                                </select>
                                                                {pickuperror.address ?
                                                                    <label className='error' >
                                                                        please select the location*
                                                                    </label> : null}
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div>
                                                                    <label>
                                                                        Pickup Date*
                                                                    </label>
                                                                    {/* min="2023-02-18"  */}
                                                                    <DatePicker
                                                                    selected={pickupdata.date}
                                                                    onChange={(e) => pickup_data(e, "date")}
                                                                    minDate={new Date()}
                                                                    placeholderText="Select a day"
                                                                        />
                                                                    {/* <input type="date" onChange={(e) => pickup_data(e, "date")} class="form-control" id="formGroupExampleInput" placeholder="Pickup Date " /> */}
                                                                    {pickuperror.date ?
                                                                        <label className='error'>
                                                                            please select the date *
                                                                        </label> : null}
                                                                </div>

                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div>

                                                                    <label>
                                                                        Pickup Time*
                                                                    </label>

                                                                    <div>
                                                                        <select onChange={(e) => pickup_data(e, "time")} class="" name="data[Order][pickup_time]">
                                                                            <option value="" selected="" disabled="">Select your Timing <i class="fa fa-caret-down" aria-hidden="true"></i></option>
                                                                            <option value="9 AM-12 PM">9 AM-12 PM</option>
                                                                            <option value="12 PM-3 PM">12 PM-3 PM</option>
                                                                            <option value="3 PM - 6 PM">3 PM-6 PM</option>
                                                                        </select>
                                                                        {pickuperror.time ?
                                                                            <label className='error' >
                                                                                please select the Time *
                                                                            </label> : null}
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>

                                                        <div class="rghtalgn">
                                                            <button onClick={() => pickupcheckout()} style={{ marginTop: "4%" }} class="applybtn">Check out</button>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* <!-- <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div> --> */}
                                        </div>

                                     
                                    </div>
                                </div>

                            {/* </div> */}

                        </section>






                                    </div>


                                </div>



                            </div>
                        </section>
                        {/* <!-- Cartsection Ends --> */}




                        {/* <!-- Check out Section  --> */}

                        {/* <section class="checkout">
                            <div class="container">
                                <div className='aaa'>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div>
                                                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => setMode("Delivery")} >Delivery</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => setMode("Pickup")} >Pick Up</a>
                                                    </li>
                                                   
                                                </ul>
                                            </div>
                                            <div class="tab-content" id="pills-tabContent">
                                                <div class="row">

                                                </div>
                                                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                                                    {addresslist.length ?
                                                        <div style={{ textAlign: "end" }} onClick={() => window.location = "/addresslist"}>
                                                            <button style={{ marginTop: "2%", width: "38%" }} class="applybtn" type='button'>Change Address</button>
                                                        </div> : null}


                                                    <div>
                                                        <div class="row">
                                                           
                                                            <div class="col-lg-6">
                                                                <label>
                                                                    Address Line 1*
                                                                </label>
                                                                <input type="text" class="form-control" placeholder="addressLine1" id="address1" onChange={onChange} value={address1} />
                                                                {validateError.address1 && (
                                                                    <span style={{ color: "red", fontSize: "14px" }}>
                                                                        {validateError.address1}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <label>
                                                                    Address Line 2*
                                                                </label>
                                                                <input type="text" class="form-control" placeholder="addressLine2" id="address2" onChange={onChange} value={address2} />
                                                                {validateError.address2 && (
                                                                    <span style={{ color: "red", fontSize: "14px" }}>
                                                                        {validateError.address2}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div>
                                                                    <label>
                                                                        City*
                                                                    </label>

                                                                    <input type="text" class="form-control" placeholder="city" id="city" onChange={onChange} value={city} />
                                                                    {validateError.city && (
                                                                        <span style={{ color: "red", fontSize: "14px" }}>
                                                                            {validateError.city}
                                                                        </span>
                                                                    )}
                                                                </div>

                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div>

                                                                    <label>
                                                                        State*
                                                                    </label>


                                                                    <input type="text" class="form-control" placeholder="state" id="state" onChange={onChange} value={state} />
                                                                    {validateError.state && (
                                                                        <span style={{ color: "red", fontSize: "14px" }}>
                                                                            {validateError.state}
                                                                        </span>
                                                                    )}
                                                                </div>

                                                            </div>

                                                        </div>
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div>
                                                                    <label>
                                                                        Zip Code*
                                                                    </label>

                                                                    <input type="text" class="form-control" placeholder="zipcode" id="zipcode" onChange={onChange} value={zipcode} />
                                                                    {validateError.zipcode && (
                                                                        <span style={{ color: "red", fontSize: "14px" }}>
                                                                            {validateError.zipcode}
                                                                        </span>
                                                                    )}
                                                                </div>

                                                            </div>
                                                            <div class="col-lg-6">

                                                                {addresslist.length ?
                                                                    <div>

                                                                        <button onClick={() => ckeckout()} style={{ marginTop: "14%" }} class="applybtn mediamt20" type='button'>Check out</button>
                                                                    </div> :
                                                                    <div>

                                                                        <button onClick={() => Addaddress()} style={{ marginTop: "12%", width: "100%" }} class="applybtn mediamt20" type='button'>Add address</button>
                                                                    </div>}

                                                            </div>

                                                        </div>




                                                    </div>


                                                </div>






                                                <div class="tab-pane fade pickupp" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                    <div>
                                                        <div class="row">
                                                            <div class="col-lg-12">
                                                                <label>
                                                                    Pickup Location*
                                                                </label>
                                                            </div>
                                                            <div class="col-lg-12">
                
                                                                <select onChange={(value) => pickup_data(value, "address")} class="" name="data[Order][pickup_location]">
                                                                    <option value="" selected="" disabled="">Select your location <i class="fa fa-caret-down" aria-hidden="true"></i></option>
                                                                    <option value="kalpana bazaar 25 waveley">Kalpana Bazaar 45 Waverley Dr STE N Frederick, MD 21702</option>
                                                                    <option value="12 PM-3 PM">Kalpana Bazaar 337 Hospital Dr STE T Glen Burnie, MD 21061</option>

                                                                </select>
                                                                {pickuperror.address ?
                                                                    <label className='error' >
                                                                        please select the location*
                                                                    </label> : null}
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div>
                                                                    <label>
                                                                        Pickup Date*
                                                                    </label>
                                                                    <input type="date" onChange={(e) => pickup_data(e, "date")} class="form-control" id="formGroupExampleInput" placeholder="Pickup Date " />
                                                                    {pickuperror.date ?
                                                                        <label className='error'>
                                                                            please select the date *
                                                                        </label> : null}
                                                                </div>

                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div>

                                                                    <label>
                                                                        Pickup Time*
                                                                    </label>

                                                                    <div>
                                                                        <select onChange={(e) => pickup_data(e, "time")} class="" name="data[Order][pickup_time]">
                                                                            <option value="" selected="" disabled="">Select your Timing <i class="fa fa-caret-down" aria-hidden="true"></i></option>
                                                                            <option value="9 AM-12 PM">9 AM-12 PM</option>
                                                                            <option value="12 PM-3 PM">12 PM-3 PM</option>
                                                                            <option value="3 PM - 6 PM">3 PM-6 PM</option>
                                                                        </select>
                                                                        {pickuperror.time ?
                                                                            <label className='error' >
                                                                                please select the Time *
                                                                            </label> : null}
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>

                                                        <div class="rghtalgn">
                                                            <button onClick={() => pickupcheckout()} style={{ marginTop: "4%" }} class="applybtn">Check out</button>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6">

                                            </div>
                                          
                                        </div>

                                        <div class="col-lg-6">
                                            <p>
                                                *Alert! Our delivery service is currently available only in
                                                MARYLAND
                                                WAHINGTON DC
                                                FAIRFAX COUNTY- VA
                                                LOUDOUN COUNTY - VA
                                                ARLINGTON-VA & ALEXANDRIA-VA.
                                                If you want delivery service to outside of the above location,
                                                please call us at 866-868-8365 before confirming the order.
                                            </p>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </section> */}



                        {/* <!-- Check Out Section Ends --> */}

                    </> :

                    <div className='firstsearch'>
                        <img style={{ height: "450px" }} src={require('../../assets/product-not-found.jpg')} class="img-fluid" alt="" />
                    </div>
                }

</div>


            }


            </div>





        </>
    );
}