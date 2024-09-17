const { google } = require('googleapis');

const env = process.env.NODE_ENV || 'development';
const { sheetId } = require("../config/config")[env]

async function addDataToSheet(email, message = "") {
  console.log("sheet updating script started!");
  // Replace the key file path with your own values
  const keyFilePath = "../assets/keys.json"; // replace with the path to your key file

  const date = new Date();

  // Set up the authentication credentials
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create the row of data to add
  const rowData = [email, event, date, message]; // for Swing Auth API

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

    console.log('data added at column:', response.data["tableRange"]);
    console.log("sheet updating script ends!");
  } catch (error) {
    console.log(error.response.data.error.errors)
  }
}

module.exports = { addDataToSheet }