const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended', 'airbnb', 'airbnb/hooks', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-var': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    'react/button-has-type': 'off',
    'react/prop-types': 'off',
    'react/sort-comp': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: 'useRecoilCallback',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.d.ts'],
      rules: {
        'import/no-duplicates': 0,
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.less', '.jsx', '.json', '.jsonc', '.wasm'],
      },
      alias: {
        map: [
          ['_src', path.resolve(__dirname, './src/')],
          ['_components', path.resolve(__dirname, './src/components/')],
          ['_containers', path.resolve(__dirname, './src/containers/')],
          ['_constants', path.resolve(__dirname, './src/constants/')],
          ['_utils', path.resolve(__dirname, './src/utils/')],
          ['_assets', path.resolve(__dirname, 'src/assets/')],
          ['_abis', path.resolve(__dirname, 'src/abis/')],
        ],
        extensions: ['.js', '.less', '.jsx', '.json', '.jsonc', '.wasm'],
      },
    },
  },
};
