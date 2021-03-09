module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@data': './src/data',
        '@models': './src/models',
        '@controllers': './src/controllers',
        '@config': './src/config',
        '@middlewares': './src/middlewares'
      }
    }]
  ]
}
