import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import {products} from "../data/products.js"

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₴';
    const delivery_fee = 50;
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);


    // читання корзини
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem("cartItems");
            return savedCart ? JSON.parse(savedCart) : {};
        } catch (e) {
            console.error("Помилка читання корзини з localStorage", e);
            return {};
        }
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);


    // Очистка вмісту корзини 
    const clearCart = () => {
        setCartItems({});
        localStorage.removeItem("cartItems");
    };


    // ===== Завантаження продуктів з бекенду =====
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/products"); // заміни на свій бекенд
                if (!res.ok) throw new Error("Помилка при завантаженні продуктів");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("Помилка завантаження продуктів:", err);
            }
        };
        fetchProducts();
    }, []);



    const addToCart = (product, selectedOptions = {}, uploadedPhotos = []) => {
        setCartItems(prev => {
            const key = `${product._id}-${JSON.stringify(selectedOptions)}-${uploadedPhotos.length}`;

            if (prev[key]) {
            return {
                ...prev,
                [key]: {
                ...prev[key],
                quantity: prev[key].quantity + 1
                }
            };
            }

            return {
            ...prev,
            [key]: {
                productId: product._id,
                title: product.title,
                price: product.price,
                previewImage: product.imageUrls?.[0] || "/assets/images/placeholder.png",
                selectedOptions,
                uploadedPhotos,
                quantity: 1
            }
            };
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
            const photoCount =
                item.uploadedPhotos?.length > 0 ? item.uploadedPhotos.length : 1;

            return total + item.price * photoCount * item.quantity;
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
        clearCart,
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;