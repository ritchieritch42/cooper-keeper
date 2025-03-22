export default function Categories({ children, onToggle, formOpen }) {
  return (
    <div className="categories">
      <h2 className="categories-header">Cooper's Needs</h2>
      {children}
      <button className="update-coopers-needs" onClick={onToggle}>
        {formOpen ? "Close Update" : "Update a Need"}
      </button>
    </div>
  );
}
