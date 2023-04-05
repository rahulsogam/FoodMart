import React,{ useEffect, useState } from 'react'
import { Axios } from '../AxiosConfig'

function Categories() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        
        Axios.get("/getCategories").then((res) => {
            console.log((res.data))
            setCategories(res.data)
    
        })
    }, []);
  return (
    <div class="hero__categories">
                          <div class="hero__categories__all">
                              <i class="fa fa-bars"></i>
                              <span>All departments</span>
                          </div>
                          <ul>
                              
                              <li>
                                {
                                categories.map(i=>(
                                    <li data-filter=".vegetables" ><a href='#'>{i.category}</a></li>
                                ))
                                }
                              </li>
                          </ul>
    </div>
  )
}

export default Categories