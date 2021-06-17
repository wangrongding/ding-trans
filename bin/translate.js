#! /usr/bin/env node

//业务逻辑
//1.ding命令+中英文[args,--say,-S]
//捕获参数，使用yargs.argv对象；
//2.将捕获到的用户的输入参数传入有道云api的q（key）中，使用字符串拼接；
//3.使用http模块发送请求；
//4.成功接收数据后，对数据进行格式化处理；

require("colors");
// automatically pick platform
const say = require("say");
const querystring = require("querystring");
//=======================================================
let argv = require("yargs").argv,
    queryStr = encodeURI(argv._.join(" "));
// read = argv.r || argv.read;
// console.log(argv);
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
    //播放
    if (argv.say == true || argv.S == true) {
        console.log("播放中...".rainbow);
        say.speak(querystring.unescape(queryStr));
        return;
    }
    //查词
    sendInfo(queryStr);
}
//格式化
function format(json) {
    let data = JSON.parse(json),
        pronTitle = "发音：",
        pron = data.basic ? data.basic.phonetic : "无",
        mainTitle = "翻译：",
        mainTrans = "",
        webTitle = "网络释义：",
        machineTrans = "",
        webTrans = "",
        template = "";
    let basic = data.basic,
        web = data.web,
        translation = data.translation;
    if (basic ? basic : "") {
        for (let i = 0; i < basic.explains.length; i++) {
            mainTrans += "\n" + basic.explains[i];
        }
    }
    if (web ? web : "") {
        for (let i = 0; i < web.length; i++) {
            webTrans +=
                "\n" +
                (i + 1) +
                ": " +
                web[i].key.red.bold +
                "\n" +
                web[i].value.join(",");
        }
    }
    translation ? (machineTrans = translation) : false;
    template =
        pronTitle.red.bold +
        pron +
        "\n" +
        mainTitle.green.bold +
        mainTrans +
        "\n" +
        webTitle.blue.bold +
        webTrans +
        "\n" +
        "机器翻译：".green.bold +
        machineTrans;
    console.log(template);
}
//发送请求
function sendInfo(query) {
    //发送翻译请求
    let http = require("http");

    // 1.用于请求的选项
    let options = {
        host: "fanyi.youdao.com",
        port: "80",
        path:
            "/openapi.do?keyfrom=translation-tool&key=1730699468&type=data&doctype=json&version=1.1&q=" +
            query,
    };
    // let options = ` http://aidemo.youdao.com/trans?q=${query}&&from=Auto&&to=Auto`;

    // 处理响应的回调函数
    let callback = function (response) {
        // 不断更新数据
        response.on("data", function (data) {
            format(data);
        });
        response.on("end", function () {
            // 数据接收完成
            // console.log("\n");
            console.log("---------------");
        });
    };
    // 向服务端发送请求
    let req = http.request(options, callback);
    req.end();
}
