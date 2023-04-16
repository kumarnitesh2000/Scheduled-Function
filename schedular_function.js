// YOUR_BASE_DIRECTORY/netlify/functions/test-scheduled-function.js
const { schedule } = require("@netlify/functions");
const { addDataToSheet } = require("./googlesheet_updater");

let count = 1;
let cron = "* * * * *";
const handler = async function(event, context) {
    // console.log("Received event:", event);
    console.log("cron counter:", count)
    count++;

    await addDataToSheet()

    return {
        statusCode: 200,
    };
};

exports.handler = schedule(cron, handler);
