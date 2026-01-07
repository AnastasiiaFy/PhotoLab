import Order from "../models/orderModel.js";

// ===== Створення замовлення =====
export const createOrder = async (req, res) => {
  const { cartItems, customer, delivery, paymentMethod, cartTotal, delivery_fee, total } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Корзина порожня" });
  }

  try {
    const order = await Order.create({
      user: req.user._id,
      cartItems,
      customer,
      delivery,
      paymentMethod,
      cartTotal,
      delivery_fee,
      total,
    });

    // повертаємо plain object без внутрішніх полів Mongoose
    res.status(201).json(order.toObject({ getters: true }));
  } catch (err) {
    console.error("Помилка createOrder:", err); // для дебагу в консолі сервера
    res.status(500).json({ message: "Помилка при створенні замовлення", error: err.message });
  }
};

// ===== Отримання історії замовлень користувача =====
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    // конвертуємо кожне замовлення у plain object
    const ordersPlain = orders.map(order => order.toObject({ getters: true }));
    res.json(ordersPlain);
  } catch (err) {
    console.error("Помилка getUserOrders:", err);
    res.status(500).json({ message: "Помилка при отриманні замовлень", error: err.message });
  }
};
