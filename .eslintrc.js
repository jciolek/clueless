module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/react',
  ],
  plugins: ['react', 'flowtype', 'prettier', 'filenames'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
    'jsx-a11y/anchor-is-valid': ['error', { components: [] }],
    'react/jsx-props-no-spreading': 'off',
  },
  env: {
    browser: true,
  },
  overrides: [
    {
      files: ['*.test.js', '*.test.jsx'],
      env: {
        jest: true,
      },
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
  parser: 'babel-eslint',
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
};
