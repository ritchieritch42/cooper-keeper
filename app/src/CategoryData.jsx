export default function CategoryData({ category }) {
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
