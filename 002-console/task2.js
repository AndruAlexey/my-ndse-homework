#!/usr/bin/env node

const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)

const number = Math.floor(Math.random() * 101)

let count = 0

console.log('Загадано число в диапазоне от 0 до 100')

rl.setPrompt('Введите число: ');
rl.prompt();

rl.on('line', function(answer) {
    count++
    if (answer == number) {
        let tryStr = 'попыт'
        // до 21 будет корректно
        switch (true) {
            case (count == 1):
                tryStr += 'ку'
                break
            case (count < 5):
                tryStr += 'ки'
                break
            default:
                tryStr += 'ок'
                break
        }
        console.log(`Отгадано число ${number} за ${count} ${tryStr}`);
        process.exit(0);
    } else if(answer > number) {
        console.log(`Меньше`);
    } else {
        console.log(`Больше`);
    }
    rl.prompt();
}).on('close', function() {
    console.log('До свиданья!');
    process.exit(0);
});