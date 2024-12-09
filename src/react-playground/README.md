# React 代码编辑器

## 原理
- 编辑器部分用 @monaco-editor/react 实现，然后用 @babel/standalone 在浏览器里编译。
- 编译过程中用自己写的 babel 插件实现 import 的 source 的修改，变为 URL.createObjectURL + Blob 生成的 blob url，把模块内容内联进去。
- 对于 react、react-dom 这种包，用 import maps 配合 esm.sh 网站来引入。
- 然后用 iframe 预览生成的内容，url 同样是把内容内联到 src 里，生成 blob url。

### 引入资源的问题
- 本地文件
    - Blob + URL.createBlobURL
-  react、react-dom 这种模块
    - import maps + esm.sh


### 编辑器
- 采用 @monaco-editor/react 这个包实现


### 预览器

就是 iframe，然后加一个通信机制，左边编辑器的结果，编译之后传到 iframe 里渲染就好了




## 项目有挺多技术亮点的：
- 用 @monaco-editor/react 实现了网页版 typescript 编辑器，并且实现了自动类型导入
- 通过 @babel/standalone 实现了文件编译，并且写了一个 babel 插件实现了 import 的 source 的修改
- 通过 blob url 来内联引入其他模块的代码，通过 import maps 来引入 react、react-dom 等第三方包的代码
- 通过 iframe 实现了预览功能，并且通过 postMessage 和父窗口通信来显示代码运行时的错误
- 基于 css 变量 + context 实现了主题切换功能
- 通过 fflate + btoa 实现了文件内容的编码、解码，可以通过链接分享代码
- 通过 Performance 分析性能问题，并通过 Web Worker 拆分编译逻辑到 worker 线程来进行性能优化，消除了 long lask




## 资料
- [allotment-拖动改变宽高的组件](https://www.npmjs.com/package/allotment)

