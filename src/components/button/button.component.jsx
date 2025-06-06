import './button.style.scss';

// inverted
// //default
//gogle sign in
const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
    default: ''
}

const Button = ({ children, buttonType, ...otherProps }) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}{...otherProps}>
            {children}
        </button>
    );
}

export default Button;