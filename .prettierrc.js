module.exports = {
  // 行尾逗号
  trailingComma: 'es5',
  // tab 大小
  tabWidth: 2,
  // js 分号
  semi: true,
  // js 单引号
  singleQuote: true,
  // 换行宽度
  printWidth: 180,
  // pug 格式化工具插件：https://prettier.github.io/plugin-pug/guide/
  plugins: [require.resolve('@prettier/plugin-pug')],
  // 换行宽度
  pugPrintWidth: 180,
  // 使用双引号
  pugSingleQuote: false,
  // 表达式使用分号隔开
  pugSemi: true,
  // 不使用逗号分隔
  pugAttributeSeparator: 'none',
  // 属性值按需换行
  pugWrapAttributesThreshold: -1,
  // 指定 vue 框架
  pugFramework: 'vue',
  // 空属性移除等号及后面的双引号
  pugEmptyAttributes: 'none',
  // 类名使用 . 的方式
  pugClassNotation: 'literal',
  // 移除不必要的 div 标签
  pugExplicitDiv: false,
};
