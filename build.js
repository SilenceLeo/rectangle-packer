#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 清理 dist 目录
function clean() {
  console.log('🧹 清理 dist 目录...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
}

// 构建类型声明
function buildTypes() {
  console.log('📝 构建类型声明...');
  execSync('npx tsc --project tsconfig.types.json', { stdio: 'inherit' });
}

// 构建 CommonJS
function buildCJS() {
  console.log('📦 构建 CommonJS...');
  execSync('npx tsc --project tsconfig.cjs.json', { stdio: 'inherit' });
}

// 构建 ESM
function buildESM() {
  console.log('📦 构建 ESM...');
  execSync('npx tsc --project tsconfig.json', { stdio: 'inherit' });
}

// 为ES模块添加扩展名
function addExtensions() {
  console.log('🔧 为ES模块添加扩展名...');
  execSync('node scripts/add-extensions.js', { stdio: 'inherit' });
}

// 创建 package.json 文件用于不同格式
function createPackageJson() {
  console.log('📄 创建格式特定的 package.json...');
  
  // 为 CJS 创建 package.json
  const cjsPackageJson = {
    type: 'commonjs'
  };
  fs.writeFileSync(
    path.join('dist', 'cjs', 'package.json'),
    JSON.stringify(cjsPackageJson, null, 2)
  );
  
  // 为 ESM 创建 package.json
  const esmPackageJson = {
    type: 'module'
  };
  fs.writeFileSync(
    path.join('dist', 'esm', 'package.json'),
    JSON.stringify(esmPackageJson, null, 2)
  );
}

// 主构建函数
function build() {
  try {
    clean();
    buildTypes();
    buildCJS();
    buildESM();
    addExtensions();
    createPackageJson();
    console.log('✅ 构建完成！');
  } catch (error) {
    console.error('❌ 构建失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  build();
}

module.exports = { build, clean, buildTypes, buildCJS, buildESM }; 