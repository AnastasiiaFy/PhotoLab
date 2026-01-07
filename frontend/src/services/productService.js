export const fetchProducts = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/products"); 
    if (!res.ok) throw new Error("Помилка при завантаженні продуктів");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};