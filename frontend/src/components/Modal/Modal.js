import "./Modal.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteCardAsync, getCardAsync } from "../../redux/thunks";
import { getIndex } from "../../redux/itemsReducer";

function Modal({ item, setModal }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [uuid, setUUID] = useState("");
  const curr_item = items.items[getIndex(items.items, item)];

  useEffect(() => {
    dispatch(getCardAsync(item.name));
  }, []);

  useEffect(() => {
    setUUID(items.currentItem.uuid);
  }, [items]);

  function deleteItem() {
    dispatch(deleteCardAsync(item.name));
    setModal(null);
  }

  return (
    <div className="details-modal">
      <div className="modal-close" onClick={() => setModal(null)}>
        Close
      </div>
      <h1 className="details-modals-title"> {item.name}</h1>
      <div className="details-modal-content">
        <div>{item.description}</div>
        <div>{`Count: ` + curr_item.count}</div>
        <div>{`$` + item.price}</div>
        <div> {"uuid:" + uuid} </div>
        <img className="modal-image" alt={item.name} src={item.url} />
        <div>
          <button
            className={"modal-button"}
            onClick={() => {
              // dispatch(decreaseCount(item));
            }}>
            -
          </button>
          <button
            className={"modal-button"}
            onClick={() => {
              // dispatch(increaseCount(item));
            }}>
            +
          </button>
        </div>
        <button className="modal-delete" onClick={deleteItem}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Modal;
