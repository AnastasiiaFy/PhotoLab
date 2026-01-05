import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {products} from "../data/products.js"

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₴';
    const delivery_fee = 50;

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState({});


    const addToCart = (productId, selectedOptions = {}, uploadedPhotos = [], previewImage, productPrice) => {
        setCartItems(prev => {
            // генеруємо унікальний ключ на основі id + опцій + фото
            const key = `${productId}-${JSON.stringify(selectedOptions)}-${uploadedPhotos.length}`;

            if (prev[key]) {
            // якщо такий товар уже є — збільшуємо кількість
            return {
                ...prev,
                [key]: {
                ...prev[key],
                quantity: prev[key].quantity + 1
                }
            };
            } else {
            // новий товар
            return {
                ...prev,
                [key]: {
                productId,
                selectedOptions,
                uploadedPhotos,
                previewImage,
                quantity: 1,
                productPrice
                }
            };
            }
        });
    };

    // ===== ЗБІЛЬШИТИ КІЛЬКІСТЬ =====
    const increaseQuantity = (key) => {
        setCartItems(prev => ({
        ...prev,
        [key]: { ...prev[key], quantity: prev[key].quantity + 1 }
        }));
    };

    // ===== ЗМЕНШИТИ КІЛЬКІСТЬ / ВИДАЛИТИ ТОВАР =====
    const decreaseQuantity = (key) => {
        setCartItems(prev => {
        const current = prev[key];
        if (!current) return prev;

        if (current.quantity <= 1) {
            const { [key]: _, ...rest } = prev; // видаляємо товар
            return rest;
        }
        return { ...prev, [key]: { ...current, quantity: current.quantity - 1 } };
        });
    };

    const getCartCount = () => {
        return Object.values(cartItems).reduce((acc, item) => acc + item.quantity, 0);
    };

    // ===== ЗАГАЛЬНА СУМА =====
    const getCartTotal = () => {
        return Object.values(cartItems).reduce((total, item) => {
            const photoCount = item.uploadedPhotos?.length > 0 ? item.uploadedPhotos.length : 1;
            return total + item.productPrice * photoCount * item.quantity;
        }, 0);
    };


    const value = {
        products, 
        currency, 
        delivery_fee, 
        cartItems, 
        addToCart, 
        getCartCount, 
        increaseQuantity, 
        decreaseQuantity,
        setCartItems,
        getCartTotal,
        navigate,
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;