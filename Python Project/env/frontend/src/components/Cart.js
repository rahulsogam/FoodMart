import React, { useEffect, useState } from 'react'
import { TopNav } from './TopNav'
import { Axios } from '../AxiosConfig'
import { useNavigate } from "react-router-dom"
import '../CSS/cart.css'
export const Cart = () => {
    const [cartCount, setCartCount] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [Quantity, setQuantity] = useState(1)
    const [cartProducts, setCartProducts] = useState([]);
    const [prodcuts, setProducts] = useState([]);
    const navigate = useNavigate()
    let userdata = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {

        Axios.post("/GetCartDetails", {
            Email: userdata.Email
        }).then((res) => {

            setCartCount(res.data.msg)
        })

        Axios.post("/getCartProducts", {
            Email: userdata.Email
        }).then((res) => {

            setCartProducts([...res.data])
        })

        Axios("/getProducts").then((res) => {
            setProducts(res.data)
        })

    }, [])
    const sub = (i, f, e) => {
        console.log(document.getElementById(e))
        var subtotal = i * f
        document.getElementById(e).textContent = subtotal + .00

    }
    function DeleteFromCart(e) {
        var a = window.confirm('Are you sure you want to remove item from cart?')
        if (a) {
            Axios.post("/deleteProduct", {
                product: e
            }).then((res) => {
                alert(res.data)
                window.location.reload()
            }
            )
        }

    }
    const PlaceOrder = () => {

        var a = window.confirm('Do you want to proceed with an order.?')
        if (a) {
            Axios.post("/placeOrder", {
                Email: userdata.Email,
            }).then((res) => {
                alert(res.data)
                navigate("/")
            }
            )
            alert('Order Placed successfully...')
        }
    }

    return (
        <div>
            <TopNav cartCount={cartCount} />
            {cartCount != 0 ? (<div>

                <div class="container pb-5 mb-2">
                    {
                        cartProducts.map(i => (
                            <div class="cart-item d-md-flex justify-content-between" ><span class="remove-item"><a class="fa fa-times" ></a></span>
                                <div class="px-3 my-3">
                                    <a class="cart-item-product" href="#">
                                        <div class="cart-item-product-thumb"><img src={require('../utilities/' + i.product + '.jpg')} alt="Product" /></div>
                                        <div class="cart-item-product-info">
                                            <span><strong>Item Name:</strong> {i.product}</span>
                                        </div>
                                    </a>
                                </div>
                                <div class="px-3 my-3 text-center">
                                    <div class="cart-item-label">Quantity</div>
                                    <div class="count-input">
                                        <input type='number' class="form-control" defaultValue={1} onChange={(e) => sub(e.target.value, i.productPrice, i.product)} >
                                        </input>
                                    </div>
                                </div>
                                <div class="px-3 my-3 text-center">
                                    <div class="cart-item-label">Subtotal</div><span class="text-xl font-weight-medium" id={i.product}   >{i.productPrice}.00</span>
                                </div>
                                <div class="px-3 my-3 text-center">
                                    <div class="cart-item-label">Action</div><button class="text-xl btn-danger font-weight-medium" value={i.product} onClick={(e) => DeleteFromCart(e.target.value)} >Delete</button>
                                </div>

                            </div>

                        ))

                    }
                    <hr class="my-2" />
                    <div class="row pt-3 pb-5 mb-2">
                        {/* <div class="col-sm-6 mb-3"><a class="btn btn-style-1 btn-secondary btn-block" href="#"><i class="fe-icon-refresh-ccw"></i>&nbsp;Update Cart</a></div> */}
                        <div class="col-sm-12 mb-3"><a class="btn btn-style-1 btn-primary btn-block" href="#" onClick={PlaceOrder}><i class="fe-icon-credit-card"></i>&nbsp;Place Order</a></div>
                    </div>


                </div>
            </div>
            ) : (
                <div class="container pb-5 mb-2">
            <div class="row pt-3 pb-5 mb-2">
                <div class="col-sm-12 mb-3"><i class="fe-icon-credit-card"></i>&nbsp;No items in cart</div>

                {/* <div class="col-sm-6 mb-3"><a class="btn btn-style-1 btn-secondary btn-block" href="#"><i class="fe-icon-refresh-ccw"></i>&nbsp;Update Cart</a></div> */}
                <div class="col-sm-12 mb-3"><button class="btn btn-style-1 btn-primary btn-block" disabled href="#"  onClick={PlaceOrder}><i class="fe-icon-credit-card"></i>&nbsp;Place Order</button></div>
            </div>
            </div>
            )}
        </div>
    )
}
