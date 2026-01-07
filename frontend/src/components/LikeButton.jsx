import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import heart from "/assets/icons/heart.png";
import heartFilled from "/assets/icons/heart-filled.png";
import "../styles/LikeButton.css";

const LikeButton = ({ productId, size = 40 }) => {
  const { likes, toggleLike, isAuthenticated } = useContext(AuthContext);

  const isLiked = likes.includes(productId);

  const handleClick = () => {
    if (!isAuthenticated) {
      alert("Увійдіть, щоб додавати товари до списку бажань");
      return;
    }
    toggleLike(productId);
  };

  return (
    <img
      src={isLiked ? heartFilled : heart}
      alt="like"
      className="like-button"
      onClick={handleClick}
      style={{ width: size, height: size }}
    />
  );
};

export default LikeButton;

