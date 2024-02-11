import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { readFileSync } from "fs";
//
// const options = {
// 	key: fs.readFileSync("./mylocalhost.key"),
// 	cert: fs.readFileSync("./mylocalhost.pem"),
// };
// https://vitejs.dev/config/
export default defineConfig({
	server: {
		open: true,
		host: "0.0.0.0",
		// https: {},
		// https: {
		// 	key: readFileSync("./mylocalhost.key"),
		// 	cert: readFileSync("./mylocalhost.pem"),
		// },
	},
	plugins: [
		react(),
		// basicSsl({
		// 	name: "mylocalhost",
		// 	certDir: __dirname,
		// 	domains: ["localhost", "192.168.0.235"],
		// }),
	],
	resolve: {
		alias: {
			"simple-peer": "simple-peer/simplepeer.min.js",
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
