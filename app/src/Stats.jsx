export default function Stats({
  stats,
  dates,
  categories,
  onToggleDialog,
  statDialogOpen,
}) {
  const dayOne = dates[0];
  const dayTwo = dates[1];
  const dayThree = dates[2];

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
      <button className="stat-update" onClick={onToggleDialog}>
        {statDialogOpen ? "Close Update" : "Update a Stat"}
      </button>
    </div>
  );
}
