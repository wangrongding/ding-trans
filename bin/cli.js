#! /usr/bin/env node
require('colors')
const say = require('say')
const argv = require('yargs').argv
const { deepl } = require('../lib/deepL')
const { youdao } = require('../lib/youdao')
// 对驼峰的连续单词进行分割后转义
let queryStr = argv._.join(' ')
  .replace(/([A-Z])/g, ' $1')
  .toLowerCase()

// 无参数,或帮助
if (!queryStr || argv.help == true || argv.H == true || argv.h == true) {
  console.log('-------------------------------')
  console.log('查单词: '.bold.blue)
  console.log('ding [单词] 或者 [短句]', '\n')
  console.log('汉译英: '.bold.red)
  console.log('ding [文本]', '\n')
  console.log('单词/短句发音: '.bold.yellow)
  console.log('ding [单词] [短句] --say')
  console.log('ding [单词] [短句] -S')
  console.log('-------------------------------')
  console.log("请在'ding'命令后输入单词或断句!")
  console.log('word or sentence required...')
} else {
  //播放
  if (argv.say == true || argv.S == true) {
    console.log('播放中...'.rainbow)
    say.speak(queryStr)
    return
  }
  //查词
  if (argv.$0 === 'ding') {
    youdao(queryStr)
  } else {
    deepl(queryStr)
  }
}
