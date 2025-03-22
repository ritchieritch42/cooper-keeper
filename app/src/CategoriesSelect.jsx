export default function CategoriesSelect({
  categories,
  categorySelected,
  setCategorySelected,
}) {
  return (
    <>
      <label>Category</label>
      <select
        value={categorySelected}
        onChange={(e) => setCategorySelected(Number(e.target.value))}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.category}
          </option>
        ))}
      </select>
    </>
  );
}
