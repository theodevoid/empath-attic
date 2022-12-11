/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  printWidth: 80,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "all",
  semi: true,
  arrowParens: "avoid",
  bracketSpacing: true,
  singleAttributePerLine: true,
};
