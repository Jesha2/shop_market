import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

const ProductCard = ({product}) => {
    //console.log("inside Pcard")

    const navigate = useNavigate()

    const handleClick = () => {
      navigate(`/product/${product.id}`)
    }
    
    return (
        <div className='product-card'>
           
            <img src={product.imageUrl} alt="product" />
            <h4> {product.productName}</h4>
            <button className="blue-btn" onClick={handleClick}>See More</button>
            {/* <Link to ={`/product/${product.id}`}>
              <button className="blue-btn">See More</button>
            </Link> */}
         </div>
  
    )
  }

export default ProductCard;
