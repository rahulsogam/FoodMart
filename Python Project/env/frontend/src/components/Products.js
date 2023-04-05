import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom';
import { Axios } from '../AxiosConfig';

function Products() {
  const [img_, setImage] = useState([]);
  
  useEffect(() => {

    Axios.get("/getProducts").then((res) => {
      // console.log(res.data.length+'------')
      let a = []
      for (let i = 0; i < res.data.length; i++) {
        a=[...a,res.data[i].productName]
       }
      
       setImage(a)
      // console.log(img_+'------')
    })
  }, []);
  var indents = [];
  // console.log(img_[0])

   for (var i = 0; i < img_.length; i++) {
    //  console.log(img_[1])
    //alert( img_[i])
     indents.push(<div>
       <img src={require('../utilities/' + img_[i] + '.jpg')}></img>
       <h5><a href="#">{img_[i]}</a></h5>
      </div>);
   }

  return (
    <div>
      <section class="categories">
        <div class="container">
          <div class="row">
         
            {/* <div class="categories__slider owl-carousel">
              <div class="col-lg-3">
                 */}
                  {img_.map(i=>(
                    
                    <div class=" categories__item set-bg">
                    <img src={require('../utilities/' + i + '.jpg')} style={{paddingLeft:4}}></img>
                    <h5><a href="#">{i}</a></h5>
                    </div>
                  ))
                  }
              {/* </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products