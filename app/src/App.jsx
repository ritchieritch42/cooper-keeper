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
  const [formData, setFormData] = useState({
    count: 0,
    frequency: 0,
  });

  function handleSelectedCategory(category) {
    setSelectedCategory(category.id === selectedCategory?.id ? null : category);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className="app">
      <Categories
        categories={categories}
        onCategorySelect={handleSelectedCategory}
      />
      <div>
        <Data category={selectedCategory} />
        <Dialog formData={formData} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

function Categories({ categories, onCategorySelect }) {
  return (
    <div className="categories">
      <h2>Cooper's Needs</h2>
      {categories.map((category) => (
        <Category
          key={category.id}
          name={category.category}
          category={category}
          onCategorySelect={onCategorySelect}
        />
      ))}
      <button className="update-coopers-needs">Update Cooper's Needs</button>
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

function Dialog({ formData, onSubmit }) {
  const Range = [...Array(6).keys()];
  const [count, setCount] = useState(0);
  const [frequency, setFrequency] = useState(0);

  return (
    <form className="dialog" onSubmit={onSubmit}>
      <label>Count</label>
      <select value={count} onChange={(e) => setCount(e.target.value)}>
        {Range.map((number, index) => (
          <option key={index}>{number}</option>
        ))}
      </select>
      <label>Frequency</label>
      <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
        {Range.map((number, index) => (
          <option key={index}>{number}</option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
