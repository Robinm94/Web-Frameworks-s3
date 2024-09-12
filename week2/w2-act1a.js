const fs = require('fs');
let myData= fs.readFileSync('./week2/MOCK_DATA.json');
let contacts = JSON.parse(myData);
console.log(contacts);