console.log("test");

const PERSONAL_TOKEN = "check your memo";

fetch("https://api.github.com/repos/YeThor/Pin-Github/issues", {
  method: "POST",
  headers: new Headers({
    Authorization: `token ${PERSONAL_TOKEN}`
  }),
  body: JSON.stringify({
    title: "Test Title",
    body: "Test Body"
  })
}).then(res => console.log(res));
