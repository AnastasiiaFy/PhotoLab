import React from 'react'
import { useContext, useState } from "react";
import { ShopContext } from "../context/shopContex";
import "../styles/PlaceOrderPage.css";

const PlaceOrder = () => {

  const { cartItems, getCartTotal, delivery_fee, currency } = useContext(ShopContext);

  // стани форми
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(""); 
  const [deliveryService, setDeliveryService] = useState("Укрпошта");
  const [branchNumber, setBranchNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Готівка");

  const handlePlaceOrder = () => {
    // тут можна реалізувати відправку на сервер або створення замовлення
    const orderData = {
      customer: { firstName, lastName, phone, city },
      delivery: { service: deliveryService, branch: branchNumber },
      paymentMethod,
      cartItems,
      cartTotal: getCartTotal(),
      delivery_fee,
      total: getCartTotal() + delivery_fee,
    };

    console.log("Order data:", orderData);
  };



  return (
    <div className="place-order-page">
      <div className="place-order-container">

        {/* Ліва частина — форма доставки */}
        <div className="checkout-left">
          <h2>Інформація про доставку</h2>

          <label>Ім'я</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Введіть ім'я"
          />

          <label>Прізвище</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Введіть прізвище"
          />

          <label>Номер телефону</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+380 XX XXX XX XX"
          />

          <label>Місто</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Введіть місто"
          />

          <label>Служба доставки</label>
          <select value={deliveryService} onChange={(e) => setDeliveryService(e.target.value)}>
            <option>Укрпошта</option>
            <option>Нова Пошта</option>
            <option>Meest</option>
          </select>

          <label>Номер відділення</label>
          <input
            type="text"
            value={branchNumber}
            onChange={(e) => setBranchNumber(e.target.value)}
            placeholder="Введіть номер відділення"
          />

          <label>Варіант оплати</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option>Готівка</option>
            <option>Карта онлайн</option>
            <option>Приват24</option>
          </select>
        </div>

        {/* Права частина — підсумки корзини */}
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

          <button className="checkout-btn" onClick={handlePlaceOrder}>
            Оформити замовлення
          </button>
        </div>

      </div>
    </div>
  );
}

export default PlaceOrder
