const axios = require('axios')
// youdao 翻译
exports.youdao = (queryStr) => {
  // 用于请求的选项
  // let options = {
  //   host: "fanyi.youdao.com",
  //   port: "80",
  //   path:
  //     "/openapi.do?keyfrom=translation-tool&key=1730699468&type=data&doctype=json&version=1.1&q=" +
  //     queryStr,
  // };
  axios
    .get('http://aidemo.youdao.com/trans', {
      params: {
        q: queryStr,
        from: 'Auto',
        to: 'Auto',
      },
    })
    .then((res) => {
      format(res.data)
    })
}

//格式化
function format(data) {
  // let data = json && JSON.parse(json)
  // 发音
  let pronounce = data.basic ? data.basic.phonetic : '无'
  // 翻译
  let mainTrans = ''
  // 网络释义
  let webTrans = ''
  // 机器翻译
  let machineTrans = data.translation || ''

  let basic = data.basic
  let web = data.web

  if (basic) {
    mainTrans = '\n' + basic.explains.join('\n')
  }
  if (web) {
    for (let i = 0; i < web.length; i++) {
      webTrans +=
        '\n' +
        (i + 1) +
        ': ' +
        web[i].key.red.bold +
        '\n' +
        web[i].value.join(',')
    }
  }
  console.log(`
${'发音: '.red.bold}${pronounce}
${'翻译: '.green.bold}${mainTrans}
${'网络释义: '.blue.bold}${webTrans}
${'机器翻译: '.yellow.bold}${machineTrans}
---------------- by 前端超人 ----------------
`)
}
