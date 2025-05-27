class StringCalculator {
  add(numbers) {
    if (numbers === "") return 0;

    let delimiters = [",", "\n"];
    let numberString = numbers;

    if (numbers.startsWith("//")) {
      const parts = numbers.split("\n");
      if (parts.length < 2) throw new Error("invalid delimiter format");
      const delimiterPart = parts[0].substring(2);
      delimiters = delimiterPart
        .match(/\[([^\]]*)\]/g)
        ?.map((d) => d.slice(1, -1)) || [delimiterPart];
      if (delimiters.length === 0 || delimiters.some((d) => d === "")) {
        throw new Error("invalid delimiter format");
      }
      numberString = parts[1];
    }

    const delimiterRegex = new RegExp(
      delimiters.map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")
    );

    if (!delimiterRegex.test(numberString)) {
      const num = parseInt(numberString);
      if (isNaN(num)) throw new Error("invalid input");
      if (num < 0) throw new Error(`negative numbers not allowed: ${num}`);
      return num > 1000 ? 0 : num;
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
    return numberArray
      .filter((num) => num <= 1000)
      .reduce((sum, num) => sum + num, 0);
  }
}

module.exports = StringCalculator;
