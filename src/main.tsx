import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./app";
import  { Toaster } from "react-hot-toast";
import AuthProvider from "./context/userContext";
// import

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider>
			<Toaster />
			<App />
		</AuthProvider>
	</React.StrictMode>
);
