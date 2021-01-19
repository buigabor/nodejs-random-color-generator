const randomColor = require('randomcolor');
const chalk = require('chalk');
const readline = require('readline');

if (process.argv[2] === 'ask') {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	console.log(
		'Please provide the following parameters: color name and luminosity',
	);

	rl.question('What is the name of the color? ', function (color) {
		rl.question(
			'What is the luminosity? (light, dark, bright) ',
			function (luminosity) {
				const selectedColor = randomColor({
					luminosity,
					hue: color,
				});

				printHashtagRect(31, 9, selectedColor);
				rl.close();
			},
		);
	});
} else if (process.argv[2] === 'help') {
	console.log(
		'Please provide the following parameters: box size, color, luminosity',
	);
	console.log('Box size format: WWxHH (eg. 31x9)');
	console.log('Luminosity options: light, dark, bright');
	console.log('Code example: node index.js 40x11 red dark');
} else if (!process.argv[2]) {
	const selectedColor = randomColor({
		luminosity: 'random',
		hue: 'random',
	});

	printHashtagRect(31, 9, selectedColor);
} else if (process.argv[2].includes('x')) {
	const sizeParameters = process.argv[2];
	const colorCode = process.argv[3];
	const luminosityCode = process.argv[4];
	const width = sizeParameters.split('x')[0];
	const height = sizeParameters.split('x')[1];

	const selectedColor = randomColor({
		luminosity: luminosityCode,
		hue: colorCode,
	});

	printHashtagRect(width, height, selectedColor);
} else {
	const colorCode = process.argv[2];
	const luminosityCode = process.argv[3];

	const selectedColor = randomColor({
		luminosity: luminosityCode,
		hue: colorCode,
	});

	printHashtagRect(31, 9, selectedColor);
}

function printHashtagRect(width, height, color) {
	let lengthOfHexCode = 7;
	let widthOfEmptyBox = 23;

	let row = '';
	let widthOfEdge = Math.floor((width - widthOfEmptyBox) / 2);

	for (let i = 0; i < height; i++) {
		if (i < Math.floor(height / 2) - 1 || i > Math.floor(height / 2) + 1) {
			row = repeatStr('#', width);
		} else if (i === Math.floor(height / 2)) {
			row =
				repeatStr('#', widthOfEdge) +
				repeatStr(' ', Math.floor((widthOfEmptyBox - lengthOfHexCode) / 2)) +
				color +
				repeatStr(' ', Math.floor((widthOfEmptyBox - lengthOfHexCode) / 2));

			if (width % 2 === 0) {
				row += repeatStr('#', widthOfEdge + 1);
			} else {
				row += repeatStr('#', widthOfEdge);
			}
		} else {
			row = repeatStr('#', widthOfEdge) + repeatStr(' ', widthOfEmptyBox);
			if (width % 2 === 0) {
				row += repeatStr('#', widthOfEdge + 1);
			} else {
				row += repeatStr('#', widthOfEdge);
			}
		}

		console.log(chalk.hex(`${color}`)(row));
		row = '';
	}
}

function repeatStr(string, times) {
	let repeatedString = '';
	while (times > 0) {
		repeatedString += string;
		times--;
	}
	return repeatedString;
}
