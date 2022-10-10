const axios = require('axios')
// DeepL 翻译
exports.deepl = (queryStr) => {
  const targetLang = escape(queryStr).indexOf('%u') < 0 ? 'ZH' : 'EN'
  axios
    .post('http://47.95.239.198:9521/translate', {
      text: queryStr,
      source_lang: 'auto',
      target_lang: targetLang,
    })
    .then((res) => {
      console.log(`\n${'🚀🚀🚀 翻译: '.green.bold}${res.data.data} \n`)
    })
}
