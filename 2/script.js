const fs = require('node:fs')

const rule = {
  red: 12,
  green: 13,
  blue: 14
}

fs.readFile('./gameSet.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const t = data.split('\r\n');
  
  
  let ids = [];
  let sum = 0;
  for(game of t){
    if(game === ''){
      continue;
    }
    let error = false;

    const blues = [...game.matchAll(/([0-9]+) blue/g)];
    let blueMinimum = 0;
    for(blue of blues){
      let nb = Number.parseInt(blue[1]);
      if(nb > blueMinimum) blueMinimum = nb;
      if(nb > rule.blue){
        error = true;
        break;
      }
    }

    const reds = [...game.matchAll(/([0-9]+) red/g)];
    let redMinimum = 0;
    for(red of reds){
      let nb = Number.parseInt(red[1]);
      if(nb > redMinimum) redMinimum = nb;
      if(nb > rule.red){
        error = true;
        break;
      }
    }

    const greens = [...game.matchAll(/([0-9]+) green/g)];
    let greenMinimum = 0;
    for(green of greens){
      let nb = Number.parseInt(green[1]);
      if(nb > greenMinimum) greenMinimum = nb;
      if(nb > rule.green){
        error = true;
        break;
      }
    }
    
    sum += blueMinimum * redMinimum * greenMinimum

    const id = Number.parseInt(game.match(/^Game ([0-9]+)/)[1]);
    console.log(id);

    if(error) continue;
    ids.push(id);
  }

  const idSum = ids.reduce((previous, current) => previous + current)
  console.log(idSum)
  console.log(sum)
})