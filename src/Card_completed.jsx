import React, { useState } from "react";

function Card_complete({tasks, setTasks, categories, setCategories }) {
  const [showPopup, setShowPopup] = useState(false);
  const [newTasks, setNewTasks] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [category, setCategory] = useState("Completed");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [owner, setOwner] = useState("");
  const [date, setDate] = useState("");
  const completedTasks = tasks.filter(t => t.category === "Completed");



  function addTask() {
    setEditIndex(null);
    setNewTasks("");
    setOwner("");  
    setDate(""); 
    setCategory("Completed");
    setSelectedIndex(null);
    setShowPopup(true);
  }

  function openEdit() {
    if (selectedIndex === null) return;
  
    const task = tasks[selectedIndex];
    setEditIndex(selectedIndex);
    setNewTasks(task.title);
    setOwner(task.owner || ""); 
    setDate(task.date || "");
    setCategory(task.category);
    setShowPopup(true);
  }

  function saveTask() {

    if (!categories.includes(category)) {
      setCategories(prev => [...prev, category]);
    }
    
    if (!newTasks.trim()) return;

    const taskObj = { title: newTasks,  owner, date, category };

    setTasks(prev => {
      const updated = [...prev];
      if (editIndex === null) {
        updated.push(taskObj);
      } else {
        updated[editIndex] = taskObj;
      }
      return updated;
    });

    setShowPopup(false);
    setEditIndex(null);
    setSelectedIndex(null);
  }

  return (
    <div className="cards_comp">
      <h2>Completed:</h2>

      <ul>
  {completedTasks.map(task => {
    const realIndex = tasks.indexOf(task);
    return (
      <li
        key={realIndex}
        className={`task-item ${selectedIndex === realIndex ? "selected" : ""}`}
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
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

              <input
                type="text"
                placeholder="Add Task"
                value={newTasks}
                onChange={(e) => setNewTasks(e.target.value)}/>
              <input type="text" placeholder="Owner" value={owner} 
              onChange={(e) => setOwner(e.target.value)}/>
              <input type="date" placeholder="Date" value={date} 
              onChange={(e) => setDate(e.target.value)}/>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card_complete;
