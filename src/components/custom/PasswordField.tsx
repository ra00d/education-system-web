import { SetStateAction, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { forwardRef} from "react";
import { Input, InputProps } from "../ui/input";
import { cn } from "@/lib/utils";
export type InputWithIconProps = InputProps;
export const PasswordIcon = ({
	showPass,
	setShowPass,
}: {
	showPass: boolean;
	setShowPass: React.Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<div>
			{showPass ? (
				<MdVisibility
					size="24"
					className="cursor-pointer z-10"
					onClick={() => {
						setShowPass((prev) => !prev);
					}}
				/>
			) : (
				<MdVisibilityOff
					size="24"
					className="cursor-pointer z-10"
					onClick={() => {
						setShowPass((prev) => !prev);
					}}
				/>
			)}
		</div>
	);
};

export const PasswordField = forwardRef<HTMLInputElement, InputWithIconProps>(
	({ className, ...props }, ref) => {
		const [showPass, setShowPass] = useState(false);
		return (
			<div
				className={cn(
					"flex bg-[#F7F7F8] text-black rounded-md w-full items-center pr-7",
					"focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
				)}
			>
				<Input
					ref={ref}
					type={showPass?"text":"password"}
					className={cn(
						"bg-transparent pointer-events-auto border-none focus-visible:ring-0 focus-visible:ring-offset-0",
						className,
					)}
					{...props}
				/>
				<PasswordIcon showPass={showPass} setShowPass={setShowPass} />
			</div>
		);
	},
);
