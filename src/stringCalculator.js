class StringCalculator {
  add(numbers) {
    if (numbers === "") return 0;
    if (!numbers.includes(",") && !numbers.includes("\n"))
      return parseInt(numbers);
    const numberArray = numbers.split(/,|\n/).map((num) => parseInt(num));
    return numberArray.reduce((sum, num) => sum + num, 0);
  }
}

module.exports = StringCalculator;
