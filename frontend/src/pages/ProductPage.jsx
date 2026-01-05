import { useParams } from "react-router-dom";
import { useState, useContext } from "react";

import LikeButton from "../components/LikeButton";

import PhotoUploader from "../components/PhotoUploader";

import "../styles/ProductPage.css";

import placeholder from "../assets/images/placeholder.png";
import { ShopContext } from "../context/shopContex";



const ProductPage = () => {
  const { id } = useParams();
  const { products, currency, addToCart} = useContext(ShopContext);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <p className="product-not-found">Товар не знайдено</p>
  }                                   

  const images =
  product.images && product.images.length > 0
    ? product.images
    : [placeholder];  
  
  const [activeImage, setActiveImage] = useState(images[0]); 
  const [isLightboxOpen, setIsLightboxOpen] = useState(false); 
  

  const [selectedOptions, setSelectedOptions] = useState(() => {
    const initial = {};

    product.options?.forEach(opt => {
      if (opt.type === "select") {
        initial[opt.key] = opt.values?.[0]?.label ?? "";
      }
    });

    return initial;
  });

  /* -------- PHOTO UPLOADER -------- */
  const hasPhotoUploader = product.photoUploader === true; // перевіряємо поле продукту

  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const isAddToCartDisabled = hasPhotoUploader && uploadedPhotos.length === 0;
  
  
  /*-------- Collect data for cart and order ----------*/

  const handleAddToCart = () => {
    const previewImage = images[0];
    addToCart(product.id, selectedOptions, uploadedPhotos, previewImage, product.price);
  };



  return (
    <div className="product-page">
      
      {/* ГАЛЕРЕЯ */}
      <div className="product-gallery">
        <img
          src={activeImage}
          alt={product.title}
          className="product-main-image"
          onClick={() => setIsLightboxOpen(true)}
        />

        <div className="product-thumbnails">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.title} ${index + 1}`}
              className={`thumbnail ${activeImage === img ? "active" : ""}`}
              onClick={() => setActiveImage(img)}
            />
          ))}
        </div>
      </div>

      {/* ІНФО */}
      <div className="product-info">
        <div className="product-title-row">
          <h1>{product.title}</h1>
          <LikeButton size={45} />
        </div>

        <p className="product-price">{product.price} {currency} /шт.</p>

        <p className="product-description">
          {product.description || "Опис товару буде додано пізніше."}
        </p>

        <p className="details">Деталі</p>
        <hr className="divider" />


        {/* ІНФО */}
        <div className="product-options">
          {product.options?.map(option => {
            switch (option.type) {

              /* ========== STATIC ========== */
              case "static":
                return (
                  <div key={option.key} className="option-row static">
                    <span className="option-label">{option.label}:</span>
                    <span className="option-value">{option.value}</span>
                  </div>
                );

              /* ========== SELECT (radio) ========== */
              case "select":
                return (
                  <div key={option.key} className="option-block">
                    <p className="option-label">{option.label}</p>

                    <div className="option-values">
                      {option.values.map(val => (
                        <label key={val.label} className="radio-option">
                          <input
                            type="radio"
                            name={option.key}
                            value={val.label}
                            checked={selectedOptions[option.key] === val.label}
                            onChange={() =>
                              setSelectedOptions(prev => ({
                                ...prev,
                                [option.key]: val.label
                              }))
                            }
                          />
                          <span className="custom-radio" />
                          {val.label}
                        </label>
                      ))}
                    </div>
                  </div>
                );
            }
          })}
        </div>

        {hasPhotoUploader && (
          <PhotoUploader onChange={setUploadedPhotos} />
        )}

        {/* ===== ADD TO CART ===== */}
        <button
          className="add-to-cart-button"
          onClick={handleAddToCart}
          disabled={isAddToCartDisabled}
          title={
            isAddToCartDisabled
              ? "Будь ласка, завантажте хоча б одне фото"
              : ""
          }
        >
          Додати до корзини
        </button>

      </div>

      




    {isLightboxOpen && (
      <div
        className="lightbox-overlay"
        onClick={() => setIsLightboxOpen(false)}
      >
        <div
          className="lightbox-content"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={activeImage} alt={product.title} />

          <button
            className="lightbox-close"
            onClick={() => setIsLightboxOpen(false)}
          >
            ✕
          </button>
        </div>
      </div>
    )}

    </div>
  );
};

export default ProductPage;



