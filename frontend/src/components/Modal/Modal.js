import "./Modal.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	deleteCardAsync,
	getCardAsync,
	decrementCountAsync,
	addCountAsync,
} from "../../redux/thunks";
import { getIndex } from "../../redux/itemsReducer";

function Modal({ item, setModal }) {
	const dispatch = useDispatch();
	const items = useSelector((state) => state.items);
	const [uuid, setUUID] = useState("");
	const curr_item = items.items[getIndex(items.items, item)];

	useEffect(() => {
		dispatch(getCardAsync(item.name));
	}, []);

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
				<div> {"SKU: " + item.SKU} </div>
				<img className="modal-image" alt={item.name} src={item.url} />
				<div>
					<button
						className={"modal-button"}
						onClick={() => {
							dispatch(decrementCountAsync(item.name));
						}}>
						-
					</button>
					<button
						className={"modal-button"}
						onClick={() => {
							dispatch(addCountAsync(item.name));
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
