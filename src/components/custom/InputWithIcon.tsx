import { forwardRef, ReactNode } from "react";
import { Input, InputProps } from "../ui/input";
import { cn } from "@/lib/utils";
export type InputWithIconProps = InputProps & {
	icon: ReactNode;
	inputClassName?: string;
};
export const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
	({ className, inputClassName, icon, type, ...props }, ref) => {
		return (
			<div
				className={cn(
					"flex bg-background border border-input rounded-md w-full items-center pr-7 rtl:pl-7",
					"focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
					className,
				)}
			>
				<Input
					ref={ref}
					type={type}
					className={cn(
						"bg-transparent pointer-events-auto border-none focus-visible:ring-0 focus-visible:ring-offset-0",
						inputClassName ?? "",
					)}
					{...props}
				/>
				{icon}
			</div>
		);
	},
);
