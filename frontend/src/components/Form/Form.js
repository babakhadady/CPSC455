import { useEffect, useState } from "react";
import "./Form.css";
import { clearItems } from "../../redux/itemsReducer";
import { useDispatch } from "react-redux";
import { addCardAsync } from "../../redux/thunks";
function Form() {
  const [itemName, setName] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState("");
  const [url, setURL] = useState("");

  const dispatch = useDispatch();
  function deleteCards() {
    dispatch(clearItems());
  }

  function submitForm() {
    const item = {
      name: itemName,
      description: about,
      price: price,
      count: 1,
      url: url,
    };
    dispatch(addCardAsync(item));
  }

  function resetForm() {
    Array.from(document.querySelectorAll('input[type="text"]')).forEach(
      (input) => (input.value = "")
    );

    setName("");
    setAbout("");
    setPrice("");
    setURL("");
  }

  return (
    <>
      <div className="main-container">
        <div id="card-form">
          <span className="form-group">
            <label>Item Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </span>
          <span className="form-group">
            <label>Description:</label>
            <input
              type="text"
              id="description"
              name="desc"
              onChange={(e) => setAbout(e.target.value)}
            />
          </span>
          <span className="form-group">
            <label>Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </span>
          <span className="form-group">
            <label>Image Url:</label>
            <input
              type="text"
              id="url"
              name="url"
              onChange={(e) => setURL(e.target.value)}
            />
          </span>
          <label> Click on a card for more information</label>
          <span className="button-group">
            <input onClick={submitForm} type="submit" value="Add" />
            <input type="reset" onClick={resetForm} value="Clear" />
          </span>
        </div>
        <button className="delete-button" onClick={deleteCards}>
          Delete All Cards
        </button>
      </div>
    </>
  );
}

export default Form;
