import { RouterProvider } from "react-router-dom";
import "./App.css";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import queryClient from "./common/config/query";
import AppRouter from "./common/config/routes";
import { ThemeProvider } from "./common/context/theme-context";
import { TooltipProvider } from "./components/ui/tooltip";
// import { ThemeProvider } from "./common/context/theme-context";

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
				<TooltipProvider>
					<RouterProvider router={AppRouter} />
				</TooltipProvider>
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</QueryClientProvider>
	);
}

export default App;
