const { data } = require("autoprefixer");

const api_Code = "1367655246:AAHepZIwts-bvZak-XRO66L8Y935ReGkwyw";
const CHAT_ID = "-1001369025055";
let value;
const getData = function (key) {
  fetch(`https://api.telegram.org/bot${key}/getUpdates`)
    .then((data) => data.json())
    // .then((data) => console.log(data));
    .then((data) => console.log(data.result.map((el) => el.message.text)));
};

getData(api_Code);

const textMsg = "Say Hello for start speaking with bot";
const options = {
  method: "POST",
  chat_id: "@testFilmoteka_bot",
  text: "test",
  headers: {
    "content-type": "application/json",
  },
};

const postData = function (data, key, id) {
  fetch(
    `https://api.telegram.org/bot${key}/sendMessage?chat_id=${id}&text=${data}`,
    options
  );
};

// function startSpeaking() {
//   if (el.message.text === "Hello") {
//     postData(textMsg, api_Code, CHAT_ID);
//   }
// }
// startSpeaking();
