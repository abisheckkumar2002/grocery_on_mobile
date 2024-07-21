import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Card, Button,NavLink } from 'react-bootstrap';
import './myorder.css'

// import { NavLink } from "react-router-dom";
import { useNavigate, useParams, Link } from "react-router-dom";

import  Header  from '../../layouts/Header/header';

import swal from "sweetalert";
import { useDispatch } from 'react-redux';
import { fetchcart } from '../../Slices/fetchcart';

export default function Sidebar() { 
     const dispatch = useDispatch()
    useEffect(() => {
         getcart()
      }, []);

      const [tokens, settokens] = useState("");
    
      const getcart = () => {
        const token = localStorage.getItem("user_token");
        dispatch(fetchcart(token))
      }
    //   const token = localStorage.getItem("user_token");
    //   console.log("decide", token)

    const history = useNavigate();
      
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

return(

<>

{/* <Header/> */}


<div className=''>

<div>


<div className="profile__body">
            <div className="list-group p-3">
               
                    <a  href="/orderhistory" className="list-group-item list-group-item-action" activeClassName="active"> <i class="fa fa-cart-arrow-down"></i> <span> Orders History </span></a>
                    {/* <a href="/storecard" className="list-group-item list-group-item-action " activeClassName="active"><i class="fa fa-credit-card"></i> <span> Store Card </span> </a> */}
                    <a href="/buyagain" className="list-group-item list-group-item-action " activeClassName="active"> <i class="fa fa-cart-plus"></i> <span> Buy Again </span> </a>
                    <a href="/accountdetails" className="list-group-item list-group-item-action " activeClassName="active"> <i class="fa fa-user"></i> <span>  Account Details </span> </a>

                    <a href="/addresslist" className="list-group-item list-group-item-action " activeClassName="active"> <i class="fa fa-user"></i> <span>  Address List </span> </a>

                    <a href="/wishlist" className="list-group-item list-group-item-action " activeClassName="active"> <i class="fa fa-user"></i> <span> Wishlist</span> </a>

                    {/* <a href="/wishlist" className="list-group-item list-group-item-action " activeClassName="active"> <i class="fa fa-heart"></i> <span>  Wish List </span> </a> */}
                    
                    <a href="/changepassword" className="list-group-item list-group-item-action " activeClassName="active"> <i class="fa fa-key"></i> <span>  Change Password </span> </a>
                    <a><button  type="button" className="list-group-item list-group-item-action logbtnz" activeClassName="active"  data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-sign-out"></i><span> Log Out </span></button></a>
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Are you sure? </h5>
                                    <button type="button" style={{border:"1px",  background: "white"}} class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" style={{fontSize:"30px"}}>&times;</span>
                                    </button>
                                    </div>
                                    <div class="modal-body">
                                        Do you really want to Logout?
                                    </div>
                                    <div class="modal-footer myorder" style={{ padding:"10px" }}>
                                   <button type="button" class="tabbtn" onClick={()=>logout()} data-dismiss="modal">Yes</button>
                                   <button type="button" style={{border:"1px",  background: "white"}} class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className='sideno' style={{fontSize:"15px"}}>NO</span>
                                    </button>
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