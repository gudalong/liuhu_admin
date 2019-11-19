 const {
   override,
   fixBabelImports,
   addLessLoader,
   addDecoratorsLegacy
 } = require('customize-cra');

 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',

     style: true,
   }),
   addLessLoader({
     javascriptEnabled: true,
     modifyVars: {
       '@primary-color': 'skyblue'
     },
   }),
   // 添加装饰器语法
   // yarn add @babel/plugin-proposal-decorators --dev
   addDecoratorsLegacy()
 );