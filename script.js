((window) => {
	const inputElem = document.querySelector(".input");
	const outputElem = document.querySelector(".output");
	const keyElem = document.querySelector(".key");
	const doButton = document.querySelector(".do");

	doButton.addEventListener("click", () => {
		const text = inputElem.value;
		keyElem.value = keyElem.value || "" + Math.rand();
		const key = keyElem.value;

		outputElem.innerText = window.rc4a(text, key);
	});

})(window);