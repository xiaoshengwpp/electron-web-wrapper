const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // 推荐开启
      nodeIntegration: false // 推荐关闭  / 开启后可以右键菜单
    }
  });

  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    // 开发模式: 加载 React 的开发服务器
    mainWindow.loadURL('http://localhost:3000');
    // 打开开发者工具
    mainWindow.webContents.openDevTools();
  } else {
    // 生产模式: 加载线上地址
    const prodUrl = process.env.PROD_URL || 'https://tms.mingruiyun.com/';
    mainWindow.loadURL(prodUrl);
  }

  // 添加右键上下文菜单
  mainWindow.webContents.on('context-menu', (event, params) => {
    const template = [
      {
        label: '复制',
        role: 'copy',
      },
      {
        label: '粘贴',
        role: 'paste',
      },
      {
        label: '全选',
        role: 'selectAll',
      },
      { type: 'separator' },
      {
        label: '检查',
        accelerator: 'CmdOrCtrl+Shift+I',
        click: () => {
          mainWindow.webContents.openDevTools();
        }
      }
    ];
    const menu = Menu.buildFromTemplate(template);
    menu.popup(mainWindow, params.x, params.y);
  });
}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 当所有窗口都被关闭时退出
app.on('window-all-closed', function () {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') app.quit();
});

// 在这个文件中，你可以包含应用程序剩余的所有主进程代码。
// 你也可以把它们分成几个文件，然后用 require 导入。 

