const fs = require('fs');
const path = require('path');

// 读取配置文件
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// 更新构建配置中的图标设置
if (config.app.icon && config.app.icon.build) {
  // 设置Windows图标
  if (config.app.icon.build.win && fs.existsSync(config.app.icon.build.win)) {
    packageJson.build.win.icon = config.app.icon.build.win;
  }
  
  // 设置macOS图标
  if (config.app.icon.build.mac && fs.existsSync(config.app.icon.build.mac)) {
    packageJson.build.mac.icon = config.app.icon.build.mac;
  }
  
  // 设置Linux图标
  if (config.app.icon.build.linux && fs.existsSync(config.app.icon.build.linux)) {
    packageJson.build.linux = packageJson.build.linux || {};
    packageJson.build.linux.icon = config.app.icon.build.linux;
  }
}

// 设置应用名称
if (config.app.name) {
  packageJson.build.productName = config.app.name;
}

// 写回package.json
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

console.log('✅ 构建配置已更新');