---
name: LinkedIn Extension with React
description: This is a simple Chrome extension made using React. It shows a popup (modal) on LinkedIn pages when user focuses on a text box, where users can input some text and generate a response. It then inserts the response directly into the LinkedIn message box.
Features: React-based UI- The popup is built using React and appears on LinkedIn when you click in the message box.
          Custom Messages- Type a message in the popup, and it will generate and insert a response for you.
          Shadow DOM- The extension uses a Shadow DOM to keep its styles and scripts separate from the LinkedIn page, so nothing gets mixed up.
Installation: Clone the repository 
              npm i
              npm run build
              Load the extension into Chrome-
              1.Open Chrome and go to chrome://extensions/
              2.Enable Developer Mode by turning on the toggle in the top-right corner.
              3.Click Load unpacked and select the dist/ folder from the project.
---

```sh
npm i
npm run dev
```
