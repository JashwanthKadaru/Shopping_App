import '../css/Cart.css' 
import CartCard from '../components/CartCard'
import { useOutletContext, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

const Cart = () => {
    // props from App.js. Imported  from Outlet context.
    const {cartList, setCartList, isLogged, globalUsername, setProductList, productList} = useOutletContext();

    const navigate = useNavigate();

    // This is run everytime the component re-renders; 
    useEffect(() => {
        if(!isLogged) {
            navigate('/login');
        }
        
        async function fetchUserCart() {
            try{
                const response = await axios.get(`http://localhost:5123/smartfashionstore/cart/user/${globalUsername}`);
                const responseData = response.data;

                if(responseData.success) {
                    const cart = responseData.cart;
                    console.log(cart);  
                } 
                else {
                    console.error('Something went wrong. Cart is not loading.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchUserCart();
    }, []);

    console.log('cart:', cartList);

    const purchaseCart = async () => {
        try {
            const response = await axios.post(`http://localhost:5123/smartfashionstore/purchases/${globalUsername}/transaction-started`, {userPurchaseList: cartList});
            const responseData = response.data;

            if(responseData.success) {
                console.log("Purchase success!");
                setCartList([]);  
            } 
            else {
                console.error('Something went wrong. Cart is not loading.');
            }
        } catch(error){
            console.log(error);
        }
    }


    return (
        <div className='cart'>
            <h1> {Array.isArray(cartList) && (cartList && cartList.length>0)?"Items in your cart. Have a look before you proceed.":"There are currently no items in your cart. "} </h1>

            <div className="cart-section-display">
                {
                    (Array.isArray(cartList) && cartList && cartList.length>0) &&
                    <div className="cart-grid-layout">
                        {
                            cartList.map((item,index) => {
                                return ( 
                                    <CartCard item={item} 
                                        key={index} 
                                        cartList={cartList} 
                                        setCartList={setCartList}
                                        productList={productList}
                                        setProductList={setProductList} 
                                        isLogged={isLogged} 
                                        globalUsername={globalUsername}/>
                                )
                            })
                        }
                    </div>
                }
            </div>

            {
                (Array.isArray(cartList) && cartList && cartList.length>0) &&    
                    <button className='cart-purchase-button' onClick={(e) => {purchaseCart()}}>
                        Purchase
                    </button>
            }
            
            {    (!cartList || cartList.length===0) &&    
                    <p style={{fontFamily: 'Poppins', color:'#e97dffde', width: "fit-content", margin: "15px auto", fontSize:'1rem'}}> There are 0 items in your cart. Hope you will find something useful.</p>
            }
        </div>
    )
}

export default Cart;