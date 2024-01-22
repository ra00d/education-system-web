import Layout from "@/common/layouts";
import { AccountsPage } from "@/pages/accounts/Accounts";
import { ClassesPage } from "@/pages/classes";
import { ClassForm } from "@/pages/classes/class/ClassForm";
import { CoursesPage } from "@/pages/courses";
import { CourseForm } from "@/pages/courses/course/CourseForm";
import { DashboardPage } from "@/pages/dashboard/Dashboard";
import { NotFoundPage } from "@/pages/errors/NotFoundPage";
import { ExamsPage } from "@/pages/exams";
import { ExamForm } from "@/pages/exams/exam/ExamForm";
import LoginPage from "@/pages/login";
import { MonitoringPage } from "@/pages/monitoring";
import { Questions } from "@/pages/questions/questions";
import SignUp from "@/pages/signup";
import { StudentForm } from "@/pages/students/student/Form";
import { TeacherForm } from "@/pages/teachers/teacher/TeacherForm";
import { RouteObject, createBrowserRouter } from "react-router-dom";

const getPageName = (pageName: string) => () => ({ pageName: pageName });
type RouteType = RouteObject;
export type RouteDataType = { pageName: string };
export const routes: RouteType[] = [
	{
		element: <Layout />,
		children: [
			{
				path: "",
				index: true,
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
				children: [
					{
						index: true,
						element: <ClassesPage />,
					},
					{
						path: ":id",
						Component: ClassForm,
					},
				],
			},
			{
				path: "exams",
				loader: getPageName("Exams"),
				children: [
					{
						index: true,
						element: <ExamsPage />,
					},
					{
						path: "new",
						element: <ExamForm />,
					},
				],
			},

			{
				path: "courses",
				loader: getPageName("courses"),
				children: [
					{
						index: true,
						element: <CoursesPage />,
					},
					{
						path: ":id",
						loader: getPageName("Add Course"),
						element: <CourseForm />,
					},
				],
			},

			{
				path: "monitoring",
				loader: getPageName("monitoring"),
				element: <MonitoringPage />,
			},
			{
				path: "students/new",
				loader: getPageName("Add student"),
				element: <StudentForm />,
			},
			{
				path: "teachers/new",
				loader: getPageName("Add teacher"),
				element: <TeacherForm />,
			},
			{
				path: "questions",
				loader: getPageName("questions"),
				Component: Questions,
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
