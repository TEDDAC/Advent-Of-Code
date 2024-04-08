const fs = require('node:fs')

const letterNumber = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

fs.readFile('./calibration.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const t = data.split('\n');

  let somme = 0;

  for(s of t){
    const number = getDigitCheckConflict(s.replace("\r",""));

    // for(nIndex in number){
    //   if(!number[nIndex].match(/[0-9]/)){
    //     //console.log(`${number[nIndex]} devient ${letterNumber.indexOf(number[nIndex])}`)
    //     number[nIndex] = letterNumber.indexOf(number[nIndex]);
    //   }
    // }

    if(number !== null){
      if(!number[0].match(/[0-9]/)){
        //console.log(`${number[0]} devient ${letterNumber.indexOf(number[0])}`)
        number[0] = letterNumber.indexOf(number[0]);
      }
  
      if(!number[number.length - 1].match(/[0-9]/)){
        //console.log(`${number[number.length - 1]} devient ${letterNumber.indexOf(number[number.length - 1])}`)
        number[number.length - 1] = letterNumber.indexOf(number[number.length - 1]);
      }

      //console.log(Number.parseInt(`${number[0]}${number[number.length - 1]}`));
      somme += Number.parseInt(`${number[0]}${number[number.length - 1]}`);
    }
  }

  console.log(somme);
})

function getDigitCheckConflict(string){
  let array = [];

  let number = string.match(/([0-9]|zero|one|two|three|four|five|six|seven|eight|nine)/);
  if(number !== null){
    array.push(number[0])
  }

  number = string.split('').reverse().join('').match(/([0-9]|enin|thgie|neves|xis|evif|ruof|eerht|owt|eno|orez)/);
  if(number !== null){
    array.push(number[0].split('').reverse().join(''))
  }

  if(array.length === 0){
    return null;
  }
  //console.log(array)
  return array;
}