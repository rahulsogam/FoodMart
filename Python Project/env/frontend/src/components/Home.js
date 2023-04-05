import React,{useEffect, useRef, useState} from 'react'
import Categories from './Categories'
import '../CSS/style.css'
import {useNavigate} from "react-router-dom"
import { TopNav } from './TopNav';
import Products from './Products';
import { Banner } from './Banner';
import AllProducts from './AllProducts';
import { Axios } from '../AxiosConfig';
function Home() {
  const inputRef = useRef(null);
  const navigate= useNavigate()
  const [cartCount,setCartCount]=useState(0)
  const [addedItem,setAddedItem]=useState()
  const [prodcutsCount,setProductsCount]=useState(0);
  let userdata = JSON.parse(localStorage.getItem('user'))
  console.log(userdata!=null);



  const doLogin=()=>{
    navigate("/login")
  }

  const searchProduct=()=>{
    alert(inputRef.current.value);
  }
  
  console.log(addedItem)
  useEffect(() => {
      
      Axios.post("/GetCartDetails", {
          Email: userdata.Email
      }).then((res) => {
          console.log(res.data.msg
            )
          setCartCount(res.data.msg)
      })
    },[])

  return (
    <div className="MainDiv">
     
    <div class="humberger__menu__overlay"></div>
      {/* <div class="humberger__menu__wrapper">
          <div class="humberger__menu__logo">
              <a href="#" class="logo">V-Shop</a>
          </div>
          <div class="humberger__menu__cart">
              <ul>
                  <li><a href="#"><i class="fa fa-heart"></i> <span>1</span></a></li>
                  <li><a href="#"><i class="fa fa-shopping-bag"></i> <span>3</span></a></li>
              </ul>
              <div class="header__cart__price">item: <span>$150.00</span></div>
          </div>
          <div class="humberger__menu__widget">
              <div class="header__top__right__language">
                  <img src="assets/img/language.png" alt="" />
                  <div>English</div>
                  <span class="arrow_carrot-down"></span>
                  <ul>
                      <li><a href="#">Spanis</a></li>
                      <li><a href="#">English</a></li>
                  </ul>
              </div>
              <div class="header__top__right__auth">
                  <button onClick={doLogin}><a href="#"><i class="fa fa-user"></i> Login</a></button>
              </div>
          </div>
          <nav class="humberger__menu__nav mobile-menu">
              <ul>
                  <li class="active"><a href="#">Home</a></li>
                  <li><a href="#">Shop</a></li>
                  <li><a href="#">Pages</a>
                      <ul class="header__menu__dropdown">
                          <li><a href="#">Shop Details</a></li>
                          <li><a href="#">Shoping Cart</a></li>
                          <li><a href="#">Check Out</a></li>
                          <li><a href="#">Blog Details</a></li>
                      </ul>
                  </li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Contact</a></li>
              </ul>
          </nav>
          <div id="mobile-menu-wrap"></div>
          <div class="header__top__right__social">
              <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-twitter"></i></a>
              <a href="#"><i class="fa fa-linkedin"></i></a>
              <a href="#"><i class="fa fa-pinterest-p"></i></a>
          </div>
          <div class="humberger__menu__contact">
              <ul>
                  <li><i class="fa fa-envelope"></i> therichposts@gmail.com</li>
                  <li>Free Shipping for all Order of <span>&#8364;</span> 99</li>
              </ul>
          </div>
      </div>
      */}
      <header class="header">
          
          <TopNav cartCount={cartCount} addedItem={addedItem}/>
          <div class="container">
              <div class="row">
                  <div class="col-lg-3">
                      <div class="header__logo">
                          <a  class="logo">FoodMart</a>
                      </div>
                  </div>
                  <div class="col-lg-6">
                      <nav class="header__menu">
                          <ul>
                              <li class="active"><a href="#">Home</a></li>
                              {/* <li><a href="#">Shop</a></li> */}
                              <li><a href="#">Shop</a>
                                  <ul class="header__menu__dropdown">
                                      <li><a href="#">Shop Details</a></li>
                                      <li><a href="#">Shoping Cart</a></li>
                                      <li><a href="#">Check Out</a></li>
                                      {/* <li><a href="#">Blog Details</a></li> */}
                                  </ul>
                              </li>
                              {/* <li><a href="#">Blog</a></li> */}
                              <li><a href="#">Contact</a></li>
                          </ul>
                      </nav>
                  </div>
                  {/* <div class="col-lg-3">
                      <div class="header__cart">
                          <ul>
                              <li><a href="#"><i class="fa fa-heart"></i> <span>1</span></a></li>
                              <li><a href="#"><i class="fa fa-shopping-bag"></i> <span>3</span></a></li>
                          </ul>
                          <div class="header__cart__price">item: <span>$150.00</span></div>
                      </div>
                  </div> */}
              </div>
              {/* <div class="humberger__open">
                  <i class="fa fa-bars"></i>
              </div> */}
          </div>
      </header>
    
      <section>
          <div class="container">
              <div class="row">
                  <div class="col-lg-3">
                      <Categories/>
                  </div>
                  <div class="col-lg-9">
                      <div class="hero__search">
                          <div class="hero__search__form">
                              <form onSubmit={searchProduct}>
                                  
                                  <input  ref={inputRef} type="text" placeholder="Search what do yo u need?" />
                                  <button type="submit" class="site-btn">SEARCH</button>
                              </form>
                          </div>
                          <div class="hero__search__phone">
                              <div class="hero__search__phone__icon">
                                  <i class="fa fa-phone"></i>
                              </div>
                              <div class="hero__search__phone__text">
                                  <h5>1234567890</h5>
                                  <span>support 24/7 time</span>
                              </div>
                          </div>
                      </div>
                      <Banner/>
                  </div>
              </div>
          </div>
      </section>
      {/* <div class="section-title">
                          <h2>New Product</h2>
                      </div> */}
      {/* <Products/> */}
    
      <AllProducts />
    
      <section class="latest-product spad">
          
      </section>
  
      
      <footer class="footer spad">
          <div class="container">
              <div class="row">
                  <div class="col-lg-3 col-md-6 col-sm-6">
                      <div class="footer__about">
                          <div class="footer__about__logo">
                              <a href="#" class="logo">FoodMart</a>
                          </div>
                          <ul>
                              <li>Address: Dublin,Ireland</li>
                              <li>Email:Foodmart@gmail.com</li>
                          </ul>
                      </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
                      <div class="footer__widget">
                          <h6>Useful Links</h6>
                          <ul>
                              <li><a href="#">About Us</a></li>
                              <li><a href="#">About Our Shop</a></li>
                              <li><a href="#">Secure Shopping</a></li>
                              <li><a href="#">Delivery infomation</a></li>
                              <li><a href="#">Privacy Policy</a></li>
                              <li><a href="#">Our Sitemap</a></li>
                          </ul>
                          <ul>
                              <li><a href="#">Who We Are</a></li>
                              <li><a href="#">Our Services</a></li>
                              <li><a href="#">Projects</a></li>
                              <li><a href="#">Contact</a></li>
                              <li><a href="#">Innovation</a></li>
                              <li><a href="#">Testimonials</a></li>
                          </ul>
                      </div>
                  </div>
                  <div class="col-lg-4 col-md-12">
                      <div class="footer__widget">
                          <h6>Join Our Newsletter Now</h6>
                          <p>Get E-mail updates about our latest shop and special offers.</p>
                          <form action="#">
                              <input type="text" placeholder="Enter your mail" />
                              <button type="submit" class="site-btn">Subscribe</button>
                          </form>
                          <div class="footer__widget__social">
                              <a href="#"><i class="fa fa-facebook"></i></a>
                              <a href="#"><i class="fa fa-instagram"></i></a>
                              <a href="#"><i class="fa fa-twitter"></i></a>
                              <a href="#"><i class="fa fa-pinterest"></i></a>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-lg-12">
                      <div class="footer__copyright">
                          <div class="footer__copyright__text"><p>
    Copyright &copy;2023 All rights reserved with Rahul Sogam.
  </p></div>
                          <div class="footer__copyright__payment"><img src="assets/img/payment-item.png" alt="" /></div>
                      </div>
                  </div>
              </div>
          </div>
      </footer>
  </div>
  )
}

export default Home