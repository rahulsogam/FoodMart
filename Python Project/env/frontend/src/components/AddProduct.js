import React, { useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'
import { Axios } from '../AxiosConfig'
import { json } from 'react-router-dom'

export const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const[productCat,setProductCat]=useState();
    const[productName,setProductName]=useState('Choose Image');
    const[selectedImg,setselectedImg]=useState();
    const[selectedFileName,setselectedFileName]=useState();
    const[producPrice,setProductPrice]=useState();
    const[producDesc,setProductDesc]=useState();
    useEffect(() => {
        Axios.get("/getCategories").then((res) => {
            console.log((res.data))
            setCategories(res.data)
        })
    }, []);

    const handleImage=(e)=>{
        setselectedImg(e.target.files[0]);
        setselectedFileName(e.target.files[0].name)
    }
    const addProduct= async(evt)=> {
        evt.preventDefault();
        const formData= new FormData();
        formData.append('producDesc',producDesc);
        formData.append('productCat',productCat);
        formData.append('producPrice',producPrice);
        formData.append('productName',productName);
        formData.append('img',selectedImg);
        formData.append('ImgName',selectedFileName)
        console.log(formData);
        try {
            alert(formData.get('img'))
            Axios.post('/addProduct',formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            }).then((res) => {
                alert(res.data)  
                  
            });
          } catch (err) {
            console.log(err);
          }
          resetForm()
        // alert(producDesc+productCat+productName+producPrice+selectedFileName+selectedImg);
    }

    function resetForm(){
        setProductCat('')
        setProductName('')
        setselectedImg('')
        setProductPrice('')
        setProductDesc('')
    }

    return (
        <body id="page-top">
            {/* <!-- Page Wrapper --> */}
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" class="d-flex flex-column">
                    {/* <!-- Main Content --> */}
                    <div id="content">
                        <TopNav />
                        <div class="container-fluid">
                            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 class="h3 mb-0 text-gray-800">Add Product</h1>
                            </div>
                            <div class="card-body">
                                <div class="col-md-7 d-block">
                                <form onSubmit={addProduct} enctype="multipart/form-data">
                                    <div class="form-floating">
                                        <label >Choose Product category:</label>
                                        <select id='productCat' class="form-control"  onChange={(e)=>setProductCat(e.target.value)}>
                                            <option disabled selected > Categories</option>
                                            {
                                                categories.map(i => (
                                                    <option >{i.category}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <br/>
                                    <div class="form-floating">
                                        <label for="productName">Enter Product Name :</label>
                                        <input type="text" class="form-control" id="productName" onChange={(e)=>setProductName(e.target.value)} />
                                    </div>
                                    <br/>
                                    <div class="form-floating">
                                        <label for="productPrice">Price/product :</label>
                                        <input type="number" class="form-control" id="productPrice" onChange={(e)=>setProductPrice(e.target.value)} />
                                    </div>
                                    <br/>
                                    <div class="form-floating input-group">
                                        <span class="input-group-text">Product Description</span>
                                        <textarea class="form-control" aria-label="With textarea" id='productDesc' onChange={(e)=>setProductDesc(e.target.value)}></textarea>
                                    </div>
                                    <br/>
                                    <div class="form-floating">
                                        <label>Product image:</label>
                                        <input type="file" accept=' .jpg , .jpeg, .png' class='form-control' id='productImg' onChange={handleImage}></input>
                                    </div>
                                    <br/>
                                    <div class="form-floating">
                                        <button type="submit" class="btn btn-outline-success form-control"  > Add to Inventory</button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </body>
    )
}
