// Function that takes a number and returns a string with the number formatted as a price
// Returns price with currency sign and commas

export function formatPrice(price: number) {
  return `$${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}
