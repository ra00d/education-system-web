/**
 * v0 by Vercel.
 * @see https://v0.dev/t/w0X9GYQPsKH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getClass } from "@/api/classes";
import { LoadingPage } from "@/components/custom/LoadingPage";

export function ClassDetails() {
	const { id } = useParams();
	const { data, isLoading } = useQuery({
		queryKey: [`class-info-${id}`],
		queryFn: () => {
			return getClass(id!);
		},
		enabled: !!id,
	});
	if (!id) {
		return <div>No cousre</div>;
	}
	if (isLoading) {
		return <LoadingPage />;
	}
	console.log(data);

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-1 py-8 px-6">
				<div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<h2 className="text-xl font-bold mb-4">Participants</h2>
						<Card>
							<CardContent className="p-3 max-h-96 overflow-auto">
								<ul className="space-y-2 h-96 overflow-auto divide ">
									{data?.students?.map((student) => {
										return (
											<li key={student.id}>
												<div className="flex items-center gap-2">
													<div>
														<div className="font-medium">{student.name}</div>
														<div className="text-sm text-gray-500">
															{student.email}
														</div>
													</div>
												</div>
											</li>
										);
									})}{" "}
								</ul>
							</CardContent>
						</Card>
					</div>
					<div>
						<h2 className="text-xl font-bold mb-4">Teacher</h2>
						<Card>
							<CardContent>
								<div className="flex items-center gap-4">
									<div>
										<div className="font-medium text-lg">
											{data?.course?.teacher?.name}
										</div>
										<div className="text-gray-500">
											<MailIcon className="h-4 w-4 inline-block mr-1" />
											{data?.course?.teacher?.email}
										</div>
										<div className="text-gray-500">
											<PhoneIcon className="h-4 w-4 inline-block mr-1" />
											+1 (555) 555-5555
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div className="col-span-1 md:col-span-2">
						<h2 className="text-xl font-bold mb-4">Course Details</h2>
						<Card>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<div className="font-medium text-lg">
											{data?.course?.name}
										</div>
										<div className="text-gray-500">
											{data?.course?.description}
										</div>
									</div>
									<div>
										<div className="font-medium">Start Date</div>
										<div className="text-gray-500">
											{data?.course?.startDate}
										</div>
										<div className="font-medium">End Date</div>
										<div className="text-gray-500">{data?.course?.endDate}</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}

function CalendarIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M8 2v4" />
			<path d="M16 2v4" />
			<rect width="18" height="18" x="3" y="4" rx="2" />
			<path d="M3 10h18" />
		</svg>
	);
}

function MailIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect width="20" height="16" x="2" y="4" rx="2" />
			<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
		</svg>
	);
}

function PhoneIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
		</svg>
	);
}

function UsersIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
			<path d="M16 3.13a4 4 0 0 1 0 7.75" />
		</svg>
	);
}
