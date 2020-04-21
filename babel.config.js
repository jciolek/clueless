module.exports = {
  presets: [
    '@babel/react',
    [
      '@babel/env',
      {
        modules: false,
        loose: true,
        useBuiltIns: false,
        targets: {
          browsers: ['last 2 versions', 'ie >= 11'],
        },
      },
    ],
    '@babel/typescript',
  ],
  plugins: [
    '@babel/transform-runtime',
    '@babel/proposal-class-properties',
    'lodash',
    'react-hot-loader/babel',
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
      },
    ],
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              node: true,
            },
          },
        ],
      ],
    },
  },
};
