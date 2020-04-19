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
    '@babel/flow',
  ],
  plugins: [
    '@babel/transform-runtime',
    '@babel/proposal-class-properties',
    '@babel/transform-flow-strip-types',
    'lodash',
    'react-hot-loader/babel',
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
