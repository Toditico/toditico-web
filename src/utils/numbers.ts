export const getNearestMultipleOf50 = (number: number) => {
  return Math.floor(number / 50) * 50;
};

export const twoFixedPlacesIfFloat = (number: number) => {
  return Number.isInteger(number) ? number : Number(number.toFixed(2))
}
