import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './myorder.css'

import { orderdatas } from '../../Api/orderhistory';

import { cancelorderdatas } from '../../Api/cancelorder';


import  Header  from '../../layouts/Header/header';



export default function Myorder() { 

    useEffect(() => {
      getorders()
        // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    

    const [orderhistory, setorderhistory] = useState([]);
    const [cancelorderhistory, setcancelorderhistory] = useState([]);
  
    const getorders = async () => {

      const token = localStorage.getItem("user_token");
        console.log("haiiiiii", token)
        // settokens(token)
    // console.log("ordersss",orders)
      const orderlist = await orderdatas(token)
      console.log("orderlistorderlist",orderlist.orders.data)
      setorderhistory(orderlist.orders.data)

      // const cancelorderlist = await cancelorderdatas(token)
      // console.log("cancelorderlist",cancelorderlist.orders.data)
      // setcancelorderhistory(cancelorderlist.orders.data)
  }


//  const cancelorder = async() => {
//   alert("testt")
//   // setorderhistory([])
//   // const orderlist = await orderdatas(token,'cancel')
//   // console.log("orderlistorderlist",orderlist.orders.data)
//   // setorderhistory(orderlist.orders.data)
//  }

    return (
        <>
        
        <Header/>

        {/* <!-- My order Section--> */}

<section class="myorder">
    <div class="container">
        <div class="row">
            <div class="col-lg-4">
                <div class="nav flex-column nav-pills bordergray" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a class="nav-link harikrish active" id="v-pills-ordershistory-tab" data-toggle="pill" href="#v-pills-ordershistory" role="tab" aria-controls="v-pills-ordershistory" aria-selected="true"><i class="fa fa-cart-arrow-down"></i><span> Orders History </span></a>
                    <a class="nav-link harikrish" id="v-pills-storecard-tab" data-toggle="pill" href="#v-pills-storecard" role="tab" aria-controls="v-pills-storecard" aria-selected="false"><i class="fa fa-credit-card"></i><span> Store Card </span></a>
                    <a class="nav-link harikrish" id="v-pills-buyagain-tab" data-toggle="pill" href="#v-pills-buyagain" role="tab" aria-controls="v-pills-buyagain" aria-selected="false"><i class="fa fa-cart-plus"></i><span>Buy Again </span></a>
                    <a class="nav-link harikrish" id="v-pills-accountdetails-tab" data-toggle="pill" href="#v-pills-accountdetails" role="tab" aria-controls="v-pills-accountdetails" aria-selected="false"><i class="fa fa-user"></i><span> Account Details </span></a>
                    <a class="nav-link harikrish" id="v-pills-changepassword-tab" data-toggle="pill" href="#v-pills-changepassword" role="tab" aria-controls="v-pills-changepassword" aria-selected="false"><i class="fa fa-key"></i><span> Change Password </span></a>  
                    <a class="nav-link harikrish" id="v-pills-logout-tab" data-toggle="pill" href="#v-pills-logout" role="tab" aria-controls="v-pills-logout" aria-selected="false"><i class="fa fa-sign-out"></i><span> Log Out </span></a>  
                </div>
                  
                   
                  
            </div>
            <div class="col-lg-8">
                <div class="tab-content " id="v-pills-tabContent">
                    <div class="tab-pane fade show active" id="v-pills-ordershistory" role="tabpanel" aria-labelledby="v-pills-ordershistory-tab">
                <ul class="nav nav-pills mb-4 mt10" id="pills-tab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" id="pills-orders-tab" data-toggle="pill" href="#pills-orders" role="tab" aria-controls="pills-orders" aria-selected="true">Orders</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="pills-recentorders-tab" data-toggle="pill" href="#pills-recentorders" role="tab" aria-controls="pills-recentorders" aria-selected="false">Recent Orders</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="pills-canceledOrders-tab" data-toggle="pill" href="#pills-canceledOrders" role="tab" aria-controls="pills-canceledOrders"  aria-selected="false">Cancelled Orders</a>
                      {/* onClick={()=> cancelorder()} */}
                    </li>
                  </ul>
                  <div class="tab-content overflow" id="v-pills-tabContent">
                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                  <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-orders" role="tabpanel" aria-labelledby="pills-orders-tab">
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
{orderhistory.map((e, i) =>
                              <tr>
                                <th scope="row">1</th>
                                <td>{e.orderid}</td>
                                <td>{e.ordertime}</td>
                                <td>$ {e.total} for {e.order_list_count} item(s)</td>
                                <td><button class="greenbtn">{e.status}</button></td>
                                <td>
                                    <a href='/vieworderdetail'><button class="viewbtn">View</button></a> 
                                    <a><button  type="button"  class="deletebtn" data-toggle="modal" data-target="#exampleModalCenter">Cancel Order</button></a>
                                   
                                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Confirm</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                    </div>
                                    <div class="modal-body">
                                        Are you sure want to cancel the order?
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="tabbtn" data-dismiss="modal">Yes</button>
                                    <button type="button" class="tabbtn">No</button>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                               
                                </td>
                              </tr>
   )}   
                              {/* <tr>
                                <th scope="row">2</th>
                                <td>0222001164</td>
                                <td>Feb 08, 2022</td>
                                <td>@$ 9.93 for 2 item(s)</td>
                                <td><button class="graybtn">Delayed</button></td>
                                <td>
                                    <a><button class="viewbtn">View</button></a> 
                                    <a><button class="deletebtn">Cancel Order</button></a>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">3</th>
                                <td>0222001164</td>
                                <td>Feb 08, 2022</td>
                                <td>@$ 9.93 for 2 item(s)</td>
                                <td><button class="greenbtn">Received</button></td>
                                <td>
                                    <a><button class="viewbtn">View</button></a> 
                                    <a><button class="deletebtn">Cancel Order</button></a>
                                </td>
                              </tr>


                              <tr>
                                <th scope="row">4</th>
                                <td>0222001164</td>
                                <td>Feb 08, 2022</td>
                                <td>@$ 9.93 for 2 item(s)</td>
                                <td><button class="greenbtn">Received</button></td>
                                <td>
                                    <a><button class="viewbtn">View</button></a> 
                                    <a><button class="deletebtn">CancelOrder</button></a>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">5</th>
                                <td>0222001164</td>
                                <td>Feb 08, 2022</td>
                                <td>@$ 9.93 for 2 item(s)</td>
                                <td><button class="graybtn">Delayed</button></td>
                                <td>
                                    <a><button class="viewbtn">View</button></a> 
                                    <a><button class="deletebtn">Cancel Order</button></a>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">6</th>
                                <td>0222001164</td>
                                <td>Feb 08, 2022</td>
                                <td>@$ 9.93 for 2 item(s)</td>
                                <td><button class="greenbtn">Received</button></td>
                                <td>
                                    <a><button class="viewbtn">View</button></a> 
                                    <a><button class="deletebtn">Cancel Order</button></a>
                                </td>
                              </tr> */}
                            </tbody>
                          </table>
                    </div>
                    <div class="tab-pane fade" id="pills-recentorders" role="tabpanel" aria-labelledby="pills-recentorders-tab"><table class="table table-bordered">
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
                            <th scope="row">1</th>
                            <td>{e.orderid}</td>
                            <td>{e.ordertime}</td>
                            <td>$ {e.total} for {e.order_list_count} item(s)</td>
                            <td><button class="greenbtn">{e.status}</button></td>
                            <td>
                                <a><button class="viewbtn">View</button></a> 
                                <a><button class="deletebtn">CancelOrder</button></a>
                            </td>
                          </tr>
   )}   

                          {/* <tr>
                            <th scope="row">2</th>
                            <td>0222001164</td>
                            <td>Feb 08, 2022</td>
                            <td>@$ 9.93 for 2 item(s)</td>
                            <td><button class="graybtn">Delayed</button></td>
                            <td>
                                <a><button class="viewbtn">View</button></a> 
                                <a><button class="deletebtn">CancelOrder</button></a>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>0222001164</td>
                            <td>Feb 08, 2022</td>
                            <td>@$ 9.93 for 2 item(s)</td>
                            <td><button class="greenbtn">Received</button></td>
                            <td>
                                <a><button class="viewbtn">View</button></a> 
                                <a><button class="deletebtn">CancelOrder</button></a>
                            </td>
                          </tr>


                          <tr>
                            <th scope="row">4</th>
                            <td>0222001164</td>
                            <td>Feb 08, 2022</td>
                            <td>@$ 9.93 for 2 item(s)</td>
                            <td><button class="greenbtn">Received</button></td>
                            <td>
                                <a><button class="viewbtn">View</button></a> 
                                <a><button class="deletebtn">CancelOrder</button></a>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">5</th>
                            <td>0222001164</td>
                            <td>Feb 08, 2022</td>
                            <td>@$ 9.93 for 2 item(s)</td>
                            <td><button class="graybtn">Delayed</button></td>
                            <td>
                                <a><button class="viewbtn">View</button></a> 
                                <a><button class="deletebtn">CancelOrder</button></a>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">6</th>
                            <td>0222001164</td>
                            <td>Feb 08, 2022</td>
                            <td>@$ 9.93 for 2 item(s)</td>
                            <td><button class="greenbtn">Received</button></td>
                            <td>
                                <a><button class="viewbtn">View</button></a> 
                                <a><button class="deletebtn">CancelOrder</button></a>
                            </td>
                          </tr> */}
                        </tbody>
                      </table>
</div>
                    <div class="tab-pane fade" id="pills-canceledOrders" role="tabpanel" aria-labelledby="pills-canceledOrders-tab"><table class="table table-bordered">
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
                          <tr>
                            <th scope="row">1</th>
                            <td>0222001164</td>
                            <td>Feb 08, 2022</td>
                            <td>@$ 9.93 for 2 item(s)</td>
                            <td><button class="greenbtn">Received</button></td>
                            <td>
                                <a><button class="viewbtn">View</button></a> 
                                <a><button class="deletebtn">CancelOrder</button></a>
                            </td>
                          </tr>
                          {/* <tr>
                            <th scope="row">2</th>
                            <td>0222001164</td>
                            <td>Feb 08, 2022</td>
                            <td>@$ 9.93 for 2 item(s)</td>
                            <td><button class="graybtn">Delayed</button></td>
                            <td>
                                <a><button class="viewbtn">View</button></a> 
                                <a><button class="deletebtn">CancelOrder</button></a>
                            </td>
                          </tr> */}
                          {/* <tr> */}
                          
                        </tbody>
                      </table>
</div>
                  </div>
                  <button class="continuebtn">Continue Shopping</button>
            </div>
            </div>
            </div>


            <div class="tab-pane fade" id="v-pills-storecard" role="tabpanel" aria-labelledby="v-pills-storecard-tab">
                <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Type</th>
                    <th scope="col">Added by</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Updated at</th>
                    <th scope="col">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr >
                    <td colspan="6">No Transactions found</td>
                    
                  </tr>
                
                  {/* </tr> */}
                </tbody>
              </table>
            </div>
            <div class="tab-pane fade" id="v-pills-buyagain" role="tabpanel" aria-labelledby="v-pills-buyagain-tab">
                <div> 
                    <h4>
                        Previous Orders
                    </h4>
                </div>
                <table class="table table-bordered">
                <thead>
                  <tr>
                  
                    <th scope="col">Product Id</th>
                    <th scope="col">Product</th>
                    <th scope="col">Action</th>
                    <th scope="col">Price</th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr >
                    
                    
                  </tr>
                
   
                </tbody>
              </table>
           
        </div>
            <div class="tab-pane fade" id="v-pills-accountdetails" role="tabpanel" aria-labelledby="v-pills-accountdetails-tab">
                <div class="backgrnd">
                    <h4>
                        Acount Details
                    </h4>
          
                <form>
                <div class="row">
                  <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="satheesh" />
                  </div>
                  <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="kumar" />
                  </div>
                  <div class="col-md-12">
                    <input type="text" class="form-control" placeholder="satheesh.rayaz@gmail.com" />
                  </div>
                  <div class="col-md-12">
                    <input type="text" class="form-control" placeholder="6381223293" />
                  </div>
                  <button class="savechanges">Save Changes</button>
                </div>
              </form>
            </div>
        </div>
        <div class="tab-pane fade" id="v-pills-changepassword" role="tabpanel" aria-labelledby="v-pills-changepassword-tab">
            <div class="backgrnd">
                <h4>
                    Change Password
                </h4>
      
            <form>
            <div class="row">
                <div class="col-md-12">
                    <input type="text" class="form-control" placeholder="Current Password" />
                  </div>
              <div class="col-md-6">
                <input type="text" class="form-control" placeholder="New Password" />
              </div>
              <div class="col-md-6">
                <input type="text" class="form-control" placeholder="Confirm Password" />
              </div>
              
              <button class="savechanges">Save Changes</button>
            </div>
          </form>
        </div>
    </div>
    <div class="tab-pane fade" id="v-pills-logout" role="tabpanel" aria-labelledby="v-pills-logout-tab">





    </div>





            </div>
        </div>
    </div>
    </div>
</section>

{/* <!-- My Order Section Ends --> */}







        </>
    );
}