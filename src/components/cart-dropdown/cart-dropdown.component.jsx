import Button from '../button/button.component';
import './cart-dropdown.style.scss';

const CartDropdown = () => {

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {/* Cart items will be rendered here */}
            </div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    );
}

export default CartDropdown;