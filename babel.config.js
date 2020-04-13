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
          browsers: ['last 2 versions', 'ie >= 11']
        }
      }
    ],
    '@babel/flow'
  ],
  plugins: [
    '@babel/transform-runtime',
    '@babel/proposal-class-properties',
    '@babel/transform-flow-strip-types',
    'lodash'
  ],
  env: {
    development: {
      plugins: ['react-hot-loader/babel']
    },
    test: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              node: true
            }
          }
        ]
      ]
    }
  }
};
