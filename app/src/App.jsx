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
  {
    id: 20001,
    category: "Medicine",
    count: 0,
  },
  {
    id: 20002,
    category: "Exercise",
    count: 0,
  },
  {
    id: 20003,
    category: "Food",
    count: 0,
  },
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
        onToggleDialog={handleStatDialog}
        statDialogOpen={statDialogOpen}
      />
      <StatForm stats={stats} statDialogOpen={statDialogOpen} />
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

function Stats({ stats, onToggleDialog, statDialogOpen }) {
  return (
    <div>
      <h2>Cooper's Stats</h2>
      <button onClick={onToggleDialog}>
        {statDialogOpen ? "Close Update" : "Update a Stat"}
      </button>
      <table className="table">
        <tr>
          {stats.map((stat) => (
            <th>{stat.category}</th>
          ))}
        </tr>
        <tr>
          {stats.map((stat) => (
            <td>{stat.count}</td>
          ))}
        </tr>
      </table>
    </div>
  );
}

function StatForm({ stats, statDialogOpen }) {
  if (!statDialogOpen) return;

  return (
    <form>
      <label>Category</label>
      <select>
        {stats.map((stat) => (
          <option>{stat.category}</option>
        ))}
      </select>
      <label>Count</label>
      <select>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <button>Submit</button>
    </form>
  );
}

export default App;
