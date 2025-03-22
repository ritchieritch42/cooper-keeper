export default function Categories({
  categories,
  onCategorySelect,
  onToggle,
  formOpen,
}) {
  return (
    <div className="categories">
      <h2 className="categories-header">Cooper's Needs</h2>
      {categories.map((category) => (
        <Category
          key={category.id}
          name={category.category}
          category={category}
          onCategorySelect={onCategorySelect}
        />
      ))}
      <button className="update-coopers-needs" onClick={onToggle}>
        {formOpen ? "Close Update" : "Update a Need"}
      </button>
    </div>
  );
}

function Category({ name, category, onCategorySelect }) {
  return (
    <button className="category" onClick={() => onCategorySelect(category)}>
      {name}
    </button>
  );
}
