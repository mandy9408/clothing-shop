import './product-card.style.scss';
import Button from '../button/button.component';


const ProductCard=({product})=>{
    const { name, price,imageUrl } = product;
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>Product Name</span>
                <span className='price'>$19.99</span>
            </div>
            <Button buttonType='inverted'>Add to Cart</Button>
        </div>
    );
}

export default ProductCard;