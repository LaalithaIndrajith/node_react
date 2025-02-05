import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import AlertType from "@/constants/alert-type.ts";
import {CircleCheckBig, TriangleAlert} from "lucide-react";
import {useNavigate} from "react-router";


export type PopupAlertProps = {
    alertType: AlertType;
    titleText: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    navigateTo?: string
}

export function PopupAlert({alertType, titleText, description, isOpen, onClose, navigateTo}: PopupAlertProps) {

    const navigate = useNavigate(); // ✅ Initialize useNavigate

    const handleContinue = () => {
        onClose(); // Close the alert
        if (navigateTo) {
            navigate(navigateTo); // ✅ Navigate to the provided route
        }
    };

    const Icon = alertType === AlertType.success ? CircleCheckBig : TriangleAlert;
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex items-center gap-2">
                        <Icon className="w-10 h-10 text-primary" />
                        <AlertDialogTitle>{titleText}</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
                    {(navigateTo) && <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}