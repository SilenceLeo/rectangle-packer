# Rectangle Packer

[![npm version](https://badge.fury.io/js/rectangle-packer.svg)](https://badge.fury.io/js/rectangle-packer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

A high-performance TypeScript library for 2D rectangle packing algorithms. This library provides efficient solutions for packing rectangles into the smallest possible container while minimizing wasted space.

## 🚀 Features

- **Multiple Packing Algorithms**: Implements both area-based packing and Guillotine bin packing algorithms
- **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- **High Performance**: Optimized algorithms for efficient rectangle packing
- **Flexible API**: Support for both immutable and mutable operations
- **Zero Dependencies**: Lightweight library with no external dependencies
- **Well Documented**: Comprehensive documentation and examples

## 📦 Installation

```bash
npm install rectangle-packer
```

or

```bash
yarn add rectangle-packer
```

## 🎯 Quick Start

### Basic Usage

```typescript
import { rectanglePacker } from 'rectangle-packer';

// Define rectangles with width and height
const rectangles = [
  { width: 100, height: 50 },
  { width: 75, height: 75 },
  { width: 200, height: 100 },
  { width: 150, height: 80 }
];

// Pack rectangles into the smallest possible container
const packedRectangles = rectanglePacker(rectangles);

console.log(packedRectangles);
// Output: [
//   { width: 100, height: 50, x: 0, y: 0 },
//   { width: 75, height: 75, x: 100, y: 0 },
//   { width: 200, height: 100, x: 0, y: 50 },
//   { width: 150, height: 80, x: 200, y: 50 }
// ]
```

### Mutable Packing

```typescript
import { rectanglePackerMutation } from 'rectangle-packer';

const rectangles = [
  { width: 100, height: 50 },
  { width: 75, height: 75 }
];

// This modifies the original rectangles by adding x, y coordinates
const result = rectanglePackerMutation(rectangles);

console.log(rectangles); // Original array is modified
console.log(result); // Same as rectangles
```

### Guillotine Bin Packing

```typescript
import GuillotineBinPack, { Rect } from 'rectangle-packer';

// Create a bin packer with specified dimensions
const packer = new GuillotineBinPack(500, 400);

// Create rectangles
const rectangles = [
  new Rect(0, 0, 100, 50),
  new Rect(0, 0, 75, 75),
  new Rect(0, 0, 200, 100)
];

// Pack rectangles using different heuristics
packer.InsertSizes(
  rectangles,
  true, // merge free rectangles
  GuillotineBinPack.FreeRectChoiceHeuristic.RectBestAreaFit,
  GuillotineBinPack.GuillotineSplitHeuristic.SplitShorterLeftoverAxis
);

console.log(packer.usedRectangles);
console.log(packer.Occupancy()); // Get occupancy percentage
```

## 📚 API Reference

### Core Functions

#### `rectanglePacker<T extends RectangleSize>(rectangleSizes: T[]): Rectangle[]`

Packs rectangles into the smallest possible container using an area-based algorithm.

**Parameters:**
- `rectangleSizes`: Array of rectangles with `width` and `height` properties

**Returns:**
- Array of rectangles with added `x` and `y` coordinates

**Example:**
```typescript
const rectangles = [
  { width: 100, height: 50 },
  { width: 75, height: 75 }
];

const packed = rectanglePacker(rectangles);
```

#### `rectanglePackerMutation<T extends Rectangle>(rectangleSizes: T[]): (T & Rectangle)[]`

Packs rectangles and modifies the original array by adding `x` and `y` coordinates.

**Parameters:**
- `rectangleSizes`: Array of rectangles with `width` and `height` properties

**Returns:**
- Modified original array with added coordinates

### Types

#### `Rectangle`
```typescript
interface Rectangle {
  width: number;
  height: number;
  x?: number;
  y?: number;
  __id?: number;
}
```

#### `RectangleSize`
```typescript
interface RectangleSize {
  width: number;
  height: number;
}
```

### GuillotineBinPack Class

#### Constructor
```typescript
new GuillotineBinPack(binWidth: number, binHeight: number, allowFlip?: boolean)
```

**Parameters:**
- `binWidth`: Width of the container
- `binHeight`: Height of the container
- `allowFlip`: Whether to allow rectangle rotation (default: false)

#### Methods

##### `InsertSizes(rects: T[], merge: boolean, rectChoice: FreeRectChoiceHeuristic, splitMethod: GuillotineSplitHeuristic): void`

Inserts rectangles into the bin using specified heuristics.

**Parameters:**
- `rects`: Array of rectangles to pack
- `merge`: Whether to merge free rectangles after insertion
- `rectChoice`: Heuristic for choosing free rectangles
- `splitMethod`: Heuristic for splitting free space

##### `Occupancy(): number`

Returns the occupancy percentage of the bin (0-1).

##### `Fits(r: RectSize, freeRect: Rect): boolean`

Checks if a rectangle fits in a free rectangle (with optional rotation).

##### `FitsPerfectly(r: RectSize, freeRect: Rect): boolean`

Checks if a rectangle fits perfectly in a free rectangle.

### Heuristics

#### FreeRectChoiceHeuristic
- `RectBestAreaFit`: Choose rectangle with best area fit
- `RectBestShortSideFit`: Choose rectangle with best short side fit
- `RectBestLongSideFit`: Choose rectangle with best long side fit
- `RectWorstAreaFit`: Choose rectangle with worst area fit
- `RectWorstShortSideFit`: Choose rectangle with worst short side fit
- `RectWorstLongSideFit`: Choose rectangle with worst long side fit

#### GuillotineSplitHeuristic
- `SplitShorterLeftoverAxis`: Split along shorter leftover axis
- `SplitLongerLeftoverAxis`: Split along longer leftover axis
- `SplitMinimizeArea`: Minimize area of one rectangle
- `SplitMaximizeArea`: Maximize area of both rectangles
- `SplitShorterAxis`: Split along shorter axis
- `SplitLongerAxis`: Split along longer axis

## 🔧 Development

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Linting and Formatting

```bash
npm run lint
npm run format
npm run fix
```

## 📖 Examples

### Example 1: Basic Rectangle Packing

```typescript
import { rectanglePacker } from 'rectangle-packer';

const rectangles = [
  { width: 50, height: 50 },
  { width: 100, height: 25 },
  { width: 25, height: 100 },
  { width: 75, height: 75 }
];

const packed = rectanglePacker(rectangles);

// Calculate container dimensions
const maxX = Math.max(...packed.map(r => r.x! + r.width));
const maxY = Math.max(...packed.map(r => r.y! + r.height));

console.log(`Container size: ${maxX} x ${maxY}`);
```

### Example 2: Guillotine Packing with Different Heuristics

```typescript
import GuillotineBinPack, { Rect } from 'rectangle-packer';

const packer = new GuillotineBinPack(800, 600, true);

const rectangles = [
  new Rect(0, 0, 200, 150),
  new Rect(0, 0, 100, 100),
  new Rect(0, 0, 300, 200),
  new Rect(0, 0, 150, 75)
];

// Try different heuristics
packer.InsertSizes(
  rectangles,
  true,
  GuillotineBinPack.FreeRectChoiceHeuristic.RectBestAreaFit,
  GuillotineBinPack.GuillotineSplitHeuristic.SplitShorterLeftoverAxis
);

console.log(`Occupancy: ${(packer.Occupancy() * 100).toFixed(2)}%`);
```

### Example 3: Visualizing Packed Rectangles

```typescript
import { rectanglePacker } from 'rectangle-packer';

const rectangles = [
  { width: 100, height: 50, name: 'A' },
  { width: 75, height: 75, name: 'B' },
  { width: 200, height: 100, name: 'C' }
];

const packed = rectanglePacker(rectangles);

// Create a simple ASCII visualization
const maxX = Math.max(...packed.map(r => r.x! + r.width));
const maxY = Math.max(...packed.map(r => r.y! + r.height));

const grid = Array(maxY).fill(null).map(() => Array(maxX).fill(' '));

packed.forEach((rect, index) => {
  const name = rectangles[index].name;
  for (let y = rect.y!; y < rect.y! + rect.height; y++) {
    for (let x = rect.x!; x < rect.x! + rect.width; x++) {
      if (y < maxY && x < maxX) {
        grid[y][x] = name;
      }
    }
  }
});

console.log(grid.map(row => row.join('')).join('\n'));
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Make your changes
5. Run tests and linting: `npm run fix`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by various rectangle packing algorithms and research papers
- Built with TypeScript for type safety and better developer experience
- Optimized for performance and ease of use

## 📞 Support

If you have any questions or need help, please:

1. Check the [documentation](#api-reference)
2. Look at the [examples](#examples)
3. Open an [issue](https://github.com/SilenceLeo/rectangle-packer/issues)

---

Made with ❤️ by [SilenceLeo](https://github.com/SilenceLeo) 