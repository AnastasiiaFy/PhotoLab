import { useParams } from "react-router-dom";
import { useState, useContext, useEffect, useMemo } from "react";
import { ShopContext } from "../context/shopContex";

import LikeButton from "../components/LikeButton";
import PhotoUploader from "../components/PhotoUploader";

import "../styles/ProductPage.css";
import placeholder from "/assets/images/placeholder.png";

const API_URL = "http://localhost:4000/api/products";


const ProductPage = () => {
  const { id } = useParams();
  const { currency, addToCart } = useContext(ShopContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ---------- FETCH PRODUCT ---------- */
  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/${id}`, {
          signal: controller.signal
        });

        if (!res.ok) {
          throw new Error("Product not found");
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    return () => controller.abort();
  }, [id]);

  /* ---------- STATES ---------- */
  const images = useMemo(() => {
    return product?.imageUrls?.length
      ? product.imageUrls
      : [placeholder];
  }, [product]);

  const [activeImage, setActiveImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  /* ---------- INIT IMAGE ---------- */
  useEffect(() => {
    if (images.length) {
      setActiveImage(images[0]);
    }
  }, [images]);

  /* ---------- INIT OPTIONS ---------- */
  useEffect(() => {
    if (!product) return;

    const initial = {};
    product.options?.forEach(opt => {
      if (opt.type === "select") {
        initial[opt.key] = opt.values?.[0]?.label ?? "";
      }
    });

    setSelectedOptions(initial);
  }, [product]);

  /* ---------- STATES ---------- */
  if (loading) {
    return <p className="product-loading">Завантаження...</p>;
  }

  if (error || !product) {
    return <p className="product-not-found">Товар не знайдено</p>;
  }

  const hasPhotoUploader = product.photoUploader === true;
  const isAddToCartDisabled =
    hasPhotoUploader && uploadedPhotos.length === 0;

  const handleAddToCart = () => {
    addToCart(product, selectedOptions, uploadedPhotos);
  };

  /* ---------- RENDER ---------- */
  return (
    <div className="product-page">

      {/* ===== GALLERY ===== */}
      <div className="product-gallery">
        {activeImage && (
          <img
            src={activeImage}
            alt={product.title}
            className="product-main-image"
            onClick={() => setIsLightboxOpen(true)}
          />
        )}

        <div className="product-thumbnails">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.title} ${index + 1}`}
              className={`thumbnail ${
                activeImage === img ? "active" : ""
              }`}
              onClick={() => setActiveImage(img)}
            />
          ))}
        </div>
      </div>

      {/* ===== INFO ===== */}
      <div className="product-info">
        <div className="product-title-row">
          <h1>{product.title}</h1>
          <LikeButton size={45} productId={product._id} />
        </div>

        <p className="product-price">
          {product.price} {currency} / шт.
        </p>

        <p className="product-description">
          {product.description || "Опис товару буде додано пізніше."}
        </p>

        <p className="details">Деталі</p>
        <hr className="divider" />

        <div className="product-options">
          {product.options?.map(option => {
            if (option.type === "static") {
              return (
                <div key={option.key} className="option-row static">
                  <span className="option-label">{option.label}:</span>
                  <span className="option-value">{option.value}</span>
                </div>
              );
            }

            if (option.type === "select") {
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
                          checked={
                            selectedOptions[option.key] === val.label
                          }
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

            return null;
          })}
        </div>

        {hasPhotoUploader && (
          <PhotoUploader onChange={setUploadedPhotos} />
        )}

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

      {/* ===== LIGHTBOX ===== */}
      {isLightboxOpen && activeImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="lightbox-content"
            onClick={e => e.stopPropagation()}
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
