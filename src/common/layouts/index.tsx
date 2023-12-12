import { Navbar } from "@/components/Navbar";
import { InputWithIcon } from "@/components/custom/InputWithIcon";
import { Search } from "lucide-react";
import { MdVerifiedUser } from "react-icons/md";
import { Link, Outlet, UIMatch, useMatches } from "react-router-dom";
import { RouteDataType } from "../config/routes";

const Layout = () => {
	const [
		_,
		{
			data: { pageName },
		},
	] = useMatches() as UIMatch<RouteDataType>[];

	return (
		<div className="flex flex-col p-0 h-screen overflow-hidden bg-background ">
			<div className=" flex shadow-md bg-card justify-around py-2 mx-2 my-2 rounded-md  items-center sticky top-0">
				<div className="flex items-center justify-between px-2 w-full">
					<h1 className="text-4xl font-bold">Logo</h1>
					<h2 className=" capitalize">{pageName ?? ""}</h2>
					<div
						className="w-[400px] flex items-center flex-row-reverse justify-between gap-3"
						dir="rtl"
					>
						<InputWithIcon
							icon={<Search />}
							className="bg-background border border-black"
						/>
						<Link
							to={"#"}
							className="bg-orange-400 px-2 py-2 h-full rounded-md"
						>
							<MdVerifiedUser size="26" />
						</Link>
					</div>
				</div>{" "}
			</div>
			<div className="grid grid-cols-12   flex-1 py-2 pb-0">
				<div className=" shadow-md bg-card rounded-md w-fit pb-5 justify-between  px-2 flex flex-col fixed  left-3 top-20 bottom-0">
					<Navbar />
				</div>
				<div className="col-span-1" />
				<div className="col-span-11 w-full min-h-[calc(100vh-13rem)] snap-none">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
