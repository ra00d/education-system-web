import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./common/config/query";
import AppRouter from "./common/config/routes";
import { ThemeProvider } from "./common/context/theme-context";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
// import { socket } from "@/common/config/socket";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // socket.on("connected", () => {
    // 	console.log("connected");
    // });
    // socket.emit("test", {}, (data: any) => {
    // 	console.log(data);
    // });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <RouterProvider router={AppRouter} />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}

export default App;
