module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@arco-design/web-vue'],
            message: 'Import Arco components from @tranyu/ui instead',
            allowedImportNames: [],
            importNamePattern: '.*',
          },
        ],
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  overrides: [
    {
      files: ['packages/ui/**/*.vue', 'packages/ui/**/*.ts'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
  ],
};
