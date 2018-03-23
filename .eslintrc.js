module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.jsx'] }
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
      }      
    }
  ],
  parser: 'babel-eslint'
};
