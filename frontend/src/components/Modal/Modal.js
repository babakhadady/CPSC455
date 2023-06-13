import "./Modal.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	removeItem,
	increaseCount,
	decreaseCount,
} from "../../redux/itemsReducer";

import { getIndex } from "../../redux/itemsReducer";

function Modal({ item, setModal }) {
	const dispatch = useDispatch();
	const items = useSelector((state) => state.items);
	const curr_item = items[getIndex(items, item)];

	function deleteItem() {
		dispatch(removeItem(item));
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
				<img className="modal-image" alt={item.name} src={item.url} />
				<div>
					<button className={"modal-button"}
						onClick={() => {
							dispatch(decreaseCount(item));
						}}
					>
						-
					</button>
					<button className={"modal-button"}
						onClick={() => {
							dispatch(increaseCount(item));
						}}
					>
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
