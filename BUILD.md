# 构建系统说明

本项目已重构为支持多种模块格式的现代化构建系统。

## 支持的格式

- **CommonJS (CJS)**: 适用于 Node.js 传统环境
- **ES Modules (ESM)**: 适用于现代 JavaScript 环境
- **TypeScript 类型声明**: 完整的类型支持

## 构建命令

### 完整构建
```bash
npm run build
```
这会生成所有格式的输出到 `dist/` 目录。

### 单独构建
```bash
# 构建类型声明
npm run build:types

# 构建 CommonJS
npm run build:cjs

# 构建 ESM
npm run build:esm
```

### 开发模式
```bash
npm run dev
```
启动 TypeScript 编译器监视模式。

### 代码质量
```bash
# 代码格式化
npm run format

# 代码检查
npm run lint

# 格式化 + 检查
npm run fix
```

## 输出结构

构建完成后，`dist/` 目录结构如下：

```
dist/
├── cjs/           # CommonJS 格式
│   ├── package.json
│   └── *.js
├── esm/           # ES Modules 格式
│   ├── package.json
│   └── *.js
└── types/         # TypeScript 类型声明
    └── *.d.ts
```

## 包入口点

`package.json` 中的入口点配置：

```json
{
  "main": "./dist/cjs/index.js",        // CommonJS 入口
  "module": "./dist/esm/index.js",      // ESM 入口
  "types": "./dist/types/index.d.ts",   // 类型声明入口
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",  // ESM 导入
      "require": "./dist/cjs/index.js", // CommonJS 导入
      "types": "./dist/types/index.d.ts" // 类型声明
    }
  }
}
```

## 使用示例

### CommonJS 环境
```javascript
const { rectanglePacker } = require('rectangle-packer');
// 或者
const rectanglePacker = require('rectangle-packer');
```

### ES Modules 环境
```javascript
import { rectanglePacker } from 'rectangle-packer';
// 或者
import rectanglePacker from 'rectangle-packer';
```

### TypeScript 环境
```typescript
import { rectanglePacker, Rectangle, RectangleSize } from 'rectangle-packer';
```

## 配置文件说明

- `tsconfig.json`: 主配置文件，用于 ESM 构建
- `tsconfig.cjs.json`: CommonJS 构建配置
- `tsconfig.types.json`: 类型声明构建配置
- `.eslintrc.js`: ESLint 代码检查配置
- `.prettierrc`: Prettier 代码格式化配置
- `build.js`: 构建脚本

## 开发工作流

1. 在 `src/` 目录中编写 TypeScript 代码
2. 运行 `npm run dev` 启动开发模式
3. 运行 `npm run build` 构建生产版本
4. 运行 `npm run fix` 确保代码质量 