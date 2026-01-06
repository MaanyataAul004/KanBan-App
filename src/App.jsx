import React, { useState } from "react";
import Card from "./Card";
import Card_inprogress from "./Card_inprg";
import Card_complete from "./Card_completed";
import Add_Category from "./Add_Category";
import CustomCard from "./CustomCard";

function App() {
  const [tasks, setTasks] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);
  const [categories, setCategories] = useState([
    "Pending",
    "In progress",
    "Completed"
  ]);
  

  return (
    <>
      <h1 className="title">KanBan App</h1>

      <div className="board">
      <Card tasks={tasks} setTasks={setTasks} categories={categories} setCategories={setCategories}/>
      <Card_inprogress tasks={tasks} setTasks={setTasks} categories={categories} setCategories={setCategories} />
      <Card_complete tasks={tasks} setTasks={setTasks} categories={categories} setCategories={setCategories} />

        {customCategories.map(cat => (
          <CustomCard
            key={cat}
            category={cat}
            tasks={tasks}
            setTasks={setTasks}
          />
        ))}

        <Add_Category
          customCategories={customCategories}
          setCustomCategories={setCustomCategories}
        />
      </div>
    </>
  );
}

export default App;
