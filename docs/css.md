# CSS 使用

**注** 本文所述内容仅适用于 0.8 及以上版本（当前仍在开发中）

### 全局 CSS & 组件 CSS

Koot.js 规定，存在有 2 种 CSS 文件：全局 CSS (Global CSS) 和组件 CSS (Module CSS)

**全局 CSS**

- 所有全局 CSS 文件会根据所属的 Webpack 入口，被抽出为对应的独立的 CSS 文件 (打包结果中的 `extract.[hash].css`)
  - 只有被 JS 代码引用到的 CSS 文件才会被抽出
- 所有这些 CSS 文件结果也会被整合到一个统一的 CSS 文件中 (打包结果中的 `extract.all.[hash].css`)
- 统一的 CSS 文件的文件内容会被自动写入到 `<head>` 标签内的 `<style>` 标签中
- 虽然通常情况下已无需要，不过根据 Webpack 入口抽出的 CSS 文件仍可根据具体的需求独立使用

**组件 CSS**

- 所有的组件 CSS 必须通过 `extend` 高阶组件的 `styles` 选项调用
- 这些 CSS 文件内必须有一个名为 `.component` 或 `.[name]__component` 的 className
  - 该 className 会被更换为 hash 结果，如 `.a85c6k` 或 `.nav__bjj15a`
- `props.className` 会传入到对应的组件，其值为与上述结果对应的 hash 后的 className

除了组件 CSS 要求文件内必须存在特定的 className 外，CSS 的写法无特殊要求。Koot.js 也不强制要求必须为 `.css` 扩展名的文件，`.less` `.scss` `.sass` 也均可以使用。

此外，Koot.js 已默认加入了处理 CSS、LESS 和 SASS 的 webpack loader，无需额外定义。

### 配置

配置文件 (默认为 `/koot.config.js`) 中的 `css.fileBasename` 为这 2 种 CSS 文件的不包含扩展名的基本文件名正则规则的设置。以下是默认设置: 

```javascript
module.exports = {
    // ...
    css: {
        fileBasename: {
            // 全局 CSS 文件名规则（不包括扩展名的基础文件名）
            normal: /^((?!\.(component|module)\.).)*/,
            // 组件 CSS 文件名规则（不包括扩展名的基础文件名）
            component: /\.(component|module)/
        }
    },
    // ...
}
```

_默认规则解释:_ 以 `.component.css` 或 `.module.css` (扩展名可为 `css` `less` `sass` 等) 为结尾的文件会当作组件 CSS，其他文件会被当做全局 CSS
