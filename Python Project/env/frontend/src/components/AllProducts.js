import React,{useEffect,useState,async} from 'react'
import { Axios } from '../AxiosConfig';
import { TopNav } from './TopNav';


function AllProducts ()  {
    const [prodcuts, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [addedItem,setAddedItem]=useState([])
    const [prodcutsCount,setProductsCount]=useState(0)
    useEffect(() => {
    
        Axios("/getProducts").then((res) => {
                setProducts(res.data)
            })
        

        Axios("/getCategories").then((res) => {
            console.log((res.data))
            setCategories(res.data)

        })
            
        },[])

        const addToCart=(e)=>{
            
            // console.log(e.productName)
            var i;
            let userdata=JSON.parse(localStorage.getItem('user'))
            //let prodcut=JSON.parse(e);
            console.log(e.productName)
            i=prodcutsCount+1;
            
            Axios.post("/addToCart",
                    {  
                       Email:userdata.Email,
                       product:e.productName,
                       productPrice:e.producPrice
                    }).then((res) => {
                alert(res.data)
                window.location.href="/"
            })
        }
       


  return (
    <div>
      <section class="featured spad">
          <div class="container">
              <div class="row">
                  <div class="col-lg-12">
                      <div class="section-title">
                          <h2>Featured Products</h2>
                      </div>
                      {/* <div class="featured__controls">
                          <ul>
                              <li class="active" data-filter="*">All</li>
                              
                              {
                                categories.map(i=>(
                                    
                                    <li ><a  href={'#'+i.category} style={{color:'black'}} >{i.category}</a></li>
                                    
                                ))
                            }
                          </ul>
                      </div> */}
                  </div>
              </div>
              <div class="row featured__filter">
                  
                      
                        {
                             prodcuts.map(i=>(
                                <div class="col-lg-3 col-md-4 col-sm-6 " id={i.productCat}>
                                 <div class="featured__item">
                                     <div class="featured__item__pic set-bg" >
                                        <img src={require('../utilities/' + i.productName + '.jpg')}></img>
                                         <ul class="featured__item__pic__hover">
                                             <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                             <li><a href="#" onClick={() =>addToCart(i)}><i class="fa fa-shopping-cart"></i></a></li>
                                         </ul>
                                     </div>
                                     <div class="featured__item__text">
                                         <h6><a href="#">{i.productName}</a></h6>
                                         <h5>Price: {i.producPrice}.00 &#8364;</h5>
                                     </div>
                                 </div>
                                 </div>
                            ))

                        }
                     
{/*                   
                  <div class="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
                      <div class="featured__item">
                          <div class="featured__item__pic set-bg" data-setbg="assets/img/featured/feature-2.jpg">
                              <ul class="featured__item__pic__hover">
                                  <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                  <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                  <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                              </ul>
                          </div>
                          <div class="featured__item__text">
                              <h6><a href="#">Crab Pool Security</a></h6>
                              <h5>$30.00</h5>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6 mix vegetables fresh-meat">
                      <div class="featured__item">
                          <div class="featured__item__pic set-bg" data-setbg="assets/img/featured/feature-3.jpg">
                              <ul class="featured__item__pic__hover">
                                  <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                  <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                  <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                              </ul>
                          </div>
                          <div class="featured__item__text">
                              <h6><a href="#">Crab Pool Security</a></h6>
                              <h5>$30.00</h5>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6 mix fastfood oranges">
                      <div class="featured__item">
                          <div class="featured__item__pic set-bg" data-setbg="assets/img/featured/feature-4.jpg">
                              <ul class="featured__item__pic__hover">
                                  <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                  <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                  <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                              </ul>
                          </div>
                          <div class="featured__item__text">
                              <h6><a href="#">Crab Pool Security</a></h6>
                              <h5>$30.00</h5>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6 mix fresh-meat vegetables">
                      <div class="featured__item">
                          <div class="featured__item__pic set-bg" data-setbg="assets/img/featured/feature-5.jpg">
                              <ul class="featured__item__pic__hover">
                                  <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                  <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                  <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                              </ul>
                          </div>
                          <div class="featured__item__text">
                              <h6><a href="#">Crab Pool Security</a></h6>
                              <h5>$30.00</h5>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6 mix oranges fastfood">
                      <div class="featured__item">
                          <div class="featured__item__pic set-bg" data-setbg="assets/img/featured/feature-6.jpg">
                              <ul class="featured__item__pic__hover">
                                  <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                  <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                  <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                              </ul>
                          </div>
                          <div class="featured__item__text">
                              <h6><a href="#">Crab Pool Security</a></h6>
                              <h5>$30.00</h5>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6 mix fresh-meat vegetables">
                      <div class="featured__item">
                          <div class="featured__item__pic set-bg" data-setbg="assets/img/featured/feature-7.jpg">
                              <ul class="featured__item__pic__hover">
                                  <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                  <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                  <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                              </ul>
                          </div>
                          <div class="featured__item__text">
                              <h6><a href="#">Crab Pool Security</a></h6>
                              <h5>$30.00</h5>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6 mix fastfood vegetables">
                      <div class="featured__item">
                          <div class="featured__item__pic set-bg" data-setbg="assets/img/featured/feature-8.jpg">
                              <ul class="featured__item__pic__hover">
                                  <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                  <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                  <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                              </ul>
                          </div>
                          <div class="featured__item__text">
                              <h6><a href="#">Crab Pool Security</a></h6>
                              <h5>$30.00</h5>
                          </div>
                      </div>
                  </div> */}
              </div>
          </div>
      </section>
    
      <div class="banner">
          <div class="container">
              <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-6">
                      <div class="banner__pic">
                          <img src="assets/img/banner/banner-1.jpg" alt="" />
                      </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6">
                      <div class="banner__pic">
                          <img src="assets/img/banner/banner-2.jpg" alt="" />
                      </div>
                  </div>
              </div>
          </div>
      </div>

      
    </div>
    
  )
}

export default AllProducts