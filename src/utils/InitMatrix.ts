export function InitMatrix<T>(height: number, width: number, value: T) : T[][] {
	return new Array(height).fill(0).map(() => new Array(width).fill(value));
}