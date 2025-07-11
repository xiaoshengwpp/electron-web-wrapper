// preload.js

// 在页面加载前处理控制台输出
window.addEventListener('DOMContentLoaded', () => {
  // 开发环境下过滤一些已知的无害警告
  if (process.env.NODE_ENV === 'development') {
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;
    
    console.warn = function(...args) {
      const message = args.join(' ');
      // 过滤 Electron 安全警告和 single-spa 错误
      if (
        message.includes('Electron Security Warning') ||
        message.includes('single-spa minified message') ||
        message.includes('webSecurity') ||
        message.includes('allowRunningInsecureContent') ||
        message.includes('Content-Security-Policy')
      ) {
        return; // 不显示这些警告
      }
      originalConsoleWarn.apply(console, args);
    };

    console.error = function(...args) {
      const message = args.join(' ');
      // 过滤 single-spa 相关错误
      if (message.includes('single-spa minified message')) {
        return; // 不显示这些错误
      }
      originalConsoleError.apply(console, args);
    };
  }

  // 原有的版本信息显示逻辑
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
});
