export default function round(number: number, decimalPlaces: number = 0) {
  const factorOfTen = Math.pow(10, decimalPlaces)
  return Math.round(number * factorOfTen) / factorOfTen
}
