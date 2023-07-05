import { useEffect, useState } from "react";

function CountModal({ hideModal }) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		fetch("http://localhost:3001/cards/count/all")
			.then((res) => {
				return res.json();
			})
			.then((c) => {
				setCount(c[0]["count"]);
			});
	}, []);

	return (
		<div className="details-modal">
			<div className="modal-close" onClick={() => hideModal(false)}>
				Close
			</div>
			<br />
			<br />
			<div className="details-modal-title">{`Total Count: ` + count}</div>
			<br />
			<br />
		</div>
	);
}

export default CountModal;
