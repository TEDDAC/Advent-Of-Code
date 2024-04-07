const fs = require('node:fs')

fs.readFile('./calibration.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const t = data.split('\n');

  let somme = 0;

  for(s of t){
    const number = s.match(/[0-9]/g);

    if(number !== null){
      somme += Number.parseInt(`${number[0]}${number[number.length - 1]}`);
    }
  }

  console.log(somme);
})