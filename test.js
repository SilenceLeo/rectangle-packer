const rectanglePacker = require("./").rectanglePackerMutation;
const MaxRectsBinPack = require("./").MaxRectsBinPack;
const GuillotineBinPack = require("./").GuillotineBinPack;
const arr = [
    [128, 317],
    [61, 61],
    [350, 284],
    [113, 70],
    [38, 38],
    [122, 122],
    [105, 68],
    [117, 115],
    [62, 59],
    [604, 314],
    [3, 3],
    [3, 3],
    [85, 94],
    [85, 94],
    [41, 65],
    [56, 82],
    [56, 82],
    [80, 66],
    [56, 63],
    [54, 57],
    [12, 4],
    [3, 59],
    [92, 46],
    [141, 46],
    [188, 46],
    [91, 46],
    [188, 46],
    [97, 47],
    [143, 48],
];
// const arr = [
//     [105, 68],
//     [117, 115],
//     [62, 59],
//     [604, 314],
//     [3, 3],
// ];
const obj = arr.map(([width, height]) => ({ width, height, TE: 1 }));
// console.log(rectanglePacker);
const packObj = rectanglePacker(obj);
// console.log(obj);
console.log(packObj);

let width = 0;
let height = 0;

packObj.forEach((p) => {
    width = Math.max(width, p.x + p.width);
    height = Math.max(height, p.y + p.height);
});

// const pack = new MaxRectsBinPack(2048, 2048);
const rectangles = arr.sort((a, b) => a.height - b.height).map(([width, height], index) => ({ width, height, index }));
// // [
// //     {
// //         width: 20,
// //         height: 100,
// //         id: "1",
// //     },
// //     {
// //         width: 200,
// //         height: 70,
// //         id: "2",
// //     },
// //     {
// //         width: 30,
// //         height: 70,
// //         id: "3",
// //     },
// // ];

// const result = pack.InsertRects(rectangles, MaxRectsBinPack.FreeRectChoiceHeuristic.RectBestShortSideFit);
// console.log("result", pack, result);
const pack = new GuillotineBinPack(810, 600);

console.log(pack.InsertSizes(rectangles, true, 1, 1));

console.log(pack.usedRectangles);

let w = 0;
let h = 0;

pack.usedRectangles.forEach((p) => {
    w = Math.max(w, p.x + p.width);
    h = Math.max(h, p.y + p.height);
});
console.log(width, height, width * height);
console.log(w, h, w * h);
