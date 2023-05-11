const readline = require('readline');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs')

const argv = yargs(hideBin(process.argv))
  .option('file', {
  alias: "f",
  type: "string",
  description: "file to save the log",
  //default: "log_file.log",
  example: "node game.js -f new_log.log"
})
.demandOption(['f'], 'необходимо передать название файла для сохранения в него журнала игры')
.help('h')
.alias('h', 'help')
.argv;

const writerSrt = fs.createWriteStream(argv.file)

readline.emitKeypressEvents(process.stdin);

if (process.stdin.setRawMode != null) {
  process.stdin.setRawMode(true);
}

let count = 0
let win = 0

console.log(`Игра "Орёл и решка"
Компьютер загадывает 0 или 1.
Вам надо отгадать.
Для выхода из игры нажмите клавишу ESC.

Введите 0 или 1:
`)

process.stdin.on('keypress', (str, key) => {
  let answer = key.name
  let number = (Math.random()>=0.5) ? 1 : 0
  let gameResult = 0 // 0 - игра проиграна, 1 - игра выиграна

  if (["0","1"].indexOf(answer) === -1) {
      console.log(`Ошибка!!! Можно вводить только 0 или 1`)
  } else {
    console.log(`
Вы ввели ${answer}. Было загадано ${number}`)
      count++
      if (answer == number) {
          win++
          gameResult = 1
          console.log(
`******************************
*  Поздравляю, Вы выиграли!  *
******************************
Введите 0 или 1: `)
      } else {
          console.log(
`******************************
* К сожалению, Вы проиграли. *
******************************
Введите 0 или 1: `)
      }
      writerSrt.write(gameResult + "\n", 'UTF8')
  }
  if (
    (key.name === 'escape') ||
    (key.ctrl && key.name === 'c')
  ) {
    let lose = count - win
    console.log(`

До свиданья!

Было сыграно игр: ${count}
    выиграно игр: ${win}
   проиграно игр: ${lose}
    `);
    writerSrt.end()
    process.exit(0)
  }
})