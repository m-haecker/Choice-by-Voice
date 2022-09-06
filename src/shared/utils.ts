/**
 * Shuffles an array in place. This method mutates the array and returns a reference to
 * the same array. Source: https://stackoverflow.com/a/12646864/3125128
 */
export function shuffleArray<T>(arr: T[]) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

/**
 * @return `n` random elements of the given array `arr`. Does not mutate `arr`.
 */
export function getRandom(arr: string[], n: number) {
	const copy = [...arr];
	return shuffleArray(copy).slice(0, n);
}

/**
 * @returns a random int within [min, max]. Based on https://stackoverflow.com/a/42321673/3125128
 */
export function getRandomInt(min: number, max: number) {
	const randomBuffer = new Uint32Array(1);
	window.crypto.getRandomValues(randomBuffer);
	const randomNumber = randomBuffer[0] / (0xffffffff + 1);
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(randomNumber * (max - min + 1)) + min;
}
