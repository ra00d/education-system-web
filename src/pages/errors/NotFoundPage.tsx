import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
	return (
		<div className="h-screen w-screen flex flex-col justify-center items-center gap-3">
			<h1 className="text-9xl font-bold">404</h1>
			<p className="text-3xl leading-3">this page does not exist</p>
			<Link
				to={"/"}
				className={buttonVariants({
					variant: "link",
					className: "mt-5",
					size: "lg",
				})}
			>
				home page
			</Link>
		</div>
	);
};
