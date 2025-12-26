import { useEffect } from "react";
import { X } from "lucide-react";

const StudentMessageToast = ({ message, type, onClose }) => {

    // run the hook ALWAYS
    useEffect(() => {
        if (!message) return;  // safely exit inside the effect

        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    // early return AFTER hooks
    if (!message) return null;

    const baseStyle =
        "fixed bottom-5 right-5 z-50 p-4 rounded-xl shadow-lg font-semibold flex items-center gap-3 transition-transform duration-300 transform translate-x-0";

    let colorStyle = "";
    switch (type) {
        case "error":
            colorStyle = "bg-red-700 text-white";
            break;
        case "success":
            colorStyle = "bg-green-700 text-white";
            break;
        default:
            colorStyle = "bg-indigo-600 text-white";
    }

    return (
        <div className={`${baseStyle} ${colorStyle}`}>
            <span>{message}</span>
            <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/20 transition"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default StudentMessageToast;