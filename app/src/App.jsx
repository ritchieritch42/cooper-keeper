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

const initialStats = [
  { id: 1, date: "3/11/2025", category: "Medicine", count: 1 },
  { id: 2, date: "3/11/2025", category: "Exercise", count: 4 },
  { id: 3, date: "3/11/2025", category: "Food", count: 7 },
  { id: 4, date: "3/12/2025", category: "Medicine", count: 2 },
  { id: 5, date: "3/12/2025", category: "Exercise", count: 5 },
  { id: 6, date: "3/12/2025", category: "Food", count: 8 },
  { id: 7, date: "3/13/2025", category: "Medicine", count: 3 },
  { id: 8, date: "3/13/2025", category: "Exercise", count: 6 },
  { id: 9, date: "3/13/2025", category: "Food", count: 9 },
];

function App() {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [stats, setStats] = useState(initialStats);
  const [statDialogOpen, setStatDialogOpen] = useState(false);

  function handleSelectedCategory(category) {
    setSelectedCategory(category.id === selectedCategory?.id ? null : category);
  }

  function handleToggle() {
    setFormOpen(!formOpen);
  }

  function handleUpdateCategory(categoryToUpdate) {
    setCategories(
      categories.map((category) =>
        category.id === categoryToUpdate.id
          ? {
              ...category,
              count: categoryToUpdate.count,
              frequency: categoryToUpdate.frequency,
            }
          : category
      )
    );

    setFormOpen(false);
    setSelectedCategory(null);
  }

  function handleStatDialog() {
    setStatDialogOpen(!statDialogOpen);
  }

  function handleStatSubmit(statToUpdate) {
    setStats(
      stats.map((stat) =>
        stat.id === statToUpdate.categoryId
          ? {
              ...stat,
              count: statToUpdate.count,
            }
          : stat
      )
    );

    console.log(statToUpdate);
    setStatDialogOpen(false);
  }

  return (
    <div className="app">
      <Categories
        categories={categories}
        onCategorySelect={handleSelectedCategory}
        onToggle={handleToggle}
        formOpen={formOpen}
      />
      <div>
        <Data category={selectedCategory} />
        <Dialog
          formOpen={formOpen}
          categories={categories}
          onCategoryUpdate={handleUpdateCategory}
        />
      </div>
      <Stats
        stats={stats}
        categories={categories}
        onToggleDialog={handleStatDialog}
        statDialogOpen={statDialogOpen}
      />
      <StatForm
        stats={stats}
        statDialogOpen={statDialogOpen}
        onStatSubmit={handleStatSubmit}
      />
    </div>
  );
}

function Categories({ categories, onCategorySelect, onToggle, formOpen }) {
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

function Dialog({ formOpen, categories, onCategoryUpdate }) {
  const [count, setCount] = useState("");
  const [frequency, setFrequency] = useState("");
  const [categorySelected, setCategorySelected] = useState(10001);

  if (formOpen === false) return;

  function handleSubmit(e) {
    e.preventDefault();

    if (!count || !frequency) return;
    onCategoryUpdate({
      id: categorySelected,
      count: count,
      frequency: frequency,
    });
  }

  return (
    <form className="dialog" onSubmit={handleSubmit}>
      <h4>Update a Category</h4>
      <p className="dialog-preface">
        <em>Count and Frequency Must be Greater than Zero</em>
      </p>
      <label>Category</label>
      <select
        value={categorySelected}
        onChange={(e) => setCategorySelected(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.category}
          </option>
        ))}
      </select>
      <label>Count</label>
      <input
        className="dialog-input"
        type="text"
        value={count}
        onChange={(e) =>
          setCount(
            isNaN(e.target.value)
              ? ""
              : Number(e.target.value) > 5
              ? count
              : Number(e.target.value)
          )
        }
      ></input>
      <label>Frequency</label>
      <input
        className="dialog-input"
        type="text"
        value={frequency}
        onChange={(e) =>
          setFrequency(
            isNaN(e.target.value)
              ? ""
              : Number(e.target.value) > 14
              ? frequency
              : Number(e.target.value)
          )
        }
      ></input>
      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
}

function Stats({ stats, categories, onToggleDialog, statDialogOpen }) {
  const dayOne = "3/11/2025";
  const dayTwo = "3/12/2025";
  const dayThree = "3/13/2025";

  const dayOneStats = stats.filter((stat) =>
    stat.date === dayOne ? stat : ""
  );
  const dayTwoStats = stats.filter((stat) =>
    stat.date === dayTwo ? stat : ""
  );
  const dayThreeStats = stats.filter((stat) =>
    stat.date === dayThree ? stat : ""
  );

  return (
    <div>
      <h2>Cooper's Stats</h2>
      <button onClick={onToggleDialog}>
        {statDialogOpen ? "Close Update" : "Update a Stat"}
      </button>
      <table className="table">
        <tbody>
          <tr>
            <th>Day</th>
            {categories.map((category) => (
              <th key={category.id}>{category.category}</th>
            ))}
          </tr>
          <tr>
            <td key={dayOne}>{dayOne}</td>
            {dayOneStats.map((stat) => (
              <td key={stat.id}>{stat.count}</td>
            ))}
            {/* {stats.map((stat) => (
              <td key={stat.id}>{stat.category}</td>
            ))} */}
          </tr>
          <tr>
            <td key={dayTwo}>{dayTwo}</td>
            {dayTwoStats.map((stat) => (
              <td key={stat.id}>{stat.count}</td>
            ))}
            {/* {stats.map((stat) => (
              <td key={stat.id}>{stat.category}</td>
            ))} */}
          </tr>
          <tr>
            <td key={dayThree}>{dayThree}</td>
            {dayThreeStats.map((stat) => (
              <td key={stat.id}>{stat.count}</td>
            ))}
            {/* {stats.map((stat) => (
              <td key={stat.id}>{stat.category}</td>
            ))} */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function StatForm({ stats, statDialogOpen, onStatSubmit }) {
  const [categoryId, setCategoryId] = useState(0);
  const [count, setCount] = useState(0);

  if (!statDialogOpen) return;

  function handleSubmit(e) {
    e.preventDefault();

    if (!categoryId) return;
    onStatSubmit({ categoryId, count });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Category</label>
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
      >
        <option value="">---</option>
        {stats.map((stat) => (
          <option key={stat.id} value={stat.id}>
            {stat.category}
          </option>
        ))}
      </select>
      <label>Count</label>
      <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
        <option value={0} selected="selected">
          0
        </option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <button>Submit</button>
    </form>
  );
}

export default App;
