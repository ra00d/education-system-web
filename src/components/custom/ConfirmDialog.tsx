import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
type ConfirmDialogProps = {
	open: boolean;
	setOpen: () => void;
	action: () => void;
	message?: string;
};
export function ConfirmDialog(props: ConfirmDialogProps) {
	return (
		<AlertDialog open={props.open}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. {props?.message}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={props.setOpen}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={props.action}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
