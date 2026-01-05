const categories = [
  "Всі",
  "Друк фото",
  "Друк фото-Polaroid",
  "Друк фото-Instax",
  "Фотомагніти",
  "Стікери",
  "Фотоальбоми"
];

const CategoryList = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="categories">
      {categories.map(cat => (
        <button
          key={cat}
          className={`category-item ${activeCategory === cat ? "active" : ""}`}
          onClick={() => setActiveCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;