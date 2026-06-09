module.exports = {
  rules: {
    'color-no-hex': true,
  },
  overrides: [
    {
      files: ['**/*.{css,scss,vue}'],
      customSyntax: 'postcss-html',
    },
  ],
};
