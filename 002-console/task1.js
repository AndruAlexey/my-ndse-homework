#!/usr/bin/env node
const dayjs = require('dayjs')
require('yargs/yargs')(process.argv.slice(2))
    .command('current', "Текущая дата",
        {
            '--day': {
                alias: '-d',
                type: "integer",
            },
            '--month': {
                alias: '-m',
                type: "integer",
            },
            '--year': {
                alias: '-y',
                type: "integer",
            },
        },
        function (argv) {
            let curDate = new Date()
            let fullDate = true
            if (argv.day) {
                console.log('Текущий день в календарном месяце = ' + curDate.getDate())
                fullDate = false
            }
            if (argv.month) {
                let month = +curDate.getMonth() + 1
                console.log('текущий месяц = ' + month)
                fullDate = false
            }
            if (argv.year) {
                console.log('текущий год = ' + curDate.getFullYear())
                fullDate = false
            }
            if (fullDate) {
                console.log(curDate.toISOString())
            }
        }
    )
    .command('add', "Дата в будущем",
        {
            '--day': {
                alias: '-d',
                type: "number",
            },
            '--month': {
                alias: '-m',
                type: "number",
            },
            '--year': {
                alias: '-y',
                type: "number",
            },
        },
        function (argv) {
            let curDate = new dayjs()
            let valid = false
            let validProps = ['day','month','year']
            validProps.forEach((addProp) => {
                if (argv[addProp]) {
                    valid = true
                    curDate = curDate.add(argv[addProp], addProp)
                }
            })
            if (!valid) {
                console.log("Ошибка! Не указаны основные параметры и их значения. Для вызова справки используйте ключ -h")
            } else {
                console.log(curDate.format())
            }
        }
    )
    .command('sub', "Дата в прошлом",
        {
            '--day': {
                alias: '-d',
                type: "number",
            },
            '--month': {
                alias: '-m',
                type: "number",
            },
            '--year': {
                alias: '-y',
                type: "number",
            },
        },
        function (argv) {
            let curDate = new dayjs()
            let valid = false
            let validProps = ['day','month','year']
            validProps.forEach((addProp) => {
                if (argv[addProp]) {
                    valid = true
                    curDate = curDate.add(-argv[addProp], addProp)
                }
            })
            if (!valid) {
                console.log("Ошибка! Не указаны основные параметры и их значения. Для вызова справки используйте ключ -h")
            } else {
                console.log(curDate.format())
            }
        }
    )
    .parse()