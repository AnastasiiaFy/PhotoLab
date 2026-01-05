import { useState } from "react";
import heart from "../assets/icons/heart.png";
import heartFilled from "../assets/icons/heart-filled.png";
import "../styles/LikeButton.css";

const LikeButton = ({ size = 40, initialLiked = false, onChange }) => {
  const [liked, setLiked] = useState(initialLiked);

  const toggleLike = () => {
    const newValue = !liked;
    setLiked(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <img
      src={liked ? heartFilled : heart}
      alt="like"
      className="like-button"
      onClick={toggleLike}
      style={{ width: size, height: size }}
    />
  );
};

export default LikeButton;
