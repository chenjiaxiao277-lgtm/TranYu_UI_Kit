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
        paths: [
          {
            name: '@arco-design/web-vue',
            message: 'Import Arco components from @tranyu/ui instead',
          },
        ],
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  overrides: [
    {
      files: ['packages/ui/**/*', 'packages/business/**/*', 'playground/**/*', 'main-platform/**/*'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
    {
      files: ['**/*.vue'],
      rules: {
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/valid-v-slot': 'off',
        'vue/require-default-prop': 'off',
      },
    },
    {
      files: ['packages/ui/**/*.vue', 'packages/business/**/*.vue'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['packages/business/**/*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['playground/src/views/**Demo*.vue'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
