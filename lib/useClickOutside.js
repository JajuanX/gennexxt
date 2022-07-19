import { useEffect, useRef } from "react";

const useClickOutside = (handler) => {
	const elementRef = useRef();
	useEffect(() => {
		const currentElement = elementRef?.current.getAttribute('name');
		const handle_handler = event => {
			if(currentElement !== event.target.getAttribute('name')) {
				handler(false);
			}
		};
		document.addEventListener("mousedown", handle_handler);
	})
	return elementRef;
} 

export default useClickOutside;