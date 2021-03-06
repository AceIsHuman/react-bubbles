import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [toggleAddNew, setToggleAddNew] = useState(false);
  const [newColor, setNewColor] = useState({ ...initialColor });

  const editColor = color => {
    setEditing(true);
    setToggleAddNew(false);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(
          colors.map(color => {
            if (color.id === res.data.id) {
              return res.data;
            }
            return color;
          })
        );
      })
      .catch(err => console.error(err.response));
    setEditing(false);
  };

  const deleteColor = id => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${id}`)
      .then(res => {
        updateColors(colors.filter(color => color.id !== res.data));
      })
      .catch(err => console.error(err.response));
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/colors", newColor)
      .then(res => {
        updateColors(res.data);
      })
      .catch(err => console.error(err.response));
    setToggleAddNew(false);
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color.id);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* stretch - build another form here to add a color */}
      {toggleAddNew ? (
        <form onSubmit={addColor}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">create</button>
            <button onClick={() => setToggleAddNew(false)}>cancel</button>
          </div>
        </form>
      ) : !editing && (
        <Button onClick={() => setToggleAddNew(true)}>add color</Button>
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
