import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";
import '../styles/Profile.css';

import rollUp from "/assets/icons/roll-up.png";
import rollDown from "/assets/icons/roll-down.png";


const Profile = () => {
  const { user, token, likes, logout } = useContext(AuthContext);

  // Активний розділ профілю
  const [activeSection, setActiveSection] = useState("orders");
  const [orders, setOrders] = useState([]);

  // Стани для UX
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ID розгорнутого замовлення
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Стани для Списку бажань
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistError, setWishlistError] = useState(null);

  /* Розгортання / згортання картки замовлення */
  const toggleOrder = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  /* Завантаження історії замовлень користувача */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://localhost:4000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Не вдалося отримати історію замовлень");
        }

        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (activeSection === "orders" && token) {
      fetchOrders();
    }
  }, [activeSection, token]);


  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setWishlistLoading(true);
        setWishlistError(null);

        const res = await fetch("http://localhost:4000/api/users/likes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Не вдалося отримати список бажань");
        }

        const data = await res.json();
        setWishlist(data);
      } catch (err) {
        setWishlistError(err.message);
      } finally {
        setWishlistLoading(false);
      }
    };

    if (activeSection === "wishlist" && token) {
      fetchWishlist();
    }
  }, [activeSection, token, likes]);

  /* Формування ініціалів для аватарки */
  const getInitials = () => {
    if (!user?.name) return "";
    const parts = user.name.trim().split(" ");
    return parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`
      : parts[0][0];
  };

  // Рендеринг списку бажань 
  const renderWishlist = () => {
    if (wishlistLoading) {
      return <p>Завантаження списку бажань...</p>;
    }

    if (wishlistError) {
      return <p className="error">{wishlistError}</p>;
    }

    if (wishlist.length === 0) {
      return <p>Ваш список бажань порожній</p>;
    }

    return (
      <div className="wishlist-grid">
        {wishlist.map(product => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="profile-page">
      {/* ================= ЛІВА КОЛОНКА ================= */}
      <div className="profile-sidebar">

        {/* Картка з особистими даними */}
        <div className="profile-card">
          <div className="profile-avatar">{getInitials()}</div>
          <h3 className="profile-name">{user?.name}</h3>
          <p className="profile-email">{user?.email}</p>
        </div>

        {/* Навігація профілю */}
        <div className="profile-card">
          <ul className="profile-menu">
            <li
              className={activeSection === "orders" ? "active" : ""}
              onClick={() => setActiveSection("orders")}
            >
              Історія замовлень
            </li>

            <li
              className={activeSection === "wishlist" ? "active" : ""}
              onClick={() => setActiveSection("wishlist")}
            >
              Список бажань
            </li>

            <li className="logout" onClick={logout}>
              Вийти
            </li>
          </ul>
        </div>
      </div>

      {/* ================= ПРАВА КОЛОНКА ================= */}
      <div className="profile-content">

        {/* ===== ІСТОРІЯ ЗАМОВЛЕНЬ ===== */}
        {activeSection === "orders" && (
          <>
            <h2 className="chapter-title">Історія замовлень</h2>

            {loading && <p>Завантаження...</p>}
            {error && <p className="error-text">{error}</p>}

            {!loading && !error && orders.length === 0 && (
              <p className="empty-text">У вас ще немає замовлень</p>
            )}

            {!loading && !error && orders.length > 0 && (
              <div className="orders-list">
                {orders.map((order) => {
                  const isOpen = expandedOrderId === order._id;

                  return (
                    <div
                      key={order._id}
                      className={`order-card ${isOpen ? "open" : ""}`}
                    >
                      {/* ===== COLLAPSED HEADER ===== */}
                      <div className="order-header">
                        {/* Дата + статус */}
                        <div className="order-meta">
                          <p className="order-date">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                          <span
                            className={`order-status status-${order.status?.toLowerCase()}`}
                          >
                            {order.status}
                          </span>
                        </div>

                        {/* Підсумкова сума */}
                        <div className="order-total">
                          <p>Підсумок</p>
                          <strong>{order.total} ₴</strong>
                        </div>

                        {/* Кнопка розгортання */}
                        <button
                          className="order-toggle"
                          onClick={() => toggleOrder(order._id)}
                        >
                          <img src={isOpen ? rollUp : rollDown} alt="▲" className="roll-icon" />
                        </button>
                      </div>

                      {/* ===== EXPANDED CONTENT ===== */}
                      {isOpen && (
                        <div className="order-details">
                          <hr className="divider" />

                          {/* ===== ПОЗИЦІЇ ЗАМОВЛЕННЯ ===== */}
                          <div className="order-items">
                            {order.cartItems?.map((item, index) => (
                              <div key={index} className="order-item">

                                <p className="order-title">{item.title}</p>

                                <p className="order-photo-count">
                                  {item.photoCount
                                    ? `${item.photoCount} фото`
                                    : ""}
                                </p>

                                <p className="order-quantity">
                                  x{item.quantity}
                                </p>

                                <p className="order-price">
                                  {item.price *
                                    Math.max(1, item.photoCount || 1) *
                                    item.quantity}{" "}
                                  ₴
                                </p>
                              </div>
                            ))}
                          </div>

                          <hr className="divider" />

                          {/* ===== FOOTER ЗАМОВЛЕННЯ ===== */}
                          <div className="order-footer">
                            {/* Ліва колонка — суми */}
                            <div className="order-summary">
                              <p>
                                <span>Ціна корзини:</span>
                                <span>{order.cartTotal} ₴</span>
                              </p>
                              <p>
                                <span>Ціна доставки:</span>
                                <span>{order.delivery_fee} ₴</span>
                              </p>
                              <p className="order-summary-total">
                                <strong>Загальна сума: </strong>
                                <strong>{order.total} ₴</strong>
                              </p>
                            </div>

                            {/* Права колонка — доставка */}
                            <div className="order-delivery">
                              <p>
                                <span>Служба доставки:</span>
                                <span>{order.delivery?.service}</span>
                              </p>
                              <p>
                                <span>Відділення:</span>
                                <span>{order.delivery?.branch}</span>
                              </p>
                              <p>
                                <span>Оплата:</span>
                                <span>{order.paymentMethod}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ===== СПИСОК БАЖАНЬ ===== */}
        {activeSection === "wishlist" && (
          <>
            <h2 className="chapter-title">Список бажань</h2>
            {renderWishlist()}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
