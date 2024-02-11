import { useMatches } from "react-router-dom";

export const Breadcrumbs = () => {
	const matches = useMatches();
	const crumbs = matches
		// first get rid of any matches that don't have handle and crumb
		.filter((match: any) => Boolean(match.handle?.crumb))
		// now map them into an array of elements, passing the loader
		// data to each one
		.map((match: any) => match.handle?.crumb(match.data));

	return (
		<div>
			<ol className="flex gap-1">
				{crumbs.map((crumb, index) => (
					<li key={index} role="crumb">
						{crumb}
					</li>
				))}
			</ol>
		</div>
	);
};
