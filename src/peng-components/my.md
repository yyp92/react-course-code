# 组件库发布


## 命令
```bash
# 创建下项目
npx create-vite peng-components

# 安装依赖
npm install
npm install --save react-transition-group lodash-es dayjs classnames
npm i --save-dev @types/react-transition-group

# 编译
npx tsc -p tsconfig.build.json --module ESNext --outDir dist/esm
npx tsc -p tsconfig.build.json --module commonjs --outDir dist/cjs
# 打包umd格式
npx webpack
# 编译下样式：
npx sass ./src/Calendar/index.scss ./dist/esm/Calendar/index.css
npx sass ./src/Calendar/index.scss ./dist/cjs/Calendar/index.css
npx sass ./src/Message/index.scss ./dist/esm/Message/index.css
npx sass ./src/Message/index.scss ./dist/cjs/Message/index.css

# 发布 npm 包, 执行 npm adduser 命令，会打印一个链接让你登录或者注册
npm adduser
# 登录后就可以 npm publish 了
npm publish
```