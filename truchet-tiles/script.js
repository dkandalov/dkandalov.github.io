const sourceContext = document.getElementById("source-canvas").getContext("2d");
const maskContext = document.getElementById("mask-canvas").getContext("2d");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
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

function square(size, drawFunctions) {
	return (x, y, t) => {
		let tileX = (x / tileSize) % size;
		let tileY = (y / tileSize) % size;
		drawFunctions[tileY * size + tileX](x, y, t)
	};
}

const a = (x, y, t) => {
	context.beginPath();
	context.moveTo(x, y);
	context.lineTo(x, y + tileSize);
	context.lineTo(x + tileSize, y + tileSize);
	context.lineTo(x + tileSize * t, y + (1 - t) * tileSize);
	context.closePath();
	context.fill();
};

const b = (x, y, t) => {
	context.beginPath();
	context.moveTo(x, y + tileSize);
	context.lineTo(x, y);
	context.lineTo(x + tileSize, y);
	context.lineTo(x + tileSize * t, y + t * tileSize);
	context.closePath();
	context.fill();
};

const c = (x, y, t) => {
	context.beginPath();
	context.moveTo(x, y);
	context.lineTo(x + tileSize, y);
	context.lineTo(x + tileSize, y + tileSize);
	context.lineTo(x + tileSize * (1 - t), y + t * tileSize);
	context.closePath();
	context.fill();
};

const d = (x, y, t) => {
	context.beginPath();
	context.moveTo(x, y + tileSize);
	context.lineTo(x + tileSize, y + tileSize);
	context.lineTo(x + tileSize, y);
	context.lineTo(x + tileSize * (1 - t), y + (1 - t) * tileSize);
	context.closePath();
	context.fill();
};

const diagonalsWithMaskImage = (x, y, t) => {
	context.beginPath();
	context.lineWidth = t * 10;
	context.lineCap = "round";
	const data = maskContext.getImageData(x, y, tileSize, tileSize).data;
	if (rgbMean(data) <= 150) {
		context.moveTo(x, y);
		context.lineTo(x + tileSize, y + tileSize);
	} else {
		context.moveTo(x, y + tileSize);
		context.lineTo(x + tileSize, y);
	}
	context.shadowColor = "black";
	context.shadowBlur = 5;
	context.stroke();
};

const diamond = (x, y, t) => {
	let scale = 4;
	let column = Math.floor(x / (tileSize * scale));
	let row = Math.floor(y / (tileSize * scale));

	context.beginPath();
	context.lineWidth = t * 10;
	context.lineCap = "round";
	if ((row % 2 !== 0 && column % 2 === 0) || (row % 2 === 0 && column % 2 !== 0)) {
		context.moveTo(x, y);
		context.lineTo(x + tileSize, y + tileSize);
	} else {
		context.moveTo(x, y + tileSize);
		context.lineTo(x + tileSize, y);
	}
	context.shadowColor = "black";
	context.shadowBlur = 5;
	context.stroke();
};

const rgbMean = (imageData) => {
	let sum = 0;
	for (let i = 0; i < imageData.length; i += 4) {
		let r = imageData[i];
		let g = imageData[i + 1];
		let b = imageData[i + 2];
		sum += r + g + b;
	}
	return sum / ((imageData.length / 4) * 3);
}

const drawTiledImage = (drawTile) => {
	context.clearRect(0, 0, width, height);

	for (let y = 0; y < height; y += tileSize) {
		for (let x = 0; x < width; x += tileSize) {
			const tileData = sourceContext.getImageData(x, y, tileSize, tileSize).data;
			const mean = rgbMean(tileData);
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

let patternIndex = 0;
const patterns = [
	diagonalsWithMaskImage,
	diamond,
	square(4, [ // waves
		a, c, b, d,
		c, a, d, b,
		a, c, b, d,
		c, a, d, b,
	]),
	square(8, [ // large waves
		a, c, a, c, b, d, b, d,
		c, a, c, a, d, b, d, b,
		a, c, a, c, b, d, b, d,
		c, a, c, a, d, b, d, b,
		a, c, a, c, b, d, b, d,
		c, a, c, a, d, b, d, b,
		a, c, a, c, b, d, b, d,
		c, a, c, a, d, b, d, b,
	]),
	sequential([a, d, b, c]),
	square(2, [a, d, b, c]), // circles
	square(2, [a, c, c, a]), // lines top-left to bottom-right
	square(2, [d, b, b, d]), // lines bottom-left to top-right
	square(4, [ // rotating barbells
		c, b, a, d,
		d, a, b, c,
		a, d, c, b,
		b, c, d, a,
	]),
	square(8, [ // diamonds
		b, d, b, d, a, c, a, c,
		d, b, d, b, c, a, c, a,
		b, d, b, d, a, c, a, c,
		d, b, d, b, c, a, c, a,
		c, a, c, a, d, b, d, b,
		a, c, a, c, b, d, b, d,
		c, a, c, a, d, b, d, b,
		a, c, a, c, b, d, b, d,
	])
];

const main = () => {
	drawTiledImage(patterns[patternIndex]);
};

const image = new Image();
image.addEventListener('load', function() {
	sourceContext.drawImage(image, 0, 0, width, height);
	main();
});
image.src = '/assets/images/me.jpg';

const image2 = new Image();
image2.addEventListener('load', function() {
	maskContext.drawImage(image2, 0, 0, width, height);
	main();
});
image2.src = '/assets/images/code.jpg';