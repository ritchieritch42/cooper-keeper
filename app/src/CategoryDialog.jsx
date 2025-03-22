import { useState } from "react";

export default function CategoryDialog({
  formOpen,
  categories,
  onCategoryUpdate,
}) {
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
        onChange={(e) => setCategorySelected(Number(e.target.value))}
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
