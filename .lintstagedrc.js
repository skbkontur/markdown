module.exports = {
  '*.{ts,tsx}': ['prettier --parser typescript --write', 'eslint --ext=ts,tsx --fix', `stylelint 'src/**/*.{tsx,ts}'`],
};
