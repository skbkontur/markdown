module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-styled-components'],
  customSyntax: 'postcss-styled-syntax',
  rules: {
    'property-no-vendor-prefix': null,
    'declaration-colon-newline-after': null,
    'value-list-comma-newline-after': null,
    'declaration-empty-line-before': null,
    'no-eol-whitespace': null,
    'no-missing-end-of-source-newline': null,
    'no-empty-source': null,
    'rule-empty-line-before': null,
    'value-keyword-case': null,
    'alpha-value-notation': null,
    indentation: null,
    'no-descending-specificity': null,
    'color-function-notation': 'legacy',
    'selector-list-comma-newline-after': 'always-multi-line',
    'selector-pseudo-element-colon-notation': 'single',
  },
};
