import { getToken } from "./util";

console.log("content-script");

getToken().then(
  (token: string): void => {
    fetch("https://api.github.com/repos/YeThor/Pin-Github/issues", {
      method: "POST",
      headers: new Headers({
        Authorization: `token ${token}`
      }),
      body: JSON.stringify({
        title: "Test Title",
        body: "Test Body"
      })
    }).then(res => console.log(res));
  }
);

console.log("abasc");
