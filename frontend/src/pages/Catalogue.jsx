import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContex";
import CategoryList from "../components/CategoryList";
import ProductCard from "../components/ProductCard";
import "../styles/Catalogue.css";

import searchIcon from "/assets/icons/search.png";


const Catalogue = () => {

  const {products} = useContext(ShopContext)
  const [activeCategory, setActiveCategory] = useState("Всі");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Якщо продукти ще не завантажені
  if (!products || products.length === 0) {
    return <p className="product-downloading">Завантаження продуктів...</p>;
  }

  // Фільтрація продуктів по категорії та пошуку
  const filteredProducts = products
    .filter(p => activeCategory === "Всі" ? true : p.category === activeCategory)
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="catalogue">
      <CategoryList
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="catalogue-content">

        {/* ПОШУК */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Введіть назву товару чи послуги ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`search-input ${searchOpen ? "open" : ""}`}
          />

          <button
            className="search-button"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <img src={searchIcon} alt="Пошук" />
          </button>
        </div>

        {/* ТОВАРИ */}
        <div className="catalogue-products">
          {filteredProducts.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              searchQuery={searchQuery}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Catalogue;

