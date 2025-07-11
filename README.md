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
    "version": "1.0.0",
    "title": "ElectronBuiBuiBui",    // 窗口标题
    "icon": {
      "window": "assets/icon.png",    // 窗口图标
      "dock": "assets/icon.png",      // Dock/任务栏图标
      "build": {
        "win": "assets/icon.ico",     // Windows构建图标
        "mac": "assets/icon.icns",    // macOS构建图标
        "linux": "assets/icon.png"    // Linux构建图标
      }
    }
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
- ✅ 自定义窗口标题和图标
- ✅ 支持多种格式的应用图标
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
├── build-config.js   # 构建配置脚本
├── package.json      # 项目配置
├── assets/           # 资源文件目录
│   ├── icon.png      # PNG格式图标
│   ├── icon.ico      # ICO格式图标（Windows）
│   └── icon.icns     # ICNS格式图标（macOS）
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
🌐 目标地址: http://xxx
✅ 页面加载成功
```

### 自定义配置

你可以根据需要修改 `config.json` 中的任何配置项：

- `app.title`: 设置窗口标题
- `app.icon`: 配置应用图标
- `urls`: 修改开发和生产环境的地址
- `window`: 调整窗口大小和最小尺寸
- `features`: 开启或关闭特定功能

### 图标配置说明

应用支持多种图标配置：

1. **窗口图标** (`icon.window`): 显示在窗口标题栏的图标
2. **Dock图标** (`icon.dock`): 显示在 macOS Dock 或 Windows 任务栏的图标
3. **构建图标** (`icon.build`): 打包后应用程序的图标

**支持的图标格式：**
- PNG: 通用格式，适用于开发环境
- ICO: Windows 专用格式
- ICNS: macOS 专用格式

**图标文件要求：**
- 建议尺寸: 256x256 像素或更高
- 文件路径: 相对于项目根目录

## 🏗️ 构建配置

### 构建所有平台

```bash
yarn build
```

构建时会自动从 `config.json` 读取图标配置并应用到最终的应用程序中。

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

### 图标不显示

如果图标没有正确显示：

1. 检查图标文件是否存在于指定路径
2. 确认图标文件格式正确（PNG/ICO/ICNS）
3. 查看控制台是否有图标相关的错误信息
4. 重启应用以应用图标更改

## 📦 技术栈

- [Electron](https://www.electronjs.org/) - 跨平台桌面应用开发框架
- [Node.js](https://nodejs.org/) - JavaScript 运行时
- [Electron Builder](https://www.electron.build/) - 应用打包工具

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！