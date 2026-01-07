import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })


export const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({ message: 'Такий користувач вже існує' })
  }

  const user = await User.create({ name, email, password })

  // повертаємо plain object
  const userObj = user.toObject()
  res.status(201).json({
    _id: userObj._id,
    name: userObj.name,
    email: userObj.email,
    token: generateToken(userObj._id)
  })
}

export const authUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401).json({ message: 'Неправильний логін або пароль' })
  }
}

export const getUserProfile = async (req, res) => {
  res.json(req.user)
}


/**
 * ================================
 * TOGGLE LIKE (додати / видалити)
 * POST /api/users/like/:productId
 * ================================
 */
export const toggleLike = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    const isLiked = user.likes.includes(productId);

    if (isLiked) {
      // ❌ Видаляємо зі списку вподобань
      user.likes = user.likes.filter(
        (id) => id.toString() !== productId
      );
    } else {
      // ✅ Додаємо до списку вподобань
      user.likes.push(productId);
    }

    await user.save();

    res.json({
      message: isLiked
        ? "Товар видалено зі списку бажань"
        : "Товар додано до списку бажань",
      likes: user.likes, // повертаємо оновлений масив
    });

  } catch (error) {
    console.error("toggleLike error:", error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

/**
 * ================================
 * GET LIKED PRODUCTS (Wishlist)
 * GET /api/users/likes
 * ================================
 */
export const getLikedProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("likes"); // ⬅️ дуже важливо

    if (!user) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    res.json(user.likes); // масив повноцінних продуктів
  } catch (error) {
    console.error("getLikedProducts error:", error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};