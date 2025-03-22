import { useState } from "react";
import "./App.css";
import CooperDetails from "./CooperDetails.jsx";
import Category from "./Category.jsx";
import Categories from "./Categories.jsx";
import CategoryData from "./CategoryData.jsx";
import CategoryDialog from "./CategoryDialog.jsx";
import CategoriesSelect from "./CategoriesSelect.jsx";
import Stats from "./Stats.jsx";
import StatsDialog from "./StatsDialog.jsx";
import { initialCategories, initialStats } from "./InitialData.js";

export default function App() {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categorySelected, setCategorySelected] = useState(10001);
  const [formOpen, setFormOpen] = useState(false);
  const [stats, setStats] = useState(initialStats);
  const [statDialogOpen, setStatDialogOpen] = useState(false);

  // https://stackoverflow.com/questions/11246758/how-to-get-unique-values-in-an-array
  const dates = [...new Set(stats.map((stat) => stat.date))];

  function handleSelectedCategory(category) {
    setSelectedCategory(category.id === selectedCategory?.id ? null : category);
  }

  function handleToggle() {
    setFormOpen(!formOpen);
  }

  function handleUpdateCategory(categoryToUpdate) {
    console.log(categoryToUpdate);

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
        stat.category === statToUpdate.categorySelected &&
        stat.date === statToUpdate.date
          ? {
              ...stat,
              count: statToUpdate.count,
            }
          : stat
      )
    );
    setStatDialogOpen(false);
  }

  return (
    <div className="app">
      <CooperDetails />
      <Categories onToggle={handleToggle} formOpen={formOpen}>
        {categories.map((category) => (
          <Category
            key={category.id}
            name={category.category}
            category={category}
            onCategorySelect={handleSelectedCategory}
          />
        ))}
      </Categories>
      <div>
        <CategoryData category={selectedCategory} />
        <CategoryDialog
          formOpen={formOpen}
          categories={categories}
          onCategoryUpdate={handleUpdateCategory}
        >
          <CategoriesSelect
            categories={categories}
            categorySelected={categorySelected}
            setCategorySelected={setCategorySelected}
          />
        </CategoryDialog>
      </div>
      <Stats
        dates={dates}
        stats={stats}
        categories={categories}
        onToggleDialog={handleStatDialog}
        statDialogOpen={statDialogOpen}
      />
      <StatsDialog
        dates={dates}
        categories={categories}
        statDialogOpen={statDialogOpen}
        onStatSubmit={handleStatSubmit}
      />
    </div>
  );
}
