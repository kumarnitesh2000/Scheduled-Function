require('dotenv').config();

const config = {
  production: {
    uri: process.env.MONGO_URI,
    sdeDBName: process.env.SDE_DB,
    userDBName: process.env.USER_DB,
    sheetId: process.env.SHEET_ID,
  },
  development: {
    uri: process.env.MONGO_URI,
    sdeDBName: process.env.SDE_DB,
    userDBName: process.env.USER_DB,
    sheetId: process.env.SHEET_ID,
  },
  test: {
    uri: process.env.MONGO_URI,
    sdeDBName: process.env.SDE_DB,
    userDBName: process.env.USER_DB,
    sheetId: process.env.SHEET_ID,
  }
};

module.exports = config;
