const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const sourceContext = document.getElementById("source-canvas").getContext("2d");
const width = canvas.width;
const height = canvas.height;
let tileSize = 30;

let tileIndex = 0;
function sequential(drawFunctions) {
    return (x, y, t) => {
        drawFunctions[tileIndex % drawFunctions.length](x, y, t)
        tileIndex++;
    };
}

function square2x2(drawFunctions) {
    return (x, y, t) => {
        let tileY = (y / tileSize) % 2;
        let tileX = (x / tileSize) % 2;
        drawFunctions[tileY * 2 + tileX](x, y, t)
    };
}

function square4x4(drawFunctions) {
    return (x, y, t) => {
        let tileY = (y / tileSize) % 4;
        let tileX = (x / tileSize) % 4;
        drawFunctions[tileY * 4 + tileX](x, y, t)
    };
}

const tileA = (x, y, t) => {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + tileSize);
    context.lineTo(x + tileSize, y + tileSize);
    context.lineTo(x + tileSize * t, y + (1 - t) * tileSize);
    context.closePath();
    context.fill();
};

const tileB = (x, y, t) => {
    context.beginPath();
    context.moveTo(x, y + tileSize);
    context.lineTo(x, y);
    context.lineTo(x + tileSize, y);
    context.lineTo(x + tileSize * t, y + t * tileSize);
    context.closePath();
    context.fill();
};

const tileC = (x, y, t) => {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + tileSize, y);
    context.lineTo(x + tileSize, y + tileSize);
    context.lineTo(x + tileSize * (1 - t), y + t * tileSize);
    context.closePath();
    context.fill();
};

const tileD = (x, y, t) => {
    context.beginPath();
    context.moveTo(x, y + tileSize);
    context.lineTo(x + tileSize, y + tileSize);
    context.lineTo(x + tileSize, y);
    context.lineTo(x + tileSize * (1 - t), y + (1 - t) * tileSize);
    context.closePath();
    context.fill();
};

const drawTiledImage = (drawTile) => {
    context.clearRect(0, 0, width, height);

    for (let y = 0; y < height; y += tileSize) {
        for (let x = 0; x < width; x += tileSize) {
            const tileData = sourceContext.getImageData(x, y, tileSize, tileSize).data;
            let sum = 0;
            for (let i = 0; i < tileData.length; i += 4) {
                let r = tileData[i];
                let g = tileData[i + 1];
                let b = tileData[i + 2];
                sum += r + g + b;
            }
            const mean = sum / ((tileData.length / 4) * 3);
            const t = Math.max(0.25, Math.min(0.75, 1 - mean / 255));

            drawTile(x, y, t);
        }
    }
};

document.addEventListener('keydown', (e) => {
    if (e.code === "KeyJ") tileSize++;
    else if (e.code === "KeyK") tileSize--;
    else if (e.code === "KeyI") patternIndex++;
    else if (e.code === "KeyU") patternIndex--;
    if (patternIndex < 0) patternIndex = patterns.length - 1;
    if (patternIndex >= patterns.length) patternIndex = 0;
    main();
});

let patternIndex = 4;
const patterns = [
    sequential([tileA, tileD, tileB, tileC]),
    square2x2([tileA, tileD, tileB, tileC]),
    square2x2([tileA, tileC, tileC, tileA]),
    square2x2([tileD, tileB, tileB, tileD]),
    square4x4([
        tileC, tileB, tileA, tileD,
        tileD, tileA, tileB, tileC,
        tileA, tileD, tileC, tileB,
        tileB, tileC, tileD, tileA,
    ])
];

const main = () => {
    drawTiledImage(patterns[patternIndex]);
};
const img = new Image();
img.addEventListener('load', function() {
	sourceContext.drawImage(img, 0, 0, width, height);
	main();
});
img.src = '/assets/images/me.jpg';