import "./styles/tailwind.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export default defineContentScript({
  
  matches: ["https://www.linkedin.com/*/*"],

  cssInjectionMode: "ui",
  
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "linkedin-extension",
      position: "inline",
      anchor: "body",
      append: "first",
      onMount: (container) => {
        // Don't mount react app directly on <body>

        const wrapper = document.createElement("div");
        container.append(wrapper);

        const root = ReactDOM.createRoot(wrapper);
        root.render(<App />);
        return { root, wrapper };
      },
      onRemove: (elements) => {
        elements?.root.unmount();
        elements?.wrapper.remove();
      },
    });

    ui.mount();
  },
});
// import "./style.css";
// import ReactDOM from "react-dom/client";
// import App from './App.tsx';

// export default defineContentScript({
//   matches: ["*://*/*"],

//   async main(ctx) {
//     // Create a div container where your React app will be mounted
//     const wrapper = document.createElement("div");
    
//     // You can append the wrapper to body or a specific element as per your need
//     document.body.appendChild(wrapper);

//     // Mount the React app to the created div
//     const root = ReactDOM.createRoot(wrapper);
//     root.render(<App />);

//     // If you need to remove the app later
//     return () => {
//       root.unmount(); // Unmount the React app
//       wrapper.remove(); // Remove the wrapper div from the DOM
//     };
//   },
// });
