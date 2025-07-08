# Electron Web Wrapper

一个简单的 Electron 应用程序，用于将网页应用包装成桌面应用。支持开发和生产模式，具备右键菜单和开发者工具功能。

## 功能特性

- 🖥️ 将网页应用打包为桌面应用
- 🔧 支持开发和生产模式切换
- 🖱️ 内置右键上下文菜单
- 🛠️ 集成开发者工具
- 📦 支持跨平台打包

## 技术栈

- [Electron](https://www.electronjs.org/) - 跨平台桌面应用开发框架
- [Node.js](https://nodejs.org/) - JavaScript 运行时
- [Electron Builder](https://www.electron.build/) - 应用打包工具

## 安装依赖

```bash
# 使用 yarn
yarn install

# 或使用 npm
npm install
```

## 开发模式

开发模式下，应用会加载 `http://localhost:3000` 并自动打开开发者工具。

```bash
# 启动开发模式
yarn start

# 或
npm start
```

**注意**: 开发模式需要你的 React/Vue/Angular 等前端项目在 3000 端口运行。

## 生产模式

生产模式下，应用会加载线上地址（默认: `https://tms.mingruiyun.com/`）。

你可以通过环境变量 `PROD_URL` 来指定生产环境的网址：

```bash
# 设置生产环境 URL
export PROD_URL=https://your-website.com
yarn start
```

## 应用打包

### 构建所有平台

```bash
yarn build
```

### 构建特定平台

```bash
# 构建 Windows 版本
yarn build --win

# 构建 macOS 版本  
yarn build --mac

# 构建 Linux 版本
yarn build --linux
```

### Docker 构建 Windows 版本

如果你在 macOS/Linux 下需要构建 Windows 版本，可以使用 Docker：

```bash
docker run --rm -ti \
  --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS_TAG|TRAVIS|TRAVIS_REPO_|TRAVIS_BUILD_|TRAVIS_BRANCH|TRAVIS_PULL_REQUEST_|APPVEYOR_|CSC_|GH_|GITHUB_|BT_|AWS_|STRIP|BUILD_') \
  --env ELECTRON_CACHE="/root/.cache/electron" \
  --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
  -v ${PWD}:/project \
  -v ${PWD##*/}-node-modules:/project/node_modules \
  -v ~/.cache/electron:/root/.cache/electron \
  -v ~/.cache/electron-builder:/root/.cache/electron-builder \
  electronuserland/builder:wine \
  /bin/bash -c "yarn && yarn build --win"
```

## 项目结构

```
electron-web-wrapper/
├── main.js          # 主进程文件
├── preload.js       # 预加载脚本
├── index.html       # 默认页面（开发时的占位页面）
├── package.json     # 项目配置
├── .gitignore       # Git 忽略文件
└── README.md        # 项目说明
```

## 配置说明

### 修改目标网站

编辑 `main.js` 文件中的 `prodUrl` 变量：

```javascript
const prodUrl = process.env.PROD_URL || 'https://your-website.com/';
```

### 自定义窗口设置

在 `main.js` 的 `createWindow` 函数中修改窗口参数：

```javascript
const mainWindow = new BrowserWindow({
  width: 1200,        // 窗口宽度
  height: 800,        // 窗口高度
  minWidth: 800,      // 最小宽度
  minHeight: 600,     // 最小高度
  // ... 其他配置
});
```

### 应用图标和信息

编辑 `package.json` 中的构建配置：

```json
{
  "build": {
    "appId": "com.yourcompany.yourapp",
    "productName": "Your App Name",
    "directories": {
      "output": "dist"
    }
  }
}
```

## 开发说明

1. **开发环境**: 确保你的前端应用在 `localhost:3000` 运行
2. **生产环境**: 修改 `main.js` 中的生产环境 URL
3. **调试**: 使用 Ctrl/Cmd + Shift + I 打开开发者工具
4. **右键菜单**: 内置复制、粘贴、全选功能

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！