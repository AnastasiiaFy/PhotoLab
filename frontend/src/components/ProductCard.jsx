import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/ProductCard.css';
import LikeButton from "./LikeButton";

import placeholder from "../assets/images/placeholder.png";
import { ShopContext } from "../context/shopContex";



const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const highlightText = (text, query) => {
  if (!query) return text;

  const safeQuery = escapeRegExp(query);
  const regex = new RegExp(`(${safeQuery})`, "gi");

  return text.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="highlight">
        {part}
      </span>
    ) : (
      part
    )
  );
};


const ProductCard = ({ product, searchQuery  }) => {
  const navigate = useNavigate();

  const {currency} = useContext(ShopContext);

  const imageSrc =
  product.images && product.images.length > 0
    ? product.images[0] : placeholder;  

  return (
    <div className="product-card">
      <img src={imageSrc} alt={product.title} />

      <h3>{highlightText(product.title, searchQuery)}</h3>
      <p className="price">{product.price} {currency}</p>

      <div className="card-actions">
        <LikeButton size={40} />

        <button onClick={() => navigate(`/product/${product.id}`)}>
          Детальніше
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
