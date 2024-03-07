module.exports = {
  '*.{ts,tsx}': ['prettier --parser typescript --write', 'eslint --ext=ts,tsx --fix'],
  '*.styled.{ts,tsx}': [`stylelint \'src/**/*.styled.{tsx,ts}\'`],
};
