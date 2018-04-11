module.exports = {
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/react'
  ],
  plugins: ['react', 'flowtype', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.jsx'] }
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      { 'components': [] }
    ]
  },
  env: {
    browser: true
  },
  overrides: [
    {
      files: ['*.test.js', '*.test.jsx'],
      env: {
        jest: true
      },
      rules: {
        'no-unused-expressions': 'off'
      }
    }
  ],
  parser: 'babel-eslint',
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
};
