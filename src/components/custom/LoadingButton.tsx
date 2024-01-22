import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";
import { Loading } from "./Progress";
type LoadingButtonProps = ButtonProps & { loading?: boolean };
export const LoadingButton = ({
	loading,
	children,
	className,
	...props
}: LoadingButtonProps) => {
	return (
		<Button
			{...props}
			className={cn(
				"flex justify-center items-center overflow-hidden",
				className,
			)}
			disabled={loading}
		>
			{loading ? <Loading size={32} /> : children}
		</Button>
	);
};
