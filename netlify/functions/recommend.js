const { schedule } = require("@netlify/functions");

let count = 1;
let cron = "* * * * *";
const handler = async function(event, context) {
    console.log("cron counter:", count)
    count++;
    return {
        statusCode: 200,
    };
};

exports.handler = schedule(cron, handler);
