import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // ✅ safer unique IDs

function CustomCard({ category, tasks, setTasks, categories, setCategories }) {
  const [showPopup, setShowPopup] = useState(false);
  const [newTasks, setNewTasks] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [owner, setOwner] = useState("");
  const [date, setDate] = useState("");
  const [localCategory, setLocalCategory] = useState(category);

  // keep localCategory in sync with parent prop
  useEffect(() => {
    setLocalCategory(category);
  }, [category]);

  const categoryTasks = tasks.filter((t) => t.category === localCategory);

  function addTask() {
    // Always start fresh
    setEditIndex(null);
    setSelectedIndex(null);
    setNewTasks("");
    setOwner("");
    setDate("");
    setLocalCategory(category);
    setShowPopup(true);
  }

  function openEdit() {
    if (showPopup) return;
    if (selectedIndex === null) return;

    const task = tasks.find((t) => t.id === selectedIndex);
    if (!task) return;

    setEditIndex(task.id);
    setNewTasks(task.title);
    setOwner(task.owner || "");
    setDate(task.date || "");
    setLocalCategory(task.category); // ✅ ensure correct category loads
    setShowPopup(true);
  }

  function saveTask() {
    if (!categories.includes(localCategory)) {
      setCategories((prev) => [...prev, localCategory]);
    }

    if (!newTasks.trim()) return;

    const taskObj = {
      id: editIndex === null ? uuidv4() : editIndex, // ✅ stable ID for edits
      title: newTasks,
      owner,
      date,
      category: localCategory,
    };

    setTasks((prev) => {
      const updated = [...prev];
      if (editIndex === null) {
        updated.push(taskObj);
      } else {
        const idx = updated.findIndex((t) => t.id === editIndex);
        if (idx !== -1) {
          updated[idx] = taskObj;
        }
      }
      return updated;
    });

    setShowPopup(false);
    setEditIndex(null);
    setSelectedIndex(null);
  }

  return (
    <div className="cards">
      <h2>{localCategory}</h2>

      <ul>
        {categoryTasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${
              selectedIndex === task.id ? "selected" : ""
            }`}
            onClick={() => setSelectedIndex(task.id)}
          >
            {task.title}
          </li>
        ))}
      </ul>

      <button className="card-btn" onClick={addTask}>
        ADD
      </button>
      <button className="card-btn1" onClick={openEdit}>
        EDIT
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-header">
              <h3>{editIndex === null ? "Add Task" : "Edit Task"}</h3>
              <button
                className="btnpopup1"
                onClick={() => setShowPopup(false)}
              >
                x
              </button>
              <button className="btnpopup2" onClick={saveTask}>
                SAVE
              </button>
            </div>

            <form className="popup-form">
              <select
                value={localCategory}
                onChange={(e) => setLocalCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Add Task"
                value={newTasks}
                onChange={(e) => setNewTasks(e.target.value)}
              />
              <input
                type="text"
                placeholder="Owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomCard;
