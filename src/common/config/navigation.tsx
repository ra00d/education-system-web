import { ListChecksIcon, User } from "lucide-react";
import { ReactNode } from "react";
import { MdDashboard, MdLibraryBooks } from "react-icons/md";

export type NavItem = {
  path: string;
  icon: ReactNode;
  title: string;
};

export const navItems: NavItem[] = [
  {
    path: "",
    title: "Dashbord",
    icon: <MdDashboard size="28" />,
  },

  {
    path: "accounts",
    title: "acounts",
    icon: <User size="28" />,
  },
  {
    path: "courses",
    title: "Courses",
    icon: <MdLibraryBooks size="28" />,
  },
  {
    path: "exams",
    title: "Exams",
    icon: <ListChecksIcon size="28" />,
  },
  // {
  //   path: "classes",
  //   title: "Classes",
  //   icon: <MdClass size="28" />,
  // },

  // {
  //   path: "monitoring",
  //   title: "Monitoring",
  //   icon: <Monitor size="28" />,
  // },
];
