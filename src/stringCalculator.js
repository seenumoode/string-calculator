class StringCalculator {
  add(numbers) {
    if (numbers === "") return 0;

    let delimiter = /,|\n/;
    let numberString = numbers;

    // Handle custom delimiter (e.g., //;\n1;2)
    if (numbers.startsWith("//")) {
      const parts = numbers.split("\n");
      delimiter = parts[0].substring(2);
      numberString = parts[1];
    }

    // Convert string delimiter to regex, escaping special characters
    const delimiterRegex =
      typeof delimiter === "string"
        ? new RegExp(delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        : delimiter;

    // Handle single number case
    if (!delimiterRegex.test(numberString)) {
      const num = parseInt(numberString);
      if (isNaN(num)) throw new Error("invalid input");
      if (num < 0) throw new Error(`negative numbers not allowed: ${num}`);
      return num;
    }

    const numberArray = numberString
      .split(delimiterRegex)
      .map((num) => parseInt(num));
    const invalidNumbers = numberArray.filter((num) => isNaN(num));
    if (invalidNumbers.length > 0) throw new Error("invalid input");
    const negatives = numberArray.filter((num) => num < 0);
    if (negatives.length > 0) {
      throw new Error(`negative numbers not allowed: ${negatives.join(",")}`);
    }
    return numberArray.reduce((sum, num) => sum + num, 0);
  }
}

module.exports = StringCalculator;
