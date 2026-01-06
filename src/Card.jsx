import React, { useState } from "react";

function Card({ tasks, setTasks, categories, setCategories }) {
  const [showPopup, setShowPopup] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [category, setCategory] = useState("Pending");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [owner, setOwner] = useState("");
  const [date, setDate] = useState("");

  // Show only pending tasks in this card
  const pendingTasks = tasks.filter(t => t.category === "Pending");

  // Open popup in ADD mode
  function addTask() {
    setEditIndex(null);
    setNewTask("");
    setOwner("");
    setDate("");
    setCategory("Pending");
    setSelectedIndex(null);
    setShowPopup(true);
  }

  // Open popup in EDIT mode
  function openEdit() {
    if (selectedIndex === null) return;

    const task = tasks[selectedIndex];
    setEditIndex(selectedIndex);
    setNewTask(task.title);
    setOwner(task.owner || "");
    setDate(task.date || "");
    setCategory(task.category);
    setShowPopup(true);
  }

  // SAVE task (ADD or EDIT)
  function saveTask() {
    if (!newTask.trim()) return;

    const taskObj = {
      title: newTask,
      owner,
      date,
      category
    };

    // 1️⃣ Save / update task
    setTasks(prev => {
      const updated = [...prev];
      if (editIndex === null) {
        updated.push(taskObj);
      } else {
        updated[editIndex] = taskObj;
      }
      return updated;
    });

    // 2️⃣ Ensure category exists in dropdown list
    if (!categories.includes(category)) {
      setCategories(prev => [...prev, category]);
    }

    // 3️⃣ Close popup + reset edit state
    setShowPopup(false);
    setEditIndex(null);
    setSelectedIndex(null);
  }

  return (
    <div className="cards">
      <h2>Pending</h2>

      <ul>
        {pendingTasks.map(task => {
          const realIndex = tasks.indexOf(task);

          return (
            <li
              key={realIndex}
              className={`task-item ${
                selectedIndex === realIndex ? "selected" : ""
              }`}
              onClick={() => setSelectedIndex(realIndex)}
            >
              {task.title}
            </li>
          );
        })}
      </ul>

      <button className="card-btn" onClick={addTask}>ADD</button>
      <button className="card-btn1" onClick={openEdit}>EDIT</button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-header">
              <h3>{editIndex === null ? "Add Task" : "Edit Task"}</h3>
              <button className="btnpopup1" onClick={() => setShowPopup(false)}>x</button>
              <button className="btnpopup2" onClick={saveTask}>SAVE</button>
            </div>

            <form className="popup-form">
              <select value={category} onChange={e => setCategory(e.target.value)}>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Task title"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
              />

              <input
                type="text"
                placeholder="Owner"
                value={owner}
                onChange={e => setOwner(e.target.value)}
              />

              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
