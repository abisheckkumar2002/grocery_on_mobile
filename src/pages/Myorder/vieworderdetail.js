import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './myorder.css'
import { useNavigate, useParams } from "react-router-dom";
import Sidebars from './sidebar';


import { vieworderhistory } from '../../Api/orderviewdetail';
import  Header  from '../../layouts/Header/header';
import { downloadinvoice } from '../../Api/orderhistory';
import { IMAGE_URL } from '../../Constant';


export default function Vieworderdetail() {

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    getorderviewdetail()
    getinvoice()
  }, []);

  const { id } = useParams();

  const [viewhistory, setviewhistory] = useState({})
  const [viewhistory1, setviewhistory1] = useState({})
 
  const [pdf, setPef] = useState('')
  const [vieworderlist, setvieworderlist] = useState([])

  const [vieworderlistz, setvieworderlistz] = useState([])

  const [subTotal, setSubTotal] = useState("")

  const getorderviewdetail = async () => {

    const token = localStorage.getItem("user_token");
    console.log("ppppp", token)

    console.log(id, "kkk")

    const hariorder = await vieworderhistory(id, token)
    console.log("ohistoryy", hariorder.orders)
    setviewhistory1(hariorder.orders.user)
    setviewhistory(hariorder.orders)
    console.log("plplpl", hariorder.orders.order_list)

  //   var subTotal = 0;
  //   for (i = 0; i < hariorder.orders.order_list.length; i++) {
  //     subTotal +=Number( hariorder.orders.order_list[i].itemtotal);
  //   }
  //  console.log("kkiii", hariorder.orders.order_list[0].itemtotal)
  //   setSubTotal(subTotal)


  // let result = data.reduce((a, b) => {
  //   return a + b;
  // });



    setvieworderlist(hariorder.orders.order_list)
    // setvieworderlistz(hariorder.orders.order_list)
    // console.log("jok", hariorder.orders.order_list)
  }
  const getinvoice = async() => {
    const token = localStorage.getItem("user_token");
    const output = await downloadinvoice(token,id)
    setPef(output.invoive_name)
    // console.log("ajeee",output.invoice_path)
  }
  return (

    <>
<Header/>

<div className='allbody'>

      <div className='myorder myorder1'>


        <Container>

          <Row>

            <Col md={4}>
              <Sidebars />
            </Col>


            <Col md={8}>
              {viewhistory.status == "Confirmed" ?
            <a href={`${IMAGE_URL}`+pdf} class="btn button ggg" download><i class="fa fa-download"></i>  Download Order Detail</a>:null}
              <div class="row">
                <div class="col-lg-6">
                  <div>
                    <h2 className='orderdetailss'>
                      Order Details :
                    </h2>
                  </div>
                  <div>
                    <table class="table table-bordered">

                      <tbody>
                        <tr>

                          <td className='freebold'>Order ID</td>
                          <td>{viewhistory.id}</td>

                        </tr>
                        <tr>

                          <td className='freebold'>Order Status</td>
                          {/* <td><button class="greenbtn">Received</button></td> */}
                          <td><button class={viewhistory.status  == 'Received' ? "greenbtn" : viewhistory.status == "Cancelled" ? "redbtn" : viewhistory.status == "Confirmed" ? "bluebtn" : viewhistory.status == "Prepared" ? "rosebtn" : viewhistory.status == "Delayed" ? "graybtn" :  viewhistory.status == "Delivered" ? "brownbtn" :"blackbtn"}>{viewhistory.status}</button></td>


                        </tr>
                        <tr>

                          <td className='freebold'>Date</td>
                          {/* <td>02-08-2022</td> */}
                          <td>{viewhistory.created_at}</td>

                        </tr>

                        <tr>
                     
                          <td className='freebold'>Total Products</td>
                          <td>{vieworderlist.length}</td>


                        </tr>
                        <tr>

                          <td className='freebold'>Subtotal</td>
                          <td>${viewhistory.sub_total}</td>


                        </tr>
                        <tr>

                          <td className='freebold'>Order Total</td>
                          {/* <td>$9.93</td> */}
                          <td>${viewhistory.grand_total}</td>

                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>


                <div class="col-lg-6">
                  <div>
                    <h2 className='orderdetailss'>
                      Shipping Details :
                    </h2>
                  </div>
                  <div>
                    <table class="table table-bordered">

                      <tbody>
                        <tr>

                          <td className='freebold'>Name</td>
                          {/* <td>satheesh</td> */}
                          <td>{viewhistory1.full_name}</td>


                        </tr>
                        <tr>

                          <td className='freebold'>Mobile</td>
                          {/* <td>6381223293</td> */}
                          <td>{viewhistory1.mobile}</td>


                        </tr>
                        <tr>

                          <td className='freebold'>Mode of Shipping</td>
                          {/* <td>Pickup</td> */}
                          <td>{viewhistory.location_mode}</td>

                        </tr>
                        {
                          viewhistory.location_mode=="Delivery"?

                        <tr>

                          <td className='freebold'>Delivery Type</td>

                          <td>{viewhistory.delivery_type}</td>
                        </tr>
                        :null}
                        {
                          viewhistory.location_mode=="Delivery"?

                        <tr>

                          <td className='freebold'>Address</td>

                          <td>{viewhistory.address1}</td>

                        </tr>:null}
                        {
                          viewhistory.location_mode=="Delivery"?

                        <tr>

                          <td className='freebold'>Area</td>

                          <td>{viewhistory.address2}</td>

                        </tr>:null}
                        {
                          viewhistory.location_mode=="Delivery"?

                        <tr>

                          <td className='freebold'>City</td>

                          <td>{viewhistory.city}</td>
                        </tr>
                        :null}
                         {
                          viewhistory.location_mode=="Delivery"?

                        <tr>

                          <td className='freebold'>state</td>

                          <td>{viewhistory.state}</td>
                        </tr>
                         :null}
                            {
                          viewhistory.location_mode=="Delivery"?

                        <tr>

                          <td className='freebold'>zipcode</td>

                          <td>{viewhistory.zipcode}</td>
                        </tr>   :null}

                      </tbody>
                    </table>
                  </div>
                </div>

              </div>



   

              <div>
                <h2 className='orderdetailss'>
                  Item Details :
                </h2>
              </div>


              <div>


                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th >Product</th>
                      <th >Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vieworderlist.map((e, i) =>
                      <tr>
                        <td>{e.item.name}</td>
                        <td><span>$ {e.item_price}</span></td>
                        <td>{e.quantity}</td>
                        <td>$ {e.total}</td>
                      </tr>
                    )}

                  </tbody>
                  <tfoot class="text-right">
                    <tr>
                      <td colspan="3" className='freebold' style={{ textAlign: "end" }}>Sub total</td>
                      <td>$ {viewhistory.sub_total}</td>
                    </tr>
                    {viewhistory.shipping_charge>0?
                    <tr>
                      <td className='freebold' colspan="3" style={{ textAlign: "end" }}>Delivery Charge</td>
                      <td>$ {viewhistory.shipping_charge}</td>
                    </tr>:null}

                    {viewhistory.coupon_price>0?
                    <tr>
                      <td className='freebold' colspan="3" style={{ textAlign: "end" }}>Coupon Amount</td>
                      <td>- $ {viewhistory.coupon_price}</td>
                    </tr>:null}

                    {viewhistory.tip_amount>0?
                    <tr>
                      <td className='freebold' colspan="3" style={{ textAlign: "end" }}>Tip</td>
                      <td>$ {viewhistory.tip_amount}</td>
                    </tr>:null}

                    <tr>
                      <td className='freebold' colspan="3" style={{ textAlign: "end" }}>Order Total</td>
                      <td>$ {viewhistory.grand_total}</td>
                    </tr>
                  </tfoot>
                </table>


              </div>



{/*         
              <div>
                <h2>
                Payment Details:
                </h2>
              </div> */}

              <div>

              {viewhistory.payment_type=="Paypal"?
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th >Payment Type</th>
                      <th >Transfer id</th>
                      <th>Paypal status</th>
                    </tr>
                  </thead>
                  <tbody>
              
                      <tr>
                        <td>{viewhistory.payment_type}</td>
                        <td><span>{viewhistory.transfer_id}</span></td>
                        <td>{viewhistory.paypal_status}</td>
                      </tr>
                  </tbody>
                 
                </table>:null}


              </div>


            </Col>

          </Row>
        </Container>







      </div>



      </div>



    </>
  );


}