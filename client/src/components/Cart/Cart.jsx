import "./Cart.scss";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { useContext, useEffect } from "react";
import { Contex } from "../../utils/context";
import { makePaymentRequest } from "../../utils/Api";
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";

const Cart = ({setShowCart}) => {
    
    const {cartItems, cartSubTotle} = useContext(Contex);

    // console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    // console.log("Stripe Key:", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    // const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    


    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;
            const res = await makePaymentRequest.post("/Api/orders",{
                products:cartItems,
            });

            await stripe.redirectToCheckout({
                sessionId: res.data.stripesession.id
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:1337/Api/orders');
            console.log(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
            
        }
        };
    
        fetchData();
    }, []);

    return (
        <div className="cart-panel">
            <div className="opac-layer"></div>
            <div className="cart-content">

                <div className="cart-header">
                        <span className="heding">Shopping Cart</span>
                        <span className="close-btn" onClick={() => {setShowCart(false)}}>
                            <MdClose/>
                            <span className="text">close</span>
                        </span>
                    </div>

                {!cartItems.length && (
                <div className="empty-cart">
                    <BsCartX />
                    <span>No products in the cart.</span>
                    <button className="return-cta" onClick={() => {}}>
                        RETURN TO SHOP
                    </button>
                </div>
                )}

                {!!cartItems?.length &&<>
                    <CartItem/>
                    <div className="catr-footer">
                        <div className="sub-total">
                            <span className="text">Subtotal:</span>
                            <span className="text total">&#2547;{cartSubTotle}</span>
                        </div>
                        <div className="button">
                            <button onClick={handlePayment} className="checkout-cta">Checkout</button>
                        </div>
                    </div>
                </>}

            </div>
        </div>
    );
};

export default Cart;
