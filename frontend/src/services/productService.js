const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/products`);
    if (!res.ok) throw new Error("Помилка при завантаженні продуктів");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};
