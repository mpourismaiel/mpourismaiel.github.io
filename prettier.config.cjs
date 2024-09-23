module.exports = {
  arrowParens: "avoid",
  bracketSpacing: true,
  bracketSameLine: false,
  quoteProps: "consistent",
  singleQuote: false,
  tabWidth: 2,
  printWidth: 80,
  trailingComma: "all",
  endOfLine: "auto",
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  importOrder: [
    // third party modules are first, not specified due to default settings
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
