import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
Object.defineProperty(String.prototype, "translate", {
	value: function () {
		return this.toUpperCase();
	},
});
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
