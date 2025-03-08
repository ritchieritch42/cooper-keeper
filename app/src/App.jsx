import "./App.css";
import { useState } from "react";

const initialCategories = [
  {
    id: 10001,
    category: "Medicine",
    count: 1,
    frequency: 3,
  },
  {
    id: 10002,
    category: "Exercise",
    count: 3,
    frequency: 1,
  },
  {
    id: 10003,
    category: "Food",
    count: 3,
    frequency: 1,
  },
];

function App() {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);

  function handleSelectedCategory(category) {
    setSelectedCategory(category.id === selectedCategory?.id ? null : category);
  }

  return (
    <div className="app">
      <Categories
        categories={categories}
        onCategorySelect={handleSelectedCategory}
      />
      <Data category={selectedCategory} />
    </div>
  );
}

function Categories({ categories, onCategorySelect }) {
  return (
    <div className="categories">
      {categories.map((category) => (
        <Category
          key={category.id}
          name={category.category}
          category={category}
          onCategorySelect={onCategorySelect}
        />
      ))}
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

function Data({ category }) {
  if (category === null) return;

  return (
    <div className="data">
      <span className="cooper-needs">Cooper needs {category.category}...</span>
      <ul className="data-list">
        <li>
          {category.count === 1 && `${category.count} time`}
          {category.count > 1 && `${category.count} times`}
        </li>
        <li>
          {category.frequency === 1 && "Everyday"}

          {category.frequency > 1 && `Every ${category.frequency} days`}
        </li>
      </ul>
    </div>
  );
}

export default App;
