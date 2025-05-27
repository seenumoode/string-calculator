const StringCalculator = require("../src/stringCalculator");

describe("StringCalculator", () => {
  test("should return 0 for an empty string", () => {
    const calculator = new StringCalculator();
    expect(calculator.add("")).toBe(0);
  });
  test("should return the number for a single number string", () => {
    const calculator = new StringCalculator();
    expect(calculator.add("1")).toBe(1);
  });
  test("should return sum of two comma-separated numbers", () => {
    const calculator = new StringCalculator();
    expect(calculator.add("1,5")).toBe(6);
  });
  test("should handle multiple comma-separated numbers", () => {
    const calculator = new StringCalculator();
    expect(calculator.add("1,2,3,4")).toBe(10);
  });
  test("should handle newlines between numbers", () => {
    const calculator = new StringCalculator();
    expect(calculator.add("1\n2,3")).toBe(6);
  });
  test("should support custom delimiters", () => {
    const calculator = new StringCalculator();
    expect(calculator.add("//;\n1;2")).toBe(3);
  });
});
