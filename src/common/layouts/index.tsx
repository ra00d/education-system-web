import { Navbar } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
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
		<div className="flex flex-col p-0 h-screen overflow-hidden">
			<div className="flex justify-around py-2 mx-2 my-2 rounded-md bg-gray-300 items-center sticky top-0">
				<h1 className="text-4xl font-bold">Logo</h1>
				<h1 className="text-3xl font-semibold capitalize">{pageName ?? ""}</h1>
				<Input className="w-[300px]" />
			</div>
			<div className="grid grid-cols-12 flex-1 py-2 pb-0  h-full relative">
				<div className="bg-gray-300  rounded-md w-fit pb-5 justify-between  px-2 flex flex-col fixed  left-3 top-20 bottom-0">
					<Navbar />
					<Link to={"#"} className="bg-orange-400 px-2 py-2 rounded-md">
						<MdVerifiedUser size="28" />
					</Link>
				</div>
				<div className="col-span-1" />
				<div className="col-span-11 w-full">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
