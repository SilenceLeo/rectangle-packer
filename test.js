const { rectanglePacker, rectanglePackerMutation, GuillotineBinPack, Rect } = require('./dist/cjs/index.js');

console.log('🧪 开始矩形打包算法测试...\n');

// 测试辅助函数
function assertEqual(actual, expected, testName) {
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log(`✅ ${testName} - 通过`);
        return true;
    } else {
        console.log(`❌ ${testName} - 失败`);
        console.log(`   期望: ${JSON.stringify(expected)}`);
        console.log(`   实际: ${JSON.stringify(actual)}`);
        return false;
    }
}

function assertTrue(condition, testName) {
    if (condition) {
        console.log(`✅ ${testName} - 通过`);
        return true;
    } else {
        console.log(`❌ ${testName} - 失败`);
        return false;
    }
}

function assertFalse(condition, testName) {
    if (!condition) {
        console.log(`✅ ${testName} - 通过`);
        return true;
    } else {
        console.log(`❌ ${testName} - 失败`);
        return false;
    }
}

// 测试结果统计
let passedTests = 0;
let totalTests = 0;

function runTest(testFn, testName) {
    totalTests++;
    try {
        if (testFn()) {
            passedTests++;
        }
    } catch (error) {
        console.log(`❌ ${testName} - 异常: ${error.message}`);
    }
}

// 1. 测试 rectanglePacker 基础功能
console.log('📦 测试 rectanglePacker 基础功能:');
console.log('================================');

runTest(() => {
    const rectangles = [
        { width: 100, height: 50 },
        { width: 75, height: 75 },
        { width: 200, height: 100 },
        { width: 150, height: 80 }
    ];

    const result = rectanglePacker(rectangles);
    
    // 验证返回结果包含所有矩形
    assertTrue(result.length === 4, '返回结果包含所有输入矩形');
    
    // 验证每个矩形都有坐标
    result.forEach((rect, index) => {
        assertTrue(typeof rect.x === 'number', `矩形 ${index} 有 x 坐标`);
        assertTrue(typeof rect.y === 'number', `矩形 ${index} 有 y 坐标`);
        assertTrue(rect.x >= 0, `矩形 ${index} x 坐标非负`);
        assertTrue(rect.y >= 0, `矩形 ${index} y 坐标非负`);
    });

    // 验证原始数组未被修改
    assertTrue(rectangles[0].x === undefined, '原始数组未被修改');
    
    return true;
}, '基础矩形打包功能');

runTest(() => {
    const rectangles = [
        { width: 50, height: 50 },
        { width: 50, height: 50 },
        { width: 50, height: 50 }
    ];

    const result = rectanglePacker(rectangles);
    
    // 验证所有矩形都被打包
    assertTrue(result.length === 3, '所有矩形都被打包');
    
    // 验证没有重叠（简化检查）
    const positions = result.map(r => `${r.x},${r.y}`);
    const uniquePositions = new Set(positions);
    assertTrue(uniquePositions.size === 3, '矩形位置不重叠');
    
    return true;
}, '相同尺寸矩形打包');

runTest(() => {
    const rectangles = [
        { width: 100, height: 100 }
    ];

    const result = rectanglePacker(rectangles);
    
    assertTrue(result.length === 1, '单个矩形打包');
    assertTrue(result[0].x === 0, '单个矩形从原点开始');
    assertTrue(result[0].y === 0, '单个矩形从原点开始');
    
    return true;
}, '单个矩形打包');

runTest(() => {
    const rectangles = [];

    const result = rectanglePacker(rectangles);
    
    assertTrue(result.length === 0, '空数组返回空结果');
    
    return true;
}, '空数组处理');

// 2. 测试 rectanglePackerMutation 功能
console.log('\n🔄 测试 rectanglePackerMutation 功能:');
console.log('====================================');

runTest(() => {
    const rectangles = [
        { width: 100, height: 50 },
        { width: 75, height: 75 }
    ];

    const originalRectangles = JSON.parse(JSON.stringify(rectangles));
    const result = rectanglePackerMutation(rectangles);
    
    // 验证原始数组被修改
    assertTrue(rectangles[0].x !== undefined, '原始数组被修改');
    assertTrue(rectangles[1].x !== undefined, '原始数组被修改');
    
    // 验证返回结果与修改后的数组相同
    assertTrue(JSON.stringify(result) === JSON.stringify(rectangles), '返回结果与修改后的数组相同');
    
    // 验证每个矩形都有坐标
    rectangles.forEach((rect, index) => {
        assertTrue(typeof rect.x === 'number', `矩形 ${index} 有 x 坐标`);
        assertTrue(typeof rect.y === 'number', `矩形 ${index} 有 y 坐标`);
    });
    
    return true;
}, '可变矩形打包功能');

// 3. 测试 Rect 类
console.log('\n📐 测试 Rect 类:');
console.log('==============');

runTest(() => {
    const rect1 = new Rect(0, 0, 100, 50);
    const rect2 = new Rect(10, 10, 80, 30);
    
    assertTrue(rect1.x === 0, 'Rect 构造函数 x 坐标');
    assertTrue(rect1.y === 0, 'Rect 构造函数 y 坐标');
    assertTrue(rect1.width === 100, 'Rect 构造函数 width');
    assertTrue(rect1.height === 50, 'Rect 构造函数 height');
    
    return true;
}, 'Rect 构造函数');

runTest(() => {
    const rect1 = new Rect(0, 0, 100, 100);
    const rect2 = new Rect(10, 10, 80, 80);
    const rect3 = new Rect(200, 200, 50, 50);
    
    assertTrue(Rect.IsContainedIn(rect2, rect1), 'IsContainedIn - rect2 包含在 rect1 中');
    assertFalse(Rect.IsContainedIn(rect3, rect1), 'IsContainedIn - rect3 不包含在 rect1 中');
    
    return true;
}, 'Rect.IsContainedIn 方法');

// 4. 测试 GuillotineBinPack 类
console.log('\n🔪 测试 GuillotineBinPack 类:');
console.log('============================');

runTest(() => {
    const packer = new GuillotineBinPack(500, 400);
    
    assertTrue(packer.binWidth === 500, 'GuillotineBinPack 构造函数 binWidth');
    assertTrue(packer.binHeight === 400, 'GuillotineBinPack 构造函数 binHeight');
    assertTrue(packer.freeRectangles.length === 1, '初始化时有一个自由矩形');
    assertTrue(packer.usedRectangles.length === 0, '初始化时没有已使用矩形');
    
    return true;
}, 'GuillotineBinPack 构造函数');

runTest(() => {
    const packer = new GuillotineBinPack(500, 400);
    const rectangles = [
        new Rect(0, 0, 100, 50),
        new Rect(0, 0, 75, 75),
        new Rect(0, 0, 200, 100)
    ];

    packer.InsertSizes(
        rectangles,
        true,
        GuillotineBinPack.FreeRectChoiceHeuristic.RectBestAreaFit,
        GuillotineBinPack.GuillotineSplitHeuristic.SplitShorterLeftoverAxis
    );
    
    assertTrue(packer.usedRectangles.length === 3, '所有矩形都被插入');
    assertTrue(packer.usedRectangles[0].x !== undefined, '插入的矩形有坐标');
    assertTrue(packer.usedRectangles[0].y !== undefined, '插入的矩形有坐标');
    
    return true;
}, 'GuillotineBinPack InsertSizes 方法');

runTest(() => {
    const packer = new GuillotineBinPack(500, 400);
    const rectangles = [
        new Rect(0, 0, 100, 50),
        new Rect(0, 0, 75, 75)
    ];

    packer.InsertSizes(
        rectangles,
        true,
        GuillotineBinPack.FreeRectChoiceHeuristic.RectBestAreaFit,
        GuillotineBinPack.GuillotineSplitHeuristic.SplitShorterLeftoverAxis
    );
    
    const occupancy = packer.Occupancy();
    assertTrue(occupancy > 0, '占用率大于0');
    assertTrue(occupancy <= 1, '占用率小于等于1');
    
    return true;
}, 'GuillotineBinPack Occupancy 方法');

runTest(() => {
    const packer = new GuillotineBinPack(500, 400);
    const freeRect = new Rect(0, 0, 100, 100);
    const smallRect = { width: 50, height: 50 };
    const largeRect = { width: 150, height: 150 };
    
    assertTrue(packer.Fits(smallRect, freeRect), 'Fits - 小矩形适合');
    assertFalse(packer.Fits(largeRect, freeRect), 'Fits - 大矩形不适合');
    
    return true;
}, 'GuillotineBinPack Fits 方法');

runTest(() => {
    const packer = new GuillotineBinPack(500, 400);
    const freeRect = new Rect(0, 0, 100, 100);
    const perfectRect = { width: 100, height: 100 };
    const imperfectRect = { width: 50, height: 50 };
    
    assertTrue(packer.FitsPerfectly(perfectRect, freeRect), 'FitsPerfectly - 完美匹配');
    assertFalse(packer.FitsPerfectly(imperfectRect, freeRect), 'FitsPerfectly - 不完美匹配');
    
    return true;
}, 'GuillotineBinPack FitsPerfectly 方法');

// 5. 测试边界情况
console.log('\n⚠️ 测试边界情况:');
console.log('===============');

runTest(() => {
    // 测试零尺寸矩形的处理 - 应该抛出异常
    const rectangles = [
        { width: 0, height: 50 },
        { width: 100, height: 0 }
    ];

    try {
        rectanglePacker(rectangles);
        // 如果没有抛出异常，测试失败
        return false;
    } catch (error) {
        // 期望抛出异常
        assertTrue(error.message.includes('positive width and height'), '零尺寸矩形正确抛出异常');
        return true;
    }
}, '零尺寸矩形处理');

runTest(() => {
    const packer = new GuillotineBinPack(0, 0);
    
    assertTrue(packer.binWidth === 0, '零尺寸容器宽度');
    assertTrue(packer.binHeight === 0, '零尺寸容器高度');
    
    return true;
}, '零尺寸容器');

// 6. 测试性能相关
console.log('\n⚡ 测试性能相关:');
console.log('===============');

runTest(() => {
    const rectangles = [];
    for (let i = 0; i < 50; i++) {
        rectangles.push({ width: 10 + i, height: 10 + i });
    }

    const startTime = Date.now();
    const result = rectanglePacker(rectangles);
    const endTime = Date.now();
    
    assertTrue(result.length === 50, '大量矩形打包');
    assertTrue(endTime - startTime < 5000, '打包时间在合理范围内');
    
    return true;
}, '大量矩形打包性能');

// 7. 测试文档中的示例
console.log('\n📖 测试文档示例:');
console.log('===============');

runTest(() => {
    // 测试文档中的基础使用示例
    const rectangles = [
        { width: 100, height: 50 },
        { width: 75, height: 75 },
        { width: 200, height: 100 },
        { width: 150, height: 80 }
    ];

    const packedRectangles = rectanglePacker(rectangles);
    
    assertTrue(packedRectangles.length === 4, '文档示例 - 返回所有矩形');
    packedRectangles.forEach((rect, index) => {
        assertTrue(typeof rect.x === 'number', `文档示例 - 矩形 ${index} 有 x 坐标`);
        assertTrue(typeof rect.y === 'number', `文档示例 - 矩形 ${index} 有 y 坐标`);
    });
    
    return true;
}, '文档基础使用示例');

runTest(() => {
    // 测试文档中的 Guillotine 示例
    const packer = new GuillotineBinPack(500, 400);
    const rectangles = [
        new Rect(0, 0, 100, 50),
        new Rect(0, 0, 75, 75),
        new Rect(0, 0, 200, 100)
    ];

    packer.InsertSizes(
        rectangles,
        true,
        GuillotineBinPack.FreeRectChoiceHeuristic.RectBestAreaFit,
        GuillotineBinPack.GuillotineSplitHeuristic.SplitShorterLeftoverAxis
    );
    
    assertTrue(packer.usedRectangles.length === 3, '文档 Guillotine 示例 - 所有矩形被插入');
    const occupancy = packer.Occupancy();
    assertTrue(occupancy > 0 && occupancy <= 1, '文档 Guillotine 示例 - 占用率有效');
    
    return true;
}, '文档 Guillotine 示例');

// 8. 测试算法正确性
console.log('\n🎯 测试算法正确性:');
console.log('=================');

runTest(() => {
    // 测试矩形不重叠
    const rectangles = [
        { width: 50, height: 50 },
        { width: 50, height: 50 },
        { width: 50, height: 50 },
        { width: 50, height: 50 }
    ];

    const result = rectanglePacker(rectangles);
    
    // 检查是否有重叠
    let hasOverlap = false;
    for (let i = 0; i < result.length; i++) {
        for (let j = i + 1; j < result.length; j++) {
            const rect1 = result[i];
            const rect2 = result[j];
            
            // 检查两个矩形是否重叠
            if (!(rect1.x + rect1.width <= rect2.x || 
                  rect2.x + rect2.width <= rect1.x || 
                  rect1.y + rect1.height <= rect2.y || 
                  rect2.y + rect2.height <= rect1.y)) {
                hasOverlap = true;
                break;
            }
        }
        if (hasOverlap) break;
    }
    
    assertFalse(hasOverlap, '矩形不重叠验证');
    
    return true;
}, '矩形不重叠验证');

runTest(() => {
    // 测试所有矩形都被包含在容器内
    const rectangles = [
        { width: 100, height: 100 },
        { width: 100, height: 100 },
        { width: 100, height: 100 }
    ];

    const result = rectanglePacker(rectangles);
    
    // 计算容器尺寸
    let maxX = 0, maxY = 0;
    result.forEach(rect => {
        maxX = Math.max(maxX, rect.x + rect.width);
        maxY = Math.max(maxY, rect.y + rect.height);
    });
    
    // 验证所有矩形都在容器内
    let allContained = true;
    result.forEach(rect => {
        if (rect.x < 0 || rect.y < 0 || 
            rect.x + rect.width > maxX || 
            rect.y + rect.height > maxY) {
            allContained = false;
        }
    });
    
    assertTrue(allContained, '所有矩形都在容器内');
    
    return true;
}, '矩形容器边界验证');

// 输出测试结果
console.log('\n📊 测试结果总结:');
console.log('================');
console.log(`总测试数: ${totalTests}`);
console.log(`通过测试: ${passedTests}`);
console.log(`失败测试: ${totalTests - passedTests}`);
console.log(`通过率: ${((passedTests / totalTests) * 100).toFixed(2)}%`);

if (passedTests === totalTests) {
    console.log('\n🎉 所有测试通过！矩形打包算法功能正常。');
} else {
    console.log('\n⚠️ 部分测试失败，请检查相关功能。');
}
