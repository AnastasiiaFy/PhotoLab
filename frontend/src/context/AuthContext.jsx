import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);       
  const [token, setToken] = useState(null);
  const [likes, setLikes] = useState([]);     
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token;

  /* ================= INIT FROM localStorage ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedLikes = localStorage.getItem("likes");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setLikes(storedLikes ? JSON.parse(storedLikes) : []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      fetchLikes(token);
    }
  }, [token]);


  /* ================= FETCH LIKES FROM SERVER ================= */
  const fetchLikes = async (authToken) => {
    try {
      const res = await fetch(`${BASE_URL}/api/users/likes`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) {
        setLikes([]);
        localStorage.removeItem("likes");
        return;
      }

      const data = await res.json();
      const ids = data.map((product) => product._id);

      setLikes(ids);
      localStorage.setItem("likes", JSON.stringify(ids));
    } catch (error) {
      console.error("fetchLikes error:", error);
    }
  };



  /* ================= LOGIN ================= */
  const login = async (email, password) => {
    const res = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Помилка входу");
    }

    const data = await res.json();

    setUser({
      _id: data._id,
      name: data.name,
      email: data.email,
    });

    setToken(data.token);

    localStorage.setItem("user", JSON.stringify({
      _id: data._id,
      name: data.name,
      email: data.email,
    }));

    localStorage.setItem("token", data.token);
    await fetchLikes(data.token);
  };

  /* ================= REGISTER ================= */
  const register = async (name, email, password) => {
    const res = await fetch(`${BASE_URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Помилка реєстрації");
    }

    const data = await res.json();

    setUser({
      _id: data._id,
      name: data.name,
      email: data.email,
    });

    setToken(data.token);
    setLikes([]);

    localStorage.setItem("user", JSON.stringify({
      _id: data._id,
      name: data.name,
      email: data.email,
    }));

    localStorage.setItem("token", data.token);
    localStorage.setItem("likes", JSON.stringify([]));
  };

  /* ================= TOGGLE LIKE ================= */
  const toggleLike = async (productId) => {
    if (!token) return;

    try {
      const res = await fetch(`${BASE_URL}/api/users/like/${productId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      const data = await res.json();

      const updatedLikes = data.likes.map((id) => id.toString());
      setLikes(updatedLikes);
      localStorage.setItem("likes", JSON.stringify(updatedLikes));
    } catch (error) {
      console.error("toggleLike error:", error);
    }
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    setUser(null);
    setToken(null);
    setLikes([]);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("likes");

    navigate("/login");
  };

  const value = {
    user,
    token,
    likes,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    toggleLike,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
