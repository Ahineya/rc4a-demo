(() => {
	
function generateSBlock(key) {
	const S = Array.from(Array(256), (_, i) => i);
	const keyLength = key.length;

	let j = 0;
	for (let i = 0; i < 256; i++) {
		j = ( j + S[i] + key.charCodeAt(i % key.length)) % 256;
		swap(S, i, j);
	}

	return S;
}

function r4ca(text, key) {
	const S1 = generateSBlock(key);
	const S2 = generateSBlock(S1.join(""));

	const textLength = text.length;
	let pointer = 0;

	let j1 = 0;
	let j2 = 0;
	let i = 0;

	let res = "";

	while(true) {
		i++;
		j1 = ( j1 + S1[i] ) % 256;
		swap(S1, i, j1);
		const I2 = ( S1[i] + S1[j1] ) % 256;

		res += String.fromCharCode(text.charCodeAt(pointer) ^ S2[I2]);
		pointer++;
		if (pointer === textLength) {
			break;
		}

		j2 = ( j2 + S2[i] ) % 256;
		swap(S2, i, j2);
		const I1 = ( S2[i] + S2[j2] ) % 256;
		
		res += String.fromCharCode(text.charCodeAt(pointer) ^ S1[I1]);
		pointer++;
		if (pointer === textLength) {
			break;
		}
	}

	return res;
}

function swap(arr, i, j) {
	const tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}

function swapTest() {
	const arr = [1, 2];
	swap(arr, 0, 1);
	return arr.join(", ") === "2, 1";
}

function test() {
	const text = "abcdefghijklmnopqrstuvwxyz";
	const key = "some secret key";
	const encrypted = r4ca(text, key);
	const decrypted = r4ca(encrypted, key);

	console.log("============ Tests ==============");
	console.log(`Swap function: ${swapTest()}`);
	console.log("=================================");
	console.log(`Encryption/decryption: ${text === decrypted}`);
	console.log("=================================");
}

test();

const a = [1, 2];
swap(a, 0, 1);
console.log(a);

})();