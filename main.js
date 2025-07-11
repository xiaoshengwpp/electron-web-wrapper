const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

// 开发环境下完全禁用安全警告
if (process.env.NODE_ENV === 'development' || process.argv.includes('--dev')) {
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
  app.commandLine.appendSwitch('--disable-web-security');
  app.commandLine.appendSwitch('--allow-running-insecure-content');
}

// 加载配置文件
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));

// 判断环境
const isDev = process.env.NODE_ENV === 'development' || process.argv.includes('--dev');
const targetUrl = isDev ? config.urls.development : config.urls.production;

console.log(`🚀 启动模式: ${isDev ? '开发环境' : '生产环境'}`);
console.log(`🌐 目标地址: ${targetUrl}`);

function createWindow() {
  // 创建浏览器窗口
  const windowOptions = {
    width: config.window.width,
    height: config.window.height,
    minWidth: config.window.minWidth,
    minHeight: config.window.minHeight,
    title: config.app.title,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: isDev ? config.features.webSecurity : true, // 开发环境禁用安全限制
      allowRunningInsecureContent: isDev, // 开发环境允许混合内容
    }
  };

  // 设置图标（如果配置了且文件存在）
  if (config.app.icon && config.app.icon.window) {
    const iconPath = path.join(__dirname, config.app.icon.window);
    if (fs.existsSync(iconPath)) {
      windowOptions.icon = iconPath;
      console.log(`🎨 窗口图标: ${iconPath}`);
    } else {
      console.warn(`⚠️  窗口图标文件不存在: ${iconPath}`);
    }
  }

  const mainWindow = new BrowserWindow(windowOptions);

  // 加载目标URL
  mainWindow.loadURL(targetUrl)
    .then(() => {
      console.log('✅ 页面加载成功');
    })
    .catch(error => {
      console.error('❌ 页面加载失败:', error);
      if (isDev) {
        console.log('💡 提示: 请确保本地开发服务器已启动');
      }
    });

  // 页面准备就绪后显示窗口
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // 不自动打开开发者工具，可以通过右键菜单手动开启

  // 右键菜单
  if (config.features.contextMenu) {
    mainWindow.webContents.on('context-menu', (_, params) => {
      const contextMenu = Menu.buildFromTemplate([
        {
          label: '刷新',
          accelerator: 'CmdOrCtrl+R',
          click: () => mainWindow.webContents.reload()
        },
        { type: 'separator' },
        { label: '复制', role: 'copy' },
        { label: '粘贴', role: 'paste' },
        { label: '全选', role: 'selectAll' },
        { type: 'separator' },
        {
          label: '开发者工具',
          accelerator: 'CmdOrCtrl+Shift+I',
          click: () => mainWindow.webContents.openDevTools()
        }
      ]);
      contextMenu.popup({ window: mainWindow, x: params.x, y: params.y });
    });
  }

  // 监听页面加载错误
  mainWindow.webContents.on('did-fail-load', (_, errorCode, errorDescription, validatedURL) => {
    console.error(`❌ 页面加载失败: ${errorCode} - ${errorDescription}`);
    console.error(`📍 失败的URL: ${validatedURL}`);
  });

  return mainWindow;
}

// 应用就绪时创建窗口
app.whenReady().then(() => {
  // 设置应用图标（用于Dock/任务栏）
  if (config.app.icon && config.app.icon.dock) {
    const iconPath = path.join(__dirname, config.app.icon.dock);
    if (fs.existsSync(iconPath)) {
      app.dock && app.dock.setIcon(iconPath); // macOS Dock图标
      console.log(`🎨 Dock图标设置: ${iconPath}`);
    } else {
      console.warn(`⚠️  Dock图标文件不存在: ${iconPath}`);
    }
  }
  
  createWindow();

  // macOS 特有行为
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 防止应用多开
app.on('second-instance', () => {
  const windows = BrowserWindow.getAllWindows();
  if (windows.length > 0) {
    const mainWindow = windows[0];
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

// 应用启动时的单例检查
if (!app.requestSingleInstanceLock()) {
  app.quit();
}