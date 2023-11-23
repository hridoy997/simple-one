import "./CartItem.scss";
import prod from '../../../assets/products/earbuds-prod-1.webp';
import { MdClose } from "react-icons/md";
import { useContext } from "react";
import { Contex } from '../../../utils/context';

const CartItem = () => {

    const {cartItems, handelRemoveFromCart, handelCartProductQuantity} = useContext(Contex);
    // console.log(cartItems);

    return (
        <div className="cart-products">
            {
                cartItems.map(item => (
                    <div key = {item.id} className="cart-product">
                        <div className="img-container">
                            <img src={process.env.REACT_APP_DEV_URL + item.attributes.img.data[0].attributes.url} alt="" />
                        </div>
                        <div className="prod-details">
                            <div>
                                <span className="name">{item.attributes?.title}</span>
                                <MdClose size={18} className="close-btn" onClick={() => handelRemoveFromCart(item)}/>
                            </div>
                            <div className="quantity-buttons">
                                <span onClick={() => handelCartProductQuantity('dec', item)}>-</span>
                                <span>{item.quantity}</span>
                                <span onClick={() => handelCartProductQuantity('inc', item)}>+</span>
                            </div>
                            <div className="text">
                                <span>{item.quantity}</span>
                                <span>x</span>
                                <span>&#2547;{item.attributes.Price}</span>
                                <span>=</span>
                                <span className="highlight">&#2547;{item.attributes.Price * item.quantity}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default CartItem;
