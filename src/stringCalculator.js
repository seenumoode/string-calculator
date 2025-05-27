class StringCalculator {
  add(numbers) {
    if (numbers === "") return 0;

    let delimiter = /,|\n/; // Default delimiter: comma or newline
    let numberString = numbers;

    // Handle custom delimiter (e.g., //;\n1;2)
    if (numbers.startsWith("//")) {
      const parts = numbers.split("\n");
      delimiter = parts[0].substring(2); // Extract custom delimiter
      numberString = parts[1];
    }

    // Convert string delimiter to regex, escaping special characters
    const delimiterRegex =
      typeof delimiter === "string"
        ? new RegExp(delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        : delimiter;

    // Handle single number case
    if (!delimiterRegex.test(numberString)) {
      return parseInt(numberString);
    }

    const numberArray = numberString
      .split(delimiterRegex)
      .map((num) => parseInt(num));
    return numberArray.reduce((sum, num) => sum + num, 0);
  }
}

module.exports = StringCalculator;
