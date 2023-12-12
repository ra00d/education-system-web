import Layout from "@/common/layouts";
import { AccountsPage } from "@/pages/accounts/Accounts";
import { ClassesPage } from "@/pages/classes";
import { CoursesPage } from "@/pages/courses";
import { DashboardPage } from "@/pages/dashborde/Dashboard";
import { NotFoundPage } from "@/pages/errors/NotFoundPage";
import LoginPage from "@/pages/login";
import { MonitoringPage } from "@/pages/monitoring";
import SignUp from "@/pages/signup";
import { StudentForm } from "@/pages/students/student/Form";
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
				path: "",
				loader: getPageName("Home"),
				element: <DashboardPage />,
			},
			{
				loader: getPageName("accounts"),
				path: "/accounts",
				element: <AccountsPage />,
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
			{
				path: "students/new",
				loader: getPageName("add student"),
				element: <StudentForm />,
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
	{
		path: "*",
		element: <NotFoundPage />,
	},
];
const AppRouter = createBrowserRouter(routes, {});
export default AppRouter;
