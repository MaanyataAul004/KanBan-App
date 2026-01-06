import React, { useState } from "react";

function Add_Category({ customCategories, setCustomCategories }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const addCategory = () => {
    setName("");
    setShow(true);
  };

  const saveCategory = (e) => {
    e.preventDefault(); // prevent form submit

    const trimmed = name.trim();
    if (!trimmed) return;

    if (customCategories.includes(trimmed)) return;

    setCustomCategories(prev => [...prev, trimmed]);
    setShow(false);
  };

  return (

    <div className="add-category-card">
      <h1 className="add-category-card-title">Add Category</h1>
      <button className="card-plus-btn" onClick={addCategory}>+</button>

      {show && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-header">
              <h3>Add Category</h3>
              <button
                type="button"
                className="btnpopup1"
                onClick={() => setShow(false)}
              >
                x
              </button>

              <button
                type="button"   
                className="btnpopup2"
                onClick={saveCategory}
              >
                SAVE
              </button>
            </div>

            <form className="popup-form">
              <input
                type="text"
                placeholder="Category name"
                value={name}
                onChange={e => setName(e.target.value)}
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Add_Category;
