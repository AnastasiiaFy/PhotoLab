import { useState, useRef, useEffect  } from "react";
import "../styles/PhotoUploader.css";

const MAX_PHOTOS = 15;


const PhotoUploader = ({ onChange }) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  /* ========= СИНХРОНІЗАЦІЯ З БАТЬКОМ ========= */
  useEffect(() => {
    onChange?.(files);
  }, [files, onChange]);

  /* ========= ДОДАВАННЯ ФАЙЛІВ ========= */

  const addFiles = (newFiles) => {
    setFiles(prev => {
      const availableSlots = MAX_PHOTOS - prev.length;

      if (availableSlots <= 0) {
        return prev;
      }

      const filesToAdd = newFiles.slice(0, availableSlots);
      return [...prev, ...filesToAdd];
    });
  };

  /* ========= INPUT ========= */

  const handleInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(file =>
      file.type.startsWith("image/")
    );

    addFiles(selectedFiles);

    // дозволяє повторно вибирати той самий файл
    e.target.value = null;
  };

  /* ========= DRAG & DROP ========= */

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith("image/")
    );

    addFiles(droppedFiles);
  };

  /* ========= ВИДАЛЕННЯ ========= */

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className={`photo-uploader ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label className="upload-label">
        Перетягніть фото сюди або натисніть для вибору
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleInputChange}
        />
      </label>

      {/* ===== ЛІЧИЛЬНИК ===== */}
      <div className="photo-counter">
        {files.length} / {MAX_PHOTOS}
      </div>

      <div className="preview-list">
        {files.map((file, index) => (
          <div key={index} className="preview-item">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              onLoad={(e) => URL.revokeObjectURL(e.target.src)}
            />
            <button onClick={() => removeFile(index)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoUploader;
