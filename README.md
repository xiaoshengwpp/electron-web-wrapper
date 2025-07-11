# ElectronBuiBuiBui

一个简洁的 Electron 应用，用于将 Web 应用打包为桌面应用。采用配置文件的方式，让环境切换更加简单。

## 🚀 快速开始

### 1. 安装依赖

```bash
yarn install
# 或
npm install
```

### 2. 配置地址

编辑 `config.json` 文件来配置你的应用地址：

```json
{
  "urls": {
    "development": "http://xxx",  // 开发环境地址
    "production": "https://xxx" // 生产环境地址
  }
}
```

### 3. 运行应用

```bash
# 开发模式 - 连接本地开发服务器
yarn dev

# 生产模式 - 连接生产环境
yarn start

# 打包应用
yarn build
```

## ⚙️ 配置说明

### config.json 完整配置

```json
{
  "app": {
    "name": "ElectronBuiBuiBui",
    "version": "0.0.1"
  },
  "window": {
    "width": 1200,        // 窗口宽度
    "height": 800,        // 窗口高度
    "minWidth": 800,      // 最小宽度
    "minHeight": 600      // 最小高度
  },
  "urls": {
    "development": "http://xxx",
    "production": "https://xxx"
  },
  "features": {
    "devTools": true,     // 开发工具
    "contextMenu": true,  // 右键菜单
    "webSecurity": false  // Web安全策略
  }
}
```

## 📋 功能特性

- ✅ 环境自动切换（开发/生产）
- ✅ 配置文件管理，无需修改代码
- ✅ 自定义右键菜单（包含刷新功能）
- ✅ 开发模式自动打开调试工具
- ✅ 窗口大小可配置
- ✅ 单例模式（防止多开）
- ✅ 页面加载错误提示
- ✅ 清晰的控制台日志

## 🛠️ 开发说明

### 目录结构

```
├── main.js           # 主进程文件
├── preload.js        # 预加载脚本
├── config.json       # 配置文件 ⭐
├── package.json      # 项目配置
└── README.md         # 说明文档
```

### 环境判断

应用会根据 `NODE_ENV` 环境变量或 `--dev` 参数判断运行环境：

- **开发环境**：禁用 Web 安全策略，自动打开调试工具
- **生产环境**：启用安全策略，优化用户体验

### 控制台输出

应用启动时会显示清晰的状态信息：

```
🚀 启动模式: 开发环境
🌐 目标地址: http://localhost:9527
✅ 页面加载成功
```

### 自定义配置

你可以根据需要修改 `config.json` 中的任何配置项：

- `urls`: 修改开发和生产环境的地址
- `window`: 调整窗口大小和最小尺寸
- `features`: 开启或关闭特定功能

## 🏗️ 构建配置

### 构建所有平台

```bash
yarn build
```

### 构建特定平台

```bash
# Windows
yarn build --win

# macOS
yarn build --mac

# Linux
yarn build --linux
```

## 🔧 故障排除

### 页面加载失败

如果出现页面加载失败：

1. 确保目标地址可访问
2. 检查 `config.json` 中的 URL 配置
3. 查看控制台错误信息

### 开发模式连接失败

如果开发模式无法连接本地服务器：

1. 确保本地开发服务器已启动
2. 检查端口号是否正确
3. 修改 `config.json` 中的 `development` 地址

## 📦 技术栈

- [Electron](https://www.electronjs.org/) - 跨平台桌面应用开发框架
- [Node.js](https://nodejs.org/) - JavaScript 运行时
- [Electron Builder](https://www.electron.build/) - 应用打包工具

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！