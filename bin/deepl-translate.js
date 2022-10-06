#! /usr/bin/env node
require("colors");
const { axios } = require("./request");
const querystring = require("querystring");
const argv = require("yargs").argv;
// 对驼峰的连续单词进行分割后转义
let queryStr = encodeURI(
  argv._.join(" ")
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
);
// 无参数,或帮助
if (!queryStr || argv.help == true || argv.H == true || argv.h == true) {
  console.log("-------------------------------");
  console.log("查单词: ".bold.blue);
  console.log("ding [单词] 或者 [短句]", "\n");
  console.log("汉译英: ".bold.red);
  console.log("ding [文本]", "\n");
  console.log("单词/短句发音: ".bold.yellow);
  console.log("ding [单词] [短句] --say");
  console.log("ding [单词] [短句] -S");
  console.log("-------------------------------");
  console.log("请在'ding'命令后输入单词或断句!");
  console.log("word or sentence required...");
} else {
  //查词
  sendInfo(querystring.unescape(queryStr));
}
//发送请求
function sendInfo(queryStr) {
  const targetLang = escape(queryStr).indexOf("%u") < 0 ? "ZH" : "EN";
  // console.log("🚀🚀🚀 / queryStr", queryStr, escape(queryStr), targetLang);
  axios
    .post("http://47.95.239.198:9521/translate", {
      data: { text: queryStr, source_lang: "auto", target_lang: targetLang },
    })
    .then((res) => {
      console.log(`=============================================== \n`.rainbow);
      console.log(
        `${"🚀🚀🚀 翻译: ".green.bold}${querystring.unescape(res.data)}`
      );
      console.log(`\n===============================================`.rainbow);
    });
}
