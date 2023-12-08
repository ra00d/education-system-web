import Layout from "@/common/layouts";
import { ClassesPage } from "@/pages/classes";
import { CoursesPage } from "@/pages/courses";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import { MonitoringPage } from "@/pages/monitoring";
import SignUp from "@/pages/signup";
import { RouteObject, createBrowserRouter } from "react-router-dom";

const getPageName = (pageName: string) => () => ({ pageName: pageName });
type RouteType = RouteObject;
export type RouteDataType = { pageName: string };
export const routes: RouteType[] = [
	{
		path: "/",
		// loader: getPageName("accounts"),
		element: <Layout />,
		children: [
			{
				loader: getPageName("accounts"),
				path: "",
				element: <HomePage />,
			},
			{
				path: "classes",
				loader: getPageName("classes"),
				element: <ClassesPage />,
			},
			{
				path: "courses",
				element: <CoursesPage />,
				loader: getPageName("courses"),
			},
			{
				path: "monitoring",
				loader: getPageName("monitoring"),
				element: <MonitoringPage />,
			},
		],
	},
	{
		path: "login",
		element: <LoginPage />,
	},
	{
		path: "sign-up",
		element: <SignUp />,
	},
];
const AppRouter = createBrowserRouter(routes, {});
export default AppRouter;
