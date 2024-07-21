import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Header from "./layouts/Header/header";
import Footer from "./layouts/Footer/footer";
import Home from "./pages/Home/home";
import Aboutus from "./pages/About/about";
import Contactus from "./pages/Contactus/contactus";
import Privacypolicy from "./pages/Privacypolicy/privacypolicy";
import Termsandconditions from "./pages/Termsandconditions/termsandconditions";
import Login from "./pages/Login/login";
import Forget from "./pages/Forget/forget";
import Reset from "./pages/Forget/resetpassword";
import Registerpage from "./pages/Registerpage/registerpage";
import Myorder from "./pages/Myorder/myorder";

import Myorder1 from "./pages/Myorder/vieworderdetail";
import Cancelorder from "./pages/Myorder/canceldetail";

import Checkout from "./pages/Checkout/checkout";
import Shop from "./pages/Shop/shop";
import Cart from "./pages/Cart/cart";
import Viewcart from "./pages/Viewcart/viewcart";
import Viewproduct from "./pages/Viewproduct/viewproduct";



import Orderhistory from "./pages/Myorder/orderhistorys";
import Wishlist from "./pages/Myorder/wishlist";
import Storecard from "./pages/Myorder/storecard";
import Buyagain from "./pages/Myorder/buyagain";
import Accountdetails from "./pages/Myorder/accountdetail";
import Changepassword from "./pages/Myorder/changepassword";
import Logout from "./pages/Myorder/logout";



import Addresslist from "./pages/Myorder/addresslist";
import Editaddresslist from "./pages/Myorder/editaddress";
import Addaddresslist from "./pages/Myorder/addaddress";

import Search from "./pages/Search/search";
import Search1 from "./pages/Search/search1"
import Paypal from './pages/paypal';




function App() {


  return (

    <div>

      <BrowserRouter>
       
        {/* <Header/> */}


        <Routes>

          <Route path='/' element={<Home/>} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/privacypolicy" element={<Privacypolicy />} />
          <Route path="/termsandconditions" element={<Termsandconditions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/reset/:token_id" element={<Reset />} />
          <Route path="/registerpage" element={<Registerpage />} />
          <Route path="/myorder" element={<Myorder />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/shop/:id" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/viewcart" element={<Viewcart />} />
          <Route path="/viewproduct/:id" element={<Viewproduct />} />

          
          <Route path="/orderhistory" element={<Orderhistory />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/storecard" element={<Storecard />} />

          <Route path="/addresslist" element={<Addresslist />} />
          <Route path="/editaddress" element={<Editaddresslist />} />
          <Route path="/addaddress" element={<Addaddresslist />} />

          <Route path="/buyagain" element={<Buyagain />} />
          <Route path="/accountdetails" element={<Accountdetails />} />
          <Route path="/changepassword" element={<Changepassword />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/vieworderdetail/:id" element={<Myorder1 />} />
          <Route path="/canceldetail" element={<Cancelorder />} />

          <Route path="/search" element={<Search  />} />
          <Route path="/search1" element={<Search1  />} />
          <Route path="/paypal" element={<Paypal/>} />
 
 
        </Routes>
      <Footer/>

      </BrowserRouter>
   

    </div>
  );
}

export default App;

