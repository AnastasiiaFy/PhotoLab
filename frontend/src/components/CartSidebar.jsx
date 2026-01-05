import { useContext } from "react";
import { ShopContext } from "../context/shopContex";
import "../styles/CartSidebar.css";

const CartSidebar = ({ isOpen, onClose }) => {
    const {
        products, 
        currency, 
        cartItems, 
        increaseQuantity, 
        decreaseQuantity,
        getCartTotal,
        navigate
    } = useContext(ShopContext);

    const handlePlaceOrder = () => {
        // можеш закрити sidebar
        onClose?.();
        // переходимо на сторінку /place-order
        navigate("/place-order");
    };


    return (
        <>
        {isOpen && (
            <>
            {/* затемнений фон */}
            <div className="cart-overlay" onClick={onClose}></div>

            {/* бокове вікно */}
            <div className="cart-sidebar">
                <button className="close-btn" onClick={onClose}>
                ✕
                </button>

                <h2>Ваше замовлення:</h2>
                <hr className="divider" />

                <div className="cart-items">
                    {Object.entries(cartItems).length === 0 && <p className="empty_cart">Корзина порожня</p>}

                    {Object.entries(cartItems).map(([key, item]) => {
                        const product = products.find(p => p.id === item.productId);

                        return (
                        <div key={key} className="cart-item">

                            <div className="cart-product">
                                <img src={item.previewImage} alt={product?.title} className="cart-preview" />
                                <p className="cart-title">{product?.title}</p>
                            </div>

                            <p className="cart-photo-number">
                                {item.uploadedPhotos?.length
                                    ? `${item.uploadedPhotos.length} фото`
                                    : ''}
                            </p>

                            <div className="quantity-controls">
                                <button onClick={() => decreaseQuantity(key)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => increaseQuantity(key)}>+</button>
                            </div>

                            <p className="cart-price">
                                {item.productPrice * (item.uploadedPhotos?.length || 1) * item.quantity} {currency}
                            </p>
                            
                        </div>
                        );
                    })}
                </div>

                <hr className="divider" />
                <div className="cart-total">
                    <p>Загальна сума: {getCartTotal()} {currency}</p>
                </div>
                <button className="checkout-btn" onClick={handlePlaceOrder}>Оформити замовлення</button>
                

            </div>
            </>
        )}
        </>
    );

}

export default CartSidebar;