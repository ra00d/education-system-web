import { RouterProvider } from "react-router-dom";
import "./App.css";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import queryClient from "./common/config/query";
import AppRouter from "./common/config/routes";

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={AppRouter} />
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
		</QueryClientProvider>
	);
}

export default App;
