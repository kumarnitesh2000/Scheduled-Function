const { google } = require('googleapis');

async function addDataToSheet(email = "", event = "", message = "") {
  console.log("Script started!");
  // Replace the sheet ID and key file path with your own values
  const sheetId = "1Dw7hlhh1Bq7RBtVJ3TJABmdgwnaQsQs7gycqYV4Ihw4";
  const keyFilePath = "./config/keys.json"; // replace with the path to your key file

  const date = new Date();

  // Set up the authentication credentials
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create the row of data to add
  // const rowData = [email, event, date, message]; for Swing Auth API
  const rowData = ["CHCHCHCHCHC", "Male", "Sanskrit"]

  try {
    // Authorize the client
    const client = await auth.getClient();

    // Set up the Google Sheets API
    const sheets = google.sheets({ version: 'v4', auth: client });

    // Construct the request parameters
    const request = {
      spreadsheetId: sheetId,
      range: 'Sheet1!A2',  // Sheet2!A2 for Swing Auth API
      valueInputOption: 'RAW',
      resource: {
        values: [rowData],
      },
      insertDataOption: 'INSERT_ROWS',
    };

    // Send the request
    const response = await sheets.spreadsheets.values.append(request);

    console.log('Data added to sheet at column:', response.data["tableRange"]);
    console.log("Script ended!");
  } catch (error) {
    console.log(error.response.data.error.errors)
  }
}

module.exports = { addDataToSheet };