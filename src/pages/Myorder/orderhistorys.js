import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './myorder.css'

import Sidebars from './sidebar';


import { orderdatas } from '../../Api/orderhistory';

import { orderagaindatas } from '../../Api/orderagain';

import { cancelorderdatas, cancelordertriggerdatas } from '../../Api/cancelorder';
import Header from '../../layouts/Header/header';
import swal from "sweetalert";
import { fetchhomeproducts } from '../../Slices/homeproducts';
import { useDispatch } from 'react-redux';
import { fetchcart } from '../../Slices/fetchcart';
import { Circles } from 'react-loader-spinner';



export default function Orderhistorys() {

  const dispatch = useDispatch()

  useEffect(() => {

    getorders()
    setloading(true)
    //  getcart()
    // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  //    const getcart = () => {
  //   const token = localStorage.getItem("user_token");
  //   dispatch(fetchcart(token))
  // }
  const [loading, setloading] = useState(false)

  const [orderindex, setOrderindex] = useState(0);

  const [orderhistory, setorderhistory] = useState([]);
  const [cancelorderhistory, setcancelorderhistory] = useState([]);

  const [cancelremoveorder, setcancelremoveorder] = useState([]);

  const getorders = async () => {

    const token = localStorage.getItem("user_token");
    console.log("haiiiiii", token)
    // settokens(token)
    // console.log("ordersss",orders)
    const orderlist = await orderdatas(token)
    setloading(false)
    console.log("orderlistorderlist", orderlist.orders)
    var data = orderlist.orders.filter(e => {
      if (e.status != "Cancelled")
        return e
    })
    // console.log("pleaseeeee",data)
    setorderhistory(data)

    const cancelorderlist = await cancelorderdatas(token)
    console.log("cancelorderlist", cancelorderlist.orders.data)
    setcancelorderhistory(cancelorderlist.orders.data)

    var data = []
    dispatch(fetchhomeproducts(data))

  }



  const cancelorders = async () => {
    var id = orderhistory[orderindex].id
    console.log("idddd", id)
    const token = localStorage.getItem("user_token");
    console.log("test", orderindex)
    const cancelordering = await cancelordertriggerdatas(id, token)

    if (cancelordering.message == "Order cancelled !") {
      window.location.reload()
      swal({
        title: "Order cancelled !",
        icon: "success",
        timer: 2000
      })

    }
    // window.location = "/canceldetail"

  }


  const orderagainlist = async (id) => {
    const token = localStorage.getItem("user_token");
    const orderagainz = await orderagaindatas(token, id)
    console.log("orderagainzlist", orderagainz)
    dispatch(fetchcart(token, 'initial'))

    window.location = "/cart"
  }



  const vieworderdetails = (id) => {

    window.location = "/vieworderdetail/" + id

  }
  const [order, setOrder] = useState(false)

  return (

    <>


      <Header />

      <div className='allbody'>
        <div>


          <Container>

            <Row>

              <Col md={4}>

                <Sidebars />

              </Col>

              <Col md={8}>
                <div class="tab-pane fade show active myorder" id="v-pills-ordershistory" role="tabpanel" aria-labelledby="v-pills-ordershistory-tab">
                  <ul class="nav nav-pills mb-4 mt10" id="pills-tab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" id="pills-orders-tab" data-toggle="pill" href="#pills-orders" role="tab" aria-controls="pills-orders" aria-selected="true">Recent Orders</a>
                    </li>
                    {/* <li class="nav-item">
                      <a class="nav-link" id="pills-recentorders-tab" data-toggle="pill" href="#pills-recentorders" role="tab" aria-controls="pills-recentorders" aria-selected="false"> Orders</a>
                    </li> */}
                    <li class="nav-item">
                      <a class="nav-link" id="pills-canceledOrders-tab" data-toggle="pill" href="#pills-canceledOrders" role="tab" aria-controls="pills-canceledOrders" aria-selected="false">Cancelled Orders</a>
                      {/* onClick={()=> cancelorder()} */}
                    </li>
                  </ul>
                  <div class="tab-content overflow ordertable" id="v-pills-tabContent">
                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                      <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-orders" role="tabpanel" aria-labelledby="pills-orders-tab">

                           {loading ?
                                    <div className='loaderss'>
                                        <Circles style={{ justifyContent: "center" }} color="#0c3270" height={100} width={100} />
                                    </div> : 
<div>
                          {!orderhistory.length ?
                            <div className='firstsearch'>
                              <img style={{ height: "450px" }} src={require('../../assets/product-not-found.jpg')} class="img-fluid" alt="" />
                              {/* <h1>Searching...</h1> */}
                            </div> :
                            <table class="table table-bordered table-responsive-sm">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Order ID</th>
                                  <th scope="col">Date</th>
                                  <th scope="col">Total</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>

                              <tbody>
                                {orderhistory.map((e, i) =>
                                  <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{e.id}</td>
                                    <td>{e.created_at}</td>
                                    <td>$ {e.grand_total} for {e.order_list_count} item(s)</td>

                                    <td><button class={e.status == 'Received' ? "greenbtn" : e.status == "Cancelled" ? "redbtn" : e.status == "Confirmed" ? "bluebtn" : e.status == "Prepared" ? "rosebtn" : e.status == "Delayed" ? "graybtn" : e.status == "Delivered" ? "brownbtn" : "blackbtn"}>{e.status}</button></td>

                                    <td>
                                      {/* <a href='/vieworderdetail'> */}
                                      <button class="viewbtn" onClick={() => vieworderdetails(e.id)}>View</button>
                                      {/* </a>  */}
                                      <button type="button" onClick={() => orderagainlist(e.id)} class="orderagaingreen">Order again</button>

                                      {!(e.status == "Cancelled") ?
                                        <button onClick={() => setOrderindex(i)} type="button" class="deletebtn" data-toggle="modal" data-target="#exampleModalCenter4">Cancel</button> :
                                        <button disabled type="button" class="deletebtnz" data-toggle="modal"  >Cancel</button>}

                                      <div class="modal fade" id="exampleModalCenter4" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                          <div class="modal-content">
                                            <div class="modal-header">
                                              <h5 class="modal-title" id="exampleModalLongTitle">Confirm</h5>
                                              <button type="button" style={{ border: "1px", background: "white" }} class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true" style={{ fontSize: "30px" }}>&times;</span>
                                              </button>
                                            </div>
                                            <div class="modal-body">
                                              Are you sure want to cancel the order?
                                            </div>
                                            <div class="modal-footer">
                                              <button type="button" class="tabbtn" onClick={() => cancelorders()} data-dismiss="modal">Yes</button>
                                              {/* <button onClick={() => cancelorders()} type="button" class="tabbtn">No</button> */}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                    </td>
                                  </tr>

                                )}



                              </tbody>

                            </table>
                          }
          </div>
            }

                        </div>





                        <div class="tab-pane fade" id="pills-canceledOrders" role="tabpanel" aria-labelledby="pills-canceledOrders-tab">
                        {loading ?
                                    <div className='loaderss'>
                                        <Circles style={{ justifyContent: "center" }} color="#0c3270" height={100} width={100} />
                                    </div> : 
                       <div>
                          {!cancelorderhistory.length ?
                            <div className='firstsearch'>
                              <img style={{ height: "450px" }} src={require('../../assets/product-not-found.jpg')} class="img-fluid" alt="" />
                              {/* <h1>Searching...</h1> */}
                            </div> :
                            <table class="table table-bordered">
                              <thead>

                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Order ID</th>
                                  <th scope="col">Date</th>
                                  <th scope="col">Total</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {cancelorderhistory.map((e, i) =>
                                  <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{e.id}</td>
                                    <td>{e.created_at}</td>
                                    <td>$ {e.grand_total} for {e.order_list_count} item(s)</td>
                                    <td><button class="redbtn">{e.status}</button></td>
                                    <td>
                                      {/* <a href='/vieworderdetail'> */}
                                      <button class="viewbtn" onClick={() => vieworderdetails(e.id)}>View</button>
                                      {/* </a>  */}
                                      {/* <a href='/buyagain'> */}
                                      <button type="button" onClick={() => orderagainlist(e.id)} class="greenbtn" style={{ marginLeft: "10px" }}>Order again</button>
                                      {/* </a> */}
                                    </td>
                                  </tr>
                                )}

                              </tbody>
                            </table>
                          }
                           </div>
}
                        </div>
                      </div>
                      {/* <button class="continuebtn">Continue Shopping</button> */}
                    </div>
                  </div>
                </div>

              </Col>

            </Row>
          </Container>



        </div>

      </div>



    </>
  );

}