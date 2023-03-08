function refreshTime() {
  const timeDisplay = document.getElementById("time");
  const dateString = new Date().toLocaleString();
  const formattedString = dateString.replace(", ", " - ");
  timeDisplay.textContent = formattedString;
  }
  setInterval(refreshTime, 1000);


let google = require('googleapis');
let secretKey = require("./client_secret.json");
let jwtClient = new google.auth.JWT(
       secretKey.client_email,
       null,
       secretKey.private_key,
       ['https://www.googleapis.com/auth/spreadsheets']);
//authenticate request
jwtClient.authorize(function (err, tokens) {
 if (err) {
   console.log(err);
   return;
 } else {
   console.log("Successfully connected!");
 }
});
//Google Sheets API
let spreadsheetId = 'Anderson Store Database';
let sheetRange = 'Inventory!A1:C10'
let sheets = google.sheets('v4');
sheets.spreadsheets.values.get({
   auth: jwtClient,
   spreadsheetId: spreadsheetId,
   range: sheetRange
}, function (err, response) {
   if (err) {
       console.log('The API returned an error: ' + err);
   } else {
       console.log('Movie list from Google Sheets:');
       for (let row of response.values) {
           console.log('Title [%s]\t\tRating [%s]', row[0], row[1]);
       }
   }
});
