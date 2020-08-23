module.exports = {
  plugins: ['@typescript-eslint', 'react', 'prettier', 'filenames'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:import/typescript',
    'prettier',
    'prettier/react',
  ],
  rules: {
    'prettier/prettier': 'error',
    'jsx-a11y/anchor-is-valid': ['error', { components: [] }],
    'react/jsx-props-no-spreading': 'off',
    'react/static-property-placement': ['error', 'static public field'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        extensions: ['.ts', '.tsx'],
      },
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts?(x)'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
        'react/prop-types': 'off',
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        'react/jsx-filename-extension': 'off',
      },
    },
    {
      files: ['*.test.[jt]s?(x)'],
      env: {
        jest: true,
      },
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
};
