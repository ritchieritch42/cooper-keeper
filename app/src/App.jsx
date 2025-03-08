import "./App.css";

function App() {
  return (
    <div className="app">
      <Categories />
      <Data />
    </div>
  );
}

function Categories() {
  return (
    <div className="categories">
      <Category />
      <Category />
      <Category />
    </div>
  );
}

function Category() {
  return <button className="category">Test</button>;
}

function Data() {
  return (
    <div className="data">
      <ul className="data-list">
        <li>X</li>
        <li>X</li>
        <li>X</li>
      </ul>
    </div>
  );
}

export default App;
