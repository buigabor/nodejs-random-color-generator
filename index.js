const randomColor = require('randomcolor');
const chalk = require('chalk');
const readline = require('readline');

const lengthOfHexCode = 7;
const widthOfEmptyBox = 23;

function printHashtagRect(color, width = 31, height = 9) {
  const widthOfEdge = Math.floor((width - widthOfEmptyBox) / 2);
  const emptyPlaceWidth = Math.floor((widthOfEmptyBox - lengthOfHexCode) / 2);

  for (let row = 0; row < height; row++) {
    let rowText = '';
    if (row < Math.floor(height / 2) - 1 || row > Math.floor(height / 2) + 1) {
      // print a line of # if we are not in the middle of the box (top or bottom areas)
      rowText = '#'.repeat(width);
    } else if (row === Math.floor(height / 2)) {
      // print a line of ###  hexColor  ### if we are exactly in the middle
      rowText =
        '#'.repeat(widthOfEdge) +
        ' '.repeat(emptyPlaceWidth) +
        color +
        ' '.repeat(emptyPlaceWidth);
      // handle odd and even cases
      if (width % 2 === 0) {
        rowText += '#'.repeat(widthOfEdge + 1);
      } else {
        rowText += '#'.repeat(widthOfEdge);
      }
    } else {
      // print line of ###     ### if we are above and below 1 line of the middle
      rowText =
        '#'.repeat(widthOfEdge) +
        ' '.repeat(emptyPlaceWidth + 7) +
        ' '.repeat(emptyPlaceWidth);
      // handle odd and even cases
      if (width % 2 === 0) {
        rowText += '#'.repeat(widthOfEdge + 1);
      } else {
        rowText += '#'.repeat(widthOfEdge);
      }
    }
    console.log(chalk.hex(`${color}`)(rowText));
  }
}

// check for input validation
const regex = /^[0-9]+x[0-9]+$/g;

if (process.argv[2] === 'ask') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(
    'Please provide the following parameters: color name and luminosity',
  );

  const getLuminosityInput = function (color) {
    rl.question(
      'What is the luminosity? (light, dark, bright) ',
      function (luminosity) {
        const selectedColor = randomColor({
          luminosity,
          hue: color,
        });

        printHashtagRect(selectedColor);
        rl.close();
      },
    );
  };

  rl.question('What is the name of the color? ', getLuminosityInput);
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

  printHashtagRect(selectedColor);
} else if (!regex.test(process.argv[2])) {
  console.log(process.argv[2].length);
  console.log('Please provide a valid format for the width and height.');
  console.log('Correct format: WWxHH (eg. 31x9)');
} else if (process.argv[2].includes('x')) {
  const sizeParameters = process.argv[2];
  const colorCode = process.argv[3];
  const luminosityCode = process.argv[4];
  const width = sizeParameters.split('x')[0];
  const height = sizeParameters.split('x')[1];
  if (width < 25) {
    return console.log('Please provide a with greater than 25');
  }

  const selectedColor = randomColor({
    luminosity: luminosityCode,
    hue: colorCode,
  });

  printHashtagRect(selectedColor, width, height);
} else {
  const colorCode = process.argv[2];
  const luminosityCode = process.argv[3];

  const selectedColor = randomColor({
    luminosity: luminosityCode,
    hue: colorCode,
  });

  printHashtagRect(selectedColor);
}
