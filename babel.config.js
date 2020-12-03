module.exports = {
  presets: [
    [
      '@babel/react',
      {
        runtime: 'automatic',
      },
    ],
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
