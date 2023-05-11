const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs')

const argv = yargs(hideBin(process.argv))
  .option('file', {
  alias: "f",
  type: "string",
  description: "the game log file",
  //default: "log_file.log",
  example: "node analiz.js -f new_log.log"
})
.demandOption(['f'], 'необходимо передать название файла в который был сохранен журнал игры')
.help('h')
.alias('h', 'help')
.argv;

const readerStream = fs.createReadStream(argv.file)

let data = '',
    count = 0,
    win = 0

readerStream
.setEncoding('UTF8')
.on('data', (chank) =>{
    data += chank
})
.on('end', () => {
  let array = data.split("\n")
  for(i in array) {
    let result = array[i]
    if (['0','1'].indexOf(result) === -1) {
      continue
    }
    count++
    if (result === '1') {
      win++
    }
  }
  let lose = count - win

  console.log(`
  Было сыграно игр: ${count}
      выиграно игр: ${win}
     проиграно игр: ${lose}
      `);
})