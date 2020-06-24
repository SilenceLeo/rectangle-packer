# Rectangle Packer

多矩形最小面积打包

## 安装

npm:

```bash
npm install rectangle-packer --save
```

yarn:

```bash
yarn add rectangle-packer
```

## 使用

`rectanglePacker(rectangleSizes);`

### 返回新的对象列表

```javascript
import rectanglePacker from "rectangle-packer";

const list = [
    { width: 105, height: 68 },
    { width: 117, height: 115 },
    { width: 62, height: 59 },
    { width: 604, height: 314 },
    { width: 3, height: 3 },
];

const packedList = rectanglePacker(list);

console.log(packedList);
// [
//     { width: 105, height: 68, x: 117, y: 314 },
//     { width: 117, height: 115, x: 0, y: 314 },
//     { width: 62, height: 59, x: 222, y: 314 },
//     { width: 604, height: 314, x: 0, y: 0 },
//     { width: 3, height: 3, x: 117, y: 382 },
// ];
```

### 在原有对象列表上扩展

```javascript
import { rectanglePackerMutation } from "rectangle-packer";

const list = [
    { width: 105, height: 68 },
    { width: 117, height: 115 },
    { width: 62, height: 59 },
    { width: 604, height: 314 },
    { width: 3, height: 3 },
];

rectanglePackerMutation(list);

console.log(list);
// [
//     { width: 105, height: 68, x: 117, y: 314 },
//     { width: 117, height: 115, x: 0, y: 314 },
//     { width: 62, height: 59, x: 222, y: 314 },
//     { width: 604, height: 314, x: 0, y: 0 },
//     { width: 3, height: 3, x: 117, y: 382 },
// ];
```
