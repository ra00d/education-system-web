import Layout from "@/common/layouts";
import { AccountsPage } from "@/pages/accounts/Accounts";
import { ClassesPage } from "@/pages/classes";
import { ClassForm } from "@/pages/classes/class/ClassForm";
import { CoursesPage } from "@/pages/courses";
import { CourseForm } from "@/pages/courses/course/CourseForm";
import { CourseInfo } from "@/pages/courses/course/details/page";
import { DashboardPage } from "@/pages/dashboard/Dashboard";
import { NotFoundPage } from "@/pages/errors/NotFoundPage";
import { ExamsPage } from "@/pages/exams";
import { ExamDetails } from "@/pages/exams/exam/ExamDetails";
import { ExamForm } from "@/pages/exams/exam/ExamForm";
import LoginPage from "@/pages/login";
import { MonitoringPage } from "@/pages/monitoring";
import { Questions } from "@/pages/questions/questions";
import SignUp from "@/pages/signup";
import { StudentForm } from "@/pages/students/student/Form";
import { TeacherForm } from "@/pages/teachers/teacher/TeacherForm";
import { ChevronRight } from "lucide-react";
import { Link, RouteObject, createBrowserRouter } from "react-router-dom";

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
        handle: getPageName("Home")(),
        element: <DashboardPage />,
      },
      {
        loader: getPageName("accounts"),
        path: "/accounts",
        handle: getPageName("accounts")(),
        element: <AccountsPage />,
      },
      {
        path: "courses",
        loader: getPageName("courses"),
        handle: getPageName("courses")(),
        children: [
          {
            index: true,
            element: <CoursesPage />,
          },
          {
            path: ":id",
            children: [
              {
                element: <CourseForm />,
                index: true,
              },
              {
                path: "info",
                element: <CourseInfo />,
              },
            ],
          },
        ],
      },
      {
        path: "exams",
        loader: getPageName("Exams"),
        handle: getPageName("Exams")(),
        children: [
          {
            index: true,
            element: <ExamsPage />,
          },
          {
            path: ":id",
            element: <ExamDetails />,
          },
          {
            path: "new",
            element: <ExamForm />,
          },
        ],
      },
      {
        path: "classes",
        loader: getPageName("classes"),
        handle: {
          crumb: () => (
            <Link to="/" className="bg-red-500">
              <div className="flex">
                <span>Dashboard</span> <ChevronRight className="mx-2" />
              </div>{" "}
            </Link>
          ),
          pageName: "classes",
        },
        children: [
          {
            index: true,
            element: <ClassesPage />,
          },
          {
            path: ":id",
            Component: ClassForm,
            handle: {
              crumb: () => <Link to="/classes">Classes</Link>,
            },
          },
        ],
      },

      {
        path: "monitoring",
        loader: getPageName("monitoring"),
        handle: getPageName("monitoring"),
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
