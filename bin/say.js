require("say");
// say.speak("What's up, dog?", "Alex", 0.5);
let argv = require("yargs").argv,
    queryStr = encodeURI(argv._.join(" ")),
    read = argv.r || argv.read;
if (!queryStr) {
    console.log("word or sentence required...");
} else {
    say.speak("What's up, dog?");
    // sendInfo(queryStr);
}