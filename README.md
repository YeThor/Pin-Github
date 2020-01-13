# Pin-Github

This is the chrome extension that pins sub fields when you create an issue or modify a PR.

With this chrome extension, you can do these with one-click button:
- create a new issue automatically with sub fields you saved.
- modify a PR by adding sub fields you saved.

<img src="https://user-images.githubusercontent.com/22616716/72204371-69188f00-34ba-11ea-9f15-4df05f6c22c2.png">

## How to 

0. Go to [Release Board](https://github.com/YeThor/Pin-Github/releases) and download the `pin-github-for-download.zip`. Drag the zip file to the chrome://extensions. Developer mode on the top right side must be turned on.

<img src="https://user-images.githubusercontent.com/22616716/72259784-a749b600-3654-11ea-8ddf-03fcef30a631.png">


1. Get your personal access token and enter it in the extension. **This must be done to use the extension.** If you don't know how to get a personal access token, here is [the guide](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

<img src="https://user-images.githubusercontent.com/22616716/72204404-d7f5e800-34ba-11ea-84d2-5b8b492a41ce.png">

2. write sub fields and save them. Here is an example.

<img src="https://user-images.githubusercontent.com/22616716/72204505-07592480-34bc-11ea-8a72-7cc5881de542.png">

3-1. Create an issue with the sub fields saved before. Go to the Issue Board and click the `Custom Issue`. If you put the wrong information in the extension, 404 error page will pop up.

<img src="https://user-images.githubusercontent.com/22616716/72204570-e218e600-34bc-11ea-909c-f43dee9ac76b.png"/>

The issue was created with sub fields you saved :tada:

3-2. Modify a PR with the sub fields saved before. Go to the PR page and click the `apply fields`. If you put the wrong information in the extension, 404 error page will pop up.

<img src="https://user-images.githubusercontent.com/22616716/72204740-9404e200-34be-11ea-908f-a5b41690f3f0.png"/>

Your sub fields are added to the PR :tada:




## Tech

- Typescript
- HTML
- Materialize CSS
- Webpack
- Materialize CSS
- Travis CI
