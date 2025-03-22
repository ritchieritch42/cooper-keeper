import { useState } from "react";

export default function StatsDialog({
  categories,
  statDialogOpen,
  onStatSubmit,
}) {
  const [categorySelected, setCategorySelected] = useState("");
  const [count, setCount] = useState(0);
  const [date, setDate] = useState("3/11/2025");

  const dayOne = "3/11/2025";
  const dayTwo = "3/12/2025";
  const dayThree = "3/13/2025";

  const days = [dayOne, dayTwo, dayThree];

  if (!statDialogOpen) return;

  function handleSubmit(e) {
    e.preventDefault();

    if (!categorySelected) return;
    onStatSubmit({ date, categorySelected, count });
  }

  return (
    <form onSubmit={handleSubmit} className="stat-form">
      <label>Date</label>
      <select value={date} onChange={(e) => setDate(e.target.value)}>
        {days.map((day) => (
          <option value={day} key={day}>
            {day}
          </option>
        ))}
      </select>
      <label>Category</label>
      <select
        value={categorySelected}
        onChange={(e) => setCategorySelected(e.target.value)}
      >
        <option value="">---</option>
        {categories.map((category) => (
          <option key={category.id} value={category.category}>
            {category.category}
          </option>
        ))}
      </select>
      <label>Count</label>
      <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((element) => (
          <option value={element}>{element}</option>
        ))}
      </select>
      <button className="stat-submit">Submit</button>
    </form>
  );
}
