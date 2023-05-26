const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
const http = require('http')
const querystring = require('querystring')

const config = require('./config.js');

const wind = {
    'N': 'Северный',
    'S': 'Южный',
    'W': 'Западный',
    'E': 'Восточный',
    'NE': 'Северо-восточный',
    'SE': 'Юго-восточный',
    'SW': 'Юго-западный',
    'NW': 'Северо-западный'
}

const path = `/current?access_key=${config.apiKey}&`

const options = {
    host: config.host,
    port: config.port,
    path: path,
    method: 'GET',
    agent: false,
  }

console.log('Сервис "Прогноз погоды"')
rl.setPrompt('Введите название города на английском: ');
rl.prompt();

rl.on('line', function(answer) {
    options.path += querystring.stringify({query: answer})
    let output = '';
    const req = http.request(options, (res) => {
        if (200 !== res.statusCode) {
            console.log(`\nОшибка получения данных для города ${answer}`)
        }
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
        output += chunk;
        });
        res.on('end', () => {
        let obj = JSON.parse(output);
        if (obj.success === false) {
            console.log(`\nОшибка получения данных для города ${answer}`)
            rl.prompt();
        } else {
            let winDir = (wind[obj.current.wind_dir]) ? wind[obj.current.wind_dir] : obj.current.wind_dir
            console.log(
`

Погода в городе: ${answer}
Температура воздуха: ${obj.current.temperature}
Скорость ветра: ${obj.current.wind_speed}
Направление ветра: ${winDir}
`
            )
            process.exit(0);
        }
        });
    });
    req.on('error', (err) => {
        process.exit(0);
    });
    req.end();
}).on('close', function() {
    console.log('До свиданья!')
    process.exit(0)
});