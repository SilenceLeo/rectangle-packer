#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 为ES模块文件中的相对导入添加.js扩展名
 * @param {string} filePath 文件路径
 */
function addExtensionsToFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 匹配相对导入语句的正则表达式
  // 匹配: from './module' 或 from "../module" 或 from './module.js' (已存在的)
  const importRegex = /from\s+['"]([^'"]*\.\.?\/[^'"]*?)['"]/g;
  
  content = content.replace(importRegex, (match, importPath) => {
    // 如果已经有扩展名，跳过
    if (importPath.endsWith('.js') || importPath.endsWith('.ts') || importPath.endsWith('.d.ts')) {
      return match;
    }
    
    // 为相对路径添加.js扩展名
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      modified = true;
      return match.replace(importPath, importPath + '.js');
    }
    
    return match;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 已处理: ${filePath}`);
  }
}

/**
 * 递归处理目录中的所有.js和.d.ts文件
 * @param {string} dirPath 目录路径
 */
function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (item.endsWith('.js') || item.endsWith('.d.ts')) {
      addExtensionsToFile(fullPath);
    }
  }
}

// 主函数
function main() {
  const esmDir = path.join(__dirname, '..', 'dist', 'esm');
  
  if (!fs.existsSync(esmDir)) {
    console.error('❌ ESM目录不存在，请先运行构建命令');
    process.exit(1);
  }

  console.log('🔧 开始为ES模块添加扩展名...');
  processDirectory(esmDir);
  console.log('✅ 扩展名添加完成！');
}

if (require.main === module) {
  main();
}

module.exports = { addExtensionsToFile, processDirectory }; 