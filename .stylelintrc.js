module.exports = {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'color-no-hex': true,
    'color-named': 'never',
    'scss/no-global-function-calls': null,
  },
  overrides: [
    {
      files: ['**/*.{css,scss,vue}'],
      rules: {
        'color-no-hex': [
          true,
          {
            severity: 'error',
          },
        ],
      },
      customSyntax: 'postcss-html',
    },
  ],
};
