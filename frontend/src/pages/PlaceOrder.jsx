import React, { useContext, useState } from "react";
import { ShopContext } from "../context/shopContex";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/PlaceOrderPage.css";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const PlaceOrder = () => {
  const { cartItems, getCartTotal, delivery_fee, currency, setCartItems } = useContext(ShopContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [deliveryService, setDeliveryService] = useState("Укрпошта");
  const [branchNumber, setBranchNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Готівка");

  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    // Валідація — тільки перевіряємо, що поля заповнені
    if (!firstName || !lastName || !phone || !city || !branchNumber) {
      alert("Будь ласка, заповніть усі обов'язкові поля");
      return;
    }

    // Формуємо cartItems з photoCount
    const orderCartItems = Object.values(cartItems).map(item => ({
      productId: item.productId,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      photoCount: item.uploadedPhotos?.length || 0,
      selectedOptions: item.selectedOptions || {},
    }));

    const orderData = {
      customer: { firstName, lastName, phone, city },
      delivery: { service: deliveryService, branch: branchNumber },
      paymentMethod,
      cartItems: orderCartItems,
      cartTotal: getCartTotal(),
      delivery_fee,
      total: getCartTotal() + delivery_fee,
    };

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Помилка при оформленні замовлення");
      }

      const createdOrder = await res.json();
      console.log("Order created:", createdOrder);

      // Очищення корзини
      setCartItems({});
      localStorage.removeItem("cartItems");

      navigate("/profile", { state: { order: createdOrder } });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="place-order-page">
      <div className="place-order-container">
        <div className="checkout-left">
          <h2>Інформація про доставку</h2>

          <label>Ім'я*</label>
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Введіть ім'я" />

          <label>Прізвище*</label>
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Введіть прізвище" />

          <label>Номер телефону*</label>
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+380XXXXXXXXX" />

          <label>Місто*</label>
          <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Введіть місто" />

          <label>Служба доставки</label>
          <select value={deliveryService} onChange={e => setDeliveryService(e.target.value)}>
            <option>Укрпошта</option>
            <option>Нова Пошта</option>
            <option>Meest</option>
          </select>

          <label>Номер відділення*</label>
          <input type="text" value={branchNumber} onChange={e => setBranchNumber(e.target.value)} placeholder="Введіть номер відділення" />

          <label>Варіант оплати</label>
          <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
            <option>Готівка</option>
            <option>Карта онлайн</option>
            <option>Приват24</option>
          </select>
        </div>

        <div className="checkout-right">
          <h2>Ваше замовлення</h2>
          <hr className="divider" />

          <div className="summary-row">
            <span>Вартість корзини:</span>
            <span>{getCartTotal()} {currency}</span>
          </div>
          <div className="summary-row">
            <span>Вартість доставки:</span>
            <span>{delivery_fee} {currency}</span>
          </div>

          <hr className="divider" />
          <div className="summary-row total">
            <span>Підсумкова ціна:</span>
            <span>{getCartTotal() + delivery_fee} {currency}</span>
          </div>

          <button className="checkout-btn" onClick={handlePlaceOrder} disabled={loading || Object.keys(cartItems).length === 0}>
            {loading ? "Оформлюється..." : "Оформити замовлення"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
