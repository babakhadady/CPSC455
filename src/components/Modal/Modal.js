import "./Modal.css";

import { removeItem} from "../../redux/itemsReducer";
import { useDispatch } from "react-redux";

function Modal({ item, setModal }) {
  const dispatch = useDispatch();

  function deleteItem() {
    dispatch(removeItem(item));
    setModal(null);
}

  return (
    <div className="details-modal">
      <div className="modal-close" onClick={() => setModal(null)}>
        {" "}
        Close
      </div>
      <h1 className="details-modals-title"> {item.name}</h1>
      <div className="details-modal-content">
        <div>{item.description}</div>
        <div>{`$` + item.price}</div>
        <img className="modal-image" src={item.url} />

        <button className="modal-delete" onClick={deleteItem}>
          Delete{" "}
        </button>
      </div>
    </div>
  );
}

export default Modal;
